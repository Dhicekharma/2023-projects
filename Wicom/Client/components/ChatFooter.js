import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

function ChatFooter() {
 const [chatmessage,setChatmessage]= useState('');
  console.log(chatmessage)

  return (
    <View style={{}}>
      <Text>send message</Text>
      <TextInput
      autoCorrect={true}
      value={chatmessage}
      style={{height:40,borderWidth:2}}
      onChangeText={(chatmessage)=>setChatmessage(chatmessage)}
      />
      <Text>record msg</Text>
    </View>
  )
}

export default ChatFooter
