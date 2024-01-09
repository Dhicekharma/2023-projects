import { useAtom } from 'jotai';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { io } from 'socket.io-client';
import { userDetailAtom } from '../assets/lib/userDetailsAtom';
import NetInfo from "@react-native-community/netinfo";
import { userlistAtom } from '../assets/lib/userlistAtom';

const socket = io("http://192.168.180.207:4000");

function ChatContainer() {
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

    const fetchLocalIP = async () => {
      try {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
          const ip = state.details.ipAddress;
          setLocalIP(ip);
          console.log(ip);
        }
      } catch (error) {
        console.error('Error fetching local IP:', error);
      }
    };

    fetchLocalIP();
  }, []);


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

  const renderChatItem = useCallback(({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.username}>{item.user}:</Text>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
      <Text style={styles.timestamp}>{item.id}</Text>
    </View>
  ), []);
  console.log(users);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={chatMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderChatItem}
        />
      </ScrollView>
    <View>
      <Text>Send message</Text>
      <TextInput
        autoCorrect={true}
        value={chatmessage}
        style={{ height: 40, borderWidth: 2 }}
        onChangeText={(text) => setChatmessage(text)}
      />
      <Text>Record msg</Text>
      <Button title="Send" onPress={sendMessage} />
    </View>
  </View>
);
}



const styles = StyleSheet.create({
  
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  messageText: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  timestamp: {
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  
  scrollView: {
    backgroundColor: 'pink',
    height:500
  },
});

export default ChatContainer;
