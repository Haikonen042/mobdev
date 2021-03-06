import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [lat, setLat] = useState(60.200692);
  const [long, setLong] = useState(24.934302);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permisson to access location");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    setLat(location.coords.latitude);
    setLong(location.coords.longitude);
  };

  const getCoordinates = async () => {
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=4zM1h33gHvrwbixoSkxhBlANTBr0fxRj&location=" +
      address +
      "+finland";

    try {
      const response = await fetch(url);
      const coordinateData = await response.json();
      setCoordinates(coordinateData.results[0].locations[0].displayLatLng);
    } catch (e) {
      Alert.alert("Error fetching data");
    }

    setLat(coordinates.lat);
    setLong(coordinates.lng);
  };

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
      <TextInput
        style={styles.input}
        value={address}
        placeholder="Address"
        onChangeText={(address) => setAddress(address)}
      />
      <Button title="Show" onPress={getCoordinates} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
  },
  container: {
    flex: 1,
  },
});
