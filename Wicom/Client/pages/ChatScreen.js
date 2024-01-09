import React, { Component } from 'react';
import { View} from'react-native';
import ChatHeader from '../components/ChatHeader';


import ChatContainer from '../components/ChatContainer';
import { useState } from 'react';
import { io } from 'socket.io-client';


export default class ChatScreen extends Component {
    render() { 
    
    return (
      <View >
        <ChatHeader />
        <ChatContainer/>
        
      </View>
    );
  }
}