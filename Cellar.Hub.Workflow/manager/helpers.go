package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"reflect"
	"time"

	"github.com/tidwall/gjson"
)

func loggingHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		t1 := time.Now()
		next.ServeHTTP(w, r)
		t2 := time.Now()
		log.Printf("[%s] %q %v\n", r.Method, r.URL.String(), t2.Sub(t1))
	}

	return http.HandlerFunc(fn)
}

func bodyParserHandler(v interface{}) func(http.Handler) http.Handler {
	t := reflect.TypeOf(v)

	m := func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			val := reflect.New(t).Interface()
			err := json.NewDecoder(r.Body).Decode(val)

			if err != nil {
				log.Println(err)
				return
			}

			// context.Set(r, "body", val)
			next.ServeHTTP(w, r)
		}

		return http.HandlerFunc(fn)
	}

	return m
}

// func parse2(r *http.Request) *cellarDTO {

// 	t := reflect.TypeOf(cellarDTO{})
// 	val := reflect.New(t).Interface()
// 	err := json.NewDecoder(r.Body).Decode(val)
// 	if err != nil {
// 		logger.Error(err.Error())
// 	}
// 	log.Println(val)

// 	return &val.(cellarDTO)
// }

func parseCellarDTO(r *http.Request) *cellarDTO {

	defer r.Body.Close()

	htmlData, err := ioutil.ReadAll(r.Body) //<--- here!
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	m, ok := gjson.Parse(string(htmlData)).Value().(map[string]interface{})
	if !ok {
		fmt.Println("Error")
	}

	jsonBytes, err := json.Marshal(m)
	if err != nil {
		fmt.Println(err)
	}

	item := &cellarDTO{}
	parseErr := json.Unmarshal(jsonBytes, item)
	if parseErr != nil {
		fmt.Println("JSON Error")
		fmt.Println(parseErr)
	}
	return item
}

func SetField(obj interface{}, name string, value interface{}) error {
	structValue := reflect.ValueOf(obj).Elem()
	structFieldValue := structValue.FieldByName(name)

	if !structFieldValue.IsValid() {
		return fmt.Errorf("No such field: %s in obj", name)
	}

	if !structFieldValue.CanSet() {
		return fmt.Errorf("Cannot set %s field value", name)
	}

	structFieldType := structFieldValue.Type()
	val := reflect.ValueOf(value)
	if structFieldType != val.Type() {
		return errors.New("Provided value type didn't match obj field type")
	}

	structFieldValue.Set(val)
	return nil
}

func (s *CellarWorkflow) FillStruct(m map[string]interface{}) error {
	for k, v := range m {
		err := SetField(s, k, v)
		if err != nil {
			return err
		}
	}
	return nil
}

func FillStruct2(data map[string]interface{}, result interface{}) {
	t := reflect.ValueOf(result).Elem()
	for k, v := range data {
		val := t.FieldByName(k)
		val.Set(reflect.ValueOf(v))
	}
}
