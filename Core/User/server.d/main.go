package main

import (
	"context"
	"flag"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/cellarstone/Cellar.Hub/Core/User/pb"
	"github.com/cellarstone/Cellar.Hub/Core/User/service"
	"github.com/go-kit/kit/log"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	"github.com/gorilla/handlers"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

const (
	defaultHTTPPort = "44407"
	defaultGRPCPort = "44417"
	defaultMongoUrl = "localhost"
)

func main() {
	errs := make(chan error, 2)

	var (
		httpaddr = envString("HTTP_PORT", defaultHTTPPort)
		rpcpaddr = envString("GRPC_PORT", defaultGRPCPort)
		mongourl = envString("MONGO_URL", defaultMongoUrl)

		httpAddr = flag.String("http.addr", ":"+httpaddr, "HTTP listen address")
		gRPCAddr = flag.String("grpc.addr", ":"+rpcpaddr, "gRPC listen address")

		ctx = context.Background()
	)

	flag.Parse()

	var logger log.Logger
	logger = log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)

	fieldKeys := []string{"method"}

	//-----------------------------------------
	// gRPC server
	//-----------------------------------------

	// init lorem service
	var bs0 service.Service
	var err error
	bs0, err = service.NewService(mongourl)
	if err != nil {
		panic(err)
	}

	// creating Endpoints struct
	endpoints1 := service.Endpoints{
		GetAllUsersEndpoint: service.MakeGetAllUsersEndpoint(bs0),
	}

	//execute grpc server
	go func() {
		listener, err := net.Listen("tcp", *gRPCAddr)
		if err != nil {
			errs <- err
			return
		}
		handler := service.MakeGrpcHandler(ctx, endpoints1)
		gRPCServer := grpc.NewServer()
		pb.RegisterUserServiceServer(gRPCServer, handler)
		errs <- gRPCServer.Serve(listener)
	}()

	//-----------------------------------------
	// HTTP server
	//-----------------------------------------

	// USER --------------------------
	var bs1 service.Service
	bs1, err = service.NewService(mongourl)
	if err != nil {
		panic(err)
	}
	bs1 = service.NewLoggingMiddleware(log.With(logger, "component", "iot"), bs1)
	bs1 = service.NewMetricsMiddleware(
		kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
			Namespace: "iot",
			Subsystem: "iotService",
			Name:      "request_count",
			Help:      "Number of requests received.",
		}, fieldKeys),
		kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
			Namespace: "iot",
			Subsystem: "iotService",
			Name:      "request_latency_microseconds",
			Help:      "Total duration of requests in microseconds.",
		}, fieldKeys),
		bs1,
	)

	endpoints := service.Endpoints{
		GetAllUsersEndpoint: service.MakeGetAllUsersEndpoint(bs1),
	}

	// SERVER -------------------------------------------
	httpLogger := log.With(logger, "component", "http")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.Handle("/", handlers.CORS(headersOk, originsOk, methodsOk)(service.MakeHttpHandler(ctx, endpoints, httpLogger)))
	http.Handle("/metrics", promhttp.Handler())

	logger.Log("API IS RUNNING")

	go func() {
		logger.Log("transport", "http", "address", *httpAddr, "msg", "listening")
		errs <- http.ListenAndServe(*httpAddr, nil)
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
