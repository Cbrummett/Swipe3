import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

export default function StackNavigator() {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Log In" component={Login} />
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen 
                name="Swipe"
                component={DrawerNavigator}
                screenOptions={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
};