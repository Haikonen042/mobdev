import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Picker,
  Image,
} from "react-native";

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  /* error code 104: Your monthly usage limit has been reached.*/
  const url =
    "http://data.fixer.io/api/latest?access_key=54615fac2b5a3f6b7a67957473bdbc78";
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
          return (
            <Picker.Item
              label={this.props.data.rates[key]}
              value={key}
              key={key}
            />
          );
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
