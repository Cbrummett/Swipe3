import React, { useEffect, useState } from "react";
import {View, Text, Pressable, StyleSheet, FlatList, SafeAreaView } from "react-native";
import * as SQLite from 'expo-sqlite';
import { PostsDB } from "../Data/PostsDB";
import { TextInput } from "react-native-gesture-handler";

export default function ViewPostComments({route, navigation}) {
  const loggedInUserID = route.params.loggedInUserID;
  const postID = route.params.postID;
  const [loggedInUser, setLoggedInUser] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [addComment, setAddComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

// grabs user data
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

// grab post comments
//-----------------------------------------------------------------------------
      useEffect(() => {
        const db = SQLite.openDatabase('db.Swipe');
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM POSTS WHERE id = ?',
            [postID],
            (_txOBJ, results) => {
              var temp = results.rows.item(0);
              setPostComments(JSON.parse(temp.postComments));
            }
          );
        });
      }, []);

// flatlist item
//-----------------------------------------------------------------------------
      const Item = ({item, loggedInUser}) => {
        return(
            <View style={styles.comment}>
                <Text style={styles.commentUsername}>{item.username}</Text>
                
                <Text style={styles.commentText}>  {item.commentText}</Text>
                <Pressable style={styles.smallButton} onPress={() => navigation.navigate('Delete Comment', {
                  loggedInUserID: loggedInUserID,
                  postID: postID,
                  commentID: item.commentID
                })}>
                  <Text style={styles.smallButtonText}>Delete</Text>
                </Pressable>
                
                
                <View style={styles.separator}/>
            </View>
        )
      };

//-----------------------------------------------------------------------------
      const renderItem = ({item}) => {
        return <Item item={item} loggedInUser={loggedInUser}/>;
      };

//-----------------------------------------------------------------------------
      return(
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                multiline={true}
                maxLength={250}
                placeholder="Add a comment"
                onChangeText={setAddComment}
                value={addComment}
                style={styles.commentTextBox}
                />
                <View style={styles.buttonRow}>
                  <Pressable style={styles.button} onPress={() => navigation.replace('MyProfile', {
                    loggedInUserID: loggedInUserID
                    })} >
                    <Text style={styles.text}>Back</Text>
                  </Pressable>
                  <Pressable style={styles.button} onPress={() => AddComment(postID, loggedInUser, addComment)} >
                      <Text style={styles.text}>Comment</Text>
                  </Pressable>
                </View>
            </View>
            <FlatList
                data={postComments}
                keyExtractor={item => item.commentID}
                loggedInUser={loggedInUser}
                ListFooterComponent={() => {
                    return(
                      <View style={styles.flatListBottom}/>
                    )
                  }}
                renderItem={renderItem} 
            />
        </SafeAreaView>
      )
//-----------------------------------------------------------------------------
      function AddComment(postID, loggedInUser, addComment) {
        if (addComment === ""){
            setErrorMessage("You must fill out comment");
        } else {
            var comment = {
                postID: postID,
                username: loggedInUser.username,
                commentText: addComment,
                commentDate: new Date()
            }
            if (postComments === "[]"){
                var commentslist = [];
                comment.commentID = 1
                var commentObj= JSON.stringify(comment);
                commentslist.push(commentObj)

            } else {
                var postCommentList = postComments;
                var commentsListLength = postComments.length;
                comment.commentID = commentsListLength + 1;
                postCommentList.push(comment);
                var commentsList = JSON.stringify(postCommentList);
            }
            
            const postDB = new PostsDB();
            postDB.addComment(postID, commentsList);
            setErrorMessage("");
            navigation.replace("Comments", {
                loggedInUserID: loggedInUserID,
                postID: postID
            });
        }
      };
};

const styles = StyleSheet.create({
    comment: {
        backgroundColor: '#2A4242',
        color: 'white',
    },
    commentUsername: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
        marginTop: 10,
    },
    commentText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    smallButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      width: '20%',
      height: 30,
      backgroundColor: '#9FE2BF',
      marginBottom: 5,
    },
    smallButtonText: {
      fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: '#2A4242',
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    flatListBottom: {
        marginBottom: 150,
    },
    errorMessage: {
      color: 'red',
      fontSize: 18,
      paddingBottom: 15,
      textAlign: "center",
    },
    commentTextBox: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 20,
        borderColor: '#2A4242',
        borderRadius: 30,
        borderWidth: 3,
        width: '80%',
        height: 60,
        marginBottom: 30,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "center",
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 5,
        borderRadius: 30,
        width: '40%',
        height: 50,
        backgroundColor: '#9FE2BF',
        marginHorizontal: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: '#2A4242',
    },



});