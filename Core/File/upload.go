package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"path/filepath"
)

type cellarDTO struct {
	IsOK          bool        `json:"isOK"`
	ExceptionText string      `json:"exceptionText"`
	Data          interface{} `json:"data"`
}

// UploadFile uploads a file to the server
func UploadFile(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	file, handle, err := r.FormFile("file")
	if err != nil {
		fmt.Fprintf(w, "%v", err)
		return
	}
	defer file.Close()

	mimeType := handle.Header.Get("Content-Type")

	switch mimeType {
	case "image/jpeg":
		saveFile(w, file, handle)
	case "image/png":
		saveFile(w, file, handle)
	default:
		jsonResponse(w, http.StatusBadRequest, "The format file is not valid.")
	}
}

func saveFile(w http.ResponseWriter, file multipart.File, handle *multipart.FileHeader) {
	data, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Fprintf(w, "%v", err)
		return
	}

	var extension = filepath.Ext(handle.Filename)

	var filename = "randomName_" + randStringBytesMaskImprSrc(5) + extension

	err = ioutil.WriteFile("/app/data/"+filename, data, 0666)
	if err != nil {
		fmt.Fprintf(w, "%v", err)
		return
	}

	dto := cellarDTO{
		IsOK:          true,
		ExceptionText: "",
		Data:          filename,
	}

	json.NewEncoder(w).Encode(dto)

	// jsonResponse(w, http.StatusCreated, filename)
}

func jsonResponse(w http.ResponseWriter, code int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	fmt.Fprint(w, message)
}
