import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import Constants from "expo-constants";
import * as Contacts from "expo-contacts";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === "granted");

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      setContacts(data);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.name}{" "}
                {item.phoneNumbers &&
                  item.phoneNumbers.map((phone) => (
                    <Text key={phone.id}>{phone.number}</Text>
                  ))}
              </Text>
            </View>
          )}
          data={contacts}
        />
      </View>
      <Button title="Get contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
