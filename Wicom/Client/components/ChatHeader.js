import { useAtom } from 'jotai';
import React from 'react'
import { View ,Text} from 'react-native'
import { userDetailAtom } from '../assets/lib/userDetailsAtom';

function ChatHeader() {
  const [userName] = useAtom(userDetailAtom);
  return (
    <View>
     
    <View style={styles.topContainer}>
    <View style={styles.header}> 
    <Text>profile</Text>
      <Pressable onPress={handleLogout}>
        <AntDesign name="logout" size={30} color={"black"} />
      </Pressable>
      <Text style={styles.heading}>Wi-Com</Text>
      
    </View>
  <Text style={{}}>welcome! {currentUser}</Text>
  </View>
  <Text>call ,take pic,options</Text>
  </View>
  )
}

export default ChatHeader;
