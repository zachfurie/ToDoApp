import './App.css';
import {useState} from 'react';
import {Button} from 'react';

//http://localhost:3000/

var usernameText = 'FAIL'


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
  xhr.send(formData) //'http://localhost:8090/generateSchedule')//
}

function handleChangeSubmit()  {
  setTimeout(function() {
    var lister = document.getElementsByClassName('formal') 
    usernameText =  lister[0].value
    for (let i=0; i<2; i++){ lister[0].remove() }  //.setStyle('opacity', '0')}
    getData()
  }, 0);
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
        <button title="submit" placeholder="submitt" name='submittt' type='button' onClick={handleChangeSubmit} className='formal'>Submit</button>       
      </header>
       
    </div>
  );
}

export default App;

