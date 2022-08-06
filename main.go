package main

import (
	ToDo "ToDoApp/pkg"
	"fmt"
	"net/http"
)

var Data ToDo.Schedule
var filepath = "Tasks.json" //"Tasks copy.json"
var duefilepath = "DueTasks.json"
var return_filepath = "Generate.json"

func hello(w http.ResponseWriter, req *http.Request) {
	retStr := ToDo.Generate_String()
	fmt.Fprint(w, retStr)
}

func main() {
	ToDo.UpdateData(filepath, duefilepath)
	//ToDo.Generate()
	//ToDo.Generate_to_json(return_filepath)
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8090", nil)
}

// curl localhost:8090/hello
