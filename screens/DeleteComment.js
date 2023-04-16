import React, { useEffect, useState } from "react";
import {
    Text,
    Pressable,
    StyleSheet,
    View,
 } from "react-native";
import * as SQLite from 'expo-sqlite';
import { ScrollView } from "react-native-gesture-handler";
import { PostsDB } from "../Data/PostsDB";

export default function DeleteComment({route, navigation}) {
    const loggedInUserID = route.params.loggedInUserID;
    const postID = route.params.postID;
    const commentID = route.params.commentID;
    const [comment, setComment] = useState({});
    const [commentsList, setCommentsList] = useState([]);

//Grabs user post and sets commentsList and comment
//--------------------------------------------------------------------------
    useEffect(() => {
        const db = SQLite.openDatabase('db.Swipe');
        db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM POSTS WHERE id = ?',
            [postID],
            (_txOBJ, results) => {
            var temp = results.rows.item(0);
            
            var commentsListString = temp.postComments;
            var commentsList = JSON.parse(commentsListString)
            setCommentsList(commentsList)
            commentsList.forEach(comment => {
                if (comment.commentID === commentID){
                    setComment(comment)
                }
            });
            }
        );
        });
    }, []);

    return(
        <ScrollView>
            <Text style={styles.header}>Are you sure you want to Delete Comment?</Text>
            <View style={styles.comment}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text style={styles.commentText}>  {comment.commentText}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => DeleteComment(postID)}>
                <Text style={styles.text}>Delete</Text>
            </Pressable>
        </ScrollView>
    )
//-----------------------------------------------------------------------------------------    
    function DeleteComment(postID) {
        let deletedComment = comment;
        const index = commentsList.indexOf(deletedComment);
        let commentList = commentsList
        commentList.splice(index, 1);
        var commentsListLength = commentList.length;
        let newCommentList = [];
        for (let i = 1; i <= commentsListLength; i++){
            let commentLeft = commentList[i - 1];
            commentLeft.commentID = i;
            newCommentList.push(commentLeft);
        }
        var commentsListString = JSON.stringify(newCommentList);
        const postDB = new PostsDB();
        postDB.addComment(postID, commentsListString); // duplicate code so I used addComment
        navigation.replace('ViewComments', {
            loggedInUserID: loggedInUserID,
            postID: postID
        })
    };
};

const styles = StyleSheet.create({
    header: {
        alignSelf: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: 'red',
        marginTop: 150,
        marginBottom: 20,
    },
    comment: {
        backgroundColor: '#2A4242',
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
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        width: '90%',
        height: 50,
        backgroundColor: '#9FE2BF',
        marginTop: 20,
        marginBottom: 40,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: '#2A4242',
      },
});