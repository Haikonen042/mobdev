import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Header, Input, Button, Icon, ListItem } from "react-native-elements";
import * as SQLite from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapView, { Marker } from "react-native-maps";

const db = SQLite.openDatabase("placedb.db");

function PlacesScreen({ navigation }) {
  const [address, setAddress] = useState("");
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists place (id integer primary key not null, address text);"
      );
    });
    updateList();
  }, []);

  // Save
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into place (address) values (?);", [address]);
      },
      null,
      updateList
    );
    setAddress("");
  };

  // Update
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from place;", [], (_, { rows }) =>
        setPlaces(rows._array)
      );
    });
  };

  // Delete
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from place where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const getCoordinates = async (address) => {
    const findThis = address;
    console.log(findThis);
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=4zM1h33gHvrwbixoSkxhBlANTBr0fxRj&location=" +
      findThis +
      "+finland";

    try {
      const response = await fetch(url);
      const coordinateData = await response.json();
      const coordinates = coordinateData.results[0].locations[0].displayLatLng;
      const lat = coordinates.lat;
      const long = coordinates.lng;
      navigation.navigate("Map", { lat, long });
    } catch (e) {
      Alert.alert("Error fetching data");
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onLongPress={() => deleteItem(item.id)}
      onPress={() => getCoordinates(item.address)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.address}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Subtitle right style={{ color: "lightgrey" }}>
          show on map
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View>
      <Input
        containerStyle={{ marginTop: 25 }}
        placeholder="Type in address"
        label="PLACEFINDER"
        onChangeText={(address) => setAddress(address)}
        value={address}
      />
      <Button
        raised
        icon={{ name: "save", color: "white" }}
        containerStyle={{ width: "90%", alignSelf: "center", marginBottom: 10 }}
        onPress={saveItem}
        title="SAVE"
      />
      <FlatList data={places} renderItem={renderItem} />
    </View>
  );
}

function MapScreen({ route, navigation }) {
  const { lat, long } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: long }} />
      </MapView>
      <Button
        raised
        containerStyle={{ width: "90%", alignSelf: "center", marginBottom: 10 }}
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Places">
        <Stack.Screen
          name="Places"
          component={PlacesScreen}
          options={{ title: "My Places" }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Map" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
