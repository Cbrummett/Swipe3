import React from "react";
import {View, ScrollView, Text, Pressable, StyleSheet } from "react-native";

export default function LogOut({ navigation }) {
    return(
        <ScrollView style={styles.scrollView}>
          <Text style={styles.subheading}>Sign Out</Text>
          <View style={styles.lineSeporator}/>
          <Text style={styles.heading} >Are you sure you want to Sign out?</Text>
        
          <Pressable style={styles.button} onPress={() => navigation.replace("Log In")} >
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        </ScrollView>
    )
  }

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: 'white',
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
    heading: {
        fontSize: 30,
        textAlign: 'center',
        color: 'red'
      },
      button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 30,
        borderRadius: 30,
        width: '98%',
        height: '25%',
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