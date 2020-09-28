import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-community/picker";

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const url = "http://data.fixer.io/api/latest?access_key=YOUR_API_KEY";
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      setData(responseJson);
    })
    .catch((error) => {
      Alert.alert("Error", error);
    });

  const convert = () => {
    setResult(amount / selectedValue);
  };

  return (
    <View style={styles.container}>
      <Image
        source="https://pixy.org/src/9/90374.jpg"
        style={{ height: 80, width: 80 }}
      ></Image>
      <Text style={{ marginTop: 10, marginBottom: 10 }}>{result} €</Text>
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        value={amount}
        placeholder="Amount"
        onChangeText={(amount) => setAmount(amount)}
      />
      <Picker
        selectedValue={selectedValue}
        style={{ height: 30, width: 100, marginTop: 10, marginBottom: 10 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {Object.keys(data.rates).map((key) => {
          return <Picker.Item label={key} value={key} key={key} />;
        })}
      </Picker>
      <Button title="Convert" onPress={convert} />
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
});
