package main

import (
	ToDo "ToDoApp/pkg"
)

var Data ToDo.Schedule
var filepath = "Tasks.json" //"Tasks copy.json"
var duefilepath = "DueTasks.json"

func main() {
	ToDo.UpdateData(filepath, duefilepath)
	ToDo.Generate()
}
