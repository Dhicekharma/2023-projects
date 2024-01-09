// network.js
import { Platform } from "react-native";
import { io } from "socket.io-client";
import { NetworkInfo } from "react-native-network-info";

// Function to get the correct IP address based on the platform
const getIpAddress = () => {
  return Platform.OS === "android"
    ? "http://192.168.43.27:4000/"
    : "http://localhost:3000";
};

// Function to initialize the socket connection
const initializeSocket = () => {
  const ipAddress = getIpAddress();
  const socket = io.connect("http://10.215.0.145:4000/");
  return socket;
};

export const socket = initializeSocket();

// Function to get and log the local IP address
export const getLocalIpAddress = () => {
  NetworkInfo.getIPAddress((ip) => {
    console.log("Local IP Address:", ip);
  });
};

// Function to get and log the IPV4 address
export const getIpv4Address = async () => {
  const ipv4Address = await NetworkInfo.getIPV4Address();
  console.log("IPv4 Address:", ipv4Address);
};

export const groupsocket = io.connect("http://10.215.0.145:4000/groups");
export const privatesocket = io.connect("http://10.215.0.145:4000/private");
