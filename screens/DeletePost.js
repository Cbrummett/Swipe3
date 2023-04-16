import React, { useEffect, useState } from "react";
import {
    Text,
    Pressable,
    StyleSheet,
    View,
    Image,
 } from "react-native";
import * as SQLite from 'expo-sqlite';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { PostsDB } from "../Data/PostsDB";

export default function DeletePost({route, navigation}) {
    const loggedInUserID = route.params.loggedInUserID;
    const postID = route.params.postID;
    const [loggedInUser, setLoggedInUser] = useState({});
    const [userPost, setUserPost] = useState({});
    const [mostRecentComment, setMostRecentComment] = useState({});
    
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
            }
        );
        });
    }, []);

//grabs post and sets most recent comment
//-----------------------------------------------------------------------------
    useEffect(() => {
        const db = SQLite.openDatabase('db.Swipe');
        db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM POSTS WHERE id = ?',
            [postID],
            (_txOBJ, results) => {
            var temp = results.rows.item(0);
            setUserPost(temp);
            var commentsListString = temp.postComments;
            var commentsList = JSON.parse(commentsListString)
            var postCommentsLength = commentsList.length;
            let mostRecentComment = commentsList[postCommentsLength - 1]
            if (typeof mostRecentComment === 'undefined'){
                mostRecentComment = {
                    username: "",
                    commentText: "",
                }
            }
            setMostRecentComment(mostRecentComment);
            }
        );
        });
    }, []);

    return(
        <ScrollView>
            <View style={styles.postBackGround}>
                <Text style={styles.username}>{loggedInUser.username}</Text>
                {userPost.postImage && <Image source={{ uri: userPost.postImage }} style={styles.image} />}
                <TextInput
                    multiline={true}
                    value={userPost.postText}
                    editable= {false}
                    style={styles.caption}
                />
                <View style={styles.recentComment}>
                    <Text style={styles.commentUsername}>  {mostRecentComment.username}</Text>
                    <Text style={styles.commentText}>    {mostRecentComment.commentText}</Text>
                </View>
                <Pressable  style={styles.postButton} onPress={() => deletePost(postID)} > 
                <Text style={styles.text}>Delete Post</Text>
                </Pressable>
                <View style={styles.separator}/>
            </View>
        </ScrollView>
    )
//-----------------------------------------------------------------------------
    function deletePost(postID) {
        const postDB = new PostsDB();
        postDB.deletePost(postID);
        navigation.replace("MyProfile", {
            loggedInUserID: loggedInUserID
        })
    };
    
}
const styles = StyleSheet.create({
postBackGround: {
    backgroundColor: '#2A4242',
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
    padding: 10,
  },
  image: {
    width: 430,
    height: 430,
  },
  caption: {
    borderColor: '#2A4242',
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 18,
    fontWeight: "bold",
    width: '100%',
    height: 100,
    alignSelf: "center",
    color: '#2A4242',
    backgroundColor: 'white',
  },
  recentComment: {
    backgroundColor: '#2A4242',
    height: 70,
  },
  commentUsername: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  commentText: {
    color: 'white',
    fontSize: 16 ,
  },
  postButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    width: '90%',
    height: 50,
    backgroundColor: '#9FE2BF',
    marginHorizontal: 10,
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: '#2A4242',
  },
});