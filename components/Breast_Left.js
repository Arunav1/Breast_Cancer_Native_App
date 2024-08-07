import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

const Breast_Left = ({ onLeftLocationSend, selectedLeftLocations }) => {
  const borderColor1 = useRef(new Animated.Value(0)).current;
  const [selectedImages, setSelectedImages] = useState(selectedLeftLocations);

  useEffect(() => {
    animateBorderColor(borderColor1);
  }, []);

  const animateBorderColor = (borderColor) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderColor, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(borderColor, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const handlePress = (image) => {
    onLeftLocationSend(image);
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(image)) {
        return prevSelectedImages.filter((img) => img !== image);
      } else {
        return [...prevSelectedImages, image];
      }
    });
  };

  const isSelected = (image) => {
    return selectedImages.includes(image);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.imageContainer]}>
          <TouchableWithoutFeedback style={styles.imageTouchable}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image2}
                source={require("../Photos/LEFTP.png")}
              />
              <Image
                style={styles.image1}
                source={require("../Photos/Bvl.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={[styles.imageTouchable, styles.overlay1]}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../Photos/BRmid.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay1]}
            onPress={() => handlePress("NippleArea")}
          >
            {isSelected("NippleArea") && <View style={styles.overlay1Effect} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.imageTouchable, styles.overlay2]}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../Photos/Nipple.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay2]}
            onPress={() => handlePress("Nipple")}
          >
            {isSelected("Nipple") && <View style={styles.overlay1Effect} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay3]}
            onPress={() => handlePress("Leftupperouter")}
          >
            {isSelected("Leftupperouter") && (
              <View style={styles.overlay1Effect} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay4]}
            onPress={() => handlePress("Leftupperinner")}
          >
            {isSelected("Leftupperinner") && (
              <View style={styles.overlay1Effect} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay5]}
            onPress={() => handlePress("Leftlowerouter")}
          >
            {isSelected("Leftlowerouter") && (
              <View style={styles.overlay1Effect} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay6]}
            onPress={() => handlePress("Leftlowerinner")}
          >
            {isSelected("Leftlowerinner") && (
              <View style={styles.overlay1Effect} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.buttonRow}>
       <TouchableOpacity
          style={styles.touchableButtonUL}
          onPress={() => handlePress("Leftupperouter")}
        >
          {isSelected("Leftupperouter") && (
            <View style={styles.overlay2Effect} />
          )}
          <View style={styles.bullet1}>
            <Image source={require("../Photos/LUO.png")} style={{width:"100%",height:"100%"}}/>
          </View>
          <Text style={styles.buttonText}>Left Upper Outer</Text>
       </TouchableOpacity>
       <View style={{width:30}}></View>
        <TouchableOpacity
          style={styles.touchableButtonUR}
          onPress={() => handlePress("Leftupperinner")}
        >
          {isSelected("Leftupperinner") && (
            <View style={styles.overlay2Effect} />
          )}
          <View style={styles.bullet2}>
          <Image source={require("../Photos/LUI.png")} style={{width:"100%",height:"100%"}}/>
          </View>
          <Text style={styles.buttonText}>Left Upper Inner</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.touchableButtonLL}
          onPress={() => handlePress("Leftlowerouter")}
        >
          {isSelected("Leftlowerouter") && (
            <View style={styles.overlay2Effect} />
          )}
          <View style={styles.bullet3}>
          <Image source={require("../Photos/LLO.png")} style={{width:"100%",height:"100%"}}/>
          </View>
          <Text style={styles.buttonText}>Left Lower Outer</Text>
        </TouchableOpacity>
        <View style={{width:30}}></View>
        <TouchableOpacity
          style={styles.touchableButtonLR}
          onPress={() => handlePress("Leftlowerinner")}
        >
          {isSelected("Leftlowerinner") && (
            <View style={styles.overlay2Effect} />
          )}
          <View style={styles.bullet4}>
          <Image source={require("../Photos/LLI.png")} style={{width:"100%",height:"100%"}}/>
          </View>
          <Text style={styles.buttonText}>Left Lower Inner</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.touchableButtonN}
          onPress={() => handlePress("Nipple")}
        >
          {isSelected("Nipple") && <View style={styles.overlay2Effect} />}
          <View style={styles.bullet6} />
          <Text style={styles.buttonText}>Nipple</Text>
        </TouchableOpacity>
        <View style={{width:30}}></View>
        <TouchableOpacity
          style={styles.touchableButtonNA}
          onPress={() => handlePress("NippleArea")}
        >
          {isSelected("NippleArea") && <View style={styles.overlay2Effect} />}
          <View style={styles.bullet5} />
          <Text style={styles.buttonText}>Nipple Area</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 320,
    borderWidth: 4,
    borderColor: "transparent",
  },
  imageTouchable: {
    width: "100%",
    height: "80%",
    overflow: "hidden",
  },
  overlay1: {
    position: "absolute",
    top: 167.5,
    left: 182,
    right: 0,
    bottom: 0,
    zIndex: 2,
    borderRadius: 200,
    height: 61,
    width: 59,
    borderColor: "transparent",
    borderWidth: 1,
    overflow: "hidden",
  },
  overlay2: {
    position: "absolute",
    top: 185,
    left: 198.5,
    right: 0,
    bottom: 0,
    zIndex: 3,
    borderRadius: 200,
    height: 28,
    width: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay3: {
    position: "absolute",
    top: 110,
    left: 123,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderTopLeftRadius: 230,
    height: 89,
    width: 91,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay4: {
    position: "absolute",
    top: 110,
    left: 209,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderTopRightRadius: 190,
    height: 89,
    width: 92,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay5: {
    position: "absolute",
    top: 196,
    left: 120,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderBottomLeftRadius: 80,
    height: 95.5,
    width: 92,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay6: {
    position: "absolute",
    top: 197,
    left: 209,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderBottomRightRadius: 190,
    height: 93.5,
    width: 92,
    borderColor: "transparent",
    borderWidth: 1,
  },
  selectedBorder: {
    borderColor: "#FFFFFF",
  },
  imageWrapper: {
    position: "relative",
    width: 350,
    height: "100%",
    borderRadius: 15,
  },
  image1: {
    marginTop: 34,
    marginLeft: 87,
    width: 260,
    height: 280,
    resizeMode: "stretch",
    position: "absolute",
    top: 25,
    left: 0,
    zIndex: 1,
  },
  image2: {
    width: 300,
    height: "100%",
    resizeMode: "stretch",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    borderRadius: 20,
  },
  // Image Overlay
  overlay1Effect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  // Button Overlay
  overlay2Effect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  // Right Buttons
  // Upper Left Button Style
  touchableButtonUR: {
    backgroundColor: "#f8d0ce",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    // marginRight: 4,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"center"
  },
  // Upper Right Button Style
  touchableButtonLR: {
    backgroundColor: "#f8d0ce",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    // marginRight: 20,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"center"
  },
  // Nipple Area button style
  touchableButtonNA: {
    backgroundColor: "#f8d0ce",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    // marginRight: 20,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"flex-start"
  },

  // Left Buttons
  // Upper Left Button
  touchableButtonUL: {
    backgroundColor: "#f8d0ce",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    marginRight: 20,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"center"
  },

  // Lower Left
  touchableButtonLL: {
    backgroundColor: "#f8d0ce",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    marginRight: 20,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"center"
  },
  // Nipple Button
  touchableButtonN: {
    backgroundColor: "#f8d0ce",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    marginRight: 20,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"flex-start"
  },
  buttonText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "bold",
  },
  nextButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  bullet1: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#d2e7ba",
    // elevation: 5,
    marginRight: "6%",
  },
  bullet2: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#90C5C0",
    // elevation: 5,
    marginRight: "6%",
  },
  bullet3: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#FDE59F",
    // elevation: 5,
    marginRight: "6%",
  },
  bullet4: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#F1A893",
    // elevation: 5,
    marginRight: "6%",
  },
  bullet5: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#F97D97",
    // elevation: 5,
    marginRight: "6%",
    // alignSelf:"flex-start"
    marginLeft:12,
  },
  bullet6: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#C0526B",
    // elevation: 5,
    marginRight: "6%",
    // alignSelf:"flex-start"
    marginLeft:12,
  },
});

export default Breast_Left;
