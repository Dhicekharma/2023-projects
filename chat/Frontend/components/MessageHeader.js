import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    StatusBar,
    Keyboard,
  } from "react-native";
  import { GlobalContext } from "../context";
  import React, { useContext, useEffect, useState } from "react";
import { socket } from "../utils";
const ChatHeader = ({ title, onBackPress, onVideoCallPress }) => {
  const {currentGroupName} = useContext(GlobalContext);
    return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        {/* Placeholder for profile picture */}
        <Image
          source={require('../assets/icon.png')} // Placeholder image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{ currentGroupName}</Text>
      </View>
      <TouchableOpacity onPress={onVideoCallPress} style={styles.videoCallButton}>
        {/* Placeholder for video call icon */}
        <Text style={styles.iconText}>Video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#703efe', // Placeholder background color
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // To make it a circle
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Placeholder text color
  },
  videoCallButton: {
    padding: 10,
    borderRadius: 20, // To make it a circle
    backgroundColor: '#4CAF50', // Placeholder background color
  },
  iconText: {
    color: '#fff', // Placeholder icon/text color
    fontSize: 16, // Placeholder icon/text size
  },
});

export default ChatHeader;
