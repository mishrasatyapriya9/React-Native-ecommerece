import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //send a post request to the backend API
    axios
      .post("http://192.168.162.41:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Succesfull",
          "You have registered successfully"
        );
        setEmail("");
        setName("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occured during registration"
        );
        console.log("Registaration failed", error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, margin: 40 }}
          source={{
            uri: "https://imagetolink.com/ib/WBjsJjlV3k.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 2,
              color: "#041E42",
            }}
          >
            Register to Your Account{" "}
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,

              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 8,
                width: 260,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,

            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <MaterialIcons
            style={{ marginLeft: 8 }}
            name="email"
            size={24}
            color="gray"
          />
          <TextInput
            style={{
              color: "gray",
              marginVertical: 8,
              width: 260,
              fontSize: email ? 16 : 16,
            }}
            placeholder="Enter your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,

              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              style={{
                color: "gray",
                marginVertical: 8,
                width: 260,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter your Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Forgot password
          </Text>
        </View>

        <View style={{ marginTop: 34 }} />
        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
