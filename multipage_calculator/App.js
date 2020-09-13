import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function CalculatorScreen({ navigation }) {
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        ref={initialFocus}
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
        <View style={styles.button}>
          <Button
            onPress={() => {
              const result = Number(number) + Number(number2);
              setResult(result);
              setNumber("");
              setNumber2("");
              const sum = number + " + " + number2 + " = " + result;
              setData([...data, { key: sum }]);
              initialFocus.current.focus();
            }}
            title="+"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {
              const result = number - number2;
              setResult(result);
              setNumber("");
              setNumber2("");
              const sum = number + " - " + number2 + " = " + result;
              setData([...data, { key: sum }]);
              initialFocus.current.focus();
            }}
            title="-"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="History"
            onPress={() => navigation.navigate("History", { data })}
          />
        </View>
      </View>
    </View>
  );
}

function HistoryScreen({ route, navigation }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ margin: 20 }}>History</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <View style={styles.buttonview}>
        <View style={{ marginBottom: 40 }}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{ title: "Calculator" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "History" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    marginTop: 10,
  },
  buttonview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    margin: 10,
  },
});
