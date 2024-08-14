import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const MultiSelectComponent = ({
  question,
  options,
  initialSelectedOptions,
  onSelectionChange,
  isMultiSelect = true, // Control multiple selections
  canDeselect = true, // Control deselection
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions || (isMultiSelect ? [] : null)
  );

  const prevSelectedOptions = useRef(selectedOptions);

  const toggleOption = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      let updatedOptions;
      if (isMultiSelect) {
        if (prevSelectedOptions.includes(option.value)) {
          if (canDeselect) {
            updatedOptions = prevSelectedOptions.filter(
              (opt) => opt !== option.value
            );
          } else {
            updatedOptions = prevSelectedOptions;
          }
        } else {
          updatedOptions = [...prevSelectedOptions, option.value];
        }
      } else {
        if (prevSelectedOptions === option.value) {
          if (canDeselect) {
            updatedOptions = null;
          } else {
            updatedOptions = prevSelectedOptions;
          }
        } else {
          updatedOptions = option.value;
        }
      }

      // Schedule callback after state update
      setTimeout(() => {
        onSelectionChange(updatedOptions);
      }, 0);

      return updatedOptions;
    });
  };

  useEffect(() => {
    if (prevSelectedOptions.current !== selectedOptions) {
      onSelectionChange(selectedOptions);
      prevSelectedOptions.current = selectedOptions;
    }
  }, [selectedOptions]);

  return (
    <View style={styles.container}>
      {Array.isArray(question) ? (
        question.map((q, index) => (
          <Text key={index} style={styles.question}>
            {q}
          </Text>
        ))
      ) : (
        <Text style={styles.question}>{question}</Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              (isMultiSelect
                ? selectedOptions.includes(option.value)
                : selectedOptions === option.value) && styles.selectedOption,
            ]}
            onPress={() => toggleOption(option)}
            accessible={true}
            accessibilityLabel={option.label}
            accessibilityState={{
              selected: isMultiSelect
                ? selectedOptions.includes(option.value)
                : selectedOptions === option.value,
            }}
          >
            <Text
              style={[
                styles.optionText,
                (isMultiSelect
                  ? selectedOptions.includes(option.value)
                  : selectedOptions === option.value) &&
                  styles.selectedOptionText,
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
    marginBottom: 12,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  optionButton: {
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
  selectedOption: {
    backgroundColor: "#8ACC8D",
  },
  optionText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  selectedOptionText: {
    color: "white",
  },
});

export default MultiSelectComponent;
