import React, { useEffect, useState } from "react";
import {View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UsersDB } from '../Data/UsersDB';

export default function Register({ navigation }){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [users, setUsers] = useState([]);

//grabs all users
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
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading} >Swipe</Text>
          <Text style={styles.subheading}>Sign Up</Text>
          <View style={styles.lineSeporator}/>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Text style={styles.message}>{message}</Text>
          <TextInput style={styles.textboxu}
            placeholder='Username'
            maxLength={30}
            onChangeText={setUsername}
            value={username} >
          </TextInput>
          <TextInput style={styles.textboxp}
            placeholder='Password'
            maxLength={30}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password} >
          </TextInput>
          <Pressable style={styles.button} onPress={() => ValidateRegister(username, password)} >
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.replace("Log In")} >
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    )

//--------------------------------------------------------------------------------------------------------------------------
    function ValidateRegister (username, password) { 
      const userdb = new UsersDB();
      let notUnique = false;
      var userLength = username.length;
      var passLength = password.length;

      if( users.length >= 1){
        var usersLength = users.length
        for (let i = 0; i < usersLength; i++){
          if(users[i].username == username){
            notUnique = true;
          }
        };
      }
      
      if (typeof username === 'undefined' || username == null || username == "" || userLength < 5 || userLength > 30 || 
      typeof password === 'undefined' || password == null || password == "" || passLength < 10 || passLength > 30){
        setErrorMessage("Username must be between 5 and 30 characters," + 
            " password must be between 10 and 30 characters.");
      } else if (notUnique) {
        setErrorMessage("Username already taken");
      } else {
        setErrorMessage('');
        setMessage("Account has been made.");
        setUsername("");
        setPassword("");
        userdb.newUser(username, password);
      }
    };
};

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
    message: {
      color: '#008000',
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
      height: '10%',
      width: '98%',
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
      height: '10%',
      width: '98%',
      backgroundColor: '#f5f5f5'
  
    },
    button: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      marginTop: 30,
      borderRadius: 30,
      height: '8%',
      width: '98%',
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