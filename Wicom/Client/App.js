import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import ChatScreen from './pages/ChatScreen';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Registration from './components/Registration';
import Contacts from './components/Contacts';
 
export class App extends Component {
  
  render() {
    const Stack = createNativeStackNavigator();
    return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Landing" component={Landing}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="contacts" component={Contacts}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

export default App
