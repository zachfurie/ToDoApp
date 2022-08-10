import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


var min = 1;
var max = 50;

export default function App() {
  const [buttoner, setButtoner] = useState(0)

  

  if (buttoner == 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Pressed!</Text>
        <StatusBar style="auto" />
      
        <TouchableOpacity onPress={() => setButtoner(2)} style={styles.button_one}>
          <Text style={styles.button_text}>Press Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(2)} style={styles.button_one}>
          <Text style={styles.button_text}>Press Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(2)} style={styles.button_one}>
          <Text style={styles.button_text}>Press Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(2)} style={styles.button_one}>
          <Text style={styles.button_text}>Press Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(2)} style={styles.button_one}>
          <Text style={styles.button_text}>Press Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(2)} style={styles.button_one}>
          <Text style={styles.button_text}>Press Me!</Text>
        </TouchableOpacity>
      </View>
    );
  } 

  if (buttoner == 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions2}>PRESSED!</Text>
        <StatusBar style="auto" />

        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_two}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_3}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_4}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_5}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_6}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_7}>
          <Text style={styles.button_text}>PPRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_two}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_3}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_4}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_5}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_6}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_7}>
          <Text style={styles.button_text}>PPRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_two}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_3}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_4}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_5}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_6}>
          <Text style={styles.button_text}>PRESS ME!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setButtoner(0)} style={styles.button_7}>
          <Text style={styles.button_text}>PPRESS ME!!!</Text>
        </TouchableOpacity>
      </View>
    );
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Press the button!</Text>
      <StatusBar style="auto" />
    
      <TouchableOpacity onPress={() => setButtoner(1)} style={styles.button_one}>
        <Text style={styles.button_text}>Press Me!</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button_one: {
    backgroundColor: '#bd1',
    padding: 20,
    borderRadius: 5,
  },
  button_text: {
    fontSize: 20,
    color: '#fff',
  },
  button_two: {
    fontSize: min + (Math.random() * (max-min)),
    backgroundColor: '#cf5',
    padding: 20,
    borderRadius: 5,
    top: Math.floor(Math.random()*50),
    left: String(min + (Math.random() * (max-min)) - (Math.random() * (max-min))) + '%',
    transform: 'translate(-50%, -50%)'
  },
  button_3: {
    fontSize: min + (Math.random() * (max-min)),
    backgroundColor: '#00d',
    padding: 20,
    borderRadius: 5,
    top: Math.floor(Math.random()*50),
    left: String(min + (Math.random() * (max-min))) + '%',
    transform: 'translate(-50%, -50%)'
  },
  button_4: {
    fontSize: min + (Math.random() * (max-min)),
    backgroundColor: '#f9a',
    padding: 20,
    borderRadius: 5,
    top: Math.floor(Math.random()*50),
    left: String(min + (Math.random() * (max-min))) + '%',
    transform: 'translate(-50%, -50%)'
  },
  button_5: {
    fontSize: min + (Math.random() * (max-min)),
    backgroundColor: '#ddd',
    padding: 20,
    borderRadius: 5,
    top: Math.floor(Math.random()*50),
    left: String(min + (Math.random() * (max-min))) + '%',
    transform: 'translate(-50%, -50%)'
  },
  button_6: {
    fontSize: min + (Math.random() * (max-min)),
    backgroundColor: '#655',
    padding: 20,
    borderRadius: 5,
    top: Math.floor(Math.random()*50),
    left: String(min + (Math.random() * (max-min))) + '%',
    transform: 'translate(-50%, -50%)'
  },
  button_7: {
    fontSize: min + (Math.random() * (max-min)),
    backgroundColor: '#a11',
    padding: 20,
    borderRadius: 5,
    top: Math.floor(Math.random()*50),
    left: String(min + (Math.random() * (max-min))) + '%',
    transform: 'translate(-50%, -50%)'
  },
  instructions2: {
    color: 'red',
    fontSize: 50,
    marginHorizontal: 15,
    marginBottom: 10,
  }
});
