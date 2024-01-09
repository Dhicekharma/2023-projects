import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  LayoutAnimation, // Import LayoutAnimation
} from "react-native";
import homeImage from "../assets/bg.jpg";
import { GlobalContext } from "../context";
import { socket } from "../utils";

export default function HomeScreen({ navigation }) {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  function togglePasswordVisibility() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowPassword(!showPassword);
  }

  function handleRegisterAndSignIn(isLogin) {
    if (currentUserName.trim() !== "" && currentPassword.trim() !== "") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{8,}$/;

      if (!passwordRegex.test(currentPassword)) {
        let missingRequirements = [];

        if (!/(?=.*[A-Z])/.test(currentPassword)) {
          missingRequirements.push("an uppercase letter");
        }

        if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(currentPassword)) {
          missingRequirements.push("a special symbol");
        }

        if (!/(?=.*\d)/.test(currentPassword)) {
          missingRequirements.push("a number");
        }

        Alert.alert(
          "Invalid password",
          `Password must be at least 8 characters long and contain ${missingRequirements.join(", ")}.`
        );
        return;
      }

      if (isLogin) {
        // Emit the "login" event when logging in
        socket.emit("login", {
          username: currentUserName,
          password: currentPassword,
        });
      } else {
        // Emit the "register" event when registering
        socket.emit("register", {
          username: currentUserName,
          password: currentPassword,
        });
      }

      // Do not change the state (setCurrentUser) here.

      setCurrentUserName("");
      setCurrentPassword("");
    } else {
      Alert.alert("Both username and password are required.");
    }

    Keyboard.dismiss();

    // Listen for login success event
    socket.on("loginSuccess", () => {
      setCurrentUser(currentUserName);
    });

    // Listen for login failure event
    socket.on("loginFailed", (error) => {
      Alert.alert("Login Failed", error);
    });

    // Listen for registration success event
    socket.on("registrationSuccess", (message) => {
      setCurrentUser(currentUserName);
    });

    // Listen for registration failure event
    socket.on("registrationFailed", (error) => {
      Alert.alert("Registration Failed", error);
    });
  }

  useEffect(() => {
    if (currentUser.trim() !== "") {
      console.log("Navigating to ChatScreen");
      navigation.navigate("Chatscreen");
    }
  }, [currentUser]);

  return (
   
    <View style={styles.mainWrapper}>
      
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.heading}>Enter Your User Name</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your username"
                style={styles.loginInput}
                onChangeText={(value) => setCurrentUserName(value)}
                value={currentUserName}
              />
         <View style={styles.passwordInputContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                style={styles.loginInput}
                onChangeText={(value) => setCurrentPassword(value)}
                value={currentPassword}
              />
              <Pressable
                onPress={togglePasswordVisibility}
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPasswordButtonText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register</Text>
              </Pressable>
              <Pressable
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>
            </View>
          </View>
        ) : (


          <View style={styles.infoBlock}>
            <ImageBackground source={homeImage} style={styles.homeImage} />
            <Text style={styles.heading}>Connect, Grow, and Inspire</Text>
            <Text style={styles.subHeading}>
              Connect people around the world for free
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}
            >
              <View>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {

    backgroundColor: "#fff",
    justifyContent: "center", // Center content vertically
  },
  homeImage: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    height: "80%",
    marginVertical:0,
    paddingVertical:0,
  },
  content: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
 
infoBlock: {
    width: "100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  loginInputContainer: {
    width: "80%", // Adjust the width as needed
    alignItems: "center",
  },
  loginInput: {
    width: "100%",
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  passwordInputContainer: {
    position: "relative",
    width: "100%",
  },
  showPasswordButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  showPasswordButtonText: {
    color: "#703efe",
  },
  button: {
    backgroundColor: "#703efe",
    padding: 15,
    marginVertical: 10,
    width: "50%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
