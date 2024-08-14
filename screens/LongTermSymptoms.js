import React, { useState, useRef, useEffect } from "react";
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
  Dimensions,
} from "react-native";
import ImageGrid from "../components/ImageGrid";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Breast_Left from "../components/Breast_Left";
import Breast_Right from "../components/Breast_Right";
import CustomDropdown from "../components/CustomDropdownLTS";
import MultiSelectComponent from "../components/MultiSelectComponentLTS";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LongTermSymptoms = () => {
  // System Variables Starts
  // const navigation = useNavigation(); //Navigation Variable
  const scrollViewRef = useRef(null);

  const date = new Date(); //Unformatted Date
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }); //Formatted Date

  const [toggler, toggle] = useState("Left"); //Toggler of Left to Right
  const [symptomToggle, symptomToggler] = useState("Breast"); // Toggler of Symptom parts -- Breast or Nipple
  const [symptomChange, symptomChanged] = useState(false); // Toggler of Symptom parts -- Breast or Nipple

  let breastSymptomsFilled = false;
  let nippleSymptomsFilled = false;

  // Modal Functions
  const [isModal1Visible, setModal1Visible] = useState(false);
  const [isModal2Visible, setModal2Visible] = useState(false);
  const [isModal3Visible, setModal3Visible] = useState(false);
  const [isModal4Visible, setModal4Visible] = useState(false);
  const [isModal5Visible, setModal5Visible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(5)).current;
  // System Variables Ends

  // Symptom Variables Starts
  const [haveLumps, setHaveLumps] = useState(null); //Do you have Lumps? --- Yes/No
  const [lumpType, setLumpType] = useState([]); //Which kind of Lump? - Multiple(Hard, Irregular, Differ)

  const [changeInBreastSymmetry, setChangeInBreastSymmetry] = useState(null); //Confirmed -- Do you see change in Breast Symmetry? -- Yes or No
  const [haveBreastSymmetry, setBreastSymmetry] = useState(null); //Confirmed -- Symmetrical Or Asymmetrical

  const [breastSizeChanged, setBreastSizeChanged] = useState(null); //Do you see any change in Breast Size? -- Yes or No
  const [breastSizeChangeSide, setBreastSizeChangeSide] = useState(null); // Change in Which Side -- Left/ Right/ Both
  const [selectedLeftSize, setSelectedLeftSize] = useState(null); // Increased or Decreased
  const [selectedRightSize, setSelectedRightSize] = useState(null); // Increased or Decreased

  const [haveSwelling, setHaveSwelling] = useState(null); // Have Swelling? --- Yes or No
  const [swellingCoverage, setSwellingCoverage] = useState(null); // Coverage of Swelling? -- Entire Breast or Parts of Breast
  const [swellingInWhichBreastEB, setSwellingInWhichBreastEB] = useState(null); //Swelling in which breast? -- Left/ Right/ Both
  const [swellingInWhichBreastPB, setSwellingInWhichBreastPB] = useState(null); //Swelling in which breast? -- Left/ Right/ Both
  const [leftSwellingPositions, setLeftSwellingPosition] = useState([]); // Position on Left Breast
  const [rightSwellingPositions, setRightSwellingPosition] = useState([]); // Position on Right Breast

  const [haveNippleChanges, setHaveNippleChanges] = useState(null); //Confirmed -- See any change in Nipple? Yes or No

  const [haveNippleDischarge, setHaveNippleDischarge] = useState(null); //Confirmed -- See what kind of Nipple Discharge? Usual or Unusual
  const [haveUnusualNippleDischargeColor, setHaveUnusualNippleDischargeColor] =
    useState(null); //Confirmed -- If, discharge is Unusual, then which color of discharge? -- Bloody/ CLear or Watery/ Yellow or Green/ Milky / Pus Like/ Foul Smelling

  // Symptom Variables Ends

  // Functions Starts
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

  // Function for Toggling Modal 5
  const toggleModal5 = () => {
    if (isModal5Visible) {
      fadeOut5();
    } else {
      setBreastSizeChangeSide("Left");
      setModal5Visible(true);
      fadeIn();
    }
  };

  // Fade In function to display all modals
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
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModal2Visible(false);
    });
  };
  // Fade out function for Modal 3
  const fadeOut3 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModal3Visible(false);
    });
  };
  // Fade out function for Modal 4
  const fadeOut4 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModal4Visible(false);
    });
  };
  // Fade out function for Modal 5
  const fadeOut5 = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModal5Visible(false);
    });
  };

  // Function to manage Right Breast Swelling Position selections
  const handleRightSwellingSelection = (rightSwellingPositions) => {
    setRightSwellingPosition((prevSelectedLocations) => {
      if (prevSelectedLocations.includes(rightSwellingPositions)) {
        return prevSelectedLocations.filter(
          (location) => location !== rightSwellingPositions
        );
      } else {
        return [...prevSelectedLocations, rightSwellingPositions];
      }
    });
  };

  // Function to manage Left Breast Swelling Position selections
  const handleLeftSwellingSelection = (leftSwellingPositions) => {
    setLeftSwellingPosition((prevSelectedLocations) => {
      if (prevSelectedLocations.includes(leftSwellingPositions)) {
        return prevSelectedLocations.filter(
          (location) => location !== leftSwellingPositions
        );
      } else {
        return [...prevSelectedLocations, leftSwellingPositions];
      }
    });
  };

  // Function to manage Modal 1 and to save whether lumps are there or not
  const manageHaveLump = (value) => {
    if (value === "Yes") {
      toggleModal1();
      setHaveLumps(value);
    } else if (value === "No") {
      setHaveLumps(value);
    }
  };

  // Function to manage modal 2 and save the Type of Discharge - Usual / Unusual
  const manageDischarge = (value) => {
    if (value === "Unusual") {
      toggleModal2();
      setHaveNippleDischarge(value);
    } else {
      setHaveNippleDischarge(value);
    }
  };

  // Function to manage modal 3 and save whether there is any change in Breast Symmetry
  const manageBreastSymmetry = (value) => {
    if (value === "Yes") {
      toggleModal3();
      setChangeInBreastSymmetry(value);
    } else if (value === "No") {
      setChangeInBreastSymmetry(value);
    }
  };

  // Function to manage Modal 4 and to save Whether there is any change in the breast size or not
  const manageBreastSizeChanged = (value) => {
    if (value === "Yes") {
      toggleModal4();
      setBreastSizeChanged(value);
    } else if (value === "No") {
      setBreastSizeChanged(value);
    }
  };

  // Function to manage Modal 5 and to save the Swelling Coverage -- Entire Breast / Parts of Breast
  const manageSwellingPosition = (value) => {
    toggleModal5();
    setSwellingCoverage(value);
  };

  // Function to save the Side of the breast that has Swelling
  const manageSwellingInWhichBreastPB = (value) => {
    toggle("Left");
    setSwellingInWhichBreastPB(value);
  };

  // If else statement to set a flag that the Breast Symptoms are filled
  if (
    (haveLumps === "No" || lumpType.length !== 0) &&
    (changeInBreastSymmetry === "No" || haveBreastSymmetry) &&
    (breastSizeChanged === "No" ||
      (selectedLeftSize && breastSizeChangeSide.includes("Left")) ||
      (selectedRightSize && breastSizeChangeSide.includes("Right")) ||
      (selectedLeftSize &&
        selectedRightSize &&
        breastSizeChangeSide === "Both")) &&
    (haveSwelling === "No" ||
      (swellingCoverage === "Entire Breast" && swellingInWhichBreastEB) ||
      (swellingCoverage === "Parts of Breast" &&
        ((swellingInWhichBreastPB === "Left" && leftSwellingPositions.length) ||
          (swellingInWhichBreastPB === "Right" &&
            rightSwellingPositions.length) ||
          (swellingInWhichBreastPB === "Both" &&
            leftSwellingPositions.length &&
            rightSwellingPositions.length))))
  ) {
    breastSymptomsFilled = true;
  }

  // If else statement to set a flag that the Nipple Symptoms are filled
  nippleSymptomsFilled =
    haveNippleChanges !== null &&
    ((haveNippleDischarge === "Unusual" &&
      haveUnusualNippleDischargeColor !== null) ||
      haveNippleDischarge === "Usual");

  // Effects to Reset the values if the answers of the main Question is No
  useEffect(() => {
    if (haveLumps === "No") {
      setLumpType([]);
    }
  }, [haveLumps]);

  useEffect(() => {
    if (changeInBreastSymmetry === "No") {
      setBreastSymmetry(null);
    }
  }, [changeInBreastSymmetry]);

  useEffect(() => {
    if (breastSizeChanged === "No") {
      setBreastSizeChangeSide(null);
      setSelectedLeftSize(null);
      setSelectedRightSize(null);
    }
  }, [breastSizeChanged]);

  useEffect(() => {
    if (haveSwelling === "No") {
      setSwellingCoverage(null);
      setSwellingInWhichBreastPB(null);
      setSwellingInWhichBreastEB(null);
      setLeftSwellingPosition([]);
      setRightSwellingPosition([]);
    }
  }, [haveSwelling]);

  useEffect(() => {
    if (haveNippleDischarge === "Usual") {
      setHaveUnusualNippleDischargeColor(null);
    }
  }, [haveNippleDischarge]);

  const handleNext = () => {
    if (breastSymptomsFilled) {
      symptomToggler("Nipple");
      symptomChanged(true);
    }
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

  const handleSave = async () => {
    try {
      const token = await getToken();
      if (token) {
        const response = await axios.post(
          "http://192.168.137.31:3000/LongTerm",
          {
            haveLumps,
            lumpType,
            changeInBreastSymmetry,
            haveBreastSymmetry,
            breastSizeChanged,
            breastSizeChangeSide,
            selectedLeftSize,
            selectedRightSize,
            haveSwelling,
            swellingCoverage,
            swellingInWhichBreastEB,
            swellingInWhichBreastPB,
            leftSwellingPositions,
            rightSwellingPositions,
            haveNippleChanges,
            haveNippleDischarge,
            haveUnusualNippleDischargeColor,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Alert.alert("Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Failed to save data");
    }
    // Alert.alert("Saved");
  };

  // Options for Yes/No
  const yesNoOptions = [
    { id: "1", label: "Yes", value: "Yes" },
    { id: "2", label: "No", value: "No" },
  ];

  // Left/ Right/ Both Options
  const leftRightBothOptions = [
    { id: "1", label: "Left", value: "Left" },
    { id: "2", label: "Right", value: "Right" },
    { id: "3", label: "Both", value: "Both" },
  ];

  // Questions starts

  const question1 = ["Have Lumps"];

  const question2 = ["Lump Type"];
  const options2 = [
    {
      id: "1",
      label: "Hard",
      value: "Hard",
    },
    {
      id: "2",
      label: "Soft",
      value: "Soft",
    },
    {
      id: "3",
      label: "Painless",
      value: "Painless",
    },
    {
      id: "4",
      label: "Movable",
      value: "Movable",
    },
  ];

  const question3 = "Change in Breast Symmetry";

  const question4 = "Nipple Changes";

  const question5 = "Nipple Discharge";
  const options5 = [
    {
      id: "1",
      label: "Usual",
      value: "Usual",
    },
    {
      id: "2",
      label: "Unusual",
      value: "Unusual",
    },
  ];

  const question6 = "Change in Breast Size";

  const question7 = "Have Swelling in";
  const options7 = [
    { id: "1", label: "Entire Breast", value: "Entire Breast" },
    { id: "2", label: "Parts of Breast", value: "Parts of Breast" },
  ];

  const question8 = "Have Swelling?";
  const question9 = "Which Breast?";

  // Discharge Colors
  const dischargeColors = [
    { label: "Bloody", value: "Bloody" },
    {
      label: "Clear or Watery",
      value: "Clear/Watery",
    },
    {
      label: "Yellow or Green",
      value: "Yellow/Green",
    },
    { label: "Milky", value: "Milky" },
    {
      label: "Pus Like",
      value: "Pus Like",
    },
    {
      label: "Foul Smelling",
      value: "Foul Smelling",
    },
  ];

  //Breast Symmetry Images starts
  const breastSymmetry = [
    {
      path: require("../assets/symmetric-breast.jpg"),
      label: "Symmetric Breast",
      value: "Symmetric Breast",
    },
    {
      path: require("../assets/asymmetric-breast.jpg"),
      label: "Asymmetric Breast",
      value: "Asymmetric Breast",
    },
  ];

  //Breast Size change Images starts
  const breastSize = [
    {
      path: require("../assets/size-increase.png"),
      label: "Increase",
      value: "Increase",
    },
    {
      path: require("../assets/size-reduction.png"),
      label: "Decrease",
      value: "Decrease",
    },
  ];

  const renderQuestion = (
    question,
    options,
    selected,
    renderFunction,
    setFunction
  ) => {
    return (
      <>
        <View>
          <Text style={styles.question}>{question}</Text>
        </View>
        <View style={styles.optionContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selected === option.value && styles.selectedOption,
              ]}
              onPress={() => {
                option.value === "Yes"
                  ? renderFunction(option.value)
                  : setFunction(option.value);

                option.value === "Entire Breast" ||
                option.value === "Parts of Breast"
                  ? renderFunction(option.value)
                  : null;

                option.value === "Unusual"
                  ? renderFunction(option.value)
                  : null;
                option.value === "Usual" ? setFunction(option.value) : null;
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  const twoIcons = (toggle) => {
    return (
      <View style={styles.modalButtonSection}>
        <TouchableOpacity style={styles.iconButton} onPress={toggle}>
          <Ionicons name="checkmark-outline" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggle}>
          <Ionicons name="close" size={28} color="white" onPress={toggle} />
        </TouchableOpacity>
      </View>
    );
  };

  const fourIcons = (modal) => {
    return (
      <>
        {toggler === "Left" && (
          <View
            style={styles.iconLeftSelectedButton}
            onPress={() => {
              toggle("Left");
            }}
          >
            <Entypo name="chevron-thin-left" size={25} color="black" />
          </View>
        )}
        {toggler === "Right" && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              toggle("Left");
            }}
          >
            <Entypo name="chevron-thin-left" size={25} color="white" />
          </TouchableOpacity>
        )}
        {modal === 4 && (
          <>
            {selectedLeftSize !== null && selectedRightSize !== null && (
              <>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={modal === 4 ? toggleModal4 : ""}
                >
                  <Ionicons name="checkmark-outline" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={modal === 4 ? toggleModal4 : ""}
                >
                  <Ionicons
                    name="close"
                    size={28}
                    color="white"
                    onPress={modal === 4 ? toggleModal4 : ""}
                  />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
        {modal === 5 && (
          <>
            {leftSwellingPositions.length !== 0 &&
              rightSwellingPositions.length !== 0 && (
                <>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={modal === 5 ? toggleModal5 : ""}
                  >
                    <Ionicons
                      name="checkmark-outline"
                      size={28}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={modal === 5 ? toggleModal5 : ""}
                  >
                    <Ionicons
                      name="close"
                      size={28}
                      color="white"
                      onPress={modal === 5 ? toggleModal5 : ""}
                    />
                  </TouchableOpacity>
                </>
              )}
          </>
        )}
        {toggler === "Left" && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              toggle("Right");
            }}
          >
            <Entypo name="chevron-thin-right" size={25} color="white" />
          </TouchableOpacity>
        )}
        {toggler === "Right" && (
          <View
            style={styles.iconRightSelectedButton}
            onPress={() => {
              toggle("Right");
            }}
          >
            <Entypo name="chevron-thin-right" size={25} color="black" />
          </View>
        )}
      </>
    );
  };

  const renderImageGrid = (
    images,
    onSelect,
    toggleable,
    defaultSelected,
    title
  ) => (
    <View style={styles.modalSection}>
      {title && <Text style={styles.modalSectionTitle}>{title}</Text>}
      <ImageGrid
        images={images}
        onSelect={onSelect}
        toggleable={toggleable}
        defaultSelected={defaultSelected}
      />
    </View>
  );

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
            <Text style={styles.pageText}>{formattedDate}</Text>
            {/* Displaying the Current date by default and Selected date on Selection ends here */}
          </View>
          {/* Date in Icons Section in Header Ends*/}
        </View>
        {/* Icons Section in Header ends here */}
      </View>
      {/* Page Header ends here */}
      {/* Text Content under header starts */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.pageText}>
          <Text style={{ fontWeight: "bold" }}>Long Term Symptoms</Text>
        </Text>
      </View>
      {/* Text Content under header ends */}
      {/* Bottom Slider Starts */}

      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          {/* Slider Top Left Icon */}
          {symptomToggle === "Nipple" && (
            <TouchableOpacity
              style={styles.sliderHeaderLeftIcon}
              onPress={() => symptomToggler("Breast")}
            >
              <Entypo name="chevron-thin-left" size={25} color="black" />
            </TouchableOpacity>
          )}

          {/* Slider Top Header */}
          {symptomToggle === "Breast" && (
            <Text style={styles.sliderHeaderTitle}>Breast Symptoms</Text>
          )}
          {symptomToggle === "Nipple" && (
            <Text style={styles.sliderHeaderTitle}>Nipple Symptoms</Text>
          )}

          {/* Slider Top Right Icon */}
          {symptomToggle === "Breast" && symptomChange && (
            <TouchableOpacity
              style={styles.sliderHeaderRightIcon}
              onPress={() => symptomToggler("Nipple")}
            >
              <Entypo name="chevron-thin-right" size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent1}
          ref={scrollViewRef}
        >
          {symptomToggle === "Breast" && (
            <>
              {/* Question 1 */}
              {/* Have Lump? */}
              <View style={styles.first_section}>
                {haveLumps === null && (
                  <>
                    {renderQuestion(
                      question1,
                      yesNoOptions,
                      null,
                      manageHaveLump,
                      setHaveLumps
                    )}
                  </>
                )}
                {haveLumps === "Yes" && (
                  <>
                    {lumpType.length === 0 && (
                      <>
                        {renderQuestion(
                          question1,
                          yesNoOptions,
                          null,
                          manageHaveLump,
                          setHaveLumps
                        )}
                      </>
                    )}
                    {lumpType.length !== 0 && (
                      <>
                        {renderQuestion(
                          question1,
                          yesNoOptions,
                          "Yes",
                          manageHaveLump,
                          setHaveLumps
                        )}
                      </>
                    )}
                  </>
                )}
                {haveLumps === "No" && (
                  <>
                    {renderQuestion(
                      question1,
                      yesNoOptions,
                      "No",
                      manageHaveLump,
                      setHaveLumps
                    )}
                  </>
                )}
              </View>

              {/* Question 2 */}
              {/* Change in Breast Symmetry */}
              <View style={styles.section}>
                {changeInBreastSymmetry === null &&
                  renderQuestion(
                    question3,
                    yesNoOptions,
                    null,
                    manageBreastSymmetry,
                    setChangeInBreastSymmetry
                  )}

                {changeInBreastSymmetry === "Yes" && (
                  <>
                    {haveBreastSymmetry === null && (
                      <>
                        {renderQuestion(
                          question3,
                          yesNoOptions,
                          null,
                          manageBreastSymmetry,
                          setChangeInBreastSymmetry
                        )}
                      </>
                    )}
                    {haveBreastSymmetry !== null && (
                      <>
                        {renderQuestion(
                          question3,
                          yesNoOptions,
                          "Yes",
                          manageBreastSymmetry,
                          setChangeInBreastSymmetry
                        )}
                      </>
                    )}
                  </>
                )}

                {changeInBreastSymmetry === "No" &&
                  renderQuestion(
                    question3,
                    yesNoOptions,
                    "No",
                    manageBreastSymmetry,
                    setChangeInBreastSymmetry
                  )}
              </View>

              {/* Question 9 */}
              {/* Change in Breast Size */}
              <View style={styles.section}>
                {breastSizeChanged === null &&
                  renderQuestion(
                    question6,
                    yesNoOptions,
                    null,
                    manageBreastSizeChanged,
                    setBreastSizeChanged
                  )}

                {breastSizeChanged === "Yes" && (
                  <>
                    {breastSizeChangeSide === null &&
                      renderQuestion(
                        question6,
                        yesNoOptions,
                        null,
                        manageBreastSizeChanged,
                        setBreastSizeChanged
                      )}

                    {breastSizeChangeSide === "Left" &&
                      renderQuestion(
                        question6,
                        yesNoOptions,
                        selectedLeftSize !== null ? "Yes" : null,
                        manageBreastSizeChanged,
                        setBreastSizeChanged
                      )}

                    {breastSizeChangeSide === "Right" &&
                      renderQuestion(
                        question6,
                        yesNoOptions,
                        selectedRightSize !== null ? "Yes" : null,
                        manageBreastSizeChanged,
                        setBreastSizeChanged
                      )}

                    {breastSizeChangeSide === "Both" &&
                      renderQuestion(
                        question6,
                        yesNoOptions,
                        selectedLeftSize !== null && selectedRightSize !== null
                          ? "Yes"
                          : null,
                        manageBreastSizeChanged,
                        setBreastSizeChanged
                      )}
                  </>
                )}

                {breastSizeChanged === "No" &&
                  renderQuestion(
                    question6,
                    yesNoOptions,
                    "No",
                    manageBreastSizeChanged,
                    setBreastSizeChanged
                  )}
              </View>

              {/* Have Swelling? */}
              <View style={styles.last_section}>
                {renderQuestion(
                  question8,
                  yesNoOptions,
                  haveSwelling,
                  setHaveSwelling,
                  setHaveSwelling
                )}

                {haveSwelling === "Yes" && (
                  <View style={styles.question}>
                    {swellingCoverage === null && (
                      <>
                        {renderQuestion(
                          question7,
                          options7,
                          null,
                          manageSwellingPosition,
                          manageSwellingPosition
                        )}
                      </>
                    )}
                    {swellingCoverage === "Entire Breast" && (
                      <>
                        {swellingInWhichBreastEB !== null
                          ? renderQuestion(
                              question7,
                              options7,
                              "Entire Breast",
                              manageSwellingPosition,
                              manageSwellingPosition
                            )
                          : renderQuestion(
                              question7,
                              options7,
                              null,
                              manageSwellingPosition,
                              manageSwellingPosition
                            )}
                      </>
                    )}

                    {swellingCoverage === "Parts of Breast" && (
                      <>
                        {(swellingInWhichBreastPB === null ||
                          (swellingInWhichBreastPB === "Left" &&
                            leftSwellingPositions.length === 0) ||
                          (swellingInWhichBreastPB === "Right" &&
                            rightSwellingPositions.length === 0) ||
                          (swellingInWhichBreastPB === "Both" &&
                            leftSwellingPositions.length === 0 &&
                            rightSwellingPositions.length === 0)) && (
                          <>
                            {renderQuestion(
                              question7,
                              options7,
                              null,
                              manageSwellingPosition,
                              manageSwellingPosition
                            )}
                          </>
                        )}
                        {(swellingInWhichBreastPB === "Left" &&
                          leftSwellingPositions.length !== 0) ||
                        (swellingInWhichBreastPB === "Right" &&
                          rightSwellingPositions.length !== 0) ||
                        (swellingInWhichBreastPB === "Both" &&
                          leftSwellingPositions.length !== 0 &&
                          rightSwellingPositions.length !== 0) ? (
                          <>
                            {renderQuestion(
                              question7,
                              options7,
                              "Parts of Breast",
                              manageSwellingPosition,
                              manageSwellingPosition
                            )}
                          </>
                        ) : null}
                      </>
                    )}
                  </View>
                )}
              </View>

              {breastSymptomsFilled && (
                <TouchableOpacity style={styles.footer} onPress={handleNext}>
                  <Text style={styles.footerText}>Next</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {symptomToggle === "Nipple" && (
            <>
              {/* Question 4 */}
              {/* Nipple Changes */}
              <View style={styles.first_section}>
                <MultiSelectComponent
                  question={question4}
                  options={yesNoOptions}
                  initialSelectedOptions={haveNippleChanges}
                  onSelectionChange={(value) => setHaveNippleChanges(value)}
                  isMultiSelect={false}
                  canDeselect={false}
                />
              </View>

              {/* Question 5 */}
              {/* Have Nipple Discharge */}
              <View style={styles.last_section}>
                {haveNippleDischarge === null && (
                  <>
                    {renderQuestion(
                      question5,
                      options5,
                      null,
                      manageDischarge,
                      setHaveNippleDischarge
                    )}
                  </>
                )}
                {haveNippleDischarge === "Usual" && (
                  <>
                    {renderQuestion(
                      question5,
                      options5,
                      "Usual",
                      manageDischarge,
                      setHaveNippleDischarge
                    )}
                  </>
                )}
                {haveNippleDischarge === "Unusual" && (
                  <>
                    {haveUnusualNippleDischargeColor === null && (
                      <>
                        {renderQuestion(
                          question5,
                          options5,
                          null,
                          manageDischarge,
                          setHaveNippleDischarge
                        )}
                      </>
                    )}
                    {haveUnusualNippleDischargeColor !== null && (
                      <>
                        {renderQuestion(
                          question5,
                          options5,
                          "Unusual",
                          manageDischarge,
                          setHaveNippleDischarge
                        )}
                      </>
                    )}
                  </>
                )}
              </View>

              {nippleSymptomsFilled && breastSymptomsFilled && (
                <TouchableOpacity style={styles.footer} onPress={handleSave}>
                  <Text style={styles.footerText}>Submit</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {/* If Have Lumps- then  */}
          {/* Modal 1 */}
          <Modal
            transparent={true}
            visible={isModal1Visible}
            animationType="none"
            onRequestClose={toggleModal1}
          >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
              <Animated.View
                style={[styles.modalContent, { opacity: fadeAnim }]}
              >
                <View style={styles.modalSection}>
                  <MultiSelectComponent
                    question={question2}
                    options={options2}
                    initialSelectedOptions={lumpType}
                    onSelectionChange={(value) => setLumpType(value)}
                    isMultiSelect={true}
                    selectable={true}
                  />
                </View>
                {twoIcons(toggleModal1)}
              </Animated.View>
            </TouchableOpacity>
          </Modal>

          {/* If Unuusual, then */}
          {/* Discharge Color */}
          {/* Modal 2 */}
          <Modal
            transparent={true}
            visible={isModal2Visible}
            animationType="none"
            onRequestClose={toggleModal2}
          >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
              <Animated.View
                style={[styles.modalContent, { opacity: fadeAnim }]}
              >
                <Text style={styles.modalSectionTitle}>Discharge Color</Text>
                <View style={styles.modalSection}>
                  <CustomDropdown
                    data={dischargeColors}
                    selectedValue={haveUnusualNippleDischargeColor}
                    onSelect={(item) =>
                      setHaveUnusualNippleDischargeColor(item)
                    }
                  />
                </View>
                {twoIcons(toggleModal2)}
              </Animated.View>
            </TouchableOpacity>
          </Modal>

          {/* Question 8 */}
          {/* Choose Symmetry */}
          {/* Modal 3 */}
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
                <Text style={styles.modalSectionTitle}>Choose Symmetry</Text>
                <View style={styles.modalSection}>
                  <ImageGrid
                    images={breastSymmetry}
                    onSelect={setBreastSymmetry}
                    toggleable={true}
                    defaultSelected={haveBreastSymmetry}
                  />
                </View>
                {twoIcons(toggleModal3)}
              </Animated.View>
            </TouchableOpacity>
          </Modal>

          {/* Modal 4 */}
          <Modal
            transparent={true}
            visible={isModal4Visible}
            animationType="none"
            onRequestClose={toggleModal4}
          >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
              <Animated.View
                style={[styles.modalContent, { opacity: fadeAnim }]}
              >
                <View style={styles.modalSection}>
                  <View>
                    {renderQuestion(
                      question9,
                      leftRightBothOptions,
                      breastSizeChangeSide,
                      setBreastSizeChangeSide,
                      setBreastSizeChangeSide
                    )}
                  </View>
                </View>
                {breastSizeChangeSide === "Left" &&
                  renderImageGrid(
                    breastSize,
                    setSelectedLeftSize,
                    true,
                    selectedLeftSize,
                    "Left Breast"
                  )}
                {breastSizeChangeSide === "Right" &&
                  renderImageGrid(
                    breastSize,
                    setSelectedRightSize,
                    true,
                    selectedRightSize,
                    "Right Breast"
                  )}
                {breastSizeChangeSide === "Both" && (
                  <>
                    {toggler === "Left" &&
                      breastSizeChangeSide !== "" &&
                      renderImageGrid(
                        breastSize,
                        setSelectedLeftSize,
                        true,
                        selectedLeftSize,
                        "Left Breast"
                      )}
                    {toggler === "Right" &&
                      breastSizeChangeSide !== "" &&
                      renderImageGrid(
                        breastSize,
                        setSelectedRightSize,
                        true,
                        selectedRightSize,
                        "Right Breast"
                      )}
                  </>
                )}
                <View style={styles.modalButtonSection}>
                  {breastSizeChangeSide === "Both" && <>{fourIcons(4)}</>}
                </View>
                {breastSizeChangeSide !== "Both" && (
                  <>{twoIcons(toggleModal4)}</>
                )}
              </Animated.View>
            </TouchableOpacity>
          </Modal>

          {/* Have Swelling -- Yes */}
          {/* Modal 5 */}
          <Modal
            transparent={true}
            visible={isModal5Visible}
            animationType="none"
            onRequestClose={toggleModal5}
          >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1}>
              <Animated.View
                style={[styles.modalContent, { opacity: fadeAnim }]}
              >
                <Text style={styles.modalSectionTitle}>
                  {swellingCoverage === "Entire Breast"
                    ? "Entire Breast"
                    : "Parts of Breast"}
                </Text>

                {/* If Swelling is in Entire Breast */}
                {swellingCoverage === "Entire Breast" && (
                  <View style={styles.modalSection}>
                    <View>
                      {/* Select Breast Size if Entire Breast */}
                      <View style={styles.optionContainer}>
                        {renderQuestion(
                          question9,
                          leftRightBothOptions,
                          swellingInWhichBreastEB,
                          setSwellingInWhichBreastEB,
                          setSwellingInWhichBreastEB
                        )}
                      </View>
                      {twoIcons(toggleModal5)}
                    </View>
                  </View>
                )}

                {/* If Swelling is in Parts of Breast */}
                {swellingCoverage === "Parts of Breast" && (
                  <View style={styles.modalSection}>
                    {/* Select Breast Size if Entire Breast */}
                    <View>
                      <Text style={styles.question}>Which Breast?</Text>
                      {swellingInWhichBreastPB === null && (
                        <>
                          <View style={styles.optionContainer}>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Left")
                              }
                            >
                              <Text style={styles.optionText}>Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Right")
                              }
                            >
                              <Text style={styles.optionText}>Right</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Both")
                              }
                            >
                              <Text style={styles.optionText}>Both</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {swellingInWhichBreastPB === "Left" && (
                        <>
                          <View style={styles.optionContainer}>
                            <TouchableOpacity
                              style={styles.selectedOption}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Left")
                              }
                            >
                              <Text style={styles.optionText}>Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Right")
                              }
                            >
                              <Text style={styles.optionText}>Right</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Both")
                              }
                            >
                              <Text style={styles.optionText}>Both</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {swellingInWhichBreastPB === "Right" && (
                        <>
                          <View style={styles.optionContainer}>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Left")
                              }
                            >
                              <Text style={styles.optionText}>Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.selectedOption}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Right")
                              }
                            >
                              <Text style={styles.optionText}>Right</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Both")
                              }
                            >
                              <Text style={styles.optionText}>Both</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {swellingInWhichBreastPB === "Both" && (
                        <>
                          <View style={styles.optionContainer}>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Left")
                              }
                            >
                              <Text style={styles.optionText}>Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.option}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Right")
                              }
                            >
                              <Text style={styles.optionText}>Right</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.selectedOption}
                              onPress={() =>
                                manageSwellingInWhichBreastPB("Both")
                              }
                            >
                              <Text style={styles.optionText}>Both</Text>
                            </TouchableOpacity>
                          </View>
                          {swellingInWhichBreastPB === "Left" && (
                            <>{twoIcons(toggleModal5)}</>
                          )}
                        </>
                      )}
                    </View>
                  </View>
                )}

                {swellingCoverage === "Parts of Breast" &&
                  swellingInWhichBreastPB === null && (
                    <View style={styles.innerModalSection}>
                      {twoIcons(toggleModal5)}
                    </View>
                  )}

                {swellingCoverage === "Parts of Breast" &&
                  swellingInWhichBreastPB === "Left" && (
                    <View style={styles.innerModalSection}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Left Breast
                      </Text>
                      <Breast_Left
                        onLeftLocationSend={handleLeftSwellingSelection}
                        selectedLeftLocations={leftSwellingPositions}
                      />
                      {twoIcons(toggleModal5)}
                    </View>
                  )}

                {swellingCoverage === "Parts of Breast" &&
                  swellingInWhichBreastPB === "Right" && (
                    <View style={styles.innerModalSection}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Right Breast
                      </Text>
                      <Breast_Right
                        onRightLocationSend={handleRightSwellingSelection}
                        selectedRightLocations={rightSwellingPositions}
                      />
                      {twoIcons(toggleModal5)}
                    </View>
                  )}

                {swellingCoverage === "Parts of Breast" &&
                  swellingInWhichBreastPB === "Both" && (
                    <View style={styles.innerModalSection}>
                      {toggler === "Left" && (
                        <>
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 20,
                              fontWeight: "bold",
                            }}
                          >
                            Left Breast
                          </Text>

                          <Breast_Left
                            onLeftLocationSend={handleLeftSwellingSelection}
                            selectedLeftLocations={leftSwellingPositions}
                          />
                        </>
                      )}
                      {toggler === "Right" && (
                        <>
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 20,
                              fontWeight: "bold",
                            }}
                          >
                            Right Breast
                          </Text>

                          <Breast_Right
                            onRightLocationSend={handleRightSwellingSelection}
                            selectedRightLocations={rightSwellingPositions}
                          />
                        </>
                      )}

                      <View style={styles.modalButtonSection}>
                        {(swellingInWhichBreastPB === "Left" ||
                          swellingInWhichBreastPB === "Right") &&
                          twoIcons(toggleModal5)}
                        {swellingInWhichBreastPB === "Both" && fourIcons(5)}
                      </View>
                    </View>
                  )}
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
  container: { flex: 1 },
  // Page Header
  header: { paddingHorizontal: "5%", marginTop: "15%" },
  icons: { flexDirection: "row", justifyContent: "center" },
  profileIcon: { width: 40, height: 40, left: 0, top: 0, position: "absolute" },
  iconImage: { width: "100%", height: "100%", resizeMode: "contain" },
  date: {
    borderRadius: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    width: "50%",
    padding: 8,
  },
  pageText: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    textAlign: "center",
  },
  headerTextContainer: { marginVertical: 15, marginHorizontal: 10 },
  sliderContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#FFD6F6",
    overflow: "hidden",
    paddingTop: "5%",
  },
  scrollViewContent1: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingHorizontal: "8%",
    paddingBottom: 20,
  },
  first_section: {
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: "100%",
  },
  section: {
    marginTop: 15,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: "100%",
  },
  last_section: {
    marginVertical: 15,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    width: "100%",
  },
  error_section: {
    marginTop: 15,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    borderWidth: 3,
    borderColor: "rgb(255, 99, 71, 0.2)",
  },
  error_first_section: {
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    borderWidth: 3,
    width: "100%",
    borderColor: "rgb(255, 99, 71, 0.2)",
  },
  error_last_section: {
    marginVertical: 15,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    borderWidth: 3,
    borderColor: "rgb(255, 99, 71, 0.2)",
  },
  footer: {
    backgroundColor: "#9B6EE7",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    elevation: 10,
    marginTop: "auto",
  },
  footerText: { color: "white", fontSize: 18 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalSection: { margin: "3%" },
  modalButtonSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "1%",
    alignItems: "center",
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
    marginVertical: 10,
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
  modalContent: {
    width: "85%",
    backgroundColor: "#E7DDFF",
    overflow: "hidden",
    borderRadius: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalSectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "3%",
  },
  question: {
    fontSize: 19,
    fontWeight: "bold",
    marginVertical: "3%",
    textAlign: "center",
  },
  sliderHeader: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: "3%",
  },
  sliderHeaderTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: "1%",
  },
  sliderHeaderLeftIcon: {
    left: "6%",
    position: "absolute",
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderHeaderRightIcon: {
    right: "6%",
    position: "absolute",
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: "2%",
    minWidth: width * 0.3421,
    maxWidth: width * 0.4,
    elevation: 5,
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  optionText: { fontSize: 20, color: "#333", textAlign: "center" },
  selectedOption: {
    backgroundColor: "#8ACC8D",
    padding: 10,
    borderRadius: 10,
    margin: "2%",
    minWidth: width * 0.3421,
    maxWidth: width * 0.4,
    elevation: 5,
  },
  innerModalSection: { paddingHorizontal: "8%" },
  selectedOptionText: { color: "#fff", fontSize: 20, textAlign: "center" },
});

export default LongTermSymptoms;
