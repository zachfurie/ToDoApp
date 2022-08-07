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
var jsonData = []byte{}
var retSched = ToDo.Generation{}

func generateSchedule(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprint(w, retSched)
}

func main() {
	ToDo.UpdateData(filepath, duefilepath)
	//ToDo.Generate()
	retSched = ToDo.Generate_to_json(return_filepath)
	http.HandleFunc("/generateSchedule", generateSchedule)
	http.ListenAndServe(":8090", nil)
}
