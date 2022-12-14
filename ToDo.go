package ToDo

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"os"
	"sort"
)

// CONFIG
var Max_dur = 5
var number_of_schedules = 3
var Data Schedule
var DueData Schedule

type Task struct {
	Name     string `json:"name"`
	Emotion  int    `json:"emotion"`
	Urgency  int    `json:"urgency"`
	Duration int    `json:"duration"`
	Energy   int    `json:"energy"`
	Due      int    `json:"due"`
}

type Schedule struct {
	Tasks []Task `json:"data"`
}

func UpdateData(filepath string, duefilepath string) {
	jsonFile, err := os.Open(filepath)
	Error_check(err)
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	err = json.Unmarshal(byteValue, &Data)
	Error_check(err)
	// jsonDueFile, err := os.Open(duefilepath)
	// Error_check(err)
	// defer jsonDueFile.Close()
	// byteValue, _ = ioutil.ReadAll(jsonDueFile)
	// err = json.Unmarshal(byteValue, &DueData)
	// Error_check(err)
}

func AddTask(filepath string, task Task) {
	jsonFile, err := os.Open(filepath)
	Error_check(err)
	defer jsonFile.Close()
	Data.Tasks = append(Data.Tasks, task)
	jsonData, _ := json.Marshal(Data)
	os.WriteFile(jsonFile.Name(), jsonData, os.ModeDevice)
	//return UpdateData(filepath, duefilepath)
}

func AddTask_via_json(filepath string, newTaskFilepath string) {
	newTaskFile, err := os.Open(newTaskFilepath)
	Error_check(err)
	defer newTaskFile.Close()
	jsonFile, err := os.Open(filepath)
	Error_check(err)
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(newTaskFile)
	task := Task{}
	json.Unmarshal(byteValue, &task)
	Data.Tasks = append(Data.Tasks, task)
	jsonData, _ := json.Marshal(Data)
	os.WriteFile(jsonFile.Name(), jsonData, os.ModeDevice)
	//return UpdateData(filepath, duefilepath)
}

func DeleteTask(filepath string, taskname string) {
	jsonFile, err := os.Open(filepath)
	Error_check(err)
	defer jsonFile.Close()
	for i, x := range Data.Tasks {
		if x.Name == taskname {
			h1 := Data.Tasks[:i]
			h2 := Data.Tasks[i+1:]
			h1 = append(h1, h2...)
			Data.Tasks = h1
			break
		}
	}
	jsonData, _ := json.Marshal(Data)
	os.WriteFile(jsonFile.Name(), jsonData, os.ModeDevice)
}

func Error_check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func Dp_balance_two_weights(data Schedule) []Schedule {
	origin := square{x: 0, y: 0, d: 0}
	paths := recursive_balance_two_weights(data.Tasks, 0, []*square{&origin}, []*square{})
	fmt.Println(len(paths))
	sort.Slice(paths, func(i, j int) bool {
		return math.Abs(float64(paths[i].x))+math.Abs(float64(paths[i].y)) < math.Abs(float64(paths[j].x))+math.Abs(float64(paths[j].y))
	})
	chosenPaths := paths[:number_of_schedules*10]
	// rand.Shuffle(number_of_schedules*10, func(i, j int) {
	// 	chosenPaths[i], chosenPaths[j] = chosenPaths[j], chosenPaths[i]
	// })
	sort.Slice(chosenPaths, func(i, j int) bool {
		return paths[i].u > paths[j].u
	})
	chosenPaths = chosenPaths[:number_of_schedules]
	//fmt.Println(chosenPaths)
	ret := []Schedule{}
	fmt.Println("WORST: ", paths[len(paths)-1].x, ", ", paths[len(paths)-1].y)
	for _, c := range chosenPaths {
		fmt.Println("emotion: ", c.x, ", energy: ", c.y, ", urgency: ", c.u)
		retPath := Schedule{}
		retPath.Tasks = append(retPath.Tasks, c.t)
		next := c
		for next.p.p != nil {
			next = next.p
			retPath.Tasks = append(retPath.Tasks, next.t)
		}
		ret = append(ret, retPath)
	}
	return ret
}

type square struct {
	x int     //emotion
	y int     //energy
	d int     //duration
	u int     //urgency
	t Task    //last task
	p *square //prev square
	//path []Task //int=index of task in task list (so essentially a pointer). If a list of structs is just a list of pointers, might as well make it a list of tasks.
} //a square is basically just a task made out of many tasks, so if i just set the name to be a concat of all subtask names, I could just use the task structure

func recursive_balance_two_weights(data []Task, i int, in []*square, out []*square) []*square {
	if i == len(data) {
		return out
	}
	task := data[i]
	pass := []*square{}
	for _, s := range in {
		newSquare := square{x: s.x + task.Emotion, y: s.y + task.Energy, d: s.d + task.Duration, u: s.u + task.Urgency, t: task, p: s}
		pass = append(pass, s)
		if newSquare.d >= Max_dur {
			out = append(out, &newSquare)
			continue
		}
		pass = append(pass, &newSquare)
	}
	return recursive_balance_two_weights(data, i+1, pass, out)
}

func Generate() {
	//Due_to_urgency()
	ret := Dp_balance_two_weights(Data)
	for i, sched := range ret {
		fmt.Println("")
		fmt.Println("Schedule ", i+1)
		for _, task := range sched.Tasks {
			fmt.Print("* ", task.Name, " - ", task.Urgency)
			if task.Due != 0 {
				fmt.Print(" - Due in: ", task.Due)
			}
			fmt.Print("\n")
		}
		fmt.Println("-------------------")
	}
	fmt.Println("")
}

func Due_to_urgency() {
	fmt.Println(len(Data.Tasks))
	for _, t := range DueData.Tasks {
		if t.Due == 0 || t.Due == 1 {
			t.Due = -1
		} //fixing miostake in JSON auto generation
		t.Urgency = -100 / t.Due
		Data.Tasks = append(Data.Tasks, t)
	}
	fmt.Println(len(Data.Tasks))
}

func Generate_to_json(return_filepath string) {
	//Due_to_urgency()
	ret := Dp_balance_two_weights(Data)
	jsonFile, err := os.Open(return_filepath)
	Error_check(err)
	defer jsonFile.Close()
	jsonData, _ := json.Marshal(ret)
	os.WriteFile(jsonFile.Name(), jsonData, os.ModeDevice)
}
