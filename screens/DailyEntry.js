import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomRadioButton from "../components/RadioButton";
import PainLevelSlider from "../components/PainLevelSlider";
import Breast_Left from "../components/Breast_Left";
import Breast_Right from "../components/Breast_Right";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DailyEntry = () => {
  // Navigation variable
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  // Variables
  const [painLevel, setPainLevel] = useState(0);
  const [selectedPeriodDay, setSelectedPeriodDay] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPain, setSelectedPain] = useState("");
  const [selectedSide, setSelectedSide] = useState("");
  const [selectedLeftLocations, setSelectedLeftLocations] = useState([]);
  const [selectedRightLocations, setSelectedRightLocations] = useState([]);

  const [toggler, toggle] = useState("Left");
  const [isModalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Toggle Modal
  const toggleModal = () => {
    if (isModalVisible) {
      fadeOut();
    } else {
      setModalVisible(true);
      fadeIn();
    }
  };

  // Fade in animation of Modal
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Fade out animation of Modal
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  // On telling No Pain, reset the pain level, pain side and pain location
  const resetState = () => {
    setPainLevel(0);
    setSelectedSide("");
    setSelectedLeftLocations([]);
    setSelectedRightLocations([]);
  };

  // On change of selected date from the calender, the date variable will change value
  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    resetState();
  };

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

  // What will happen when Next button will be pressed
  const handleNextButton = async () => {
    if (selectedPeriodDay !== "" && selectedPain !== "") {
      let newData;
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      if (selectedPain === "Yes") {
        if (painLevel !== 0) {
          if (selectedSide !== "") {
            if (selectedSide === "Left" && selectedLeftLocations.length === 0) {
              Alert.alert("Please select left pain location");
              return;
            } else if (
              selectedSide === "Right" &&
              selectedRightLocations.length === 0
            ) {
              Alert.alert("Please select right pain location");
              return;
            } else if (
              selectedSide === "Both" &&
              (selectedLeftLocations.length === 0 ||
                selectedRightLocations.length === 0)
            ) {
              Alert.alert("Please select both left and right pain locations");
              return;
            }

            newData = {
              from: "DailyEntry",
              date: formattedDate,
              selectedPain: selectedPain,
              painLevel: painLevel,
              selectedPeriodDay: selectedPeriodDay,
              selectedSide: selectedSide,
              selectedLeftLocations: selectedLeftLocations,
              selectedRightLocations: selectedRightLocations,
            };
          } else {
            Alert.alert("Please select a side");
            return;
          }
        } else {
          Alert.alert("Please select a pain level");
          return;
        }
      } else {
        newData = {
          from: "DailyEntry",
          date: formattedDate,
          selectedPain: selectedPain,
          selectedPeriodDay: selectedPeriodDay,
        };
      }

      try {
        const token = await getToken();
        if (token) {
          console.log("Token Retrieved:", token); // Debug log
          console.log("Sending data to backend:", newData); // Debug log

          const response = await axios.post(
            "http://192.168.141.185:3000/daily-entry",
            newData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Response from backend:", response.data); // Debug log
          // If the request is successful
          navigation.navigate("AssociatedSymptoms", { data: newData });
          setSavedData([...savedData, newData]);
        }
      } catch (error) {
        console.error("Error sending data to backend:", error.message);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        } else {
          console.error("No response received");
        }
        Alert.alert(
          "Error",
          "There was an error submitting your data. Please try again."
        );
      }
    } else {
      Alert.alert("Please fill the required fields");
    }
  };
  // Selected Pain Level display
  const getPainLevelDescription = (level) => {
    switch (level) {
      case 1:
        return "Very Low";
      case 2:
        return "Low";
      case 3:
        return "Medium";
      case 4:
        return "High";
      case 5:
        return "Very High";
      default:
        return "";
    }
  };

  //
  const onSelect = (value) => {
    setSelectedSide(value);
    toggleModal();
  };

  const changeToLeft = () => {
    toggle("Left");
  };
  const changeToRight = () => {
    toggle("Right");
  };

  // Page title display
  const renderPainRateTitle = () => {
    const today = new Date();
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      return "Rate Today's Pain";
    } else {
      return `Rate Pain of Date - ${selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`;
    }
  };

  // Questions start
  const question1 = "Do you have pain?";
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

  const question2 = "Is it your Period day?";
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

  const question3 = "Which Side?";
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

  useEffect(() => {
    if (selectedPain === "No") {
      setSelectedSide("");
      setSelectedLeftLocations([]);
      setSelectedRightLocations([]);
      setPainLevel(0);
    }
  }, [selectedPain]);
  const handleRightSelection = (rightBreastLocation) => {
    setSelectedRightLocations((prevSelectedLocations) => {
      if (prevSelectedLocations.includes(rightBreastLocation)) {
        return prevSelectedLocations.filter(
          (location) => location !== rightBreastLocation
        );
      } else {
        return [...prevSelectedLocations, rightBreastLocation];
      }
    });
  };

  const handleLeftSelection = (leftBreastLocation) => {
    setSelectedLeftLocations((prevSelectedLocations) => {
      if (prevSelectedLocations.includes(leftBreastLocation)) {
        return prevSelectedLocations.filter(
          (location) => location !== leftBreastLocation
        );
      } else {
        return [...prevSelectedLocations, leftBreastLocation];
      }
    });
  };

  const handleOptionSelect = (value) => {
    setSelectedPain(value);
  };

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
            <Text style={styles.text}>
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
            {/* Displaying the Current date by default and Selected date on Selection ends here */}

            {/* Date Picker, getting displayed when the Calender icon below is clicked starts here */}
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                maximumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
            {/* Date Picker, getting displayed when the Calender icon below is clicked starts here */}
          </View>
          {/* Date in Icons Section in Header Ends*/}

          {/* Calender Icon in Icons Section in Header starts here */}
          <TouchableOpacity
            style={styles.calendar}
            onPress={() => setShowDatePicker(true)}
          >
            {/* Calender Icon Image */}
            <Image
              source={require("../Photos/calendar.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          {/* Calender Icon in Icons Section in Header ends here */}
        </View>
        {/* Icons Section in Header ends here */}
      </View>
      {/* Page Header ends here */}
      {/* Text Content under header starts */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.bodyTitleText}>{renderPainRateTitle()}</Text>
        </Text>
      </View>
      {/* Text Content under header ends */}
      {/* Bottom Slider Starts */}
      <View style={styles.sliderContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          ref={scrollViewRef}
        >
          {/* 1st. Period Question */}
          <View style={styles.first_section}>
            <CustomRadioButton
              question={question2}
              options={options2}
              onSelect={(value) => {
                setSelectedPeriodDay(value);
              }}
            />
          </View>
          {/* 2nd. Pain Question */}
          <View style={styles.section}>
            <CustomRadioButton
              question={question1}
              options={options1}
              onSelect={(value) => handleOptionSelect(value, 400)}
            />
          </View>
          {/* If Pain is Yes */}
          {selectedPain === "Yes" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pain Rating</Text>
              <Text style={styles.painLevel}>
                {getPainLevelDescription(painLevel)}
              </Text>
              <PainLevelSlider
                min={0}
                max={5}
                value={painLevel}
                onValueChange={(value) => setPainLevel(value)}
              />
            </View>
          )}
          {selectedPain === "Yes" && (
            <View style={styles.section}>
              <CustomRadioButton
                question={question3}
                options={options3}
                onSelect={(value) => {
                  onSelect(value);
                }}
              />
            </View>
          )}
          {/* If Pain selection is Yes and Side is Left - starts here */}
          {selectedPain === "Yes" && selectedSide === "Left" && (
            <View style={styles.popupSection}>
              <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="none"
                onRequestClose={toggleModal}
              >
                <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
                  <Animated.View
                    style={[styles.modalContent, { opacity: fadeAnim }]}
                  >
                    <Text style={styles.sectionModalTitle}>Left Breast</Text>
                    <View style={styles.modalSection}>
                      <Breast_Left
                        onLeftLocationSend={handleLeftSelection}
                        selectedLeftLocations={selectedLeftLocations}
                      />
                    </View>
                    <View style={styles.modalButtonSection}>
                      <TouchableOpacity
                        style={styles.iconLeftRightTickButton}
                        onPress={toggleModal}
                      >
                        <Ionicons
                          name="checkmark-outline"
                          size={28}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={toggleModal}
                      >
                        <Ionicons
                          name="close"
                          size={28}
                          color="white"
                          onPress={toggleModal}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              </Modal>
            </View>
          )}
          {/* If Pain selection is Yes and Side is Left - ends here */}

          {/* If Pain selection is Yes and Side is Right - starts here */}
          {selectedPain === "Yes" && selectedSide === "Right" && (
            <Modal
              transparent={true}
              visible={isModalVisible}
              animationType="none"
              onRequestClose={toggleModal}
            >
              <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
                <Animated.View
                  style={[styles.modalContent, { opacity: fadeAnim }]}
                >
                  <Text style={styles.sectionModalTitle}>Right Breast</Text>
                  <View style={styles.modalSection}>
                    <Breast_Right
                      onRightLocationSend={handleRightSelection}
                      selectedRightLocations={selectedRightLocations}
                    />
                  </View>
                  <View style={styles.modalButtonSection}>
                    <TouchableOpacity
                      style={styles.iconLeftRightTickButton}
                      onPress={toggleModal}
                    >
                      <Ionicons
                        name="checkmark-outline"
                        size={28}
                        color="white"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={toggleModal}
                    >
                      <Ionicons
                        name="close"
                        size={28}
                        color="white"
                        onPress={toggleModal}
                      />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </Modal>
          )}
          {/* If Pain selection is Yes and Side is Right - ends here */}

          {/* If Pain selection is Yes and Side is Both - starts here */}
          {selectedPain === "Yes" && selectedSide === "Both" && (
            <Modal
              transparent={true}
              visible={isModalVisible}
              animationType="none"
              onRequestClose={toggleModal}
            >
              <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
                <Animated.View
                  style={[styles.modalContent, { opacity: fadeAnim }]}
                >
                  {toggler === "Left" && (
                    <>
                      <Text style={styles.sectionModalTitle}>Left Breast</Text>
                      <View style={styles.modalSection}>
                        <Breast_Left
                          onLeftLocationSend={handleLeftSelection}
                          selectedLeftLocations={selectedLeftLocations}
                        />
                      </View>
                    </>
                  )}
                  {toggler === "Right" && (
                    <>
                      <Text style={styles.sectionModalTitle}>Right Breast</Text>
                      <View style={styles.modalSection}>
                        <Breast_Right
                          onRightLocationSend={handleRightSelection}
                          selectedRightLocations={selectedRightLocations}
                        />
                      </View>
                    </>
                  )}
                  <View style={styles.modalSection}>
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
                      {selectedLeftLocations === null && selectedRightLocations}
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={toggleModal}
                      >
                        <Ionicons
                          name="checkmark-outline"
                          size={28}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={toggleModal}
                      >
                        <Ionicons
                          name="close"
                          size={28}
                          color="white"
                          onPress={toggleModal}
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
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </Modal>
          )}
          {selectedPain === "No" && selectedPeriodDay !== "" && (
            <TouchableOpacity style={styles.footer} onPress={handleNextButton}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
          {selectedPain === "Yes" &&
            selectedPeriodDay !== "" &&
            painLevel !== 0 &&
            selectedSide === "Left" &&
            selectedLeftLocations.length != 0 && (
              <TouchableOpacity
                style={styles.footer}
                onPress={handleNextButton}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          {selectedPain === "Yes" &&
            selectedPeriodDay !== "" &&
            painLevel !== 0 &&
            selectedSide === "Right" &&
            selectedRightLocations.length != 0 && (
              <TouchableOpacity
                style={styles.footer}
                onPress={handleNextButton}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          {selectedPain === "Yes" &&
            selectedPeriodDay !== "" &&
            painLevel !== 0 &&
            selectedSide === "Both" &&
            selectedRightLocations.length != 0 &&
            selectedRightLocations.length != 0 && (
              <TouchableOpacity
                style={styles.footer}
                onPress={handleNextButton}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
        </ScrollView>
      </View>
      {/* Footer Main Slider Ends */}
    </LinearGradient>
  );
};

export default DailyEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    flex: 1, // Ensure the container takes up available space
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#FFD6F6",
    overflow: "hidden",
    paddingTop: "5%",
  },
  // Page Header
  header: {
    paddingHorizontal: "5%",
    marginTop: "15%",
  },
  // Icons in header
  icons: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  // Profile Icons in Header
  profileIcon: {
    width: 40,
    height: 40,
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
  // Calender Part in Header
  calendar: {
    width: 40,
    height: 40,
  },
  textContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#FFD6F6",
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingVertical: "8%",
    width: "100%",
    marginHorizontal: "auto",
  },
  // For Rate Today's Pain
  bodyTitleText: {
    marginTop: "5%",
    fontSize: 24,
    fontWeight: "bold",
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
  sectionTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#ECB4E0",
  },
  sectionModalTitle: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  painLevel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  popupSection: {
    marginBottom: 20,
  },
  footer: {
    backgroundColor: "#9B6EE7",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    marginTop: "auto",
    elevation: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: "3%",
    backgroundColor: "#E7DDFF",
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
  modalButtonSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    marginTop: 12,
    alignItems: "center",
  },
  modalButton: {
    width: "30%",
    backgroundColor: "#2196F3",
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalButtonSelectedLeft: {
    width: "30%",
    backgroundColor: "green",
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
  },
  modalButtonNotSelectedLeft: {
    width: "30%",
    backgroundColor: "red",
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
  },
  modalButtonSelectedRight: {
    width: "30%",
    backgroundColor: "green",
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
  },
  modalButtonNotSelectedRight: {
    width: "30%",
    backgroundColor: "red",
    alignItems: "center",
    padding: "3%",
    borderRadius: 10,
  },
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
});
