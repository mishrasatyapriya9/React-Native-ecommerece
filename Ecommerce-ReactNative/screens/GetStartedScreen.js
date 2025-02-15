import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReusableButton from "../components/ReusableButton";

const GetStartedScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/blue-knitted-bag-still-life_23-2150709483.jpg?t=st=1719937619~exp=1719941219~hmac=094044a71b94ed2284318bf725c22a85550cdca10a602f3e6e5060868538c618&w=996",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to ShopKaro</Text>
        <Text style={styles.description}>
          ShopKaro is your one-stop shop for all your shopping needs. Get the
          best deals on a wide range of products.
        </Text>
        <ReusableButton title="Get Started" onPress={handleGetStarted} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default GetStartedScreen;
