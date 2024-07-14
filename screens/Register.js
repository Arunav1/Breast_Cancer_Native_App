import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input"; // Ensure the filename is "Input.js"
import Button from "../components/Button";
import * as Animatable from "react-native-animatable";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import axios from "axios";

const isTestMode = true;

const initialState = {
  inputValues: {
    fullName: isTestMode ? "John Doe" : "",
    email: isTestMode ? "example@gmail.com" : "",
    password: isTestMode ? "********" : "",
    confirmPassword: isTestMode ? "********" : "",
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  formIsValid: false,
};

const Register = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const handleRegister = async () => {
    if (!formState.formIsValid) {
      alert("Please fill out all fields correctly");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.194.185:3000/api/auth/register", // Use your local IP here
        {
          fullName: formState.inputValues.fullName,
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        }
      );

      setIsLoading(false);

      if (response.status !== 201) {
        throw new Error(response.data.message || "Something went wrong!");
      }
      alert("Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["rgba(230, 81, 0, 1)", "rgba(230, 81, 0, .8)"]}
        style={{ flex: 1 }}
      >
        <StatusBar hidden />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Register</Text>
          <Text style={styles.subHeaderTitle}>
            Please register to create a new account
          </Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAwareScrollView>
            <Text style={styles.inputHeader}>Full Name</Text>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities.fullName}
              placeholderTextColor={COLORS.black}
            />
            <Text style={styles.inputHeader}>Email</Text>
            <Input
              id="email"
              placeholder="Enter your email"
              placeholderTextColor={COLORS.black}
              onInputChanged={inputChangedHandler}
              keyboardType="email-address"
              errorText={formState.inputValidities.email}
            />
            <Text style={styles.inputHeader}>Password</Text>
            <Input
              id="password"
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              onInputChanged={inputChangedHandler}
              autoCapitalize="none"
              errorText={formState.inputValidities.password}
            />
            <Text style={styles.inputHeader}>Confirm Password</Text>
            <Input
              id="confirmPassword"
              placeholder="Confirm your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry
              onInputChanged={inputChangedHandler}
              autoCapitalize="none"
              errorText={formState.inputValidities.confirmPassword}
            />
            <Button
              title="SIGN UP"
              isLoading={isLoading}
              onPress={handleRegister}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.loginLinkContainer}
            >
              <Text style={styles.loginLinkText}>
                Already registered? Login here
              </Text>
            </TouchableOpacity>
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
  loginLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: COLORS.primary,
    ...FONTS.body4,
  },
});

export default Register;
