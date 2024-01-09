import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../components/Messagecomponent";
import { groupsocket } from "../utils/index";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icons

export default function Messagescreen({ navigation, route }) {
  const { currentGroupName, currentGroupID } = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMesage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);

  function handleAddNewMessage() {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };

    if (currentUser) {
      groupsocket.emit("newChatMessage", {
        currentChatMesage,
        groupIdentifier: currentGroupID,
        currentUser,
        timeData,
      });

      setCurrentChatMessage("");
      Keyboard.dismiss();
    }
  }

  useEffect(() => {
    groupsocket.emit('findGroup', currentGroupID);
    groupsocket.on('foundGroup', (allChats) => setAllChatMessages(allChats));
  }, [groupsocket,currentChatMesage]);

  const [fileUri, setFileUri] = useState(null); // To store the selected file URI

  async function handleFileUpload() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow picking all types of files
      });

      if (result.type === 'success') {
        const fileUri = result.uri;
        console.log(fileUri)
        // Ensure that the file exists before reading it
        const fileInfo = await FileSystem.readAsStringAsync(fileUri);

        if (!fileInfo.exists) {
          console.error('File does not exist:', fileUri);
          return;
        }

        const fileArrayBuffer = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Now, you have the file as an ArrayBuffer in 'fileArrayBuffer'.
        // You can send this buffer over a WebSocket to your server.

        const timeData = {
          hr:
            new Date().getHours() < 10
              ? `0${new Date().getHours()}`
              : new Date().getHours(),
          mins:
            new Date().getMinutes() < 10
              ? `0${new Date().getMinutes()}`
              : new Date().getMinutes(),
        };

        groupsocket.emit('newFileMessage', {
          file: fileArrayBuffer,
          fileName: fileInfo.name,
          groupIdentifier: currentGroupID,
          currentUser,
          timeData,
        });

        // Set the file URI in state to display it if needed
        setFileUri(fileUri);
      }
    } catch (e) {
      console.error('Error handling file upload:', e);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
      >
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item }) => (
              <Messagecomponent item={item} currentUser={currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMesage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />

        <Pressable onPress={handleFileUpload} style={styles.iconButton}>
          <FontAwesome5 name="file-upload" size={24} color="#703efe" />
        </Pressable>

        <Pressable onPress={handleAddNewMessage} style={styles.iconButton}>
          <FontAwesome5 name="paper-plane" size={24} color="#703efe" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center", // Center icons vertically
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "#f5f5f5",
  },
});
