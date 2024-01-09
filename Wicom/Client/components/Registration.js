import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { userCredAtom } from '../assets/lib/useCredAtom';

function Registration({ navigation }) {
  const [credentials, setCredentials] = useAtom(userCredAtom);
  
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      username: "",
      Email: "",
      password: "",
      confirmPassword: "",
    },
  });

  

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      navigation.navigate("SignUp",{ credentials:data });
      setCredentials((prevCred) => ({ ...prevCred, ...data }));
    } else {
      // Handle the case when passwords don't match
    }
  };

  useEffect(() => {
    console.log(credentials); // Log credentials in the effect
  }, [credentials]); // Run the effect when credentials change

  const validatePasswordMatch = (value) => {
    const formData = getValues(); // Use getValues() from useForm
    const { password } = formData;
    return password === value || "Passwords do not match";
  };
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
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
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="Email"
      />
      {errors.Email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
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

      <Controller
        control={control}
        rules={{
          required: true,
          validate: validatePasswordMatch, // Add custom validation
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Registration;
