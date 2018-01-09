package main

import (
	"encoding/json"
	"errors"
	"html/template"
	"net/http"

	"github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/logging"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var layoutDir = "views/layout"
var index *template.Template
var processes *template.Template
var actualDirectory *template.Template
var taillogs *template.Template
var runworkflow *template.Template
var workflowindb *template.Template
var err error

type cellarDTO struct {
	ExceptionText string      `json:"exceptionText"`
	Data          interface{} `json:"data"`
}

//Logging
var logger *logging.DLogger

func init() {
	//set logging
	logger, err = logging.NewDLogger("Cellar.Hub.Workflow.Manager")
	if err != nil {
		panic(err)
	}
}

func main() {

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//V TEHLE METODE SE NIC NELOGUJE !!!!!!!!!!!!!!!!!
	// vysvetleni: asi jeste nestihne nabehnout Fluentd
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	logger.Information("TEST from Workflow manager")

	r.Handle("/api/runworkflow/{id}", RecoverWrap(http.HandlerFunc(apiRunWorkflowHandler))).Methods("GET")
	r.Handle("/api/stopworkflow/{id}", RecoverWrap(http.HandlerFunc(apiStopWorkflowHandler))).Methods("GET")
	r.Handle("/api/checkprocessworkflow/{pid}", RecoverWrap(http.HandlerFunc(apiCheckProcessWorkflowHandler))).Methods("GET")

	r.Handle("/test/checkprocessworkflow/{pid}", RecoverWrap(http.HandlerFunc(testCheckProcessWorkflowHandler))).Methods("GET")

	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "Accept", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"})

	http.ListenAndServe(":44405", handlers.CORS(headersOk, originsOk, methodsOk)(r))
}

//Exception Handling - Panic handler
func RecoverWrap(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var err error
		defer func() {
			r := recover()
			if r != nil {
				switch t := r.(type) {
				case string:
					err = errors.New(t)
				case error:
					err = t
				default:
					err = errors.New("Unknown error")
				}

				logger.Fatal("[PANIC] - " + err.Error())

				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
		}()
		h.ServeHTTP(w, r)
	})
}

//--------------------------------
//--------------------------------
//--------------------------------
// API method
//--------------------------------
//--------------------------------
//--------------------------------

func apiGetAllCellarWorkflowsHandler(w http.ResponseWriter, r *http.Request) {

	data := GetAllCellarWorkflows()

	dto := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dto)

}

func apiGetCellarWorkflowsHandler(w http.ResponseWriter, r *http.Request) {

	// Read from URL
	vars := mux.Vars(r)
	name := vars["senzorname"]

	data := GetCellarWorkflows(name)

	dto := cellarDTO{
		ExceptionText: "",
		Data:          data,
	}

	json.NewEncoder(w).Encode(dto)

}
