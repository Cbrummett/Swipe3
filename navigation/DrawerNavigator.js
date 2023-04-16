import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {StyleSheet } from "react-native";

import TabNavigator from "./TabNavigator";
import LogOut from "../screens/LogOut";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({route} ) {
    const {loggedInUserID} = route.params;
        return(
        <Drawer.Navigator screenOptions={{ 
            headerShown: true, 
            headerStyle: styles.header,
            headerTintColor: '#2A4242',
            drawerActiveBackgroundColor: '#9FE2BF',
            drawerActiveTintColor: '#2A4242',
            drawerInactiveTintColor: '#2A4242',
            }}>
            <Drawer.Screen name="Home"  component={TabNavigator} initialParams={{ loggedInUserID: loggedInUserID }}/>
            <Drawer.Screen name="Log Out" component={LogOut}/>
        </Drawer.Navigator>   
    );   
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#9FE2BF",
      },
});

