import './App.css';

//http://localhost:3000/

function getData() {
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    var resp = xhr.responseText
    window.onload = function(){
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
    }
  })
  xhr.open('GET', 'http://localhost:8090/generateSchedule')
  xhr.send() 
}

function App() {
  getData()
  return (
    <div className="App">
      <header className="App-header">
        <p id='output0' align='left'></p>
        <p id='output1' align='left'></p>
        <p id='output2' align='left'></p>
        <p id='output3' align='left'></p>
      </header>
    </div>
  );
}

export default App;
