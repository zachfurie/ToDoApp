package main

import (
	ToDo "ToDoApp/pkg"
)

var Data ToDo.Schedule
var filepath = "Tasks.json" //"Tasks copy.json"
var duefilepath = "DueTasks.json"
var return_filepath = "Generate.json"

func main() {
	ToDo.UpdateData(filepath, duefilepath)
	ToDo.Generate()
	ToDo.Generate_to_json(return_filepath)
}

//SERVER
