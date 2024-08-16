import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import DropDownPicker from "react-native-dropdown-picker";
import Swiper from "react-native-swiper";

const questionSet1 = {
  title: "For Breast Cancer",
  mainQuestion: {
    question: "Breast Cancer in Close Relatives",
    optionType: ["Yes", "No", "No Idea"],
  },
  question1: {
    mainQuestion2: {
      question: "Immediate Family",
      optionType: ["Yes", "No"],
    },
    subquestion2: {
      mainquestion3: {
        question: "Number of Members",
        optionType: "input",
      },
      subQuestions3: [
        { question: "Relation", optionType: "dropDown" },
        { question: "Age of Diagnosis (optional)", optionType: "input" },
      ],
    },
  },
  question2: {
    mainQuestion2: {
      question: "Extended Family",
      optionType: ["Yes", "No", "No Idea"],
    },
    subquestion2: {
      mainquestion3: {
        question: "Number of Members",
        optionType: "input",
      },
      subQuestions3: [
        { question: "Relation Side", optionType: "relationSide" },
        { question: "Relation", optionType: "dropDown" },
        { question: "Age of Diagnosis (optional)", optionType: "input" },
      ],
    },
  },
};

const questionSet2 = {
  title: "For Other Type of Cancer",
  mainQuestion: {
    question: "Other Type of Cancer in Relatives",
    optionType: ["Yes", "No", "No Idea"],
  },

  question1: {
    mainQuestion2: {
      question: "Immediate Family have other type of cancer",
      optionType: ["Yes", "No", "No Idea"],
    },
    subquestion2: {
      mainquestion3: {
        question: "Number of Members",
        optionType: "input",
      },
      subQuestions3: [
        { question: "Cancer Type", optionType: "cancertypedropdown" },
        { question: "Relation", optionType: "dropDown" },
        { question: "Age of Diagnosis (optional)", optionType: "input" },
      ],
    },
  },
  question2: {
    mainQuestion2: {
      question: "External Family have other type of cancer",
      optionType: ["Yes", "No", "No Idea"],
    },
    subquestion2: {
      mainquestion3: {
        question: "Number of Members",
        optionType: "input",
      },
      subQuestions3: [
        { question: "Cancer Type", optionType: "cancertypedropdown" },
        { question: "Relation Side", optionType: "relationSide" },
        { question: "Relation", optionType: "dropDown" },
        { question: "Age of Diagnosis (optional)", optionType: "input" },
      ],
    },
  },
};

