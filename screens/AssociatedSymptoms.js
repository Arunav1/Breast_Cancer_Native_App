import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Alert,
} from "react-native";
import CustomRadioButton from "../components/RadioButton";
import ImageGrid from "../components/ImageGrid";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AssociatedSymptoms = ({ route }) => {
  // Destructure 'data' directly from 'route.params'
  const { data } = route.params;

  const [savedData, setSavedData] = useState();
  const [date, setDate] = useState(data.date);
  const [haveAssociatedSymptoms, setHaveAssociatedSymptoms] = useState("");
  const [haveSwelling, setHaveSwelling] = useState("");
  const [haveWhichBreastSwelling, setHaveWhichBreastSwelling] = useState("");
  const [haveFatigue, setHaveFatigue] = useState("");
  const [haveIrritation, setHaveIrritation] = useState("");
  const [haveNippleInversion, setHaveNippleInversion] = useState("");
  // const [haveWhichInversion, setHaveWhichInversion] = useState("");
  const [haveWhichNippleInversion, setHaveWhichNippleInversion] = useState("");
  const [haveWhichNippleInversionOnLeft, setHaveWhichNippleInversionOnLeft] =
    useState("");

  const [haveWhichNippleInversionOnRight, setHaveWhichNippleInversionOnRight] =
    useState("");
  const [haveRashes, setHaveRashes] = useState("");
  const [toggler, toggle] = useState("Left");

  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  if (data.from == "DailyEntry") {
    selectedPain = data.selectedPain;
    painLevel = data.painLevel;
    periodDay = data.selectedPeriodDay;
    side = data.selectedSide;
    leftLocations = data.selectedLeftLocations;
    rightLocations = data.selectedRightLocations;
  } else {
    console.log("From Home");
  }

  // Modal Functions
  const [isModal1Visible, setModal1Visible] = useState(false);
  const [isModal2Visible, setModal2Visible] = useState(false);
  const [isModal3Visible, setModal3Visible] = useState(false);
  const [isModal4Visible, setModal4Visible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(5)).current;

  // Function for Toggling Modal 1
  const toggleModal1 = () => {
    if (isModal1Visible) {
      fadeOut1();
    } else {
      setModal1Visible(true);
      fadeIn();
    }
  };

  // Function for Toggling Modal 2
  const toggleModal2 = () => {
    if (isModal2Visible) {
      fadeOut2();
    } else {
      setModal2Visible(true);
      fadeIn();
    }
  };

  // Function for Toggling Modal 3
  const toggleModal3 = () => {
    if (isModal3Visible) {
      fadeOut3();
    } else {
      setModal3Visible(true);
      fadeIn();
    }
  };

  // Function for Toggling Modal 4
  const toggleModal4 = () => {
    if (isModal4Visible) {
      fadeOut4();
    } else {
      setModal4Visible(true);
      fadeIn();
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Fade out function for Modal 1
  const fadeOut1 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModal1Visible(false);
    });
  };
  // Fade out function for Modal 2
  const fadeOut2 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setModal2Visible(false);
    });
  };
  // Fade out function for Modal 3
  const fadeOut3 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setModal3Visible(false);
    });
  };
  // Fade out function for Modal 4
  const fadeOut4 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setModal4Visible(false);
    });
  };

  // Questions starts
  const question1 = ["Have Other Symptoms?"];
  const options1 = [
    {
      id: "1",
      label: "Yes",
      value: "Yes",
    },
    {
      id: "2",
      label: "No",
      value: "No",
    },
  ];

  const question2 = ["Swelling?"];
  const options2 = [
    {
      id: "1",
      label: "Yes",
      value: "Yes",
    },
    {
      id: "2",
      label: "No",
      value: "No",
    },
  ];

  const question3 = ["Which Side?"];
  const options3 = [
    {
      id: "1",
      label: "Left",
      value: "Left",
    },
    {
      id: "2",
      label: "Right",
      value: "Right",
    },
    {
      id: "3",
      label: "Both",
      value: "Both",
    },
  ];

  const question4 = "Fatigue?";
  const options4 = [
    {
      id: "1",
      label: "Yes",
      value: "Yes",
    },
    {
      id: "2",
      label: "No",
      value: "No",
    },
  ];

  const question5 = "Irritation";
  const options5 = [
    {
      id: "1",
      label: "Yes",
      value: "Yes",
    },
    {
      id: "2",
      label: "No",
      value: "No",
    },
  ];

  const question6 = "Nipple Inversion";
  const options6 = [
    {
      id: "1",
      label: "Yes",
      value: "Yes",
    },
    {
      id: "2",
      label: "No",
      value: "No",
    },
  ];

  const question7 = "Rashes?";
  const options7 = [
    {
      id: "1",
      label: "Yes",
      value: "Yes",
    },
    {
      id: "2",
      label: "No",
      value: "No",
    },
  ];

  // Images starts
  const nippleInversionImages = [
    {
      path: require("../Photos/FlatNipple.png"),
      label: "Flat",
      value: "Flat",
    },
    {
      path: require("../Photos/InvertedNipple.png"),
      label: "Inverted",
      value: "Inverted",
    },
  ];

  // What will happen on press of Preview
  const handlePreviewButton = () => {
    if (haveAssociatedSymptoms === "Yes") {
      if (
        haveSwelling !== "" &&
        haveFatigue !== "" &&
        haveIrritation !== "" &&
        haveNippleInversion !== "" &&
        haveRashes !== ""
      ) {
        if (haveNippleInversion === "Yes") {
          if (haveWhichNippleInversion === "Left") {
            if (haveWhichNippleInversionOnLeft !== null) {
              toggleModal4();
            } else {
              Alert.alert("Choose the Inversion of the Left Nipple");
            }
          }
          if (haveWhichNippleInversion === "Right") {
            if (haveWhichNippleInversionOnRight !== null) {
              toggleModal4();
            } else {
              Alert.alert("Choose the Inversion of the Right Nipple");
            }
          }
          if (haveWhichNippleInversion === "Both") {
            if (
              haveWhichNippleInversionOnLeft !== null &&
              haveWhichNippleInversionOnRight !== null
            ) {
              toggleModal4();
            } else {
              if (haveWhichNippleInversionOnLeft === null) {
                Alert.alert("Choose the Inversion of the Left Nipple");
              } else if (haveWhichNippleInversionOnRight === null) {
                Alert.alert("Choose the Inversion of the Right Nipple");
              }
            }
          }
        }

        if (haveSwelling === "Yes") {
          if (haveWhichBreastSwelling !== "") {
            toggleModal4();
          } else {
            Alert.alert("Choose which Breast Swelling");
          }
        } else {
          toggleModal4();
        }
      } else {
        Alert.alert("Fill all the details");
      }
    } else if (haveAssociatedSymptoms === "No") {
      toggleModal4();
    }
  };
  //Token retrieval from the middleware:
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        console.log("Token Retrieved:", token); // Debug log
        return token;
      } else {
        console.error("Token Not Found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving token", error);
      return null;
    }
  };

  // What will happen on clicking the save icon in the preview Modal.
  const handleSaveButton = async () => {
    try {
      const token = await getToken();
      const payload = {
        date,
        haveAssociatedSymptoms,
        haveSwelling,
        haveWhichBreastSwelling,
        haveFatigue,
        haveIrritation,
        haveNippleInversion,
        haveWhichNippleInversion,
        haveWhichNippleInversionOnLeft,
        haveWhichNippleInversionOnRight,
        haveRashes,
      };

      if (!token) {
        Alert.alert("Error", "user is not authenticated");
        return;
      } else {
        console.log("Sending Payload:", payload);
        const response = await axios.post(
          "http://192.168.137.31:3000/AssociatedSymptoms",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 201) {
          setSavedData(response.data);
          console.log("Data Saved Successfully:", response.data);
          Alert.alert("Data saved successfully");
          navigation.navigate("BottomTab");
        } else {
          console.error("Error Saving Data:", response.data);
          Alert.alert("Failed to save data. Please try again.");
        }
      }
    } catch (error) {
      console.error("error, reverting to catch block");
    }
    toggleModal4();
    if (haveAssociatedSymptoms == "Yes") {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Dashboard");
    }
  };

  // Manage the input of the which Nipple inversion
  const onSelectHaveWhichNippleInversion = (value) => {
    if (value === "Left") {
      setHaveWhichNippleInversion(value);
      toggleModal1();
    } else if (value === "Right") {
      setHaveWhichNippleInversion(value);
      toggleModal2();
    } else if (value === "Both") {
      setHaveWhichNippleInversion(value);
      toggleModal3();
    }
  };

  // Change the value of toggler to Left, to show the left part
  const changeToLeft = () => {
    toggle("Left");
  };
  // Change the value of toggler to Right, to show the Right part
  const changeToRight = () => {
    toggle("Right");
  };

  // Structure Starts
  return (
    <LinearGradient colors={["#E582AD", "#7131DD"]} style={styles.container}>
      {/* Page Header starts here */}
      <View style={styles.header}>
        {/* Icons Section in Header starts here */}
        <View style={styles.icons}>
          {/* Profile Icon in Icons Section in Header */}
          <View style={styles.profileIcon}>
            {/* Profile icon Image */}
            <Image
              source={require("../Photos/user.png")}
              style={styles.iconImage}
            />
          </View>

          {/* Date in Icons Section in Header Starts*/}
          <View style={styles.date}>
            {/* Displaying the Current date by default and Selected date on Selection starts here */}
            <Text style={styles.text}>{data.date}</Text>
            {/* Displaying the Current date by default and Selected date on Selection ends here */}
          </View>
          {/* Date in Icons Section in Header Ends*/}
        </View>
        {/* Icons Section in Header ends here */}
      </View>
      {/* Page Header ends here */}
      {/* Text Content under header starts */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.bodyTitleText}>Log Other Symptoms</Text>
        </Text>
      </View>
      {/* Text Content under header ends */}
      {/* Bottom Slider Starts */}

      <View style={styles.sliderContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent1}
          ref={scrollViewRef}
        >
          {/* 1st. Do you have other symptoms */}
          <View style={styles.first_section}>
            <CustomRadioButton
              question={question1}
              options={options1}
              onSelect={(value) => setHaveAssociatedSymptoms(value)}
            />
          </View>
          {haveAssociatedSymptoms == "Yes" && (
            <View style={styles.section}>
              <View style={styles.question}>
                <CustomRadioButton
                  question={question2}
                  options={options2}
                  onSelect={(value) => setHaveSwelling(value)}
                />
              </View>
              {haveSwelling == "Yes" && (
                <View style={styles.question}>
                  <CustomRadioButton
                    question={question3}
                    options={options3}
                    onSelect={(value) => setHaveWhichBreastSwelling(value)}
                  />
                </View>
              )}
            </View>
          )}
          {haveAssociatedSymptoms == "Yes" && (
            <View style={styles.section}>
              <View style={styles.question}>
                <CustomRadioButton
                  question={question4}
                  options={options4}
                  onSelect={(value) => setHaveFatigue(value)}
                />
              </View>
            </View>
          )}
          {haveAssociatedSymptoms == "Yes" && (
            <View style={styles.section}>
              <View style={styles.question}>
                <CustomRadioButton
                  question={question5}
                  options={options5}
                  onSelect={(value) => setHaveIrritation(value)}
                />
              </View>
            </View>
          )}
          {haveAssociatedSymptoms == "Yes" && (
            <View style={styles.section}>
              <View style={styles.question}>
                <CustomRadioButton
                  question={question6}
                  options={options6}
                  onSelect={(value) => setHaveNippleInversion(value)}
                />
              </View>
              {haveNippleInversion == "Yes" && (
                <View style={styles.question}>
                  <CustomRadioButton
                    question={question3}
                    options={options3}
                    onSelect={onSelectHaveWhichNippleInversion}
                  />
                </View>
              )}
              {haveNippleInversion == "Yes" &&
                haveWhichNippleInversion == "Left" && (
                  <Modal
                    transparent={true}
                    visible={isModal1Visible}
                    animationType="none"
                  >
                    <TouchableOpacity style={styles.backdrop} activeOpacity={0}>
                      <Animated.View
                        style={[styles.modalContent, { opacity: fadeAnim }]}
                      >
                        <Text style={styles.modalSectionTitle}>
                          Left Nipple
                        </Text>
                        <View style={styles.modalSection}>
                          <ImageGrid
                            images={nippleInversionImages}
                            onSelect={setHaveWhichNippleInversionOnLeft}
                            toggleable={true}
                            defaultSelected={haveWhichNippleInversionOnLeft}
                          />
                        </View>
                        <View style={styles.modalButtonSection}>
                          <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleModal1}
                          >
                            <Ionicons
                              name="checkmark-outline"
                              size={28}
                              color="white"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleModal1}
                          >
                            <Ionicons
                              name="close"
                              size={28}
                              color="white"
                              onPress={toggleModal1}
                            />
                          </TouchableOpacity>
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  </Modal>
                )}
              {haveNippleInversion == "Yes" &&
                haveWhichNippleInversion == "Right" && (
                  <Modal
                    transparent={true}
                    visible={isModal2Visible}
                    animationType="none"
                  >
                    <TouchableOpacity style={styles.backdrop} activeOpacity={0}>
                      <Animated.View
                        style={[styles.modalContent, { opacity: fadeAnim }]}
                      >
                        <Text style={styles.modalSectionTitle}>
                          Right Nipple
                        </Text>
                        <View style={styles.modalSection}>
                          <ImageGrid
                            images={nippleInversionImages}
                            onSelect={setHaveWhichNippleInversionOnRight}
                            toggleable={true}
                            defaultSelected={haveWhichNippleInversionOnRight}
                          />
                        </View>
                        <View style={styles.modalButtonSection}>
                          <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleModal2}
                          >
                            <Ionicons
                              name="checkmark-outline"
                              size={28}
                              color="white"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleModal2}
                          >
                            <Ionicons
                              name="close"
                              size={28}
                              color="white"
                              onPress={toggleModal2}
                            />
                          </TouchableOpacity>
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  </Modal>
                )}
              {haveNippleInversion == "Yes" &&
                haveWhichNippleInversion == "Both" && (
                  <Modal
                    transparent={true}
                    visible={isModal3Visible}
                    animationType="none"
                    onRequestClose={toggleModal3}
                  >
                    <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
                      <Animated.View
                        style={[styles.modalContent, { opacity: fadeAnim }]}
                      >
                        {toggler === "Left" && (
                          <>
                            <Text style={styles.modalSectionTitle}>
                              Left Nipple?
                            </Text>
                            <View style={styles.modalSection}>
                              <ImageGrid
                                images={nippleInversionImages}
                                onSelect={setHaveWhichNippleInversionOnLeft}
                                toggleable={true}
                                defaultSelected={haveWhichNippleInversionOnLeft}
                              />
                            </View>
                          </>
                        )}

                        {toggler === "Right" && (
                          <>
                            <Text style={styles.modalSectionTitle}>
                              Right Nipple?
                            </Text>
                            <View style={styles.modalSection}>
                              <ImageGrid
                                images={nippleInversionImages}
                                onSelect={setHaveWhichNippleInversionOnRight}
                                toggleable={true}
                                defaultSelected={
                                  haveWhichNippleInversionOnRight
                                }
                              />
                            </View>
                          </>
                        )}
                        <View style={styles.modalButtonSection}>
                          {toggler === "Left" && (
                            <View
                              style={styles.iconLeftSelectedButton}
                              onPress={changeToLeft}
                            >
                              <Entypo
                                name="chevron-thin-left"
                                size={25}
                                color="black"
                              />
                            </View>
                          )}
                          {toggler === "Right" && (
                            <TouchableOpacity
                              style={styles.iconButton}
                              onPress={changeToLeft}
                            >
                              <Entypo
                                name="chevron-thin-left"
                                size={25}
                                color="white"
                              />
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleModal3}
                          >
                            <Ionicons
                              name="checkmark-outline"
                              size={28}
                              color="white"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.iconButton}
                            onPress={toggleModal3}
                          >
                            <Ionicons
                              name="close"
                              size={28}
                              color="white"
                              onPress={toggleModal3}
                            />
                          </TouchableOpacity>
                          {toggler === "Left" && (
                            <TouchableOpacity
                              style={styles.iconRightButton}
                              onPress={changeToRight}
                            >
                              <Entypo
                                name="chevron-thin-right"
                                size={25}
                                color="white"
                              />
                            </TouchableOpacity>
                          )}
                          {toggler === "Right" && (
                            <View
                              style={styles.iconRightSelectedButton}
                              onPress={changeToRight}
                            >
                              <Entypo
                                name="chevron-thin-right"
                                size={25}
                                color="black"
                              />
                            </View>
                          )}
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  </Modal>
                )}
            </View>
          )}
          {haveAssociatedSymptoms == "Yes" && (
            <View style={styles.last_section}>
              <View style={styles.question}>
                <CustomRadioButton
                  question={question7}
                  options={options7}
                  onSelect={(value) => setHaveRashes(value)}
                />
              </View>
            </View>
          )}
          {haveAssociatedSymptoms !== "" && (
            <TouchableOpacity
              style={styles.footer}
              onPress={handlePreviewButton}
            >
              <Text style={styles.buttonText}>Preview</Text>
            </TouchableOpacity>
          )}
          <Modal
            transparent={true}
            visible={isModal4Visible}
            animationType="none"
            onRequestClose={toggleModal4}
          >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
              <Animated.View
                style={[styles.previewModalContent, { opacity: fadeAnim }]}
              >
                <ScrollView
                  contentContainerStyle={styles.scrollViewContent}
                  ref={scrollViewRef}
                >
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Preview</Text>
                    <Text style={styles.modalTextDate}>Date: {data.date}</Text>
                  </View>
                  <View style={styles.modalBody}>
                    {data.selectedPain && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Pain: {data.selectedPain}
                      </Text>
                    )}
                    {data.selectedPeriodDay && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Period: {data.selectedPeriodDay}
                      </Text>
                    )}
                    {data.painLevel === 1 && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Pain Level: Very Low
                      </Text>
                    )}
                    {data.painLevel === 2 && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Pain Level: Low
                      </Text>
                    )}
                    {data.painLevel === 3 && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Pain Level: Moderate
                      </Text>
                    )}
                    {data.painLevel === 4 && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Pain Level: High
                      </Text>
                    )}
                    {data.painLevel === 5 && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Pain Level: Extreme
                      </Text>
                    )}
                    {data.selectedSide && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Side: {data.selectedSide}
                      </Text>
                    )}
                    {data.selectedLeftLocations && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Left Locations:{""}{" "}
                        {data.selectedLeftLocations}
                      </Text>
                    )}
                    {data.selectedRightLocations && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Right Locations:{" "}
                        {data.selectedRightLocations}
                      </Text>
                    )}
                    <Text style={styles.modalText}>
                      {"\u25A1"} Have Associated Symptoms:{" "}
                      {haveAssociatedSymptoms}
                    </Text>
                    {haveAssociatedSymptoms == "Yes" &&
                      haveSwelling == "Yes" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Have Swelling: {haveSwelling}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveSwelling == "Yes" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Swelling Side: {haveWhichBreastSwelling}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveFatigue == "Yes" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Have Fatigue: {haveFatigue}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveIrritation == "Yes" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Have Irritation: {haveIrritation}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveNippleInversion == "Yes" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Have Nipple Inversion:{" "}
                          {haveNippleInversion}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveNippleInversion == "Yes" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Which Side: {haveWhichNippleInversion}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveNippleInversion == "Yes" &&
                      haveWhichNippleInversion == "Left" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Which Inversion on Left Breast:
                          {haveWhichNippleInversionOnLeft}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" &&
                      haveNippleInversion == "Yes" &&
                      haveWhichNippleInversion == "Right" && (
                        <Text style={styles.modalText}>
                          {"\u25A1"} Which Inversion on Right Breast:{" "}
                          {haveWhichNippleInversionOnRight}
                        </Text>
                      )}
                    {haveAssociatedSymptoms == "Yes" && haveRashes == "Yes" && (
                      <Text style={styles.modalText}>
                        {"\u25A1"} Have Rashes: {haveRashes}
                      </Text>
                    )}
                  </View>
                  <View style={styles.modalFooter}>
                    {/* Edit Button */}
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={toggleModal4}
                    >
                      <Feather name="edit-2" size={22} color="white" />
                    </TouchableOpacity>

                    {/* Save Icon */}
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={handleSaveButton}
                    >
                      <Ionicons
                        name="checkmark-outline"
                        size={28}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </View>
      {/* Footer Main Slider Ends */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Page Header
  header: {
    paddingHorizontal: "5%",
    marginTop: "15%",
  },
  // Icons in header
  icons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  // Profile Icons in Header
  profileIcon: {
    width: 40,
    height: 40,
    left: 0,
    top: 0,
    position: "absolute",
  },
  // Icon Image Styling in Header
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  // Date Part in Header
  date: {
    borderRadius: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    width: "50%",
    padding: 8,
  },
  // Text Color
  text: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    textAlign: "center",
  },
  // Log Other Symptoms box style
  textContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  // Bottom view
  sliderContainer: {
    flex: 1, // Ensure the container takes up available space
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#FFD6F6",
    overflow: "hidden",
    paddingTop: "5%",
  },
  // Scroll view in bottom view
  scrollViewContent1: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#FFD6F6",
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingBottom: 20, // Optional: Add some vertical padding
  },
  scrollViewContent: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#E7DDFF",
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingBottom: 20, // Optional: Add some vertical padding
  },
  // Style for First Question
  first_section: {
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: "100%",
  },
  // Style for Remaining Questions
  section: {
    marginTop: 15,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: "100%",
    // alignItems: "center",
  },
  // Style for Last question
  last_section: {
    marginVertical: 15,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: "100%",
  },
  // Preview Button container
  footer: {
    backgroundColor: "#9B6EE7",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    marginTop: "auto",
    elevation: 10,
  },
  // Preview button text
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSection: {
    margin: "3%",
  },
  // Tick and close button box
  modalButtonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "8%",
    alignItems: "center",
  },
  // Tick and cross button style
  iconButton: {
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
  },
  // Left Icon button when not selected
  iconLeftButton: {
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
  },
  // Left Icon button when selected
  iconLeftSelectedButton: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
  },
  // Right Icon button when Not selected
  iconRightButton: {
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
  },
  // Right Icon button when selected
  iconRightSelectedButton: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
  },
  // Right Tick button
  iconLeftRightTickButton: {
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    marginVertical: 10,
  },
  // Preview Modal Content
  previewModalContent: {
    width: "85%",
    backgroundColor: "#E7DDFF",
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: "5%",
    // flex: 1, // Add this to make the modal content grow
  },
  // Preview Page Modal Header
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 60, // Use a fixed height instead of percentage
    top: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: "#E7DDFF", // Ensure the header has a background color
    // marginTop: "7%",
  },
  // Preview Modal Body Style
  modalBody: {
    flex: 1,
    paddingHorizontal: "2%",
    paddingTop: 80, // Adjust for the height of the header
    paddingBottom: 80, // Adjust for the height of the footer
  },
  // Preview Modal Footer
  modalFooter: {
    height: 60, // Use a fixed height instead of percentage
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    width: "100%",
    marginBottom: "5%",
    backgroundColor: "#E7DDFF", // Ensure the footer has a background color
  },
  // Image Selection Modal Content
  modalContent: {
    width: "85%",
    backgroundColor: "#E7DDFF",
    overflow: "hidden",
    borderRadius: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  //Preview Modal Title style
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  // Preview Modal Text style
  modalText: {
    fontSize: 18,
    marginVertical: "2%",
    color: "#333",
  },
  // Preview Modal Date style
  modalTextDate: {
    fontSize: 19,
    marginBottom: "4%",
    textAlign: "center",
    fontWeight: "bold",
  },
  // All Modal Backdrop
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Image Selector Modal Tilte
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "5%",
  },
});

export default AssociatedSymptoms;
