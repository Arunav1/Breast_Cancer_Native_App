import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const questionSets = [
  {
    title: "Menstrual History",
    questions: [
      { text: "Started (Before 12 Years of Age)", type: "boolean" },
      { text: "Age of Menopause (After 55 Years of Age)", type: "boolean" },
      { text: "Menstrual Cycle Length (Usual 27-29 Days)", type: "boolean" },
    ],
  },
  {
    title: "Reproductive History",
    questions: [
      { text: "Pregnancy", type: "boolean", id: 0 },
      {
        text: "Number of Pregnancies",
        type: "input",
        conditional: { id: 0, value: "yes" },
      },
      { text: "Any Miscarriages or Abortions", type: "boolean", id: 2 },
      {
        text: "How many times",
        type: "input",
        conditional: { id: 2, value: "yes" },
      },
      { text: "Are You a Mother?", type: "boolean", id: 4 },
      {
        text: "Age of Motherhood",
        type: "input",
        conditional: { id: 4, value: "yes" },
      },
      {
        text: "Number of Kid(s)",
        type: "input",
        conditional: { id: 4, value: "yes" },
      },
      {
        text: "Relation",
        type: "relation",
        conditional: { id: 4, value: "yes" },
      },
      { text: "First Pregnancy (Before 30 Years of Age)", type: "boolean" },
    ],
  },
  {
    title: "Breastfeeding History",
    questions: [
      { text: "Ever breastfed?", type: "boolean", id: 0 },
      {
        text: "Duration (Including all Babies)",
        type: "trioption",
        conditional: { id: 0, value: "yes" },
      },
      {
        text: "Age at last breastfeeding",
        type: "input",
        conditional: { id: 0, value: "yes" },
      },
    ],
  },
];

const PersonalMedicalHistoryScreen = ({ navigation }) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selections, setSelections] = useState({});

  const handleSelection = (questionIndex, value) => {
    setSelections((prev) => ({
      ...prev,
      [currentSetIndex]: {
        ...prev[currentSetIndex],
        [questionIndex]: value,
      },
    }));
  };

  const getCompletedCount = () => {
    const currentSelections = selections[currentSetIndex] || {};
    const totalQuestions = questionSets[currentSetIndex].questions.length;
    let completedCount = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const question = questionSets[currentSetIndex].questions[i];
      if (question.conditional) {
        const { id, value } = question.conditional;
        if (selections[currentSetIndex]?.[id] === value) {
          if (
            currentSelections[i] !== undefined &&
            currentSelections[i] !== null
          ) {
            completedCount++;
          }
        }
      } else {
        if (
          currentSelections[i] !== undefined &&
          currentSelections[i] !== null
        ) {
          completedCount++;
        }
      }
    }
    return completedCount;
  };

  const handleNextSet = async () => {
    if (currentSetIndex < questionSets.length - 1) {
      setCurrentSetIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const response = await axios.post(
          "http://192.168.194.185:3000/api/submit",
          selections
        );
        Alert.alert("Success", "Your data has been submitted successfully.", [
          { text: "OK", onPress: () => navigation.navigate("ButtomTab") },
        ]);
      } catch (error) {
        Alert.alert(
          "Error",
          "There was an error submitting your data. Please try again later."
        );
      }
    }
  };

  const currentSet = questionSets[currentSetIndex];
  const completedCount = getCompletedCount();
  const totalQuestions = currentSet.questions.filter(
    (question) =>
      !question.conditional ||
      selections[currentSetIndex]?.[question.conditional.id] ===
        question.conditional.value
  ).length;

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case "boolean":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "yes" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "yes"
                      ? "#8acc8d"
                      : "#fff",
                  marginRight: 10,
                  elevation:
                    selections[currentSetIndex]?.[index] === "yes" ? 5 : 0,
                },
              ]}
              onPress={() => handleSelection(index, "yes")}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "no" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "no"
                      ? "#8acc8d"
                      : "#fff",
                  elevation:
                    selections[currentSetIndex]?.[index] === "no" ? 5 : 0,
                },
              ]}
              onPress={() => handleSelection(index, "no")}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        );
      case "relation":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "son" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "son"
                      ? "#8acc8d"
                      : "#fff",
                  marginRight: 10,
                  elevation:
                    selections[currentSetIndex]?.[index] === "son" ? 5 : 0,
                },
              ]}
              onPress={() => handleSelection(index, "son")}
            >
              <Text style={styles.buttonText}>Son</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "daughter" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "daughter"
                      ? "#8acc8d"
                      : "#fff",
                  elevation:
                    selections[currentSetIndex]?.[index] === "daughter" ? 5 : 0,
                },
              ]}
              onPress={() => handleSelection(index, "daughter")}
            >
              <Text style={styles.buttonText}>Daughter</Text>
            </TouchableOpacity>
          </View>
        );
      case "input":
        return (
          <TextInput
            style={styles.input}
            value={selections[currentSetIndex]?.[index] || ""}
            onChangeText={(text) => handleSelection(index, text)}
            keyboardType="numeric"
          />
        );
      case "trioption":
        return (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "Less than 6 Months" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] ===
                    "Less than 6 Months"
                      ? "#8acc8d"
                      : "#fff",
                  marginRight: 10,
                  elevation:
                    selections[currentSetIndex]?.[index] ===
                    "Less than 6 Months"
                      ? 5
                      : 0,
                },
              ]}
              onPress={() => handleSelection(index, "Less than 6 Months")}
            >
              <Text style={styles.buttonText}>Less than 6 Months</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "6 to 12 Months" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "6 to 12 Months"
                      ? "#8acc8d"
                      : "#fff",
                  elevation:
                    selections[currentSetIndex]?.[index] === "6 to 12 Months"
                      ? 5
                      : 0,
                },
              ]}
              onPress={() => handleSelection(index, "6 to 12 Months")}
            >
              <Text style={styles.buttonText}>6 to 12 Months</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] ===
                  "More than 12 Months" && styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] ===
                    "More than 12 Months"
                      ? "#8acc8d"
                      : "#fff",
                  elevation:
                    selections[currentSetIndex]?.[index] ===
                    "More than 12 Months"
                      ? 5
                      : 0,
                },
              ]}
              onPress={() => handleSelection(index, "More than 12 Months")}
            >
              <Text style={styles.buttonText}>More than 12 Months</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={["#8acc8d", "#fff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/breast-cancer.jpg")}
            style={styles.logo}
          />
          <Text style={styles.title}>{currentSet.title}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {currentSet.questions.map((question, index) => {
            const showQuestion =
              !question.conditional ||
              selections[currentSetIndex]?.[question.conditional.id] ===
                question.conditional.value;
            return showQuestion ? (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.question}>{question.text}</Text>
                {renderQuestion(question, index)}
              </View>
            ) : null;
          })}
        </ScrollView>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${(completedCount / totalQuestions) * 100}%` },
            ]}
          />
          <Text style={styles.progressText}>
            {completedCount}/{totalQuestions} Completed
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            completedCount === totalQuestions
              ? styles.enabledButton
              : styles.disabledButton,
          ]}
          onPress={handleNextSet}
          disabled={completedCount !== totalQuestions}
        >
          <Text style={styles.submitButtonText}>
            {currentSetIndex === questionSets.length - 1 ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "#4caf50",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4caf50",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  submitButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  enabledButton: {
    backgroundColor: "#4caf50",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PersonalMedicalHistoryScreen;
