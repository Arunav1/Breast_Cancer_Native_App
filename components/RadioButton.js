import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const CustomRadioButton = ({
  question,
  options,
  onSelect,
  defaultSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Set selectedOption based on defaultSelected prop
  useEffect(() => {
    if (defaultSelected) {
      setSelectedOption(defaultSelected);
      onSelect(defaultSelected); // Call onSelect with defaultSelected value
    }
  }, [defaultSelected, onSelect]);

  const handlePress = (option) => {
    setSelectedOption(option.value);
    onSelect(option.value);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handlePress(option)}
            style={[
              styles.radioButtonContainer,
              selectedOption === option.value && styles.selectedContainer,
            ]}
          >
            {option.image && (
              <Image source={option.image} style={styles.image} />
            )}
            <Text
              style={[
                styles.radioButtonLabel,
                selectedOption === option.value && styles.selectedLabel,
                !option.image && styles.noImageLabel, // Add additional styling when no image is present
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: width * 0.3421, // Adjust based on screen width
    maxWidth: width * 0.4, // Adjust based on screen width
    marginHorizontal: 5, // Adjust spacing between options
    marginVertical: 5, // Adjust vertical margin between options
    backgroundColor: "white",
    elevation: 5,
  },
  selectedContainer: {
    backgroundColor: "#8ACC8D",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
    left: 0,
    position: "absolute",
    margin: "5%",
  },
  radioButtonLabel: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  selectedLabel: {
    color: "white",
    fontSize: 20,
  },
  noImageLabel: {
    flex: 1, // Add this style to make the label take up available space if there's no image
    textAlign: "center", // Center the text horizontally when no image is present
  },
});

export default CustomRadioButton;
