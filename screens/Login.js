import React, { useState, useCallback, useReducer } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, FONTS, icon } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input"; // Ensure the filename is "Input.js"
import Button from "../components/Button";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Checkbox from "expo-checkbox";
import SocialButton from "../components/SocialButton";
import * as Animatable from "react-native-animatable";
import axios from "axios"; // Add Axios
import AsyncStorage from "@react-native-async-storage/async-storage";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "example@gmail.com" : "",
    password: isTestMode ? "********" : "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isChecked, setChecked] = useState(false);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.137.31:3000/api/auth/login",
        {
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        }
      );

      if (response.data.token) {
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        console.log("Token Stored:", token); //storing the token and retrieving again from the backend after the user ID is formed in the backend..
        navigation.navigate("PersonalMedicalHistoryScreen");
      } else {
        Alert.alert("Login Failed", response.data.error);
      }
    } catch (error) {
      Alert.alert("An error occurred", "Please try again later.");
    } finally {
      setIsLoading(false);
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
          <Text style={styles.headerTitle}>Sign In</Text>
          <Text style={styles.subHeaderTitle}>
            Please sign in to your existing account
          </Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAwareScrollView>
            <Text style={styles.inputHeader}>Email</Text>
            <Input
              id="email"
              placeholder="Enter your email"
              placeholderTextColor={COLORS.black}
              onInputChanged={inputChangedHandler}
              keyboardType="email-address"
              errorText={formState.inputValidities["email"]}
            />
            <Text style={styles.inputHeader}>Password</Text>
            <Input
              id="password"
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={true}
              onInputChanged={inputChangedHandler}
              autoCapitalize="none"
              errorText={formState.inputValidities["password"]}
            />

            <View style={styles.checkboxContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  color={isChecked ? COLORS.primary : undefined}
                  onValueChange={setChecked}
                />

                <Text style={{ ...FONTS.body4 }}>Remember me</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Verification")}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                  {" "}
                  Forgot Password{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title="LOGIN"
              isLoading={isLoading}
              onPress={handleLogin} // Call handleLogin when pressed
            />

            <View style={styles.lineContainer}>
              <View style={styles.line} />

              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  textAlign: "center",
                }}
              ></Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: SIZES.padding2,
              }}
            >
              <SocialButton
                onPress={() =>
                  console.log("Implementing Social media authentication")
                }
                icon={icon.facebook}
              />
              <SocialButton
                onPress={() =>
                  console.log("Implementing Social media authentication")
                }
                icon={icon.google}
              />
              <SocialButton
                onPress={() =>
                  console.log("Implementing Social media authentication")
                }
                icon={icon.twitter}
              />
            </View>
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
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 16,
    width: 16,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
});

export default Login;
