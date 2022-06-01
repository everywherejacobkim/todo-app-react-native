import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './Colors';

export default function App() {

  const [working, setWorking] = useState(true);
  const [inputText, setInputText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => {
    setWorking(false)
    console.log(working);
  }
  const work = () => {
    setWorking(true)
    console.log(working);
  }

  const onChangeText = (text) => {
    setInputText(text);
    console.log(inputText)
  }

  const addTodo = () => {
    if(inputText === "") {
      return;
    } 
    const newToDos = {
      ...toDos, 
      [Date.now()] : {inputText, work: working},
    };
    setToDos(newToDos);
    setInputText("");
  };
  console.log(toDos);



  return (
    <View style={styles.container}>
    <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnTxt, color: working ? theme.white : theme.grey}}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnTxt, color: working ? theme.grey : theme.white}}>Travel</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput 
          style={styles.input} 
          placeholder={working ? "Add a Todo.." : "Where do you want to go?"}
          onChangeText={onChangeText}
          onSubmitEditing={addTodo}  
          returnKeyType="done" 
        >
          {inputText}
        </TextInput>

        <ScrollView style={styles.scrollViewStyle}>
          {Object.keys(toDos).map((key) => (
            <View key={key} style={styles.toDoList}>
              <Text style={styles.toDoText}>{toDos[key].inputText}</Text>
            </View>
          ))}
        </ScrollView>

      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnTxt: {
    fontSize: 45,
    fontWeight: "600",
  },
  input: {
    backgroundColor: theme.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    fontSize: 16,
  },
  scrollViewStyle: {
    marginTop: 10,
  },
  toDoList: {
    backgroundColor: theme.workBg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  toDoText: {
    color: theme.black,
    fontSize: 16,
    fontWeight: "500",
  }
});
