package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-kit/kit/log"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

const (
	defaultPort      = "44404"
	defaultDirectory = "data"
)

func main() {
	var (
		addr      = envString("PORT", defaultPort)
		directory = envString("DIRECTORY", defaultDirectory)

		httpAddr = flag.String("http.addr", ":"+addr, "HTTP listen address")
	)

	flag.Parse()

	var logger log.Logger
	logger = log.NewLogfmtLogger(log.NewSyncWriter(os.Stderr))
	logger = log.With(logger, "ts", log.DefaultTimestampUTC)

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	r := mux.NewRouter()
	r.HandleFunc("/upload", UploadFile)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(directory)))

	// http.Handle("/", http.FileServer(http.Dir(directory)))

	errs := make(chan error, 2)
	go func() {
		logger.Log("transport", "http", "address", *httpAddr, "msg", "listening")
		errs <- http.ListenAndServe(*httpAddr, handlers.CORS(headersOk, originsOk, methodsOk)(r))
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
