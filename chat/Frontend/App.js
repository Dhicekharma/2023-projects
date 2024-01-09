import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Homescreen from "./screens/Homescreen";
import Chatscreen from "./screens/Chatscreen";
import Messagescreen from "./screens/Messagescreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalState from "./context";
import PrivateChatscreen from "./components/PrivateChatComponent";
import ChatHeader from "./components/MessageHeader";
import ClientComponent from "./components/ClientModalComponent";

import IoTscreen from "./screens/IoTscreen";
import privateMessagescreen from "./components/PrivateMessagescreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          {/* all the screens here */}
          <Stack.Screen
            name="Homescreen"
            component={Homescreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatscreen"
            component={Chatscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Messagescreen" component={Messagescreen}    options={{ headerTitle: (props) => <ChatHeader /> }}/>
          <Stack.Screen name="PrivateChatScreen" component={PrivateChatscreen}  />
        <Stack.Screen name="IoTscreen" component={IoTscreen} /> 
        {/* <Stack.Screen name="ClientComponent" component={ClientComponent}    options={{ headerTitle: false }}/>
          <Stack.Screen name="ServerComponent" component={ServerComponent} 
        */}
        <Stack.Screen name="PrivateMessagescreen" component={privateMessagescreen}    options={{ headerTitle: (props) => <ChatHeader /> }}/>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true}/>
    </GlobalState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
