import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button } from "react-native";
import { useState } from "react";

const randomNumber = Math.floor(Math.random() * 100) + 1;

export default function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("Guess a number between 1-100");
  const [guess, setGuess] = useState(1);

  const buttonPressed = () => {
    if (number == randomNumber) {
      Alert.alert("You guessed the number in " + guess + " guesses");
    } else if (number > randomNumber) {
      setGuess((guess) => guess + 1);
      setText("Your guess " + number + " is too high");
    } else {
      setGuess((guess) => guess + 1);
      setText("Your guess " + number + " is too low");
    }
  };

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        onChangeText={(number) => setNumber(number)}
        value={number}
      ></TextInput>
      <Button onPress={buttonPressed} title="MAKE GUESS" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 20,
  },
});
