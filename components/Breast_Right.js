import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
} from "react-native";

const Breast_Right = ({ onRightLocationSend, selectedRightLocations }) => {
  const borderColor1 = useRef(new Animated.Value(0)).current;
  const [selectedImages, setSelectedImages] = useState(selectedRightLocations);

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
    onRightLocationSend(image);
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
                source={require("../Photos/RIGHTP.png")}
              />
              <Image
                style={styles.image1}
                source={require("../Photos/BVR.png")}
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
            {isSelected("NippleArea") && <View style={styles.overlayEffect} />}
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
            {isSelected("Nipple") && <View style={styles.overlayEffect} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay3]}
            onPress={() => handlePress("Rightupperinner")}
          >
            {isSelected("Rightupperinner") && (
              <View style={styles.overlayEffect} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay4]}
            onPress={() => handlePress("Rightupperouter")}
          >
            {isSelected("Rightupperouter") && (
              <View style={styles.overlayEffect} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay5]}
            onPress={() => handlePress("Rightlowerinner")}
          >
            {isSelected("Rightlowerinner") && (
              <View style={styles.overlayEffect} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.imageTouchable, styles.overlay6]}
            onPress={() => handlePress("Rightlowerouter")}
          >
            {isSelected("Rightlowerouter") && (
              <View style={styles.overlayEffect} />
            )}
          </TouchableOpacity>
        </Animated.View>
        {/* Image Starts */}

        {/* Buttons Starts */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.touchableButtonUL}
            onPress={() => handlePress("Rightupperinner")}
          >
            {isSelected("Rightupperinner") && (
              <View style={styles.overlayEffect} />
            )}
            <View style={styles.bullet1}>
            <Image source={require("../Photos/RUI.png")} style={{width:"100%",height:"100%"}}/>
            </View>
            <Text style={styles.buttonText}>Right Upper Inner</Text>
          </TouchableOpacity>
          <View style={{width:45}}></View>
          <TouchableOpacity
            style={styles.touchableButtonUR}
            onPress={() => handlePress("Rightupperouter")}
          >
            {isSelected("Rightupperouter") && (
              <View style={styles.overlayEffect} />
            )}
            <View style={styles.bullet2}>
            <Image source={require("../Photos/RUO.png")} style={{width:"100%",height:"100%"}}/>
            </View>
            <Text style={styles.buttonText}>Right Upper Outer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.touchableButtonLL}
            onPress={() => handlePress("Rightlowerinner")}
          >
            {isSelected("Rightlowerinner") && (
              <View style={styles.overlayEffect} />
            )}
            <View style={styles.bullet4}>
            <Image source={require("../Photos/RLI.png")} style={{width:"100%",height:"100%"}}/>
            </View>
            <Text style={styles.buttonText}>Right Lower Inner</Text>
          </TouchableOpacity>
          <View style={{width:45}}></View>
          <TouchableOpacity
            style={styles.touchableButtonLR}
            onPress={() => handlePress("Rightlowerouter")}
          >
            {isSelected("Rightlowerouter") && (
              <View style={styles.overlayEffect} />
            )}
            <View style={styles.bullet3}>
            <Image source={require("../Photos/RLO.png")} style={{width:"100%",height:"100%"}}/>
            </View>
            <Text style={styles.buttonText}>Right Lower Outer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.touchableButtonN}
            onPress={() => handlePress("Nipple")}
          >
            {isSelected("Nipple") && <View style={styles.overlayEffect} />}
            <View style={styles.bullet5} />
            <Text style={styles.buttonText}>Nipple</Text>
          </TouchableOpacity>
          <View style={{width:45}}></View>
          <TouchableOpacity
            style={styles.touchableButtonNA}
            onPress={() => handlePress("NippleArea")}
          >
            {isSelected("NippleArea") && <View style={styles.overlayEffect} />}
            <View style={styles.bullet6} />
            <Text style={styles.buttonText}>Nipple Area</Text>
          </TouchableOpacity>
        </View>
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
    top: 165.5,
    left: 58,
    right: 0,
    bottom: 0,
    zIndex: 2,
    borderRadius: 200,
    height: 63,
    width: 63,
    borderColor: "transparent",
    borderWidth: 1,
    overflow: "hidden",
  },
  overlay2: {
    position: "absolute",
    top: 183,
    left: 76,
    right: 0,
    bottom: 0,
    zIndex: 3,
    borderRadius: 200,
    height: 28,
    width: 28,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay3: {
    position: "absolute",
    top: 107,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderTopLeftRadius: 200,
    height: 90,
    width: 92,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay4: {
    position: "absolute",
    top: 107,
    left: 88,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderTopRightRadius: 200,
    height: 90.5,
    width: 88.8,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay5: {
    position: "absolute",
    top: 195,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderBottomLeftRadius: 200,
    height: 100,
    width: 92,
    borderColor: "transparent",
    borderWidth: 1,
  },
  overlay6: {
    position: "absolute",
    top: 195,
    left: 89,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderBottomRightRadius: 190,
    height: 100,
    width: 92,
    borderColor: "transparent",
    borderWidth: 1,
  },
  selectedBorder: {
    borderColor: "#FFFFFF", // Change border color to white when selected
  },
  imageWrapper: {
    position: "relative",
    width: 350,
    height: "100%",
    borderRadius: 15,
  },
  image1: {
    marginTop: 34,
    marginLeft: 85,
    width: 260,
    height: 280,
    resizeMode: "stretch",
    position: "absolute",
    top: 25,
    right: 125,
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
    // borderWidth: 1,
    // borderColor: "black",
  },
  overlayEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    borderRadius: 10,
    alignItems: "center",
    width: 160,
    elevation: 6,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent:"center",
    
    
  },
  // Upper Right Button Style
  touchableButtonLR: {
    
    backgroundColor: "#f8d0ce",
    borderRadius: 10,
    alignItems: "center",
    width: 160,
    elevation: 6,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent:"center",
    
  },
  // Nipple Area button style
  touchableButtonNA: {
    backgroundColor: "#f8d0ce",
    borderRadius: 10,
    alignItems: "center",
    width: 160,
    elevation: 6,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent:"flex-start",
    
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
    marginLeft:10,
    elevation: 6,
    overflow: "hidden",
    justifyContent:"center"
  },
  // Lower Left
  touchableButtonLL: {
    backgroundColor: "#f8d0ce",
    flexDirection: "row",
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 160,
    marginRight: 20,
    marginLeft:10,
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
    marginLeft:10,
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
    elevation: 5,
    marginRight: "6%",
  },
  bullet2: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#90C5C0",
    elevation: 5,
    marginRight: "6%",
  },
  bullet3: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#FDE59F",
    elevation: 5,
    marginRight: "6%",
  },
  bullet4: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#F1A893",
    elevation: 5,
    marginRight: "6%",
  },
  bullet5: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#C0526B",
    elevation: 5,
    marginRight: "6%",
    marginLeft:10
  },
  bullet6: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#F97D97",
    elevation: 5,
    marginRight: "6%",
    marginLeft:10
  },
});

export default Breast_Right;
