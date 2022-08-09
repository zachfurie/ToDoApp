package main

import (
	ToDo "ToDoApp/pkg"
	"encoding/json"
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
	action := req.FormValue("action")
	fmt.Println("form ", *form)
	fmt.Println("user ", user)

	if action == "generate" {
		ToDo.UpdateData(user+filepath, user+duefilepath)
		retSched = ToDo.Generate_to_json(user + return_filepath)
		retter, _ := os.ReadFile(user + return_filepath)
		fmt.Println(retter)
		fmt.Fprint(w, string(retter))
	} else if action == "add" {
		taskInput := req.FormValue("task") //need to get into json format
		task := ToDo.Task{}
		json.Unmarshal([]byte(taskInput), &task)
		ToDo.AddTask(user+filepath, task)
		fmt.Fprint(w, "task added")
	}

}

func main() {
	//ToDo.UpdateData(filepath, duefilepath)
	//ToDo.Generate()
	//retSched = ToDo.Generate_to_json(return_filepath)
	for {
		http.HandleFunc("/generateSchedule", generateSchedule)
		http.ListenAndServe(":8090", nil)
	}
}
