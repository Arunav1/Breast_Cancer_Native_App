import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

const PainLevelSlider = ({ value, onValueChange }) => {
  const painLevels = [
    { value: 1, label: "Very Low", color: "#66FF33" }, // Light Green
    { value: 2, label: "Low", color: "#99FF33" }, // Light Green
    { value: 3, label: "Moderate", color: "#FFCC00" }, // Yellow-Green
    { value: 4, label: "High", color: "#FF9900" }, // Orange
    { value: 5, label: "Extreme", color: "#FF3300" }, // Red
  ];

  const trackWidth = `${(value / 10) * 100}%`;

  const handlePress = (level) => {
    onValueChange(level);
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={[styles.track, { width: "100%" }]} />
      <View style={styles.labelsContainer}>
        {painLevels.map((level) => (
          <TouchableWithoutFeedback
            key={level.value}
            onPress={() => handlePress(level.value)}
          >
            <View
              style={[
                styles.label,
                {
                  backgroundColor: level.color,
                  opacity: value >= level.value ? 1 : 0.1,
                },
              ]}
            >
              <Text style={[styles.labelText, { color: "#000" }]}>
                {level.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: 30,
    overflow: "hidden",
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
  track: {
    height: 6,
    position: "absolute",
    zIndex: 0,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  label: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  labelText: {
    fontSize: 11,
    color: "#000",
    fontWeight: "bold",
  },
});

export default PainLevelSlider;
