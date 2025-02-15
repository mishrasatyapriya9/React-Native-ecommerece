// components/CustomTextInput.js

import React from "react";
import { TextInput, StyleSheet } from "react-native";

const ReusableTextField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      style={[
        styles.textInput,
        style,
        { color: value ? "black" : placeholderTextColor },
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: "gray",
    marginVertical: 8,
    width: 260,
    fontSize: 16,
  },
});

export default ReusableTextField;
