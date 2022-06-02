import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@toDos";

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

  const addTodo = async () => {
    if(inputText === "") {
      return;
    } 
    const newToDos = {
      ...toDos, 
      [Date.now()] : {inputText, working},
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setInputText("");
  };

  const saveToDos = async (valueToSave) => {
    try {
    const jsonValue = JSON.stringify(valueToSave);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (err) {
      console.log(err);
    }
  }

  const loadToDos = async () => {
    try {
    const loadingData = await AsyncStorage.getItem(STORAGE_KEY)
    setToDos(JSON.parse(loadingData));
  } catch(err) {
    console.log(err);
  }
}

  useEffect(() => {
    loadToDos();
  }, []);





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
          {Object.keys(toDos).map((key) => 
            toDos[key].working === working ? (
            <View key={key} style={working ? styles.toDoList1 : styles.toDoList2}>
              <Text style={working ? styles.toDoText1 : styles.toDoText2}>{toDos[key].inputText}</Text>
            </View>
            ) : null
          )}
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
  toDoList1: {
    backgroundColor: theme.workBg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  toDoList2: {
    backgroundColor: theme.travelBg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  toDoText1: {
    color: theme.black,
    fontSize: 16,
    fontWeight: "600",
  }, 
  toDoText2: {
    color: theme.white,
    fontSize: 16,
    fontWeight: "600",
  }
});
