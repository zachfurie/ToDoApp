import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, SliderBase } from 'react-native';
import { linear } from 'react-native/Libraries/Animated/Easing';
import mountains from './411820.jpg'
import MultiSlider from '@ptomasroos/react-native-multi-slider';


var min = 1;
var max = 50;

export default function App() {
  const [buttoner, setButtoner] = useState(0)

  

  if (buttoner == 1) {
    return (
      <View style={styles.container}>
        <View style={styles.schedContainer}>
          <View style={styles.schedContainer2}>
            <Text style={styles.generate1}>Test text 1</Text>
          </View>
          <View style={styles.schedContainer4}>
            <Text style={styles.generate2}>Test text 2</Text>
          </View>
        </View>
        <View style={styles.schedContainer3}>
        <View style={styles.schedContainer5}>
            <Text style={styles.generate3}>Test text 3</Text>
          </View>
          <View style={styles.schedContainer6}>
            <Text style={styles.generate4}>Test text 4</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.glass_button} >
          <Text style={styles.button_text}>Back</Text>
        </TouchableOpacity>
    </View>
    );
  } 

  if (buttoner == 2) {
    return (
      <View style={styles.container}>
         <MultiSlider></MultiSlider>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.glass_button}>
          <Text style={styles.button_text}>Back</Text>
        </TouchableOpacity>
    </View>
    );
  } 

  if (buttoner == 3) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.glass_button}>
          <Text style={styles.button_text}>Back</Text>
        </TouchableOpacity>
    </View>
    );
  } 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => setButtoner(1)} style={styles.glass_button}>
        <Text style={styles.button_text}>Generate Schedule</Text>
      </TouchableOpacity>
      <Text style={styles.padder}/>
      <TouchableOpacity onPress={() => setButtoner(2)} style={styles.glass_button}>
        <Text style={styles.button_text}>Add Task</Text>
      </TouchableOpacity>
      <Text style={styles.padder}/>
      <TouchableOpacity onPress={() => setButtoner(3)} style={styles.glass_button}>
        <Text style={styles.button_text}>View Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${mountains})`,
    //aspectRatio: 1,    
  },
  button_one: {
    backgroundColor: '#bd1',
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#71c'
  },
  button_text: {
    fontSize: 20,
    color: '#fff',
  },
  glass_button: {
    padding: 20,
    borderRadius: 20,
    backgroundImage: 'linear-gradient(to bottom right, rgba(124,24,55,0.3), rgba(60,0,90,0.5))', //'linear-gradient(to bottom right, rgba(124,24,55,0.3), rgba(32,134,67,0.5))',
    backdropFilter: 'blur(7px)',
    boxShadow: '10px 10px 10px rgba(30,30,30,0.1)',
    opacity: '0.7',
    minWidth: '200px',
    alignItems: 'center',
  },
  padder: {
    padding: 5
  },
  generate1: {
    fontSize: 20,
    color: '#fff',
    padding: 30,
    //transform: 'translate(-100%, -30%)'
  },
  generate2: {
    fontSize: 20,
    color: '#fff',
    padding: 30,
    //transform: 'translate(100%, -130%)'
  },
  generate3: {
    fontSize: 20,
    color: '#fff',
    padding: 30,
    //transform: 'translate(-100%, 100%)'
  },
  generate4: {
    fontSize: 20,
    color: '#fff',
    padding: 30,
   //transform: 'translate(100%, 0)'
  },
  schedContainer: {
    flex: 2,
    borderBottomColor: 'black',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    flexDirection: 'row',
    
  },
  schedContainer3: {
    flex: 2,
    borderTopColor: 'black',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
    
  },
  schedContainer2: {
    flex: 2,
    borderRightColor: 'black',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  schedContainer4: {
    flex: 2,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  schedContainer5: {
    flex: 2,
    borderRightColor: 'black',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  schedContainer6: {
    flex: 2,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },

});
