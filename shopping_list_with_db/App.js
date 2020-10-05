import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("shoppingdb.db");

export default function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [shoppings, setShoppings] = useState([]);

  const initialFocus = useRef(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists shopping (id integer primary key not null, amounts text, product text);"
      );
    });
    updateList();
  }, []);

  // Save course
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into shopping (amounts, product) values (?, ?);",
          [amount, product]
        );
      },
      null,
      updateList
    );
    setProduct("");
    setAmount("");
    initialFocus.current.focus();
  };

  // Update courselist
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from shopping;", [], (_, { rows }) =>
        setShoppings(rows._array)
      );
    });
  };

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from shopping where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "pink",
          marginTop: 5,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={initialFocus}
        placeholder="Product"
        style={{
          marginTop: 50,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          padding: 3,
          backgroundColor: "white",
        }}
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        placeholder="Amount"
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          padding: 3,
          backgroundColor: "white",
        }}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, marginBottom: 10, fontSize: 20 }}>
        Shopping list
      </Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18, color: "white" }}>
              {item.product}, {item.amounts}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#19ff57" }}
              onPress={() => deleteItem(item.id)}
            >
              {" "}
              bought
            </Text>
          </View>
        )}
        data={shoppings}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#db077c",
    alignItems: "center",
  },
});
