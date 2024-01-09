import React, {useState ,useEffect} from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import io from "socket.io-client"; // Import the socket.io-client library
import { useAtom } from "jotai";
import { userDetailAtom } from "../assets/lib/userDetailsAtom";
import { userCredAtom } from "../assets/lib/useCredAtom";

export default function App({ navigation }) {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      tel: "",
      password: "",  }
  });

  const [userName,setUserName]=useAtom(userDetailAtom)
  const [credentials, setCredentials] = useAtom(userCredAtom);
  const [socket, setSocket] = useState(null);

  const onSubmit = (data) => {
  
    navigation.navigate("Home"); // Navigate to the "Home" screen
    setUserName(data.username)
  };
console.log (userName)
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Telephone"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="tel"
      />
      {errors.tel && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      {/* <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="UID"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="uid"
      />
      {errors.uid && <Text>This is required.</Text>} */}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
