import React, { useEffect, useState } from "react";
import {ScrollView, View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = React.useState('');

// grabs all users
//-----------------------------------------------------------------------------
  useEffect(() => {
    const db = SQLite.openDatabase('db.Swipe');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM USERS',
        [],
        (_txOBJ, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUsers(temp);
        }
      );
    });
  }, []);

  return(
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content"/>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading} >Swipe</Text>
          <Text style={styles.subheading}>Sign In</Text>
          <View style={styles.lineSeporator}/>
          <Text style={styles.errorMessage}>{message}</Text>
          <TextInput style={styles.textboxu}
            placeholder='Username'
            maxLength={30}
            placeholderTextColor='#909090'
            onChangeText={setUsername}
            value={username} >
          </TextInput>
          <TextInput style={styles.textboxp}
            placeholder='Password'
            maxLength={30}
            placeholderTextColor='#909090'
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password} >
          </TextInput>
          <Pressable style={styles.button} onPress={() => TryLogin(username, password)} >
              <Text style={styles.text}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Register")} >
              <Text style={styles.text}>Sign Up</Text>
          </Pressable>
        </ScrollView>
    </SafeAreaView>
    
  )
//-----------------------------------------------------------------------------
  function TryLogin(username, password) {
    let IsLoggedIn = false;
    let loggedInUserID = null;
    if( users.length >= 1){
      var usersLength = users.length
      for (let i = 0; i < usersLength; i++){
        if(users[i].username == username && users[i].password == password){
          IsLoggedIn = true;
          loggedInUserID = users[i].id
          console.log("Logged in as UserID: " + loggedInUserID + ", Username: " + username);
        } else {
          setMessage("Invalid username password combo");
        }
        if (IsLoggedIn){
          setMessage("");
          navigation.replace("Swipe", {
            loggedInUserID: loggedInUserID
          });
        }
      };
    }  
  }
}

const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      marginTop: 0,
    },
    scrollView: {
      backgroundColor: 'white',
      
    },
    heading: {
        fontSize: 90,
        textAlign: 'center',
        color: '#9FE2BF',
        marginBottom: 40,
        marginTop: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        borderColor: '#9FE2BF',
        borderRadius: 15,
        borderWidth: 4,
      },
      subheading: {
        fontSize: 50,
        textAlign: 'center',
        color: '#2A4242',
        fontWeight: 'bold',
      },
      lineSeporator: {
        borderBottomColor: '#2A4242',
        borderBottomWidth: 2,
        marginBottom: 50,
      },
      errorMessage: {
        color: 'red',
        textAlign: "center",
        fontSize: 24,
        paddingBottom: 15,
  
      },
      textboxu: {
        alignSelf: 'center',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30,
        borderColor: '#9FE2BF',
        borderWidth: 2,
        borderRadius: 15,
        width: '98%',
        height: '10%',
        backgroundColor: '#f5f5f5'
      },
      textboxp: {
        alignSelf: 'center',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 15,
        borderColor: '#9FE2BF',
        borderWidth: 2,
        borderRadius: 15,
        width: '98%',
        height: '10%',
        backgroundColor: '#f5f5f5'
    
      },
      button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 30,
        borderRadius: 30,
        width: '98%',
        height: '8%',
        backgroundColor: '#9FE2BF',
      },
      text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#2A4242',
      },
});