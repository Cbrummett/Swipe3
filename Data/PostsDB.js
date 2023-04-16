import {
    Platform,
  } from "react-native";
  import * as SQLite from 'expo-sqlite';
  
  export class PostsDB {
      constructor(){
          this.postsDB = this.openDatabase();
      }
//------------------------------------------------------------------------------------------------- 
      openDatabase() {
        if (Platform.OS === "web") {
          return {
            transaction: () => {
              return {
                executeSql: () => {},
              };
            },
          };
        }
      
        const db = SQLite.openDatabase('db.Swipe');
        return db;
      }
//--------------------------------------------------------------------------------------------------
      createPostsTable () {
        this.postsDB.transaction(tx => {
          //tx.executeSql('DROP TABLE POSTS;');
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS POSTS (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, username TEXT, postImage BLOB, postText TEXT, postComments Text, postDate REAL);'
          );
        });
      };
//--------------------------------------------------------------------------------------------------
      newPost (userID, username, postImage, postText, postComments) {
        this.postsDB.transaction((tx) => {
          tx.executeSql("INSERT INTO POSTS (userid, username, postImage, postText, postComments, postDate) values (?, ?, ?, ?, ?, julianday('now'))", [userID, username, postImage, postText, postComments]);
          tx.executeSql('SELECT * FROM POSTS', [],
           (_txOBJ, { rows: {_array} }) => 
            console.log("Post was created")
          );
        },
        null,
        null
        );
      };
//--------------------------------------------------------------------------------------------------
      deletePost (postID){
        this.postsDB.transaction((tx) => {
          tx.executeSql('DELETE FROM POSTS WHERE id = ? ', [postID]);
          tx.executeSql('SELECT * FROM POSTS WHERE id = ?', [postID],
           (_txOBJ, { rows: {_array} }) => 
            console.log("Post was deleted")
          );
        },
        null,
        null
        );
      };
//--------------------------------------------------------------------------------------------------
      addComment (postID, postComments) {
        this.postsDB.transaction((tx) => {
          tx.executeSql("UPDATE POSTS SET postComments = ? WHERE id = ?", [postComments, postID]);
          tx.executeSql('SELECT postComments FROM POSTS WHERE id = ?', [postID],
           (_txOBJ, { rows: {_array} }) => 
            console.log("Comments were edited")
          );
        },
        null,
        null
        );
      };
  };