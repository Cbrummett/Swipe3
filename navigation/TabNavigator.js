import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Home from "../screens/Home";
import CreatePost from "../screens/CreatePost";
import ProfileNavigator from "./ProfileNavigator";
import FeedNavigator from "./FeedNavigator";


const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Feed':
        iconName = 'article';
        break;
      case 'Post':
        iconName = 'add';
        break;
      case 'Profile':
        iconName = 'person';
        break;
      default:
        break;
    }
    return <MaterialIcons name={iconName} color={color} size={24} />;
};

export default function TabNavigator({route}) {
   const loggedInUserID = route.params.loggedInUserID;
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarActiveTintColor: '#2A4242',
            tabBarInactiveTintColor: 'white',
            tabBarStyle:{
                backgroundColor: '#9FE2BF',
                height: 80,
            },
            tabBarIcon: ({color}) => screenOptions(route, color)
        })}>
            
            <Tab.Screen name="Feed" component={FeedNavigator} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Tab.Screen name="Post" component={CreatePost} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Tab.Screen name="Profile" component={ProfileNavigator} initialParams={{ loggedInUserID: loggedInUserID }}/>
        </Tab.Navigator>
    )
}