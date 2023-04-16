import React, {useState, useEffect} from "react";
import * as SQLite from 'expo-sqlite';
import {ScrollView, Text, Pressable, StyleSheet, StatusBar, Image} from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { PostsDB } from "../Data/PostsDB";

export default function CreatePost({route}) {
  const loggedInUserID = route.params.loggedInUserID;
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [postText, setPostText] = useState('');
  const [message, setMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

//grabs the username
//-----------------------------------------------------------------------------
useEffect(() => {
  const db = SQLite.openDatabase('db.Swipe');
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM USERS WHERE id = ?',
      [loggedInUserID],
      (_txOBJ, results) => {
        var temp = results.rows.item(0);
        setUsername(temp.username);
      }
    );
  });
}, []);

//Image picker
//-----------------------------------------------------------------------------
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar barStyle="dark-content"/>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Select an Image</Text>
      </Pressable>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Text>{message}</Text>
      <TextInput
        multiline={true}
        maxLength={250}
        numberOfLines={3}
        placeholder="Caption"
        value={postText}
        style={styles.postText}
        onChangeText={setPostText}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <Pressable style={styles.button} onPress={() => PostPhoto(loggedInUserID, username, image, postText)} >
        <Text style={styles.text}>Post</Text>
      </Pressable>
    </ScrollView>
  );

//-----------------------------------------------------------------------------
  function PostPhoto(userID, username, image, postText) {
    if (image == null){
      setErrorMessage('You must select an image');
    } else {
      let postComments = [];
      let postCommentsString = JSON.stringify(postComments)
      const postsDB = new PostsDB();
      postsDB.createPostsTable();
      postsDB.newPost(userID, username, image, postText, postCommentsString);
      setErrorMessage('');
      setMessage('You Posted!');
      setImage(null);
      setPostText('');
    }
  };
  };

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: 'center'
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    width: '98%',
    height: 60,
    backgroundColor: '#9FE2BF',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#2A4242',
  },
  image: {
    width: 430,
    height: 430,
    marginTop: 15,
  },
  postText: {
    borderColor: '#2A4242',
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 18,
    width: '98%',
    height: 70,
    alignSelf: "center",
    color: '#2A4242',
  },
  errorMessage: {
    color: 'red',
    fontSize: 24,
    paddingBottom: 15,
    textAlign: "center",
  },
  message: {
    color: '#008000',
    fontSize: 24,
    paddingBottom: 15,
    textAlign: "center",
  },
});