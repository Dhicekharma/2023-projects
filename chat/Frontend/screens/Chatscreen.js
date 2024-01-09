import React, { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ServerModalComponent from "../components/ServerModalComponent";
import ClientModalComponent from "../components/ClientModalComponent";

import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import Chatcomponent from "../components/Chatcomponent";
import NewGroupModal from "../components/Modal";
import { groupsocket } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const FooterButton = ({ text, isActive, icon, onPress }) => {
  return (
    <Pressable
      style={[
        styles.tabButton,
        isActive && styles.activeTab,
        { backgroundColor: isActive ? "#fff" : "#C147E9" },
      ]}
      onPress={() => {
        if (!isActive) {
          onPress();
        }
      }}
    >
      <View style={styles.buttonContent}>
        <FontAwesome
          name={icon}
          size={24}
          color={isActive ? "#703efe" : "#fff"}
        />
        <Text
          style={[styles.tabText, { color: isActive ? "#C147E9" : "#fff" }]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default function Chatscreen() {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("group"); // Initial active tab is "group"
  const [serverModalVisible, setServerModalVisible] = useState(false);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  
  useEffect(() => {
    groupsocket.emit("getAllGroups");

    groupsocket.on("groupList", (groups) => {
      console.log(groups, "hhhhhhhhhhhhhhhhhhhhhhh");
      setAllChatRooms(groups);
    });
  }, [groupsocket]);

  function handleLogout() {
    setCurrentUser("");
    setShowLoginView(false);
  }

  useEffect(() => {
    if (currentUser.trim() === "") navigation.navigate("Homescreen");
  }, [currentUser]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          {/* User Profile Icon */}
          <FontAwesome name="user" size={24} color="#fff" />

          {/* App Name */}
          <Text style={styles.heading}>Wi-Com</Text>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Welcome, {currentUser}</Text>
         
          </View>

          {/* Logout Button */}
          <Pressable onPress={handleLogout}>
            <AntDesign name="logout" size={30} color={"#fff"} />
          </Pressable>
        </View>
      </View>

      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({ item }) => <Chatcomponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Create New Group</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Join Group</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.bottomContainerM2}>
        <Pressable
          onPress={() => setServerModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Server</Text>
        </Pressable>
        <Pressable
          onPress={() => setClientModalVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Client</Text>
        </Pressable>
      </View>
   {serverModalVisible && (
  <ServerModalComponent
    isVisible={serverModalVisible}
    onClose={() => setServerModalVisible(false)} // Pass onClose function
  />
)}

{clientModalVisible && (
  <ClientModalComponent
    isVisible={clientModalVisible}
    onClose={() => setClientModalVisible(false)} // Pass onClose function
  />
)}
      {modalVisible && <NewGroupModal />}

      <View style={styles.footer}>
        <FooterButton
          text="Private Chat"
          isActive={activeTab === "private"}
          icon="lock" // Replace with your preferred icon for Private Chat0
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
            navigation.navigate("IoTscreen"); // Navigate to IoT Chat screen
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#f7f7f7",
    flex: 1,
  },

  topContainer: {
    backgroundColor: "#810CA8",
    height: 120, // Increased height for a larger header
    width: "100%",
    paddingHorizontal: 20, // Adjust horizontal padding
    justifyContent: "space-between", // Space between items in the header
    alignItems: "center", // Center items horizontally
    marginBottom: 15,
    flex: 0.3,
    borderBottomLeftRadius: 20, // Rounded corners for the header
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between elements in the header
    width: "100%",
    paddingVertical: 10, // Vertical padding within the header
  },
  heading: {
    color: "#f7f7f7",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10, // Add some spacing from the user icon
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10, // Add some spacing between elements
  },
  logoutIcon: {
    marginLeft: 10, // Add some spacing between elements
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  }, // Add some spacing between elements,
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  bottomContainerM2: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#C147E9",
    padding: 12,
    width: "50%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "#810CA8",
  },
  tabButton: {
    width: "32%",
    borderRadius: 10,
    backgroundColor: "#C147E9",
    marginHorizontal: 0,
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "#4a00b4",
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 5,
  },
  activeTab: {
    backgroundColor: "#fff",
    elevation: 10,
  },
});
