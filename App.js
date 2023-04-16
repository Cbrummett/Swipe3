import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import React from 'react';
import { UsersDB } from './Data/UsersDB';
import { PostsDB } from './Data/PostsDB';

export default function App() {
    const usersDB = new UsersDB();
    const postDB = new PostsDB();
    usersDB.createUsersTable();
    postDB.createPostsTable();

      return (
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      );
};
