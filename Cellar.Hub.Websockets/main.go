package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// var addr = flag.String("addr", "localhost:8080", "http service address")

func main() {
	flag.Parse()
	log.SetFlags(0)
	hub := NewHub()
	router := mux.NewRouter()
	router.HandleFunc("/ws/{room}", hub.HandleWS).Methods("GET")

	http.Handle("/", router)

	log.Printf("http_err: %v", http.ListenAndServe(":8887", nil))
}
