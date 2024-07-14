import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { icon, SIZES } from "../constants";

const SocialButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={icon} resizeMode="contain" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
  },
  icon: {
    height: 42,
    width: 42,
  },
});

export default SocialButton;
