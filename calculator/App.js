import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState("");

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        onChangeText={(number) => setNumber(number)}
        value={number}
      ></TextInput>
      <TextInput
        style={styles.input}
        keyboardType={"numeric"}
        onChangeText={(number2) => setNumber2(number2)}
        value={number2}
      ></TextInput>
      <View style={styles.buttonview}>
        <Button
          onPress={() => {
            setResult(Number(number) + Number(number2));
          }}
          title="+"
        />
        <Button
          onPress={() => {
            setResult(number - number2);
          }}
          title="-"
        />
      </View>
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
  },
  buttonview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 20,
  },
});