const FamilyCancerHistoryQuestion = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [answers, setAnswers] = useState({});
  const [subQuestionsVisible, setSubQuestionsVisible] = useState(false);
  const [
    mainQuestion1MainQuestion3Visible,
    setmainQuestion1MainQuestion3Visible,
  ] = useState(false);
  const [
    mainQuestion2MainQuestion3Visible,
    setmainQuestion2MainQuestion3Visible,
  ] = useState(false);
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const [numberOfMembers2, setNumberOfMembers2] = useState("");
  const [subModalVisible, setsubModalVisible] = useState(false);
  const [repeatedQuestions, setRepeatedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [animationTypeSubModal, setAnimationTypeSubModal] =
    useState("slideInDown");
  const [animationType, setAnimationType] = useState("zoomIn");
  const [submodalanimationType, setsubmodalAnimationType] = useState("zoomIn");
  const [questionSet, setquestionSet] = useState(questionSet1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  console.log(answers);

  const submitAnswers = () => {
    const formattedAnswers = {
      mainQuestion: answers[questionSet.mainQuestion.question],
      immediateFamily: {
        question: answers[questionSet.question1.mainQuestion2.question],
        numberOfMembers: numberOfMembers,
        members: repeatedQuestions.map((_, index) => ({
          relation: answers[`Relation_${index}`],
          ageOfDiagnosis: answers[`AgeOfDiagnosis_${index}`],
        })),
      },
      extendedFamily: {
        question: answers[questionSet.question2.mainQuestion2.question],
        numberOfMembers: numberOfMembers2,
        members: repeatedQuestions.map((_, index) => ({
          relationSide: answers[`RelationSide_${index}`],
          relation: answers[`Relation_${index}`],
          ageOfDiagnosis: answers[`AgeOfDiagnosis_${index}`],
        })),
      },
      // Add similar structure for other cancer types if needed
    };

    // Log the formatted answers for debugging
    console.log("Formatted Answers:", formattedAnswers);

    // Save `formattedAnswers` to the database or send it to an API
    saveAnswersToDatabase(formattedAnswers);
    // Navigate to the next screen or provide feedback to the user
    navigation.navigate("ButtomTab");
  };

  // Function to simulate saving answers to a database or API
  const saveAnswersToDatabase = (formattedAnswers) => {
    // Replace this with actual database save logic or API call
    console.log("Saving formatted answers to the database: ", formattedAnswers);
    // Here you could use an API call, Firebase, or any other method to store the data
  };

  const handleNextSet = (newQuestionSet) => {
    // Reset all state variables
    setAnswers({});
    setSubQuestionsVisible(false);
    setmainQuestion1MainQuestion3Visible(false);
    setmainQuestion2MainQuestion3Visible(false);
    setNumberOfMembers("");
    setNumberOfMembers2("");
    setsubModalVisible(false);
    setRepeatedQuestions([]);
    setCurrentQuestion(null);

    // Set the new question set
    setquestionSet(newQuestionSet);

    // Reset animations
    setAnimationTypeSubModal("slideInDown");
    setAnimationType("zoomIn");
    setsubmodalAnimationType("zoomIn");

    // Reopen the modal for the new question set
    setModalVisible(true);
  };

  const handlemainQuestionOptionSelect = (option, question) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: option }));
    if (question === questionSet.mainQuestion.question && option === "Yes") {
      setSubQuestionsVisible(true);
      closeModal();
    } else {
      setSubQuestionsVisible(false);
      handleNextSet(questionSet2);
      if (question === questionSet2.mainQuestion.question && option !== "Yes") {
        closeModal();
        navigation.navigate("ButtomTab");
      }
    }
  };

  const handleMainQuestion2OptionSelect = (option, question) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: option }));

    if (question === questionSet.question1.mainQuestion2.question) {
      if (option === "Yes") {
        setmainQuestion1MainQuestion3Visible(true);
      } else {
        setAnimationTypeSubModal("slideOutUp");
        // setmainQuestion1MainQuestion3Visible(false);
        setTimeout(() => setmainQuestion1MainQuestion3Visible(false), 950);
        setTimeout(() => setAnimationTypeSubModal("slideInDown"), 950);
      }
    }

    if (question === questionSet.question2.mainQuestion2.question) {
      if (option === "Yes") {
        setmainQuestion2MainQuestion3Visible(true);
      } else {
        setAnimationTypeSubModal("slideOutUp");
        // setmainQuestion2MainQuestion3Visible(false);
        setTimeout(() => setmainQuestion2MainQuestion3Visible(false), 950);
        setTimeout(() => setAnimationTypeSubModal("slideInDown"), 950);
      }
    }
  };

  const handleMainQuestion3OptionSelect = (question) => {
    const numMembers =
      question === questionSet.question1.mainQuestion2.question
        ? numberOfMembers
        : numberOfMembers2;
    if (numMembers > 0) {
      setRepeatedQuestions(Array.from({ length: numMembers }, (_, i) => i));
      setCurrentQuestion(question);
      setsubModalVisible(true);
    } else {
      setsubModalVisible(false);
    }
  };

  const handleSubQuestion3AnswerChange = (text, question) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: text }));
  };
  // For dropdown and relation-side questions:
  const handleDropdownChange = (value, question) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: value }));
    // Update state or perform any action based on the selected value
    console.log(`Selected value: ${value}, Question: ${question}`);
  };
  const closeModal = () => {
    setAnimationType("zoomOut");
    setTimeout(() => setModalVisible(false), 700);
  };

  const closeSubModal = () => {
    setsubmodalAnimationType("zoomOut");
    setTimeout(() => setsubModalVisible(false), 700);
    setTimeout(() => setsubmodalAnimationType("zoomIn"), 700);
    // setsubModalVisible(false);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < repeatedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const DropDownRelationType = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "Mother", value: "mother" },
      { label: "Sister", value: "sister" },
      { label: "Daughter", value: "daughter" },
      { label: "Aunt", value: "aunt" },
      { label: "Grandmother", value: "grandmother" },
    ]);

    const handleValueChange = (selectedValue) => {
      setValue(selectedValue);
      props.handleDropdownChange(value, props.subQ);
    };

    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleValueChange} // Correctly setting value
        setItems={setItems}
        placeholder="Select"
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        onChangeValue={handleValueChange}
      />
    );
  };

  const DropDownMenuCancerType = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "Lung", value: "option1" },
      { label: "Prostate", value: "option2" },
      { label: "Colon", value: "option3" },
      { label: "Pancreatic", value: "option4" },
      { label: "Prostate", value: "option5" },
    ]);

    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder=" Select"
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        onChangeValue={(items) => handleDropdownChange(items, props.subQ)}
      />
    );
  };

  const SubQuestion3OptionRender = (subQ) => {
    switch (subQ.optionType) {
      case "input":
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter Age"
            keyboardType="numeric"
            onChangeText={(text) =>
              handleSubQuestion3AnswerChange(text, subQ.question)
            }
          />
        );
      case "relationSide":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                answers["Relation Side"] === "Maternal"
                  ? styles.buttonSelected
                  : null,
              ]}
              onPress={() =>
                handleSubQuestion3AnswerChange("Maternal", subQ.question)
              }
            >
              <Text style={styles.buttonText}>Maternal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                answers["Relation Side"] === "Paternal"
                  ? styles.buttonSelected
                  : null,
              ]}
              onPress={() =>
                handleSubQuestion3AnswerChange("Paternal", subQ.question)
              }
            >
              <Text style={styles.buttonText}>Paternal</Text>
            </TouchableOpacity>
          </View>
        );

      case "dropDown":
        return (
          <DropDownRelationType
            subQ={subQ.question}
            handleDropdownChange={handleDropdownChange}
          />
        );
      case "cancertypedropdown":
        return <DropDownMenuCancerType subQ={subQ.question} />;
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={["#E582AD", "#7131DD", "#7131DD"]}
      style={styles.container}
    >
      <View style={styles.TopSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/image.png")}
              style={{ height: 38, width: 37, borderRadius: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitleContainer}>
          <Image
            source={require("../assets/breast-cancer.jpg")}
            style={styles.headerImage}
          />
          <Text style={styles.headerTitle}>Family Cancer History</Text>
        </View>
        <Text style={styles.subHeader}>
          Please share your family medical history so we can address your health
          concerns more effectively.
        </Text>
      </View>
      <LinearGradient
        style={styles.card}
        colors={["#FFF0F6", "#FFD6F6", "#FFD6F6", "#C96EB9"]}
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/dash.png")}
              style={{ height: 15, width: 40 }}
            />
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            {questionSet.title}
          </Text>
          <ScrollView
            contentContainerStyle={styles.questionContainer}
            showsVerticalScrollIndicator={false}
          >
            {subQuestionsVisible && (
              <View>
                <View>
                  <View style={styles.question}>
                    <Text style={styles.questionText}>
                      {questionSet.question1.mainQuestion2.question}
                    </Text>
                    <View style={styles.buttonGroup}>
                      {questionSet.question1.mainQuestion2.optionType.map(
                        (value, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.button,
                              answers[
                                questionSet.question1.mainQuestion2.question
                              ] === value
                                ? styles.buttonSelected
                                : null,
                            ]}
                            onPress={() =>
                              handleMainQuestion2OptionSelect(
                                value,
                                questionSet.question1.mainQuestion2.question
                              )
                            }
                          >
                            <Text style={styles.buttonText}>{value}</Text>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  </View>
                  {mainQuestion1MainQuestion3Visible && (
                    <Animatable.View animation={animationTypeSubModal}>
                      <View style={styles.NumberofMemberInput}>
                        <TextInput
                          style={{ fontWeight: "bold", width: "60%" }}
                          placeholder={
                            questionSet.question1.subquestion2.mainquestion3
                              .question
                          }
                          keyboardType="numeric"
                          value={numberOfMembers}
                          onChangeText={(text) => setNumberOfMembers(text)}
                        />
                        <TouchableOpacity
                          style={[
                            styles.iconButton,
                            numberOfMembers > 0
                              ? { backgroundColor: "#9B6EE7" }
                              : { backgroundColor: "#D9D9D9", elevation: 0 },
                          ]}
                          onPress={() => {
                            handleMainQuestion3OptionSelect(
                              questionSet.question1.mainQuestion2.question
                            );
                          }}
                        >
                          <Ionicons
                            name="checkmark-outline"
                            size={28}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </Animatable.View>
                  )}
                </View>

                <View>
                  <View style={styles.question}>
                    <Text style={styles.questionText}>
                      {questionSet.question2.mainQuestion2.question}
                    </Text>
                    <View style={styles.buttonGroup}>
                      {questionSet.question2.mainQuestion2.optionType.map(
                        (value, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.button,
                              answers[
                                questionSet.question2.mainQuestion2.question
                              ] === value
                                ? styles.buttonSelected
                                : null,
                            ]}
                            onPress={() =>
                              handleMainQuestion2OptionSelect(
                                value,
                                questionSet.question2.mainQuestion2.question
                              )
                            }
                          >
                            <Text style={styles.buttonText}>{value}</Text>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  </View>
                  {mainQuestion2MainQuestion3Visible && (
                    <View>
                      <Animatable.View animation={animationTypeSubModal}>
                        <View style={styles.NumberofMemberInput}>
                          <TextInput
                            style={{ fontWeight: "bold", width: "60%" }}
                            placeholder={
                              questionSet.question2.subquestion2.mainquestion3
                                .question
                            }
                            keyboardType="numeric"
                            value={numberOfMembers2}
                            onChangeText={(text) => setNumberOfMembers2(text)}
                          />
                          <TouchableOpacity
                            style={[
                              styles.iconButton,
                              numberOfMembers2 > 0
                                ? { backgroundColor: "#9B6EE7" }
                                : { backgroundColor: "#D9D9D9", elevation: 0 },
                            ]}
                            onPress={() => {
                              handleMainQuestion3OptionSelect(
                                questionSet.question2.mainQuestion2.question
                              );
                            }}
                          >
                            <Ionicons
                              name="checkmark-outline"
                              size={28}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      </Animatable.View>
                    </View>
                  )}
                </View>
              </View>
            )}
            {!subQuestionsVisible && (
              <View style={[{ marginBottom: 30 }, styles.question]}>
                <Text style={styles.questionText}>
                  {questionSet.mainQuestion.question}
                </Text>
                <View style={styles.buttonGroup}>
                  {questionSet.mainQuestion.optionType.map((value, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        answers[questionSet.mainQuestion.question] === value
                          ? styles.buttonSelected
                          : null,
                      ]}
                      onPress={() =>
                        handlemainQuestionOptionSelect(
                          value,
                          questionSet.mainQuestion.question
                        )
                      }
                    >
                      <Text style={styles.buttonText}>{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          {subQuestionsVisible && (
            <View>
              {questionSet === questionSet1 ? (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    handleNextSet(questionSet2);
                  }}
                >
                  <Text style={styles.submitButtonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    submitAnswers();
                  }}
                >
                  <Text style={styles.submitButtonText}>submit</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <Animatable.View animation={animationType}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Conditional rendering based on questionSet */}
                    {questionSet === questionSet2 && (
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => {
                          handleNextSet(questionSet1);
                        }}
                      >
                        <Ionicons
                          name="chevron-back-outline"
                          size={28}
                          color="white"
                        />
                      </TouchableOpacity>
                    )}
                    <Text style={styles.questionText}>{questionSet.title}</Text>
                  </View>
                  <View style={[{ marginBottom: 30 }, styles.question]}>
                    <Text style={styles.questionText}>
                      {questionSet.mainQuestion.question}
                    </Text>
                    <View style={styles.buttonGroup}>
                      {questionSet.mainQuestion.optionType.map(
                        (value, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.button,
                              answers[questionSet.mainQuestion.question] ===
                              value
                                ? styles.buttonSelected
                                : null,
                            ]}
                            onPress={() =>
                              handlemainQuestionOptionSelect(
                                value,
                                questionSet.mainQuestion.question
                              )
                            }
                          >
                            <Text style={styles.buttonText}>{value}</Text>
                          </TouchableOpacity>
                        )
                      )}
                    </View>
                  </View>
                </View>
              </Animatable.View>
            </View>
          </Modal>

          {subModalVisible && (
            <Modal
              transparent={true}
              loop={false}
              visible={subModalVisible}
              onRequestClose={() => closeSubModal()}
            >
              <View style={styles.modalContainer}>
                <Animatable.View animation={submodalanimationType}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      style={{ alignItems: "flex-end", width: width * 0.8 }}
                      onPress={closeSubModal}
                    >
                      <Text style={styles.skipButtonText}>Skip &gt;&gt;</Text>
                    </TouchableOpacity>
                    <View
                      style={{ flexDirection: "row", maxHeight: height * 0.65 }}
                    >
                      {repeatedQuestions.length > 0 && (
                        <View key={currentQuestionIndex}>
                          <Text style={styles.memberText}>
                            Member {currentQuestionIndex + 1}
                          </Text>
                          <View style={styles.subQuestion}>
                            {currentQuestion ===
                              questionSet.question1.mainQuestion2.question &&
                              questionSet.question1.subquestion2.subQuestions3.map(
                                (subQuestion, subIndex) => (
                                  <View
                                    key={subIndex}
                                    style={{ paddingVertical: 10 }}
                                  >
                                    <Text style={styles.questionText}>
                                      {subQuestion.question}
                                    </Text>

                                    {SubQuestion3OptionRender(subQuestion)}
                                  </View>
                                )
                              )}
                            {currentQuestion ===
                              questionSet.question2.mainQuestion2.question &&
                              questionSet.question2.subquestion2.subQuestions3.map(
                                (subQuestion, subIndex) => (
                                  <View
                                    key={subIndex}
                                    style={{ paddingVertical: 10 }}
                                  >
                                    <Text style={styles.questionText}>
                                      {subQuestion.question}
                                    </Text>

                                    {SubQuestion3OptionRender(subQuestion)}
                                  </View>
                                )
                              )}
                          </View>
                        </View>
                      )}
                    </View>
                    <View style={styles.modalButtonSection}>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleBack}
                      >
                        <Ionicons
                          name="chevron-back-outline"
                          size={28}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleNext}
                      >
                        <Ionicons
                          name="chevron-forward-outline"
                          size={28}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animatable.View>
              </View>
            </Modal>
          )}
        </KeyboardAvoidingView>
      </LinearGradient>
    </LinearGradient>
  );
};

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "13%",
  },
  dropDown: {
    borderWidth: 0,
    width: width * 0.62,
    zIndex: 1,
    alignSelf: "center",
  },
  dropDownContainer: {
    maxHeight: 140,
    backgroundColor: "#fff",
    alignSelf: "center",
    borderTopWidth: 0,
    borderWidth: 0.5,
    marginTop: 2,
    width: width * 0.62,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerImage: {
    width: 78,
    height: 81,
    marginRight: 10,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subHeader: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#fff",
  },
  TopSection: {
    height: height * 0.33,
    padding: 10,
  },
  card: {
    flex: 1,
    // alignItems: 'center',
    height: height * 0.78,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 10,
    // paddingTop: 10,
    elevation: 10,
    // paddingBottom: '40%'
  },
  question: {
    zIndex: 1,
    marginTop: "5%",
    marginHorizontal: 10,
    padding: 12,
    alignSelf: "center",
    minHeight: 120,
    backgroundColor: "#ecb4e0",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "94%",
  },
  questionText: {
    paddingBottom: 5,
    fontSize: 17,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    top: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: "40%",
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  buttonSelected: {
    backgroundColor: "#8acc8d",
    elevation: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    elevation: 6,
    backgroundColor: "#9B6EE7",
    borderRadius: 30,
    // padding: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    margin: 5,
  },
  modalButtonSection: {
    // backgroundColor: '#fff',
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  skipButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
  input: {
    padding: 7,
    textAlign: "center",
    marginHorizontal: 80,
    borderBottomWidth: 1,
    fontSize: 20,
  },
  questionContainer: {
    paddingBottom: "20%",
  },
  modalView: {
    width: "95%",
    backgroundColor: "#E7DDFF",
    borderRadius: 20,
    // paddingBottom: 50,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0.5,
  },
  subQuestion: {
    backgroundColor: "#ecb4e0",
    marginHorizontal: 5,
    borderRadius: 10,
    padding: "5%",
    marginTop: 10,
  },

  NumberofMemberInput: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 10,
    zIndex: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#fff",
    width: "85%",
    alignSelf: "center",
  },
  submitButton: {
    width: "94%",
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: "#8acc8d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  paginationStyle: {
    bottom: 0,
  },
  memberText: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#E280AF",
    borderRadius: 15,
    marginHorizontal: 90,
    padding: 10,
    elevation: 5,
    marginBottom: 5,
  },
});

export default FamilyCancerHistoryQuestion;
