import './App.css';
import {useState} from 'react';
import {Button} from 'react';

//http://localhost:3000/

var usernameText = 'FAIL'
var newName = '0'
var newEmotion = '0'
var newEnergy = '0'
var newUrgency = '0'
var newDuration = '0'


function getData() {
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    var resp = xhr.responseText
    //window.onload = function(){
      var parsed = JSON.parse(resp)
      var parse4_parseHarder = Array(Object.keys(parsed[Object.keys(parsed)[0]]).length)
      for (let i = 0; i < Object.keys(parsed[Object.keys(parsed)[0]]).length; i++) {
        parse4_parseHarder[i] =  parsed[Object.keys(parsed)[0]][i].data
      }
      for (let i=0;i< 4; i++) {
        var sched = parse4_parseHarder[i]
        var elemName =  'output'
        elemName = elemName + String(i)
        var text = String
        text = '<h3>Schedule ' + String(i+1) + '</h3>------------</br>'
        
        for (let j=0;j< Object.keys(sched).length; j++) {
          text = text + " * " + parse4_parseHarder[i][j].name + '</br>'
        }
        text  = text + "------------</br></br>"
        document.getElementById(elemName).innerHTML = text;
      }
    //}
  })
  var requestUrl = 'http://192.168.87.243:8090/generateSchedule' //+ usernameText
  xhr.open('POST', requestUrl)
  let formData = new FormData() // creates an object, optionally fill from <form>
  formData.append("user", usernameText)
  formData.append("action", "generate")
  xhr.send(formData) //'http://localhost:8090/generateSchedule')//
}

function handleChangeSubmit()  {
  setTimeout(function() {
    var lister = document.getElementsByClassName('formal') 
    usernameText =  lister[0].value
    for (let i=0; i<3; i++){ lister[0].remove() }  //.setStyle('opacity', '0')}
    getData()
  }, 0);
}

function addTaskButton() {
  document.write(
  "<div className=\"App\">"+
  "<header className=\"App-header\">" + 
   "<input placeholder=\"Task Name\" id=\"username\" name=\"username\" type=\"input\" className=\"formal2\" onBlur={function one(){newName=this.value}}></input>" +
    "<input placeholder=\"Emotion (number from -100 to 100)\" id=\"username\" name=\"username\" type=\"input\" className=\"formal2\" onBlur={function two(){newEmotion=this.value}}></input>" +
    "<input placeholder=\"Energy Level (number from -100 to 100)\" id=\"username\" name=\"username\" type=\"input\" className=\"formal2\" onBlur={function three(){newEnergy=this.value}}></input>" +
    "<input placeholder=\"Urgency (number from 0 to 100)\" id=\"username\" name=\"username\" type=\"input\" className=\"formal2\" onBlur={function four(){newUrgency=this.value}}></input>" +
    "<input placeholder=\"Duration (number from 1 to 10)\" id=\"username\" name=\"username\" type=\"input\" className=\"formal2\" onBlur={function five(){newDuration=this.value}}></input>" +
    "<button title=\"submit\" placeholder=\"submitt\" name=\"submittt\" type=\"button\" onClick={newSubmit} className=\"formal2\">Submit Task</button>" +
  "</header>" +
  "</div>"
    )
    
  // <div className="App">
  // <header className="App-header">
  //   <input placeholder="Task Name" id='username' name='username' type='input' className='formal2' onBlur={function(){newName=this.value}}></input>
  //   <input placeholder="Emotion (number from -100 to 100)" id='username' name='username' type='input' className='formal2' onBlur={function(){newEmotion=this.value}}></input>
  //   <input placeholder="Energy Level (number from -100 to 100)" id='username' name='username' type='input' className='formal2' onBlur={function(){newEnergy=this.value}}></input>
  //   <input placeholder="Urgency (number from 0 to 100)" id='username' name='username' type='input' className='formal2' onBlur={function(){newUrgency=this.value}}></input>
  //   <input placeholder="Duration (number from 1 to 10)" id='username' name='username' type='input' className='formal2' onBlur={function(){newDuration=this.value}}></input>
  //   <button title="submit" placeholder="submitt" name='submittt' type='button' onClick={newSubmit} className='formal2'>Submit Task</button>  
  // </header>
  // </div>
}


function newSubmit() {
  var newTask = "{name:" + newName + ",emotion:" + newEmotion + ",energy:" + newEnergy + ",urgency:" + newUrgency + ",duration:" + newDuration + "}"
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    document.getElementById('success').innerHTML = "Task Submitted!"
  })
  var requestUrl = 'http://localhost:8090/generateSchedule' //+ usernameText
  xhr.open('POST', requestUrl)
  let formData = new FormData() // creates an object, optionally fill from <form>
  formData.append("user", usernameText)
  formData.append("action", "add")
  formData.append("task", newTask)
  xhr.send(formData) //'http://localhost:8090/generateSchedule')//
}

//function App() {
const App = () => {
  const [message, setMessage] = useState('')
  const handleChange = event => {
    setTimeout(function() {
      setMessage(event.target.value)
      usernameText = message
      console.log(message)
    }, 0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p id='output0' align='left' ></p>
        <p id='output1' align='left' ></p>
        <p id='output2' align='left' ></p>
        <p id='output3' align='left' ></p>
        <input placeholder="Enter username" id='username' name='username' type='input' className='formal'></input>
        <button title="submit" placeholder="submitt" name='submittt' type='button' onClick={handleChangeSubmit} className='formal'>Generate Schedules</button>  
        <button title="addtask" placeholder="add task" name='addtask' type='button' onClick={addTaskButton} className='formal'>Add Task</button> 
        <p id='success'></p>     
      </header>
       
    </div>
  );
}

export default App;

