import React, {useState} from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import Constants from "expo-constants";
import * as Speech from "expo-speech";

export default function App() {
  const [text, setText] = useState("");

  const speak = () => {
    Speech.speak(text);
  }


    return (
      <View style={styles.container}>
        <TextInput 
        style={{height: 40, borderColor: "gray",
        borderWidth: 1, marginBottom: 10}} 
        placeholder="Write something..."
        value = {text}
        onChangeText = {(text) => setText(text)}
        />
        <Button title="Press to hear text" onPress={speak} />
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
