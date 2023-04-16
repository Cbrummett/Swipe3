import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet } from "react-native";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import EditPassword from '../screens/EditPassword';
import ViewPostComments from '../screens/ViewPostComments';
import DeletePost from '../screens/DeletePost';
import DeleteComment from '../screens/DeleteComment';

const Stack = createStackNavigator();

export default function ProfileNavigator({route}){
    const loggedInUserID = route.params.loggedInUserID;
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerStyle: styles.header,
            headerTintColor: '#2A4242',
            }}>
            <Stack.Screen name="MyProfile" component={Profile} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="EditProfile" component={EditProfile} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="ChangePassword" component={EditPassword} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="Comments" component={ViewPostComments} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="Delete Post" component={DeletePost} options={{headerShown: true}} pinitialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="Delete Comment" component={DeleteComment} options={{headerShown: true}} pinitialParams={{ loggedInUserID: loggedInUserID }}/>
        </Stack.Navigator>
    ) 
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#9FE2BF",
      },
});