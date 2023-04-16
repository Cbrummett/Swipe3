import React, { useEffect, useState } from "react";
import {View, Text, Pressable, StyleSheet } from "react-native";
import * as SQLite from 'expo-sqlite';
import { UsersDB } from '../Data/UsersDB';
import { TextInput } from "react-native-gesture-handler";

export default function EditProfile({route, navigation}) {
  const loggedInUserID = route.params.loggedInUserID;
  console.log(loggedInUserID);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [bioText, setBioText] = useState('');

//grabs user
//-----------------------------------------------------------------------------
  useEffect(() => {
    const db = SQLite.openDatabase('db.Swipe');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM USERS WHERE id = ?',
        [loggedInUserID],
        (_txOBJ, results) => {
          var temp = results.rows.item(0);
          setLoggedInUser(temp);
          setBioText(temp.bio);
        }
      );
    });
  }, []);

  return(
    <View>
      <Text style={styles.heading} >{loggedInUser.username}'s Profile</Text>
      <Text style={styles.subheading}>Bio:</Text>
      <TextInput
        multiline={true}
        maxLength={200}
        numberOfLines={4}
        value={bioText}
        style={styles.bio}
        onChangeText={setBioText}
      />
      <Pressable style={styles.button} onPress={() => SaveProfile(loggedInUserID, bioText)} >
        <Text style={styles.text}>Save Bio</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.replace("MyProfile", {
                    loggedInUserID: loggedInUserID
                })}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
    </View>
  )
//-----------------------------------------------------------------------------
  function SaveProfile(id, bio) {
    const userdb = new UsersDB();
    userdb.editBio(id, bio);
    navigation.replace("MyProfile", {
        loggedInUserID: loggedInUserID
    });
  }


}
const styles = StyleSheet.create({
    heading: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#2A4242',
        marginBottom: 30,
      },
      subheading: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#2A4242',
      },
      bio: {
        fontSize: 18,
        width: '98%',
        alignSelf: "center",
        color: '#2A4242',
      },
      button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 30,
        borderRadius: 30,
        width: '98%',
        height: '13%',
        backgroundColor: '#9FE2BF',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#2A4242',
      },
});
