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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    setSelections((prev) => {
      const newSelections = {
        ...prev,
        [currentSetIndex]: {
          ...prev[currentSetIndex],
          [questionIndex]: value,
        },
      };
      console.log("Updated Selections:", newSelections); // Debug log
      return newSelections;
    });
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

  const handleNextSet = async () => {
    if (currentSetIndex < questionSets.length - 1) {
      setCurrentSetIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const token = await getToken(); // Retrieve token from AsyncStorage
        if (token) {
          // Transform selections to the required structure
          const history = questionSets.map((set, setIndex) => ({
            title: set.title,
            questions: set.questions
              .filter(
                (question, index) =>
                  !question.conditional ||
                  selections[setIndex]?.[question.conditional.id] ===
                    question.conditional.value
              )
              .map((question, index) => ({
                question: question.text,
                answer: selections[setIndex]?.[index] || "N/A",
              })),
          }));

          console.log("Transformed Data:", { history }); // Debug log

          const response = await axios.post(
            "http://192.168.52.185:3000/api/submit",
            { history },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in the headers
              },
            }
          );
          Alert.alert("Success", "Your data has been submitted successfully.", [
            { text: "OK", onPress: () => navigation.navigate("BottomTab") },
          ]);
        } else {
          Alert.alert("Error", "Token not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
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
                selections[currentSetIndex]?.[index] === "< 6 months" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "< 6 months"
                      ? "#8acc8d"
                      : "#fff",
                  marginRight: 10,
                  elevation:
                    selections[currentSetIndex]?.[index] === "< 6 months"
                      ? 5
                      : 0,
                },
              ]}
              onPress={() => handleSelection(index, "< 6 months")}
            >
              <Text style={styles.buttonText}>{"< 6 months"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "6 - 12 months" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "6 - 12 months"
                      ? "#8acc8d"
                      : "#fff",
                  elevation:
                    selections[currentSetIndex]?.[index] === "6 - 12 months"
                      ? 5
                      : 0,
                },
              ]}
              onPress={() => handleSelection(index, "6 - 12 months")}
            >
              <Text style={styles.buttonText}>{"6 - 12 months"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selections[currentSetIndex]?.[index] === "> 12 months" &&
                  styles.selectedButton,
                {
                  backgroundColor:
                    selections[currentSetIndex]?.[index] === "> 12 months"
                      ? "#8acc8d"
                      : "#fff",
                  elevation:
                    selections[currentSetIndex]?.[index] === "> 12 months"
                      ? 5
                      : 0,
                },
              ]}
              onPress={() => handleSelection(index, "> 12 months")}
            >
              <Text style={styles.buttonText}>{"> 12 months"}</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={["#8acc8d", "#adc5ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{currentSet.title}</Text>
        {currentSet.questions.map((question, index) => {
          const showQuestion =
            !question.conditional ||
            selections[currentSetIndex]?.[question.conditional.id] ===
              question.conditional.value;
          if (showQuestion) {
            return (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.question}>{question.text}</Text>
                {renderQuestion(question, index)}
              </View>
            );
          }
          return null;
        })}
        <View style={styles.footer}>
          <Text style={styles.progress}>
            {completedCount}/{totalQuestions} completed
          </Text>
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor:
                  completedCount === totalQuestions ? "#8acc8d" : "#ccc",
              },
            ]}
            onPress={handleNextSet}
            disabled={completedCount !== totalQuestions}
          >
            <Text style={styles.nextButtonText}>
              {currentSetIndex === questionSets.length - 1 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#8acc8d",
  },
  selectedButton: {
    backgroundColor: "#8acc8d",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  progress: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 10,
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "#8acc8d",
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PersonalMedicalHistoryScreen;
