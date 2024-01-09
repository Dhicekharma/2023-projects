import React from 'react'
import { Text, View ,StyleSheet} from 'react-native'

function IoTscreen() {
  return (
    <View>
        <Text>
            Coming Soon
        </Text>

        <View style={styles.footer}>
    <FooterButton
text="Private Chat"
isActive={activeTab === "private"}
icon="lock" // Replace with your preferred icon for Private Chat
onPress={() => {
  setActiveTab("private");
  navigation.navigate("PrivateChatScreen"); // Navigate to Private Chat screen
}}
/>
<FooterButton
text="Group Chat"
isActive={activeTab === "group"}
icon="group" // Replace with your preferred icon for Group Chat
onPress={() => {
  setActiveTab("group");
  navigation.navigate("Chatscreen"); // Navigate to Group Chat screen
}}
/>
<FooterButton
text="IoT Chat"
isActive={activeTab === "iot"}
icon="wifi" // Replace with your preferred icon for IoT Chat
onPress={() => {
  setActiveTab("iot");
  navigation.navigate("IoTChatscreen"); // Navigate to IoT Chat screen
}}
/>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({})
export default IoTscreen
