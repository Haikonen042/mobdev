import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [lat, setLat] = useState(60.200692);
  const [long, setLong] = useState(24.934302);

  const getCoordinates = () => {
    const url =
      "http://www.mapquestapi.com/geocoding/v1/address?key=4zM1h33gHvrwbixoSkxhBlANTBr0fxRj&location=" +
      address +
      "+finland";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setCoordinates(responseJson.results.locations.latLng);
        Alert(coordinates);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });

    /*setLat(coordinates.lat);
    setLong(coordinates.lng);*/
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title="Result"
        />
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
