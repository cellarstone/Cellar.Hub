package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/cellarstone/Cellar.Hub/Core/Api/mqtt"
	"github.com/go-kit/kit/log"
	kitprometheus "github.com/go-kit/kit/metrics/prometheus"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

const (
	defaultPort    = "44403"
	defaultMqttUrl = "http://localhost:1883"
)

func main() {
	var (
		addr    = envString("PORT", defaultPort)
		mqtturl = envString("MQTT_URL", defaultMqttUrl)

		httpAddr = flag.String("http.addr", ":"+addr, "HTTP listen address")

		ctx = context.Background()
	)

	flag.Parse()

	var logger log.Logger
	logger = log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)

	fieldKeys := []string{"method"}

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

	endpoints := mqtt.Endpoints{
		PublishToMqttEndpoint: mqtt.MakePublishToMqttEndpoint(bs),
	}

	httpLogger := log.With(logger, "component", "http")

	mux := http.NewServeMux()

	mux.Handle("/mqtt/v1/", mqtt.MakeHttpHandler(ctx, endpoints, httpLogger))
	// mux.Handle("/meetings/v1/", tracking.MakeHandler(ts, httpLogger))
	// mux.Handle("/space/v1/", handling.MakeHandler(hs, httpLogger))

	http.Handle("/", accessControl(mux))
	http.Handle("/metrics", promhttp.Handler())

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

func accessControl(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		h.ServeHTTP(w, r)
	})
}

func envString(env, fallback string) string {
	e := os.Getenv(env)
	if e == "" {
		return fallback
	}
	return e
}
