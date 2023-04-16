import React, { useState } from "react";
import {View, Text, Pressable, StyleSheet } from "react-native";
import { UsersDB } from '../Data/UsersDB';
import { TextInput } from "react-native-gesture-handler";

export default function EditPassword({route, navigation}) {
    const loggedInUserID = route.params.loggedInUserID;
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    return(
      <View>
        <Text style={styles.heading} >Change Password</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
            placeholder="New Password"
            maxLength={30}
            secureTextEntry={true}
            autoCapitalize="none"
            value={newPassword}
            style={styles.textbox}
            onChangeText={setNewPassword}
        />
        <TextInput
            placeholder="Confirm New Password"
            maxLength={30}
            secureTextEntry={true}
            autoCapitalize="none"
            value={confirmNewPassword}
            style={styles.textbox}
            onChangeText={setConfirmNewPassword}
        />
        <Pressable style={styles.button} onPress={() => SaveNewPassword(loggedInUserID, newPassword, confirmNewPassword)}>
          <Text style={styles.text}>Save New Password</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.replace("MyProfile", {
                    loggedInUserID: loggedInUserID
                })}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
        
      </View>
    )
//-----------------------------------------------------------------------------------------------
    function SaveNewPassword(id, newPassword, confirmNewPassword) {
        if (newPassword == confirmNewPassword) {
            var passLength = newPassword.length;
            if (typeof newPassword === 'undefined' || newPassword == null ||
            newPassword == "" || passLength < 10 || passLength > 30){
                setErrorMessage('Password must be between 10 and 30 characters')
            } else {
                setErrorMessage('');
                const userdb = new UsersDB();
                userdb.changePassword(id, newPassword);
                navigation.replace("MyProfile", {
                    loggedInUserID: loggedInUserID
                });
            }
        } else {
            setErrorMessage('Passwords do not match')
        }
    };
  };

  const styles = StyleSheet.create({
      heading: {
          fontSize: 50,
          fontWeight: "bold",
          textAlign: 'center',
          color: '#2A4242',
          borderColor: '#2A4242',
          borderRadius: 15,
          borderWidth: 3,
          marginBottom: 30,
        },
        subheading: {
          fontSize: 30,
          fontWeight: "bold",
          color: '#2A4242',
        },
        textbox: {
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
        errorMessage: {
        color: 'red',
        fontSize: 24,
        paddingBottom: 15,
        textAlign: "center",
        }
  });