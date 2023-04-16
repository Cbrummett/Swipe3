import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {StyleSheet } from "react-native";
import Home from '../screens/Home';
import ViewComments from '../screens/ViewComments';
import VisitProfile from '../screens/VisitProfile';
import ViewProfileViewComments from '../screens/ViewProfileViewComments';
import DeleteComment from '../screens/DeleteComment';
import DeleteOwnComment from '../screens/DeleteOwnComment';


const Stack = createStackNavigator();

export default function FeedNavigator({route}){
    const loggedInUserID = route.params.loggedInUserID;
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerStyle: styles.header,
            headerTintColor: '#2A4242',
            }}>
            <Stack.Screen name="Home" component={Home} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="ViewComments" component={ViewComments} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="ViewProfileViewComments" component={ViewProfileViewComments} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="VisitProfile" component={VisitProfile} options={{headerShown: true }} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="Delete Comment" component={DeleteComment} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Stack.Screen name="DeleteOwnComment" component={DeleteOwnComment} initialParams={{ loggedInUserID: loggedInUserID }}/>
        </Stack.Navigator>
    )
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#9FE2BF",
      },
});