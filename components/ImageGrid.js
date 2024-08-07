import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const ImageGrid = ({
  images,
  onSelect,
  multiple = false,
  toggleable = true,
  defaultSelected,
}) => {
  console.log(defaultSelected);
  // Initialize state with the default selected image(s)
  const [selectedImages, setSelectedImages] = useState(() => {
    if (defaultSelected) {
      const defaultSelectedImage = images.find(
        (item) => item.value === defaultSelected
      );
      return defaultSelectedImage ? [defaultSelectedImage] : [];
    }
    return [];
  });

  useEffect(() => {
    if (defaultSelected) {
      const defaultSelectedImage = images.find(
        (item) => item.value === defaultSelected
      );
      if (defaultSelectedImage) {
        setSelectedImages([defaultSelectedImage]);
        onSelect(multiple ? [defaultSelected] : defaultSelected);
      }
    }
  }, [defaultSelected, images, multiple, onSelect]);

  const handleSelect = (item) => {
    if (!multiple) {
      // Single selection mode
      if (
        selectedImages.length === 1 &&
        selectedImages[0].value === item.value
      ) {
        // Deselect if the same item is selected again and toggleable is true
        if (toggleable) {
          setSelectedImages([]);
          onSelect(null);
        }
      } else {
        // Select the new item
        setSelectedImages([item]);
        onSelect(item.value);
      }
    } else {
      // Multiple selection mode
      if (selectedImages.some((selected) => selected.value === item.value)) {
        // Deselect if already selected and toggleable is true
        if (toggleable) {
          const newSelection = selectedImages.filter(
            (selected) => selected.value !== item.value
          );
          setSelectedImages(newSelection);
          onSelect(newSelection.map((selected) => selected.value));
        }
      } else {
        // Select if not already selected
        const newSelection = [...selectedImages, item];
        setSelectedImages(newSelection);
        onSelect(newSelection.map((selected) => selected.value));
      }
    }
  };

  const isChecked = (item) => {
    return selectedImages.some((selected) => selected.value === item.value);
  };

  return (
    <View style={styles.container}>
      {images.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.imageContainer,
            isChecked(item) ? styles.selected : null,
          ]}
          onPress={() => handleSelect(item)}
        >
          <Image source={item.path} style={styles.image} />
          <View style={styles.labelContainer}>
            <RadioButton selected={isChecked(item)} />
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text
                style={[
                  styles.label,
                  { color: isChecked(item) ? "#E582AD" : "#333" },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RadioButton = ({ selected }) => (
  <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
    {selected && <View style={styles.innerRadioButton} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width / 2.9,
    padding: 5,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    elevation: 3,
    height: 220,
    justifyContent: "space-evenly",
  },
  selected: {
    borderColor: "#E582AD",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#E582AD",
  },
  innerRadioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E582AD",
  },
});

export default ImageGrid;
