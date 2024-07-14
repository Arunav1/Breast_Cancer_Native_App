import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../components/Button";

import OTPTextInput from "react-native-otp-textinput";
import * as Animatable from "react-native-animatable";

const Register = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["rgba(230, 81, 0, 1)", "rgba(230, 81, 0, .8)"]}
        style={{ flex: 1 }}
      >
        <StatusBar hidden />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Verification</Text>
          <Text style={styles.subHeaderTitle}>Please verify your OTP</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAwareScrollView>
            <Text style={styles.inputHeader}>Code</Text>

            <OTPTextInput
              textInputStyle={styles.OTPstyle}
              inputCount={4}
              tintColor={COLORS.primary}
            />

            <Button
              title="SIGN UP"
              isLoading={isLoading}
              onPress={() => navigation.navigate("Login")}
            />
          </KeyboardAwareScrollView>
        </Animatable.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  subHeaderTitle: {
    ...FONTS.body4,
    color: COLORS.white,
    marginVertical: SIZES.padding,
    textAlign: "center",
  },
  inputHeader: {
    ...FONTS.body4,
    textTransform: "uppercase",
    marginVertical: 4,
  },
  OTPstyle: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 10,
    height: 58,
    width: 58,
    borderBottomWidth: 1,
  },
});

export default Register;
