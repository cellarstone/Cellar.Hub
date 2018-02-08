package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	// iot "../iot"
	// mqtt "../mqtt"

	"github.com/cellarstone/Cellar.Hub/Core/Api/iot"
	"github.com/cellarstone/Cellar.Hub/Core/Api/mqtt"
	"github.com/go-kit/kit/log"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	"github.com/gorilla/handlers"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

const (
	defaultPort     = "44403"
	defaultMqttUrl  = "http://localhost:1883"
	defaultMongoUrl = "localhost"
)

func main() {
	var (
		addr     = envString("PORT", defaultPort)
		mqtturl  = envString("MQTT_URL", defaultMqttUrl)
		mongourl = envString("MONGO_URL", defaultMongoUrl)

		httpAddr = flag.String("http.addr", ":"+addr, "HTTP listen address")

		ctx = context.Background()
	)

	flag.Parse()

	var logger log.Logger
	logger = log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)

	fieldKeys := []string{"method"}

	// MQTT --------------------------
	var bs mqtt.Service
	bs = mqtt.NewService(mqtturl)
	bs = mqtt.NewLoggingMiddleware(log.With(logger, "component", "mqtt"), bs)
	bs = mqtt.NewMetricsMiddleware(
		kitprometheus.NewCounterFrom(stdprometheus.CounterOpts{
			Namespace: "mqtt",
			Subsystem: "mqttService",
			Name:      "request_count",
			Help:      "Number of requests received.",
		}, fieldKeys),
		kitprometheus.NewSummaryFrom(stdprometheus.SummaryOpts{
			Namespace: "mqtt",
			Subsystem: "mqttService",
			Name:      "request_latency_microseconds",
			Help:      "Total duration of requests in microseconds.",
		}, fieldKeys),
		bs,
	)

	mqttendpoints := mqtt.Endpoints{
		PublishToMqttEndpoint: mqtt.MakePublishToMqttEndpoint(bs),
	}

	// IOT --------------------------
	var bs1 iot.Service
	bs1 = iot.NewService(mongourl)
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
	}

	// SERVER -------------------------------------------
	httpLogger := log.With(logger, "component", "http")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.Handle("/iot/", handlers.CORS(headersOk, originsOk, methodsOk)(iot.MakeHttpHandler(ctx, iotendpoints, httpLogger)))
	http.Handle("/mqtt/", handlers.CORS(headersOk, originsOk, methodsOk)(mqtt.MakeHttpHandler(ctx, mqttendpoints, httpLogger)))
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

// func accessControl(h http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("Access-Control-Allow-Origin", "*")
// 		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
// 		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

// 		if r.Method == "OPTIONS" {
// 			return
// 		}

// 		h.ServeHTTP(w, r)
// 	})
// }

func envString(env, fallback string) string {
	e := os.Getenv(env)
	if e == "" {
		return fallback
	}
	return e
}
