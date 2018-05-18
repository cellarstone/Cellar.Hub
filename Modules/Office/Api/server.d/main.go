package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"syscall"
	"time"

	cellargraphql "github.com/cellarstone/Cellar.Hub/Modules/Office/Api/graphql"
	api "github.com/cellarstone/Cellar.Hub/Modules/Office/Api/service"
	"github.com/go-kit/kit/endpoint"
	"github.com/go-kit/kit/log"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	"github.com/gorilla/handlers"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

const (
	defaultHTTPPort = "44513"
	//defaultGRPCPort = "44523"
	defaultMqttUrl            = "localhost"
	defaultMongoUrl           = "localhost"
	defaultIotMicroserviceUrl = "localhost:44413"
)

func init() {
	// PARALELISM ----------------------
	runtime.GOMAXPROCS(runtime.NumCPU())
}

func main() {
	errs := make(chan error, 2)

	var (
		httpaddr = envString("HTTP_PORT", defaultHTTPPort)
		//rpcpaddr = envString("GRPC_PORT", defaultGRPCPort)
		mqtturl            = envString("MQTT_URL", defaultMqttUrl)
		mongourl           = envString("MONGO_URL", defaultMongoUrl)
		iotmicroserviceurl = envString("CELLAR_IOT_URL", defaultIotMicroserviceUrl)

		httpAddr = flag.String("http.addr", ":"+httpaddr, "HTTP listen address")
		//gRPCAddr = flag.String("grpc.addr", ":"+rpcpaddr, "gRPC listen address")

		ctx = context.Background()
	)

	flag.Parse()

	var logger log.Logger
	logger = log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)
	logger = log.With(logger, "caller", log.DefaultCaller)

	fieldKeys := []string{"method"}

	//-----------------------------------------
	// GraphQL server
	//-----------------------------------------

	// init service
	cellargraphql.MyService = api.NewService(mongourl, mqtturl, iotmicroserviceurl)
	queries := cellargraphql.GetRootQueries()
	mutations := cellargraphql.GetRootMutations()

	//-----------------------------------------
	// gRPC server
	//-----------------------------------------

	// // init lorem service
	// var bs0 iot.Service
	// bs0 = iot.NewService(mongourl, mqtturl)

	// // creating Endpoints struct
	// endpoints1 := iot.Endpoints{
	// 	GetAllSpacesEndpoint: iot.MakeGetAllSpacesEndpoint(bs0),
	// 	GetSenzorEndpoint:    iot.MakeGetSenzorEndpoint(bs0),
	// }

	// //execute grpc server
	// go func() {
	// 	listener, err := net.Listen("tcp", *gRPCAddr)
	// 	if err != nil {
	// 		errs <- err
	// 		return
	// 	}
	// 	handler := iot.MakeGrpcHandler(ctx, endpoints1)
	// 	gRPCServer := grpc.NewServer()
	// 	pb.RegisterIoTServiceServer(gRPCServer, handler)
	// 	errs <- gRPCServer.Serve(listener)
	// }()

	//-----------------------------------------
	// HTTP server
	//-----------------------------------------

	// API --------------------------
	var bs1 api.Service
	bs1 = api.NewService(mongourl, mqtturl, iotmicroserviceurl)
	bs1 = api.NewLoggingMiddleware(log.With(logger, "component", "officeapi"), bs1)
	bs1 = api.NewMetricsMiddleware(
		kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
			Namespace: "officeapi",
			Subsystem: "officeApiService",
			Name:      "http_request_count",
			Help:      "Number of requests received.",
		}, fieldKeys),
		kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
			Namespace: "officeapi",
			Subsystem: "officeApiService",
			Name:      "http_request_latency_microseconds",
			Help:      "Total duration of requests in microseconds.",
		}, fieldKeys),
		bs1,
	)

	apiendpoints := api.Endpoints{
		GetAllSpacesEndpoint: api.MakeGetAllSpacesEndpoint(bs1),
	}

	// SERVER -------------------------------------------
	httpLogger := log.With(logger, "component", "http")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.Handle("/", handlers.CORS(headersOk, originsOk, methodsOk)(api.MakeHttpHandler(ctx, apiendpoints, httpLogger)))
	http.Handle("/graphql", handlers.CORS(headersOk, originsOk, methodsOk)(api.MakeGraphqlHandler(queries, mutations)))
	http.Handle("/metrics", promhttp.Handler())

	fmt.Println("API IS RUNNING")

	go func() {
		logger.Log("transport", "http", "address", *httpAddr, "msg", "listening")
		errs <- http.ListenAndServe(*httpAddr, nil)
		// fmt.Println(http.ListenAndServe(*httpAddr, nil))
	}()

	//-----------------------------------------
	// END SIGNAL
	//-----------------------------------------

	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT)
		errs <- fmt.Errorf("%s", <-c)
	}()

	logger.Log("terminated", <-errs)

}

//---------------------------------------------------------
//HELPERS -------------------------------------------------
//---------------------------------------------------------

func envString(env, fallback string) string {
	e := os.Getenv(env)
	if e == "" {
		return fallback
	}
	return e
}

func LoggingMiddleware(logger log.Logger) endpoint.Middleware {
	return func(next endpoint.Endpoint) endpoint.Endpoint {
		return func(ctx context.Context, request interface{}) (response interface{}, err error) {

			defer func(begin time.Time) {
				logger.Log("transport_error", err, "took", time.Since(begin))
			}(time.Now())
			return next(ctx, request)

		}
	}
}
