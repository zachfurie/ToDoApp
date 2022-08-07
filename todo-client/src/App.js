import './App.css';

//http://localhost:3000/

function getData() {
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    var resp = xhr.responseText
    var resp2 = String(resp).slice(4,String(resp).length-4)
    console.log(resp2)
    var schedules = JSON.stringify(resp2)//.replace("},{\"data\":", ",")
    // let reviver = function(key, value) {
    //   console.log(key, " : ", value)
    //   console.log()
    //    if(typeof value === 'array') { return Array(value); }
    // }
    var parsed = JSON.parse(schedules)//String(resp))//, reviver)
    window.onload = function(){
     // var parsed = schedules.split(",")
      var str = ""
      var parseSnip = String(parsed)
      parseSnip = parseSnip.slice(3, parseSnip.length - 3)
      var arr = String(parseSnip).split("]} {[")
      for (let i=0;i< arr.length; i++) {
        var elemName =  'output'
        elemName = elemName + String(i)
        var text = String
        text = '<h3>Schedule ' + String(i+1) + '</h3>------------</br>'
        var textList = arr[i].slice(1, parseSnip.length - 1).split("} {")
        for (let i=0;i< textList.length; i++) {
          text = text + " * " + textList[i].replace("}", "") + '</br>'
        }
        text  = text + "------------</br></br>"
        document.getElementById(elemName).innerHTML = text;
      }
    }
  })
  xhr.open('GET', 'http://localhost:8090/generateSchedule')
  xhr.send() 
  // while (xhr.readyState < 3) {
  //    console.log(xhr.readyState)
  // }
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
