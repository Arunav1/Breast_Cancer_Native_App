import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const { width } = Dimensions.get("window");

const DropDownMenuButton = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "10 Days", value: "10days" },
    { label: "1 Month", value: "1month" },
    { label: "6 Months", value: "6months" },
    { label: "1 Year", value: "1year" },
    { label: "Till Date", value: "tilldate" },
  ]);

  const handleChange = (value) => {
    setValue(value);
    onSelect(value);
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={handleChange}
      setItems={setItems}
      placeholder=" Select"
      style={styles.dropDown}
      iconContainerStyle={styles.iconContainerStyle}
      dropDownContainerStyle={styles.dropDownContainer}
      placeholderStyle={{ fontWeight: "500" }}
    />
  );
};

const styles = StyleSheet.create({
  dropDown: {
    width: width * 0.28,
    backgroundColor: "#E280AF",
    borderWidth: 0,
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  dropDownContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    marginTop: 2,
    position: "absolute",
    right: 55,
    width: width * 0.3,
  },
  iconContainerStyle: {
    // paddingRight: 10
  },
});

export default DropDownMenuButton;
