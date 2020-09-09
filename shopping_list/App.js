import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType={"default"}
        onChangeText={(text) => setText(text)}
        value={text}
      ></TextInput>

      <View style={styles.buttonview}>
        <Button
          onPress={() => {
            setData([...data, { key: text }]);
            setText("");
          }}
          title="ADD"
        />
        <Button
          onPress={() => {
            setData([]);
          }}
          title="CLEAR"
        />
      </View>
      <Text style={styles.topic}>Shopping list</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.text}>{item.key}</Text>}
      />
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
    marginTop: 50,
  },
  buttonview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 20,
  },
  topic: {
    color: "blue",
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});
