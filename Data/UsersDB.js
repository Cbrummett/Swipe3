import {
  Platform,
} from "react-native";
import * as SQLite from 'expo-sqlite';

export class UsersDB {
    constructor(){
        this.usersDB = this.openDatabase();
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
    createUsersTable () {
      this.usersDB.transaction(tx => {
        //tx.executeSql('DROP TABLE USERS;');
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, bio TEXT);'
        );
      });
    };
//--------------------------------------------------------------------------------------------------  
    newUser (username, password) {
      this.usersDB.transaction((tx) => {
        tx.executeSql("INSERT INTO USERS (username, password, bio) values (?, ?, '')", [username, password]);
        tx.executeSql('SELECT * FROM USERS', [],
         (_txOBJ, { rows: {_array} }) => 
          console.log("User was added")
        );
      },
      null,
      null
      );
    };
//--------------------------------------------------------------------------------------------------
    editBio (userID, bioText) {
      this.usersDB.transaction((tx) => {
        tx.executeSql("UPDATE USERS SET bio = ? WHERE id = ?", [bioText, userID]);
        tx.executeSql('SELECT * FROM USERS WHERE id = ?', [userID],
         (_txOBJ, { rows: {_array} }) => 
          console.log("Bio was edited")
        );
      },
      null,
      null
      );
    };
//--------------------------------------------------------------------------------------------------
    changePassword(userID, newPassword){
      this.usersDB.transaction((tx) => {
        tx.executeSql("UPDATE USERS SET password = ? WHERE id = ?", [newPassword, userID]);
        tx.executeSql('SELECT * FROM USERS WHERE id = ?', [userID],
         (_txOBJ, { rows: {_array} }) => 
          console.log("Password was changed")
        );
      },
      null,
      null
      );
    };
};
