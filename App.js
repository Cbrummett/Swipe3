import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
//import User from './User.js'; 

const Drawer = createDrawerNavigator();
let IsLoggedIn = false;
//const LoggedInUser = User;

export default function App() {
  if (IsLoggedIn == false){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={Login}/>
          <Drawer.Screen name="Feed" component={Feed}/>
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Create A Post" component={CreateAPost} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Profile">
          <Drawer.Screen name="Log Out" component={LogOut}/>
          <Drawer.Screen name="Feed" component={Feed}/>
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Create A Post" component={CreateAPost} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

function Login({ navigation }) {// add register button
  return(
    <View>
      <Text style={styles.heading} >This is the Login page</Text>
      <TextInput style={styles.textbox} placeholder='Username'></TextInput>
      <TextInput style={styles.textbox} placeholder='password'></TextInput>
      <Pressable style={styles.button} onPress={TryLogin}>
      <Text style={styles.text}>Log in</Text>
    </Pressable>
    </View>
  )
}

function LogOut({ navigation }) {
  return(
    <View>
      <Text style={styles.heading} >This is the Log out page</Text>
    </View>
  )
}

function Feed({ navigation }) {
  return(
    <View>
      <Text style={styles.heading} >This is your Feed</Text>
    </View>
  )
}

function Profile({ navigation }) {
  return(
    //get the information from logged in user and check if logged in then grab data from db
    <View>
      <Text style={styles.heading} >This is the profile page</Text>
    </View>
  )
}

function CreateAPost({ navigation }) {
  return(
    <View>
      <Text style={styles.heading} >This is the Create a Post page</Text>
      <TextInput></TextInput>
      
    </View>
  )
}

function TryLogin({navigation}) {// needs a user passed into it
// validate user
// check db for user/pass combo
IsLoggedIn = true;
return (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Log Out" component={LogOut}/>
      <Drawer.Screen name="Feed" component={Feed}/>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Create A Post" component={CreateAPost} />
    </Drawer.Navigator>
  </NavigationContainer>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center'
  },
  textbox: {
    fontSize: 30,
    textAlign: 'center',

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

});
