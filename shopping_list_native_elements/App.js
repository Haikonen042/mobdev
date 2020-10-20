import React, { useState, useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import {
  Header,
  Input,
  Button,
  Icon,
  ListItem,
  ThemeProvider,
} from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("shoppingdb.db");

export default function App() {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");

  const [shoppings, setShoppings] = useState([]);

  const initialFocus = useRef(null);

  const theme = {
    Button: {
      raised: true,
    },
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists shopping (id integer primary key not null, amounts text, product text);"
      );
    });
    updateList();
  }, []);

  // Save
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

  // Update
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from shopping;", [], (_, { rows }) =>
        setShoppings(rows._array)
      );
    });
  };

  // Delete
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from shopping where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amounts}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        reverse
        size={18}
        color="green"
        name="done"
        onPress={() => deleteItem(item.id)}
      />
    </ListItem>
  );

  return (
    <View>
      <Header
        centerComponent={{
          text: "SHOPPING LIST",
          style: { color: "#fff" },
        }}
      />
      <Input
        containerStyle={{ marginTop: 25 }}
        ref={initialFocus}
        placeholder="Product"
        label="PRODUCT"
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <Input
        placeholder="Amount"
        label="AMOUNT"
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <ThemeProvider theme={theme}>
        <Button
          containerStyle={{ width: "80%", alignSelf: "center" }}
          onPress={saveItem}
          title="SAVE"
        />
      </ThemeProvider>
      <FlatList data={shoppings} renderItem={renderItem} />
    </View>
  );
}
