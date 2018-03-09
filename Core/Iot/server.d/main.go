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

	// iot "../iot"
	// mqtt "../mqtt"

	"github.com/cellarstone/Cellar.Hub/Core/Iot/pb"
	iot "github.com/cellarstone/Cellar.Hub/Core/Iot/service"
	"github.com/go-kit/kit/log"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	"github.com/gorilla/handlers"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

const (
	defaultHTTPPort = "44403"
	defaultGRPCPort = "44413"
	defaultMqttUrl  = "localhost"
	defaultMongoUrl = "localhost"
)

func main() {
	errs := make(chan error, 2)

	var (
		httpaddr = envString("HTTP_PORT", defaultHTTPPort)
		rpcpaddr = envString("GRPC_PORT", defaultGRPCPort)
		mqtturl  = envString("MQTT_URL", defaultMqttUrl)
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
	var bs0 iot.Service
	bs0 = iot.NewService(mongourl, mqtturl)

	// creating Endpoints struct
	endpoints1 := iot.Endpoints{
		GetAllSpacesEndpoint: iot.MakeGetAllSpacesEndpoint(bs0),
		GetSenzorEndpoint:    iot.MakeGetSenzorEndpoint(bs0),
	}

	//execute grpc server
	go func() {
		listener, err := net.Listen("tcp", *gRPCAddr)
		if err != nil {
			errs <- err
			return
		}
		handler := iot.MakeGrpcHandler(ctx, endpoints1)
		gRPCServer := grpc.NewServer()
		pb.RegisterIoTServiceServer(gRPCServer, handler)
		errs <- gRPCServer.Serve(listener)
	}()

	//-----------------------------------------
	// HTTP server
	//-----------------------------------------

	// IOT --------------------------
	var bs1 iot.Service
	bs1 = iot.NewService(mongourl, mqtturl)
	bs1 = iot.NewLoggingMiddleware(log.With(logger, "component", "iot"), bs1)
	bs1 = iot.NewMetricsMiddleware(
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

	iotendpoints := iot.Endpoints{
		GetAllSpacesEndpoint:  iot.MakeGetAllSpacesEndpoint(bs1),
		GetRootSpacesEndpoint: iot.MakeGetRootSpacesEndpoint(bs1),
		GetSpacesEndpoint:     iot.MakeGetSpacesEndpoint(bs1),
		RemoveSpacesEndpoint:  iot.MakeRemoveSpacesEndpoint(bs1),
		GetSpaceEndpoint:      iot.MakeGetSpaceEndpoint(bs1),
		AddSpaceEndpoint:      iot.MakeAddSpaceEndpoint(bs1),
		RemoveSpaceEndpoint:   iot.MakeRemoveSpaceEndpoint(bs1),
		UpdateSpaceEndpoint:   iot.MakeUpdateSpaceEndpoint(bs1),
		GetAllSenzorsEndpoint: iot.MakeGetAllSenzorsEndpoint(bs1),
		GetSenzorsEndpoint:    iot.MakeGetSenzorsEndpoint(bs1),
		RemoveSenzorsEndpoint: iot.MakeRemoveSenzorsEndpoint(bs1),
		GetSenzorEndpoint:     iot.MakeGetSenzorEndpoint(bs1),
		AddSenzorEndpoint:     iot.MakeAddSenzorEndpoint(bs1),
		RemoveSenzorEndpoint:  iot.MakeRemoveSenzorEndpoint(bs1),
		UpdateSenzorEndpoint:  iot.MakeUpdateSenzorEndpoint(bs1),
		GetAllPlacesEndpoint:  iot.MakeGetAllPlacesEndpoint(bs1),
		GetPlaceEndpoint:      iot.MakeGetPlaceEndpoint(bs1),
		AddPlaceEndpoint:      iot.MakeAddPlaceEndpoint(bs1),
		RemovePlaceEndpoint:   iot.MakeRemovePlaceEndpoint(bs1),
		UpdatePlaceEndpoint:   iot.MakeUpdatePlaceEndpoint(bs1),
		PublishToMqttEndpoint: iot.MakePublishToMqttEndpoint(bs1),
	}

	// SERVER -------------------------------------------
	httpLogger := log.With(logger, "component", "http")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.Handle("/iot/", handlers.CORS(headersOk, originsOk, methodsOk)(iot.MakeHttpHandler(ctx, iotendpoints, httpLogger)))
	// http.Handle("/mqtt/", handlers.CORS(headersOk, originsOk, methodsOk)(mqtt.MakeHttpHandler(ctx, mqttendpoints, httpLogger)))
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
