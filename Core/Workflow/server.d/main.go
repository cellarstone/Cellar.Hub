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

	"github.com/cellarstone/Cellar.Hub/Core/Workflow/engine"
	"github.com/cellarstone/Cellar.Hub/Core/Workflow/pb"
	"github.com/go-kit/kit/log"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	"github.com/gorilla/handlers"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"google.golang.org/grpc"
)

const (
	defaultPort          = "44405"
	defaultMongoUrl      = "localhost"
	defaultMqttUrl       = "localhost"
	defaultInfluxUrl     = "http://localhost:8086"
	defaultWebsocketsUrl = "localhost:44406"
)

func init() {
	// PARALELISM ----------------------
	runtime.GOMAXPROCS(runtime.NumCPU())
}

func main() {
	var (
		addr          = envString("PORT", defaultPort)
		mongourl      = envString("MONGO_URL", defaultMongoUrl)
		mqtturl       = envString("MQTT_URL", defaultMqttUrl)
		influxurl     = envString("INFLUX_URL", defaultInfluxUrl)
		websocketsurl = envString("WEBSOCKETS_URL", defaultWebsocketsUrl)

		httpAddr = flag.String("http.addr", ":"+addr, "HTTP listen address")

		ctx = context.Background()
	)

	flag.Parse()

	// -------------------------------------------------
	// -------------------------------------------------
	// -------------------------------------------------

	address := "localhost:44413"
	// Set up a connection to the gRPC server.
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		fmt.Printf("did not connect: %v", err)
	}
	defer conn.Close()
	// Creates a new CustomerClient
	client := pb.NewIoTServiceClient(conn)

	request := &pb.GetSenzorRequest{
		Id: "5a7be4a28d6078000a79f945",
	}

	resp, err := client.GetSenzor(context.Background(), request)
	if err != nil {
		fmt.Printf("Could not create Customer: %v", err)
	}
	fmt.Println(resp)

	// -------------------------------------------------
	// -------------------------------------------------
	// -------------------------------------------------

	var logger log.Logger
	logger = log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)

	fieldKeys := []string{"method"}

	// WORKFLOW ENGINE --------------------------
	var bs engine.Service
	bs = engine.NewService(mongourl, mqtturl, influxurl, websocketsurl)
	bs = engine.NewLoggingMiddleware(log.With(logger, "component", "workflowengine"), bs)
	bs = engine.NewMetricsMiddleware(
		kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
			Namespace: "workflowengine",
			Subsystem: "workflowengineService",
			Name:      "request_count",
			Help:      "Number of requests received.",
		}, fieldKeys),
		kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
			Namespace: "workflowengine",
			Subsystem: "workflowengineService",
			Name:      "request_latency_microseconds",
			Help:      "Total duration of requests in microseconds.",
		}, fieldKeys),
		bs,
	)

	workflowengineendpoints := engine.Endpoints{
		GetAllWorkflowsEndpoint:   engine.MakeGetAllWorkflowsEndpoint(bs),
		RunAllWorkflowsEndpoint:   engine.MakeRunAllWorkflowsEndpoint(bs),
		CheckAllWorkflowsEndpoint: engine.MakeCheckAllWorkflowsEndpoint(bs),
		StopAllWorkflowsEndpoint:  engine.MakeStopAllWorkflowsEndpoint(bs),

		GetWorkflowsEndpoint:    engine.MakeGetWorkflowsEndpoint(bs),
		DeleteWorkflowsEndpoint: engine.MakeDeleteWorkflowsEndpoint(bs),
		RunWorkflowsEndpoint:    engine.MakeRunWorkflowsEndpoint(bs),
		CheckWorkflowsEndpoint:  engine.MakeCheckWorkflowsEndpoint(bs),
		StopWorkflowsEndpoint:   engine.MakeStopWorkflowsEndpoint(bs),

		GetWorkflowEndpoint:    engine.MakeGetWorkflowEndpoint(bs),
		SaveWorkflowEndpoint:   engine.MakeSaveWorkflowEndpoint(bs),
		UpdateWorkflowEndpoint: engine.MakeUpdateWorkflowEndpoint(bs),
		DeleteWorkflowEndpoint: engine.MakeDeleteWorkflowEndpoint(bs),
		RunWorkflowEndpoint:    engine.MakeRunWorkflowEndpoint(bs),
		CheckWorkflowEndpoint:  engine.MakeCheckWorkflowEndpoint(bs),
		StopWorkflowEndpoint:   engine.MakeStopWorkflowEndpoint(bs),
	}

	// SERVER -------------------------------------------
	httpLogger := log.With(logger, "component", "http")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.Handle("/engine/", handlers.CORS(headersOk, originsOk, methodsOk)(engine.MakeHttpHandler(ctx, workflowengineendpoints, httpLogger)))
	http.Handle("/metrics", promhttp.Handler())

	logger.Log("API IS RUNNING")

	errs := make(chan error, 2)
	go func() {
		logger.Log("transport", "http", "address", *httpAddr, "msg", "listening")
		errs <- http.ListenAndServe(*httpAddr, nil)
	}()
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
