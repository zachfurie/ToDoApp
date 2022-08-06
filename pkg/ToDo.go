package ToDo

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"math/rand"
	"os"
	"sort"
)

// CONFIG
var primary_attribute = "Emotion"
var primary_attribute_list = []int{1, 0, -1}
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

func get_primary_attr(task Task) int {
	return task.Emotion
}

func Greedy_recursion(schedule Schedule, remaining_groups []int, remaining_dur int) Schedule {
	if remaining_dur == 0 {
		return schedule
	}
	if len(remaining_groups) == 0 {
		remaining_groups = primary_attribute_list
	}
	group, remaining_groups := weighted_choice_st(remaining_groups)
	kern := kernel(group, remaining_dur)
	if len(kern.Tasks) == 0 {
		return schedule
	}
	next_task := weighted_choice(kern)
	schedule.Tasks = append(schedule.Tasks, next_task)
	final_schedule := Greedy_recursion(schedule, remaining_groups, remaining_dur-next_task.Duration)
	return final_schedule
}

func weighted_choice(list Schedule) Task {
	choice := rand.Intn(len(list.Tasks))
	return list.Tasks[choice]
}

func weighted_choice_st(list []int) (int, []int) {
	choice := rand.Intn(len(list))
	ret := list[choice]
	list[choice] = list[len(list)-1]
	return ret, list[:len(list)-1]
}

func find_group(data Schedule, attr int) Schedule {
	group := Schedule{}
	for _, task := range data.Tasks {
		if get_primary_attr(task) == attr {
			group.Tasks = append(group.Tasks, task)
		}
	}
	return group
}

func kernel(group int, remaining_dur int) Schedule {
	search_pool := find_group(Data, group)
	kernel_size := len(search_pool.Tasks) / 10
	if kernel_size < 5 {
		kernel_size = 5
	}
	sort.Slice(search_pool.Tasks, func(i, j int) bool {
		return search_pool.Tasks[i].Duration > search_pool.Tasks[j].Duration
	})
	for i := range search_pool.Tasks {
		if search_pool.Tasks[i].Duration <= remaining_dur {
			retind := i + kernel_size
			if len(search_pool.Tasks) < retind {
				retind = len(search_pool.Tasks)
			}
			return Schedule{Tasks: search_pool.Tasks[i:retind]}
		}
	}
	return Schedule{}
}

func Build(data Schedule) []Schedule {
	Data = data
	max_dur := Max_dur
	final_schedules := []Schedule{}
	for i := 0; i < number_of_schedules; i++ {
		schedule := Schedule{}
		remaining_groups := make([]int, len(primary_attribute_list))
		copy(remaining_groups, primary_attribute_list)
		final_schedule := Greedy_recursion(schedule, remaining_groups, max_dur)
		final_schedules = append(final_schedules, final_schedule)
	}
	return final_schedules
}

func UpdateData(filepath string, duefilepath string) {
	jsonFile, err := os.Open(filepath)
	Error_check(err)
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	err = json.Unmarshal(byteValue, &Data)
	Error_check(err)
	jsonDueFile, err := os.Open(duefilepath)
	Error_check(err)
	defer jsonDueFile.Close()
	byteValue, _ = ioutil.ReadAll(jsonDueFile)
	err = json.Unmarshal(byteValue, &DueData)
	Error_check(err)
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

func Metadata(sched Schedule) {

}

func Generate() {
	Due_to_urgency()
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
