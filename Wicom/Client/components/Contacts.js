import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { userlistAtom } from '../assets/lib/userlistAtom';
import { io } from 'socket.io-client';
import { userDetailAtom } from '../assets/lib/userDetailsAtom';
import { userCredAtom } from '../assets/lib/useCredAtom';

const socket = io("http://192.168.106.207:4000");
function Contacts({ navigation }) {
  const [credentials, setCredentials] = useAtom(userCredAtom);
  const [chatmessage, setChatmessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userName] = useAtom(userDetailAtom);
  const [users, setUsers] = useAtom(userlistAtom);
  const [localIP, setLocalIP] = useState(null);

  useEffect(() => {
    socket.on('chat', (chatData) => {
      setChatMessages((prevMessages) => [...prevMessages, chatData]);
      console.log(chatData);
    });

    socket.on('users', (userList) => {
      setUsers(userList);
      console.log(userList);
    });


  }, []);


    socket.emit('new_users',(credentials) =>{
      credentials   
    });

console.log(credentials)
  const sendMessage = () => {
    if (chatmessage) {
      socket.emit('chat', {
        chatmessage: chatmessage,
        user: socket.user,
        recipientuser:users[0],
        timestamp: new Date().toISOString()
      });
      setChatmessage('');
    }
  };
  useEffect(() => {
    socket.emit("adduser", userName);
  }, [userName]);



  console.log(users) 
  const handleUserPress = (item) => {
    // Navigate to the Chat screen with the selected user's data
    navigation.navigate("Chat", { user: item });
  };

  const renderUserItem = useCallback(({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View>
        <Text>Profile</Text>
        <Text>{item[index]}</Text>
        <Text>Last Message</Text>
      </View>
    </TouchableOpacity>
  ), []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUserItem}
      />
    </View>
  );
}
export default Contacts;