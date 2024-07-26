import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  SafeAreaView,
  ImageBackground
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons"; // Import Icon from Ionicons
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
//genders used for gender dropdown
const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];
//This is used for country code drowdown
const countryCode = [
  { label: "+91", value: "+91" },
  { label: "+1", value: "+1" },
  { label: "+92", value: "+92" },
];

const CompleteProfile = ({ route, navigation }) => {
  
  const { userProfile } = route.params;
  //this is used for change the name field
  const [name, setName] = React.useState(userProfile.name);
  //this is used for change the Email field
  const [email, setEmail] = React.useState(userProfile.email);
  //this is used for change the Mobile number field
  const [phone, setPhone] = React.useState(userProfile.phone);
  //this is used for change the DOB field
  const [dob,setDob] = React.useState(userProfile.dob);
  //this is used for change the address field
  const [address, setAddress] = React.useState(userProfile.address);
  // Ensure userProfile.dob is converted to a string for serialization
  // if (!(userProfile.dob instanceof Date)) {
  //   userProfile.dob = userProfile.dob ? new Date(userProfile.dob) : new Date();
  //}

  const [profile, setProfile] = useState(userProfile);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showCountryModal,setshowCountryModal] = useState(false);

  //this is used for handle the profile picture field
  const handleImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfile({ ...profile, profilePicture: result.uri });
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "Failed to pick an image. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (field, value) => {
    if (field === "phone" && value.length > 10) {
      return;
    }
    if (field === "email" && !validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    setProfile({ ...profile, [field]: value });
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };


  const handleSaveProfile = () => {
    Alert.alert(
      "Profile Successfully Updated",
      "Your profile has been successfully updated!",
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate back to ProfilePage with updated userProfile
            navigation.navigate("ProfilePage", { userProfile: profile });
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#E582AD", "#7131DD", "#7131DD"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.LinearGradient}
    >
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.profileContainer}>
        <ImageBackground
          source={{ uri: profile.profilePicture }}
          style={styles.profilePicture}
          imageStyle={{ borderRadius: 50 }}
        >
          <Image
            source={require("./assets/camera.png")} // Replace with your camera icon path
            style={styles.cameraIcon}
          />
        </ImageBackground>
      </View>
        </TouchableOpacity>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.profileDetails}>
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.detailsTitle}>Personal Details</Text>
          </View>
          <SafeAreaView style={styles.detailContainers}>
            <Text style={styles.detailTitle}>Name :</Text>
            <TextInput
              style={styles.inp}
              value={name}
              onChangeText={setName}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.detailContainers}>
            <Text style={styles.detailTitle}>Email :</Text>
            <TextInput
              style={styles.inp}
              value={email}
              onChangeText={setEmail}
            />
          </SafeAreaView>
          <View>
            <View style={styles.fieldContainer2}>
              <Text style={styles.detailTitle}>Date of Birth :</Text>
              <Text></Text>

              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  flexDirection: "row",
                  borderRadius: 4,
                  backgroundColor: "#E2EAF4",
                  borderWidth: 1,
                  borderColor: "#CECECE",
                }}
              >
                <Text style={styles.fieldValue2}>
                  {date.toLocaleDateString()}
                </Text>
                <Image
                  style={{ width: 23, height: 23 }}
                  source={require("./assets/calendar.png")}
                />
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onChange}
                  minimumDate={new Date(1900, 0, 1)}
                  maximumDate={new Date(2006, 0, 1)}
                  color="red"
                />
              )}
            </View>

             <View style={styles.fieldContainer}>
              <Text style={styles.detailTitle}>Gender :</Text>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={() => setShowGenderModal(true)}
              >
                <Text style={styles.dropdownValue}>{profile.gender}</Text>
                <Icon name="chevron-down" size={20} color="#000" />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={showGenderModal}
                onRequestClose={() => setShowGenderModal(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {genders.map((gender) => (
                      <TouchableOpacity
                        key={gender.value}
                        onPress={() => {
                          handleInputChange("gender", gender.value);
                          setShowGenderModal(false);
                        }}
                      >
                        <Text style={styles.genderOption}>{gender.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
               </Modal>
             </View>
             <SafeAreaView style={styles.detailContainers}>
            <Text style={styles.detailTitle}>Mobile :</Text>
            <TouchableOpacity
                style={styles.dropdownContainerc}
                onPress={() => setshowCountryModal(true)}
              >
                <Text style={styles.dropdownValue}>{profile.countrycode}</Text>
                <Icon name="chevron-down" size={20} color="#000" />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={showCountryModal}
                onRequestClose={() => setshowCountryModal(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {countryCode.map((countrycode) => (
                      <TouchableOpacity
                        key={countrycode.value}
                        onPress={() => {
                          handleInputChange("countrycode", countrycode.value);
                          setshowCountryModal(false);
                        }}
                      >
                        <Text style={styles.genderOption}>{countrycode.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
               </Modal>
             
            <TextInput
              style={styles.inpnum}
              value={phone}
              onChangeText={setPhone}
               keyboardType = 'numeric'
               maxLength={10}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.detailContainersadrs}>
            <Text style={styles.detailTitle}>Address :</Text>
            <TextInput
            editable
            multiline
            numberOfLines={4}
              style={styles.inpadrs}
              value={address}
              onChangeText={setAddress}
            />
          </SafeAreaView>
            
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  LinearGradient: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  heading: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    backgroundColor: "#ECB4E0",
    marginBottom: 30,
    elevation: 5,
  },
  profileDetails: {
    // marginBottom: 30,
    // borderWidth: 2,
    borderColor: "grey",
    padding: 28,
    elevation: 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignSelf: "center",
    backgroundColor: "#FFD6F6",
    width: "100%",
    height: "60%",
  },
  detailsTitle: {
    width: 250,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailTitle: {
    width: 120,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    marginBottom: 10,
    width: "95%",
  },
  detailContainers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor:"red"
  },
  detailContainersadrs: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor:"red"
  },
  inp: {
    backgroundColor: "#E8E8E8",
    // borderColor: "black",
    height: 30,
    // margin: 12,
    // borderWidth: 1,
    padding: 2,
    paddingLeft: 6,
    width: 200,
    borderRadius:5,
    
  },
  inpnum: {
    backgroundColor: "#E8E8E8",
    // borderColor: "black",
    height: 30,
    // margin: 12,
    // borderWidth: 1,
    padding: 2,
    paddingLeft: 6,
    width: 139,
    borderRadius:5,
    
  },
  inpadrs: {
    backgroundColor: "#E8E8E8",
    // borderColor: "black",
    height: 80,
    // margin: 12,
    // borderWidth: 1,
    padding: 2,
    paddingLeft: 6,
    width: 200,
    borderRadius:5,
    alignItems:"flex-start",
    textAlignVertical:"top",
    
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fieldContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 210,
  },
  fieldLabel: {
    width: 120,
    fontSize: 16,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    width: 150,
  },
  fieldValue2: {
    display: "flex",
    fontSize: 16,
    width: 85,
    borderWidth: 1,
    borderColor: "#CECECE",
    height: 23,
    bordertopleftRadius: 4,
    borderbottomleftRadius: 4,
    backgroundColor: "#E8E8E8",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderColor:"Black",
    borderWidth:1,
    paddingLeft:2,
    borderRadius:5,
    backgroundColor:"#E8E8E8",
    //  backgroundColor
  },
  dropdownContainerc: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    borderColor:"Black",
    borderWidth:1,
    paddingLeft:2,
    borderRadius:5,
    backgroundColor:"#E8E8E8",
    height:30
  },
  dropdownValue: {
    fontSize: 16,
    color: "#141414",
    // fontWeight:"thin"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  countryCode: {
    fontSize: 18,
    padding: 10,
  },
  genderOption: {
    fontSize: 18,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FFD6F6",
    height: 70,
  },
  button: {
    display: "flex",
    backgroundColor: "#E582AD",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    width: 150,
    // height:50
    marginBottom: 25,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  profileContainer: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cameraIcon: {
    width: 24,
    height: 24,
    margin: 4,
  },
});

export default CompleteProfile;
