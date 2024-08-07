import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { Picker } from '@react-native-picker/picker';

import ImageGrid from "../components/ImageGrid";

const profilePic = require("../assets/me.png");

const ProfilePage = ({ navigation }) => {
  // const pdAnimation = useRef(new Animated.Value(0)).current;
  const dietset = [
    {
      path: require("../assets/balanced.jpg"),
      label: "Balanced",
      value: "Balanced",
    },
    {
      path: require("../assets/balanced.jpg"),
      label: "High-Protein",
      value: "High-Protein",
    },
  ];
  const [isModal1Visible, setModal1Visible] = useState(false);
  const [ispdVisible, setIspdVisible] = useState(false);
  const [isadedVisible, setIsadedVisible] = useState(false);
  const [isapedVisible, setIsapedVisible] = useState(false);
  const [islifeedVisible, setIslifeedVisible] = useState(false);
  const [isperedVisible, setIsperedVisible] = useState(false);
  const [isinsedVisible, setIsinsedVisible] = useState(false);
  const [ismdVisible, setIsmdVisible] = useState(false);
  const [isadVisible, setIsadVisible] = useState(false);
  const [isinVisible, setIsinVisible] = useState(false);
  const [isapVisible, setIsapVisible] = useState(false);
  const [ismededVisible, setIsmededVisible] = useState(false);
  const [islifeVisible, setIslifeVisible] = useState(false);

  const [selectedDiet, setSelectedDiet] = useState(profile?.diet || "");

  const fadeAnim = useRef(new Animated.Value(5)).current;
  const toggleModal1 = () => {
    if (isModal1Visible) {
      fadeOut1();
    } else {
      setModal1Visible(true);
      fadeIn();
    }
  };
  const dietlist = (value) => {
    setSelectedDiet(value); // Update the selected diet
    console.log(value); // Log the selected value
    toggleModal1();
  };
  const handleDietButton = () => {
    toggleModal1();
  };
  const handleDietSelection = (value) => {
    setSelectedDiet(value);
    console.log(value);
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
  const togglepdVisibility = () => {
    setIspdVisible(!ispdVisible);
  };
  const toggleadedVisibility = () => {
    setIsadedVisible(!isadedVisible);
  };
  const togglelifeedVisibility = () => {
    setIslifeedVisible(!islifeedVisible);
  };
  const toggleapedVisibility = () => {
    setIsapedVisible(!isapedVisible);
  };
  const toggleperedVisibility = () => {
    setIsperedVisible(!isperedVisible);
  };
  const togglemededVisibility = () => {
    setIsmededVisible(!ismededVisible);
  };
  const toggleinsedVisibility = () => {
    setIsinsedVisible(!isinsedVisible);
  };

  const toggleapVisibility = () => {
    setIsapVisible(!isapVisible);
  };
  const toggleinVisibility = () => {
    setIsinVisible(!isinVisible);
  };
  const togglemdVisibility = () => {
    setIsmdVisible(!ismdVisible);
  };
  const toggleadVisibility = () => {
    setIsadVisible(!isadVisible);
  };
  const togglelifeVisibility = () => {
    setIslifeVisible(!islifeVisible);
  };
  const [isEditVisible, setIsEditVisible] = useState(false);
  const saveProfile = () => {
    // Update profile with the rows data
    const updatedSurgery = rows.map((row) => row.surgery);
    const updatedDates = rows.map((row) => row.date);
    const updatedVac = rows.map((row) => row.vac);
    const updatedVdates = rows.map((row) => row.vdate);

    setProfile((prevProfile) => ({
      ...prevProfile,
      surgery: updatedSurgery,
      sd: updatedDates,
      vac: updatedVac,
      vd: updatedVdates,
    }));

    // Hide the edit profile section
    hideEditProfile();
  };

  // Function to add a new row
  const addRow1 = () => {
    const lastRow = rows[rows.length - 1];
    if (!lastRow.surgery || !lastRow.date) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all fields before adding a new row."
      );
      return;
    }
    setRows([...rows, { surgery: "", date: "" }]);
  };
  const addRow2 = () => {
    const lastRow = rows[rows.length - 1];
    if (!lastRow.vac || !lastRow.vd) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all fields before adding a new row."
      );
      return;
    }
    setRows([...rows, { vac: "", vd: "" }]);
  };
  const deleteRow1 = (index) => {
    if (rows.length === 1) {
      Alert.alert("Cannot Delete", "At least one row must be present.");
      return;
    }
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
    const newSurgery = newRows.map((row) => row.surgery);
    const newSd = newRows.map((row) => row.date);

    setProfile((prevProfile) => ({
      ...prevProfile,
      surgery: newSurgery,
      sd: newSd,
    }));
  };
  const deleteRow2 = (index) => {
    if (rows.length === 1) {
      Alert.alert("Cannot Delete", "At least one row must be present.");
      return;
    }
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
    const newvac = newRows.map((row) => row.vac);
    const newvd = newRows.map((row) => row.vd);

    setProfile((prevProfile) => ({
      ...prevProfile,
      vac: newvac,
      vd: newvd,
    }));
  };
  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  //diet is not fetching in component ImageGrid
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    countrycode: "+91",
    phone: "1234567890",
    dob: new Date("1990-01-01"),
    gender: "Male",
    address: "123 Main St, Anytown, USA",
    placeofbirth: "Murshidabad",
    state: "West Bengal",
    district: "Birbhum",
    pincode: "725121",
    medhistory: "Diabetes, hypertension",
    surgery: ["A", "B"],
    sd: ["01/01/1999", "02/02/2000"],
    vac: ["A", "B"],
    vd: ["01/01/1999", "02/02/2000"],
    ip: ["A", "B"],
    pn: ["01/01/1999", "02/02/2000"],
    doc: ["A", "B"],
    dd: ["01/01/1999", "02/02/2000"],
    diet: ["Balanced"],
    phyactivity: "Cycling, Jogging, Russian Twists, Push ups.",
  });
  const [rows, setRows] = useState(
    profile.surgery.map((s, i) => ({
      surgery: s,
      date: profile.sd[i],
      vac: profile.vac[i] || "",
      vd: profile.vd[i] || "",
    }))
  );

  const [emailError, setEmailError] = useState("");

  const slideAnim = useRef(new Animated.Value(1000)).current;
  const editSlideAnim = useRef(new Animated.Value(1000)).current;
  const profilePicAnim = useRef(new Animated.Value(0)).current;
  const nametopAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 2000, // Duration of one full rotation
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const goToEditProfile = () => {
    navigation.navigate("CompleteProfile", {
      userProfile: profile,
    });
  };

  const showEditProfile = () => {
    setIsEditVisible(true);
    Animated.parallel([
      Animated.timing(editSlideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(profilePicAnim, {
        toValue: -145, // Adjust value based on how far you want it to move
        duration: 1100,
        useNativeDriver: true,
      }),
      Animated.timing(nametopAnim, {
        toValue: -70, // Adjust this value to control the movement of the nametop view
        duration: 1100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1, // Adjust this value to control the rotation
        duration: 1050,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideEditProfile = () => {
    if (emailError) {
      Alert.alert("Error", "Please give correct credential before saving.", [
        { text: "OK" },
      ]);
    } else {
      Animated.parallel([
        Animated.timing(editSlideAnim, {
          toValue: 1000,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(profilePicAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(nametopAnim, {
          toValue: 0, // Reset the nametop view position
          duration: 950,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0, // Reset rotation
          duration: 950,
          useNativeDriver: true,
        }),
      ]).start(() => setIsEditVisible(false));
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field, value) => {
    if (field === "email") {
      if (validateEmail(value)) {
        setEmailError(""); // Clear error if email is valid
      } else {
        setEmailError("Invalid email address");
      }
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  return (
    <LinearGradient
      colors={["#FFF0F6", "#FFD6F6", "#FFD6F6", "#C96EB9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.profileHeader}>
        <Animated.Image
          source={profilePic}
          style={[
            styles.profilePicture,
            {
              transform: [
                { translateX: profilePicAnim },
                { rotate: rotateInterpolation },
              ],
            },
          ]}
        />
        <Animated.View
          style={[styles.nametop, { transform: [{ translateY: nametopAnim }] }]}
        >
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </Animated.View>
      </View>
      <View style={styles.profileDetails}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentmain}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.cont1}>
            <TouchableOpacity style={styles.head} onPress={togglepdVisibility}>
              <View style={styles.headview}>
                <Text style={styles.detailsTitlehead}>
                  Personal Information
                </Text>
                <Image
                  source={
                    ispdVisible
                      ? require("../assets/dropup.png")
                      : require("../assets/dropdown.png")
                  }
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            {ispdVisible && (
              <View style={styles.boxper}>
                <View style={styles.fieldsper}>
                  <Text style={styles.detailTitle}>Name :</Text>
                  <Text style={styles.detailText}>{profile.name}</Text>
                </View>
                <View style={styles.fieldsper}>
                  <Text style={styles.detailTitle}>Email :</Text>
                  <Text style={styles.detailText}>{profile.email}</Text>
                </View>
                <View style={styles.fieldsper}>
                  <Text style={styles.detailTitle}>Date of Birth :</Text>
                  <Text style={styles.detailText}>
                    {formatDate(new Date(profile.dob))}
                  </Text>
                </View>
                <View style={styles.fieldsper}>
                  <Text style={styles.detailTitle}>Place Of Birth :</Text>
                  <Text style={styles.detailText}>{profile.placeofbirth}</Text>
                </View>
                <View style={styles.fieldsper}>
                  <Text style={styles.detailTitle}>Gender :</Text>
                  <Text style={styles.detailText}>{profile.gender}</Text>
                </View>
                <View style={styles.fieldsper}>
                  <Text style={styles.detailTitle}>Mobile :</Text>
                  <Text style={styles.detailTextc}>{profile.countrycode}</Text>
                  <Text style={styles.detailText}>{profile.phone}</Text>
                </View>
              </View>
            )}
          </View>
          <Animated.View style={styles.cont}>
            <TouchableOpacity style={styles.head} onPress={toggleadVisibility}>
              <View style={styles.headview}>
                <Text style={styles.detailsTitlehead}>Address Information</Text>
                <Image
                  source={
                    isadVisible
                      ? require("../assets/dropup.png")
                      : require("../assets/dropdown.png")
                  }
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            {isadVisible && (
              <View style={styles.boxad}>
                <View style={styles.fieldsadrs}>
                  <Text style={styles.detailTitle}>Address :</Text>
                  <Text style={styles.detailText}>{profile.address}</Text>
                </View>
                <View style={styles.fieldsad}>
                  <Text style={styles.detailTitle}>State :</Text>
                  <Text style={styles.detailText}>{profile.state}</Text>
                </View>
                <View style={styles.fieldsad}>
                  <Text style={styles.detailTitle}>District :</Text>
                  <Text style={styles.detailText}>{profile.district}</Text>
                </View>
                <View style={styles.fieldsad}>
                  <Text style={styles.detailTitle}>Pincode :</Text>
                  <Text style={styles.detailText}>{profile.pincode}</Text>
                </View>
              </View>
            )}
          </Animated.View>
          <View style={styles.cont}>
            <TouchableOpacity style={styles.head} onPress={togglemdVisibility}>
              <View style={styles.headview}>
                <Text style={styles.detailsTitlehead}>Medical Information</Text>
                <Image
                  source={
                    ismdVisible
                      ? require("../assets/dropup.png")
                      : require("../assets/dropdown.png")
                  }
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            {ismdVisible && (
              <View style={styles.boxmd}>
                <View style={styles.fieldsmd}>
                  <Text style={styles.detailTitlemed}>Medical History :</Text>
                  <Text style={styles.detailTextmed}>{profile.medhistory}</Text>
                </View>
                <View style={styles.fieldsmd}>
                  <Text style={styles.detailTitlemed}>Past Surgeries :</Text>
                  <Text style={styles.detailTextmed}></Text>
                </View>
                <View style={styles.tableContainer}>
                  <View
                    style={{
                      height: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "white",
                    }}
                  >
                    <View style={styles.tablehead}>
                      <Text>Surgery</Text>
                      <View style={{ width: 1, backgroundColor: "white" }} />
                      <Text>Date</Text>
                    </View>
                  </View>
                  <View style={styles.tablebody}>
                    <Text>{profile.surgery[0]}</Text>
                    <View style={{ width: 1, backgroundColor: "white" }} />
                    <Text>{profile.sd[0]}</Text>
                  </View>
                  <View style={styles.tablebody}>
                    <Text>{profile.surgery[1]}</Text>
                    <View style={{ width: 1, backgroundColor: "white" }} />
                    <Text>{profile.sd[1]}</Text>
                  </View>
                </View>
                <View style={styles.fieldsmd}>
                  <Text style={styles.detailTitlemed2}>
                    Vaccination History:
                  </Text>
                  <Text style={styles.detailTextmed}></Text>
                </View>
                <View style={styles.tableContainer}>
                  <View
                    style={{
                      height: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "white",
                    }}
                  >
                    <View style={styles.tablehead}>
                      <Text>Vaccination</Text>
                      <View style={{ width: 1, backgroundColor: "white" }} />
                      <Text> Date </Text>
                    </View>
                  </View>
                  <View style={styles.tablebody}>
                    <Text> Covaxin </Text>
                    <View style={{ width: 1, backgroundColor: "white" }} />
                    <Text>01/01/2020</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.cont}>
            <TouchableOpacity style={styles.head} onPress={toggleinVisibility}>
              <View style={styles.headview}>
                <Text style={styles.detailsTitlehead}>
                  Insurance Information
                </Text>
                <Image
                  source={
                    isinVisible
                      ? require("../assets/dropup.png")
                      : require("../assets/dropdown.png")
                  }
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            {isinVisible && (
              <View style={styles.boxap}>
                <View style={styles.tableContainer}>
                  <View
                    style={{
                      height: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "white",
                    }}
                  >
                    <View style={styles.tablehead}>
                      <Text>Insurance Provider</Text>
                      <View style={{ width: 1, backgroundColor: "white" }} />
                      <Text>Policy Number</Text>
                    </View>
                  </View>
                  <View style={styles.tablebody}>
                    <Text>Appendectomy</Text>
                    <View style={{ width: 1, backgroundColor: "white" }} />
                    <Text>01/01/1999</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.cont}>
            <TouchableOpacity style={styles.head} onPress={toggleapVisibility}>
              <View style={styles.headview}>
                <Text style={styles.detailsTitlehead}>Appointment History</Text>
                <Image
                  source={
                    isapVisible
                      ? require("../assets/dropup.png")
                      : require("../assets/dropdown.png")
                  }
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            {isapVisible && (
              <View style={styles.boxap}>
                <View style={styles.tableContainer}>
                  <View
                    style={{
                      height: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "white",
                    }}
                  >
                    <View style={styles.tablehead}>
                      <Text>Doctor</Text>
                      <View style={{ width: 1, backgroundColor: "white" }} />
                      <Text>Date</Text>
                    </View>
                  </View>
                  <View style={styles.tablebody}>
                    <Text>Appendectomy</Text>
                    <View style={{ width: 1, backgroundColor: "white" }} />
                    <Text>01/01/1999</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.cont}>
            <TouchableOpacity
              style={styles.head}
              onPress={togglelifeVisibility}
            >
              <View style={styles.headview}>
                <Text style={styles.detailsTitlehead}>
                  Lifestyle Information
                </Text>
                <Image
                  source={
                    islifeVisible
                      ? require("../assets/dropup.png")
                      : require("../assets/dropdown.png")
                  }
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            {islifeVisible && (
              <View style={styles.boxlife}>
                <View style={styles.fieldslife}>
                  <Text style={styles.detailTitlemed}>
                    Dietary Preferences :
                  </Text>
                  <Text style={styles.detailTextmed}>{profile.diet}</Text>
                </View>
                <View style={styles.fieldslife}>
                  <Text style={styles.detailTitlemed}>
                    Physical Activity :{" "}
                  </Text>
                  <Text style={styles.detailTextmed}>
                    {profile.phyactivity}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={showEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Homepage</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isEditVisible && (
        <Animated.View
          style={[
            styles.editProfile,
            { transform: [{ translateY: editSlideAnim }] },
          ]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <LinearGradient
              colors={["#FFF0F6", "#FFD6F6", "#FFD6F6", "#C96EB9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient2}
            >
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.detailsTitle}>Edit Profile</Text>
                <View style={styles.cont}>
                  <TouchableOpacity
                    style={styles.head}
                    onPress={toggleperedVisibility}
                  >
                    <View style={styles.headview}>
                      <Text style={styles.detailsTitlehead}>
                        Personal Information
                      </Text>
                      <Image
                        source={
                          isperedVisible
                            ? require("../assets/dropup.png")
                            : require("../assets/dropdown.png")
                        }
                        style={styles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                  {isperedVisible && (
                    <View style={styles.fieldsedit1}>
                      <Text style={styles.inputLabel}>Name:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.name}
                        onChangeText={(text) => handleChange("name", text)}
                      />

                      <Text style={styles.inputLabel}>Email:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.email}
                        onChangeText={(text) => handleChange("email", text)}
                        keyboardType="email-address"
                      />
                      {emailError ? (
                        <Text style={styles.errorText}>{emailError}</Text>
                      ) : null}

                      <Text style={styles.inputLabel}>Date of Birth:</Text>
                      <TextInput
                        style={styles.input}
                        value={formatDate(new Date(profile.dob))}
                        onChangeText={(text) => handleChange("dob", text)}
                      />

                      <Text style={styles.inputLabel}>Gender:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.gender}
                        onChangeText={(text) => handleChange("gender", text)}
                      />

                      <Text style={styles.inputLabel}>Mobile:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.phone}
                        onChangeText={(text) => handleChange("phone", text)}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.cont}>
                  <TouchableOpacity
                    style={styles.head}
                    onPress={toggleadedVisibility}
                  >
                    <View style={styles.headview}>
                      <Text style={styles.detailsTitlehead}>
                        Address Information
                      </Text>
                      <Image
                        source={
                          isadedVisible
                            ? require("../assets/dropup.png")
                            : require("../assets/dropdown.png")
                        }
                        style={styles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                  {isadedVisible && (
                    <View style={styles.fieldsedit2}>
                      <Text style={styles.inputLabel}>Address:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.address}
                        onChangeText={(text) => handleChange("address", text)}
                      />

                      <Text style={styles.inputLabel}>State:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.state}
                        onChangeText={(text) => handleChange("state", text)}
                      />

                      <Text style={styles.inputLabel}>Pincode:</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.pincode}
                        onChangeText={(text) => handleChange("pincode", text)}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.cont}>
                  <TouchableOpacity
                    style={styles.head}
                    onPress={togglemededVisibility}
                  >
                    <View style={styles.headview}>
                      <Text style={styles.detailsTitlehead}>
                        Medical Information
                      </Text>
                      <Image
                        source={
                          isadedVisible
                            ? require("../assets/dropup.png")
                            : require("../assets/dropdown.png")
                        }
                        style={styles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                  {ismededVisible && (
                    <View style={styles.fieldsedit3}>
                      <Text style={styles.inputLabel}>Medical History :</Text>
                      <TextInput
                        style={styles.input}
                        value={profile.medhistory}
                        onChangeText={(text) => handleChange("name", text)}
                      />
                      <Text style={styles.inputLabel}>Past Surgeries :</Text>
                      {rows.map((row, index) => (
                        <View key={index} style={styles.tableRow}>
                          <TextInput
                            style={styles.inputbox}
                            placeholder="Surgery"
                            value={row.surgery}
                            onChangeText={(value) =>
                              handleInputChange(index, "surgery", value)
                            }
                          />
                          <TextInput
                            style={styles.inputdate}
                            placeholder="Date"
                            value={row.date}
                            onChangeText={(value) =>
                              handleInputChange(index, "date", value)
                            }
                          />
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteRow1(index)}
                          >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={addRow1}
                      >
                        <Text style={styles.addButtonText}>Add More</Text>
                      </TouchableOpacity>
                      <Text style={styles.inputLabel}>
                        Vaccination History:
                      </Text>
                      {rows.map((row, index) => (
                        <View key={index} style={styles.tableRow}>
                          <TextInput
                            style={styles.inputbox}
                            placeholder="Vaccine"
                            value={row.vac}
                            onChangeText={(value) =>
                              handleInputChange(index, "vac", value)
                            }
                          />
                          <TextInput
                            style={styles.inputdate}
                            placeholder="Date"
                            value={row.vd}
                            onChangeText={(value) =>
                              handleInputChange(index, "vd", value)
                            }
                          />
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteRow2(index)}
                          >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={addRow2}
                      >
                        <Text style={styles.addButtonText}>Add More</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={styles.cont}>
                  <TouchableOpacity
                    style={styles.head}
                    onPress={toggleinsedVisibility}
                  >
                    <View style={styles.headview}>
                      <Text style={styles.detailsTitlehead}>
                        Insurance Information
                      </Text>
                      <Image
                        source={
                          isinsedVisible
                            ? require("../assets/dropup.png")
                            : require("../assets/dropdown.png")
                        }
                        style={styles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                  {isinsedVisible && (
                    <View style={styles.fieldsedit3}>
                      <Text style={styles.inputLabel}>Insurance Details :</Text>
                      {rows.map((row, index) => (
                        <View key={index} style={styles.tableRow}>
                          <TextInput
                            style={styles.inputbox}
                            placeholder="Surgery"
                            value={row.surgery}
                            onChangeText={(value) =>
                              handleInputChange(index, "surgery", value)
                            }
                          />
                          <TextInput
                            style={styles.inputdate}
                            placeholder="Date"
                            value={row.date}
                            onChangeText={(value) =>
                              handleInputChange(index, "date", value)
                            }
                          />
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteRow(index)}
                          >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={addRow1}
                      >
                        <Text style={styles.addButtonText}>Add More</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.cont}>
                  <TouchableOpacity
                    style={styles.head}
                    onPress={toggleapedVisibility}
                  >
                    <View style={styles.headview}>
                      <Text style={styles.detailsTitlehead}>
                        Appointment History
                      </Text>
                      <Image
                        source={
                          isapedVisible
                            ? require("../assets/dropup.png")
                            : require("../assets/dropdown.png")
                        }
                        style={styles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                  {isapedVisible && (
                    <View style={styles.fieldsedit3}>
                      <Text style={styles.inputLabel}>
                        Appointment Details :
                      </Text>
                      {rows.map((row, index) => (
                        <View key={index} style={styles.tableRow}>
                          <TextInput
                            style={styles.inputbox}
                            placeholder="Surgery"
                            value={row.surgery}
                            onChangeText={(value) =>
                              handleInputChange(index, "surgery", value)
                            }
                          />
                          <TextInput
                            style={styles.inputdate}
                            placeholder="Date"
                            value={row.date}
                            onChangeText={(value) =>
                              handleInputChange(index, "date", value)
                            }
                          />
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteRow(index)}
                          >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={addRow1}
                      >
                        <Text style={styles.addButtonText}>Add More</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.cont}>
                  <TouchableOpacity
                    style={styles.head}
                    onPress={togglelifeedVisibility}
                  >
                    <View style={styles.headview}>
                      <Text style={styles.detailsTitlehead}>
                        Lifestyle Information
                      </Text>
                      <Image
                        source={
                          islifeedVisible
                            ? require("../assets/dropup.png")
                            : require("../assets/dropdown.png")
                        }
                        style={styles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                  {islifeedVisible && (
                    <View style={styles.fieldsedit2}>
                      <Text style={styles.inputLabel}>
                        Dietary Preferences :
                      </Text>
                      {/* <TextInput
                        style={styles.input}
                        multiline
                        value={profile.diet}
                        onChangeText={(text) => handleChange("diet", text)}
                      /> */}
                      <TouchableOpacity onPress={handleDietButton}>
                        <Text>Select</Text>
                      </TouchableOpacity>
                      <Modal
                        visible={isModal1Visible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={toggleModal1}
                      >
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                            <ImageGrid
                              images={dietset}
                              onSelect={handleDietSelection}
                              toggleable={true}
                              defaultSelected={selectedDiet}
                            />
                            <Button title="Close" onPress={dietlist} />
                          </View>
                        </View>
                      </Modal>

                      <Text style={styles.inputLabel}>Physical Activity :</Text>
                      <TextInput
                        style={styles.input}
                        multiline
                        value={profile.phyactivity}
                        onChangeText={(text) =>
                          handleChange("phyactivity", text)
                        }
                      />
                    </View>
                  )}
                </View>
              </ScrollView>
              <View style={styles.footerbutton}>
                <TouchableOpacity
                  style={styles.buttonsave}
                  onPress={saveProfile}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonsave}
                  onPress={hideEditProfile}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </KeyboardAvoidingView>
        </Animated.View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 50,
    // flexDirection: "row",
  },
  head: {
    backgroundColor: "#E582AD",
    width: "100%",
    height: 40,
    borderRadius: 10,
    // justifyContent: "center",
    // marginBottom:5,
    // flexDirection:"row",
    // display:"flex"
  },
  headview: {
    backgroundColor: "#E582AD",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    // marginBottom:5,
    flexDirection: "row",
    display: "flex",
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 15,
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  email: {
    fontSize: 13,
    color: "#000",
  },
  profileDetails: {
    // marginBottom: 30,
    // position:"absolute",
    // borderWidth: 2,
    borderColor: "grey",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: "5%",
    paddingRight: "5%",
    // elevation: 2,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignSelf: "center",
    // backgroundColor: "#FFD6F6",
    width: "100%",
    // height: "75%",
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: "52%",
    alignItems: "center",
    // width: "100%",
    paddingHorizontal: "2%",
  },
  scrollViewContentmain: {
    paddingBottom: "20%",
    alignItems: "center",
    // width: "100%",
    paddingHorizontal: "2%",
    // flex:1,
    // display:"flex",
    // paddingBottom:40,
    // backgroundColor:"red"
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#333",
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailContainername: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tablehead: {
    // alignItems:"center",
    height: "100%",
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tablebody: {
    alignItems: "center",
    height: 35,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  table: {
    // alignItems:"center",
    backgroundColor: "red",
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    height: "100%",
    width: "50%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "column",
    // justifyContent: "space-evenly",
    backgroundColor: "#E7DDFF",
    elevation: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
  },
  tableColumn1: {
    flex: 1,
    fontWeight: "bold",
  },
  tableColumn2: {
    flex: 2,
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "white",
  },
  tableColumn2h: {
    flex: 2,
    marginLeft: 25,
    fontWeight: "bold",
  },
  detailTitle: {
    width: 130,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailTitlemed: {
    width: 130,
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  detailTitlemed2: {
    width: 160,
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  detailTextmed: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  detailsTitlehead: {
    // flex: 1,
    fontSize: 20,
    color: "#000",
    paddingLeft: 14,
    alignSelf: "center",
  },
  detailTextc: {
    display: "flex",
    fontSize: 16,
    color: "#000",
    width: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: "#FFD6F6",
    height: "8%",
    alignSelf: "center",
    position: "absolute",
    width: "90%",
    top: "90%",
    // backgroundColor:"red",
    // paddingBottom:"5%"
    // marginBottom:"5%"
  },
  button: {
    display: "flex",
    backgroundColor: "#E582AD",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    elevation: 5,
    width: 150,
    height: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
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
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
    // marginLeft: 124, // Adjust as needed
    alignSelf: "center",
    // justifyContent:"center",
    marginRight: 10,
  },
  box: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    height: 420,
    marginTop: 10,
  },
  boxper: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    height: "auto",
    position: "relative",
    marginTop: 10,
    paddingBottom: 10,
  },
  boxlife: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    height: "auto",
    position: "relative",
    paddingBottom: 10,
    marginTop: 10,
  },
  boxmd: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    height: "auto",
    position: "relative",
    paddingBottom: 10,
    marginTop: 10,
  },
  boxad: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    height: "auto",
    position: "relative",
    paddingBottom: 10,
    marginTop: 10,
  },
  boxap: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    height: "auto",
    position: "relative",
    paddingBottom: 10,
    marginTop: 10,
  },
  box2: {
    backgroundColor: "#ECB4E0",
    elevation: 5,
    borderRadius: 10,
    // marginBottom:10,
    height: "50%",
  },
  fields: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    // backgroundColor: "#ECB4E0",
    marginBottom: "2%",
    // elevation: 5,
    flexDirection: "row",
    height: "8%",
    width: "100%",
  },
  fieldsmd: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    // backgroundColor: "#ECB4E0",
    marginBottom: "2%",
    // elevation: 5,
    flexDirection: "row",
    height: 30,
    width: "100%",
  },
  fieldsper: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    // backgroundColor: "#ECB4E0",
    marginBottom: "2%",
    // elevation: 5,
    flexDirection: "row",
    height: 30,
    width: "100%",
  },
  fieldslife: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    // backgroundColor: "#ECB4E0",
    marginBottom: 10,
    // elevation: 5,
    flexDirection: "row",
    height: "auto",
    position: "relative",
    width: "100%",
  },
  fieldsad: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    // backgroundColor: "#ECB4E0",
    // marginBottom: "2%",
    // elevation: 5,
    flexDirection: "row",
    height: 45,
    width: "100%",
  },
  fieldsedit2: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 15,
    borderRadius: 18,
    backgroundColor: "#ECB4E0",
    marginBottom: "3.5%",
    elevation: 5,
    flexDirection: "column",
    height: "auto",
    width: "100%",
    marginTop: 10,
  },
  fieldsedit1: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 15,
    borderRadius: 18,
    backgroundColor: "#ECB4E0",
    marginBottom: "3.5%",
    elevation: 5,
    flexDirection: "column",
    height: "auto",
    width: "100%",
    marginTop: 10,
  },
  fieldsedit3: {
    // borderWidth: 2,
    position: "relative",
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 15,
    borderRadius: 18,
    backgroundColor: "#ECB4E0",
    marginBottom: "3.5%",
    elevation: 5,
    flexDirection: "column",
    height: "auto",
    width: "100%",
    marginTop: 10,
  },
  fieldsadrs: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    // backgroundColor: "#ECB4E0",
    // marginBottom: "2%",
    // elevation: 5,
    flexDirection: "row",
    height: 70,
    width: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  linearGradient2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#FFD6F6",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 28,
    flex: 1,
    width: "100%",
  },
  editProfile: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80%",
    backgroundColor: "#FFD6F6",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    // padding: 28,
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    color: "#000",
    // width:150
  },
  inputbox: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    color: "#000",
    width: 120,
    marginRight: 6,
  },
  inputdate: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    color: "#000",
    width: 100,
    // marginRight:6,
  },
  footerbutton: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#FFD6F6",
    height: "8%",
    alignSelf: "center",
    position: "absolute",
    width: "100%",
    top: "90%",
    // backgroundColor:"red"
  },
  buttonsave: {
    display: "flex",
    backgroundColor: "#E582AD",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    elevation: 5,
    width: 150,
    height: 50,
    // marginBottom: 10,
    marginTop: 20,
    zIndex: 2,
  },
  nametop: {
    alignItems: "center",
  },
  cont: {
    width: "100%",
    marginBottom: 10,
  },
  cont1: {
    width: "100%",
    marginBottom: 10,
    position: "relative",
    height: "auto",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    width: 60,
    height: 40,
    marginLeft: 4,
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ProfilePage;
