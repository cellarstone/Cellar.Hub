package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	flag.Parse()
	log.SetFlags(0)
	hub := NewHub()
	router := mux.NewRouter()
	router.HandleFunc("/ws/{room}", hub.HandleWS).Methods("GET")

	http.Handle("/", router)

	log.Printf("http_err: %v", http.ListenAndServe(":44406", nil))
}
