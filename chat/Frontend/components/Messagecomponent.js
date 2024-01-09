import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Messagecomponent({ currentUser, item }) {
  const currentUserStatus = item.currentUser !== currentUser;

  // Check if the message is a file (array buffer)
  const isFileMessage = item.file instanceof ArrayBuffer;

  return (
    <View
      style={currentUserStatus ? {} : { alignItems: "flex-end" }}
    >
      <View style={styles.messageItemWrapper}>
        <View style={styles.messageItemInnerWrapper}>
          {isFileMessage ? (
            // Display the file message as an image (you can customize this)
            <Image
              source={{ uri: `data:image/jpeg;base64,${arrayBufferToBase64(item.file)}` }}
              style={styles.fileImage}
            />
          ) : (
            // Display text message
            <View
              style={
                currentUserStatus
                  ? styles.messageItem
                  : [styles.messageItem, { backgroundColor: "#703efe" }]
              }
            >
              {/* Display the sender's name */}
              <Text
                style={currentUserStatus ? { color: "#000" } : { color: "#e5c1fe" }}
              >
                {item.senderName}{item.currentUser}: {item.text}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
}

// Function to convert array buffer to base64 (for displaying the file)
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const styles = StyleSheet.create({
  messageItemWrapper: {
    maxWidth: "50%",
    marginBottom: 15,
  },
  messageItemInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 2,
  },
  messageTime: {
    marginLeft: 10,
  },
  fileImage: {
    width: 200, // Adjust the width and height as needed
    height: 200,
  },
});
