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
	//retter := json.Encoder{}
	//retter.Encode(retSched)
	//str := retter.
	//retter, err := json.Marshal(retSched)
	retter, _ := os.ReadFile(return_filepath)
	fmt.Fprint(w, string(retter))
}

func main() {
	ToDo.UpdateData(filepath, duefilepath)
	//ToDo.Generate()
	retSched = ToDo.Generate_to_json(return_filepath)
	http.HandleFunc("/generateSchedule", generateSchedule)
	http.ListenAndServe(":8090", nil)
}
