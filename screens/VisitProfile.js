import React, { useEffect, useState, useCallback } from "react";
import {
    Text,
    Pressable,
    StyleSheet,
    StatusBar,
    FlatList,
    View,
    Image,
    RefreshControl,
 } from "react-native";
import * as SQLite from 'expo-sqlite';
import { TextInput } from "react-native-gesture-handler";

export default function VisitProfile({route, navigation}){
    const [refreshing, setRefreshing] = useState(false);
    const loggedInUserID = route.params.loggedInUserID;
    const userID = route.params.userID;
    const [loggedInUser, setLoggedInUser] = useState({});
    const [visitedUser, setVisitedUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);

//grabs the logged in user
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

//grabs the visited user
//-----------------------------------------------------------------------------
useEffect(() => {
    const db = SQLite.openDatabase('db.Swipe');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM USERS WHERE id = ?',
        [userID],
        (_txOBJ, results) => {
          var temp = results.rows.item(0);
          setVisitedUser(temp);
        }
      );
    });
  }, []);

// Grabs user posts
//-----------------------------------------------------------------------------
  useEffect(() => {
    const db = SQLite.openDatabase('db.Swipe');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM POSTS WHERE userid = ? ORDER BY postDate DESC;',
        [userID],
        (_txOBJ, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i));
          }
          setUserPosts(temp);
        }
      );
    });
  }, []);

// Refreshes the flatlist on pull down
//-----------------------------------------------------------------------------
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const db = SQLite.openDatabase('db.Swipe');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM POSTS WHERE userid = ? ORDER BY postDate DESC;',
        [userID],
        (_txOBJ, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i));
          }
          setUserPosts(temp);
          setRefreshing(false);
        }
      );
    });
  }, [refreshing]);

    // flatlist item
//-----------------------------------------------------------------------------
  const Item = ({item, loggedInUser}) => {
    var commentsListString = item.postComments
    var commentsList = JSON.parse(commentsListString)
    var postCommentsLength = commentsList.length - 1;
    let mostRecentComment = commentsList[postCommentsLength]
    if (typeof mostRecentComment === 'undefined')
    {
      mostRecentComment = {
        username: "",
        commentText: "",
      }
    }
  
    return(
      <View>
        <View style={styles.postBackGround}>
          <Text style={styles.username}>{visitedUser.username}</Text>
          {item.postImage && <Image source={{ uri: item.postImage }} style={styles.image} />}
          <TextInput
            multiline={true}
            numberOfLines={5}
            value={item.postText}
            editable= {false}
            style={styles.caption}
          />
          <View style={styles.recentComment}>
            <Text style={styles.commentUsername}>  {mostRecentComment.username}</Text>
            <Text style={styles.commentText}>    {mostRecentComment.commentText}</Text>
          </View>
          <View style={styles.buttonRow}>
            <Pressable  style={styles.postButton} onPress={() => navigation.navigate("ViewProfileViewComments", {
                loggedInUserID: loggedInUserID,
                postID: item.id,
                userID: userID
              })} > 
              <Text style={styles.text}>View All Comments</Text>
            </Pressable>
          </View>
          <View style={styles.separator}/>
        </View>
      </View>
    )
  };

//-----------------------------------------------------------------------------
  const renderItem = ({item}) => {
    return (
      <Item item={item} loggedInUser={loggedInUser}/>
    )
  };
  
//-----------------------------------------------------------------------------
  return(
    <FlatList
      style={styles.flatList}
      data={userPosts}
      keyExtractor={item => item.id}
      loggedInUser={loggedInUser}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => {
        return(
          <View>
            <StatusBar barStyle="dark-content"/>
            <Text style={styles.heading} >{visitedUser.username}'s Profile</Text>
            <Text style={styles.subheading}>Bio:</Text>
            <TextInput
              multiline={true}
              maxLength={150}
              value={visitedUser.bio}
              editable= {false}
              style={styles.bio}
            />
            <Text style={styles.postsLabel}>{visitedUser.username}'s Posts</Text>
          </View>
        )
      }}
      ListFooterComponent={() => {
        return(
          <View style={styles.flatListBottom}/>
        )
      }}
      renderItem={renderItem}
    />
  )
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
      buttonRow: {
        flexDirection: 'row',
        alignSelf: "center",
      },
      smallButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 30,
        borderRadius: 30,
        width: '40%',
        height: 50,
        backgroundColor: '#9FE2BF',
        marginHorizontal: 10,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: '#2A4242',
      },
      postsLabel: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 30,
        textAlign: 'center',
        color: '#2A4242',
        fontWeight: 'bold',
      },
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
        width: '40%',
        height: 50,
        backgroundColor: '#9FE2BF',
        marginHorizontal: 10,
        marginTop: 50,
      },
      flatList: {
        flex: 1,
      },
      flatListBottom: {
        marginBottom: 150,
      },
      separator: {
        borderBottomColor: '#9FE2BF',
        borderBottomWidth: 50,
        marginTop: 15,
      }
});