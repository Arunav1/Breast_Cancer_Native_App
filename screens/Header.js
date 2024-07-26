import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // or whichever icon set you prefer
import { useNavigation } from "@react-navigation/native";

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.profile_container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("DrawerTab")}>
          <Image
            source={require("../assets/profile.jpeg")}
            style={styles.imgstyl}
          />
        </TouchableOpacity>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Welcome Koushik
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="map-marker" size={15} color="black" />
            <Text> Location</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const CustomHeaderRight = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <Image
          source={require("../assets/notification_icon.png")}
          style={{ height: 25, width: 25 }}
        />
        {/* <Icon name="bell-o" size={24} color="black" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_container: {
    paddingLeft: 7,
    width: 200,
  },
  imgstyl: {
    height: 40,
    width: 40,
    borderRadius: 25,
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  locationIcon: {
    height: 20,
    width: 14,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 20,
    paddingRight: 20,
  },
});

export default CustomHeader;
