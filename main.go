package main

import (
	ToDo "ToDoApp/pkg"
	"fmt"
	"net/http"
	"os"
)

var Data ToDo.Schedule
var filepath = "Tasks.json" //"Tasks copy.json"
var duefilepath = "DueTasks.json"
var return_filepath = "Generate.json"
var jsonData = []byte{}
var retSched = ToDo.Generation{}

func generateSchedule(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	req.ParseMultipartForm(10000000000)
	form := req.MultipartForm
	user := req.FormValue("user")
	fmt.Println("form ", *form)
	fmt.Println("user ", user)
	return_filepath_username := user + return_filepath
	fmt.Println(return_filepath_username)
	ToDo.UpdateData(user+filepath, user+duefilepath)
	//ToDo.UpdateData(filepath, duefilepath)
	retSched = ToDo.Generate_to_json(return_filepath_username) //(return_filepath_username)
	retter, _ := os.ReadFile(return_filepath_username)         //(return_filepath) //
	fmt.Println(retter)
	fmt.Fprint(w, string(retter))
}

func main() {
	//ToDo.UpdateData(filepath, duefilepath)
	//ToDo.Generate()
	//retSched = ToDo.Generate_to_json(return_filepath)
	http.HandleFunc("/generateSchedule", generateSchedule)
	http.ListenAndServe(":8090", nil)
}
