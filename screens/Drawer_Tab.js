import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // or whichever icon set you prefer
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Drawer_tab = ({ navigation }) => {
  const menuItems = [
    {
      id: 1,
      title: "My Doctor",
      image: require("../assets/mydoctor.jpeg"),
      onPress: "MyDoctor",
    },
    {
      id: 2,
      title: "My Records",
      image: require("../assets/Appointments.jpeg"),
      onPress: "FamilyCancerHistoryQuestion",
    },
    {
      id: 3,
      title: "Health History",
      image: require("../assets/healthhistory.png"),
      onPress: "",
    },
    {
      id: 4,
      title: "Major Changes",
      image: require("../assets/healthhistory.png"),
      onPress: "LongTermSymptoms",
    },
  ];

  const menuItems2 = [
    {
      id: 3,
      title: "Settings",
      image: require("../assets/settings_icon.png"),
      onPress: "",
    },
    {
      id: 4,
      title: "Privacy Policy",
      image: require("../assets/privacy_icon.png"),
      onPress: "",
    },
    {
      id: 5,
      title: "Help & Support",
      image: require("../assets/help_icon.png"),
      onPress: "",
    },
    {
      id: 6,
      title: "About Us",
      image: require("../assets/about_icon.png"),
      onPress: "",
    },
  ];

  return (
    <LinearGradient
      colors={["#FFF0F6", "#FFD6F6", "#FFD6F6", "#C96EB9"]}
      style={styles.container}
    >
      <View style={styles.profile_sec}>
        <Image
          source={require("../assets/profile.jpeg")}
          style={styles.profile_img}
        />
        <Pressable onPress={() => navigation.navigate("profile_delails")}>
          <Text style={styles.profile_name}>Name</Text>
          <Text>+91 75574893473</Text>

          <Text style={styles.profile_link}>
            view profile{" "}
            <Image
              source={require("../assets/go-to-the-next-page.jpeg")}
              style={{ height: 10, width: 10 }}
            ></Image>
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.content_container}>
          {menuItems.map((item) => (
            <Pressable
              style={styles.content}
              key={item.id}
              onPress={() => navigation.navigate(item.onPress)}
            >
              <Image source={item.image} style={styles.logos} />
              <Text style={styles.menu_text}>{item.title}</Text>
              <Image
                source={require("../assets/go-to-the-next-page.jpeg")}
                style={{ height: 15, width: 15 }}
              ></Image>
            </Pressable>
          ))}
        </View>

        <View style={styles.content_container}>
          {menuItems2.map((item) => (
            <Pressable
              style={styles.content}
              key={item.id}
              onPress={() => navigation.navigate(item.onPress)}
            >
              <Image source={item.image} style={styles.logos} />
              <Text style={styles.menu_text}>{item.title}</Text>
              <Image
                source={require("../assets/go-to-the-next-page.jpeg")}
                style={{ height: 15, width: 15 }}
              ></Image>
            </Pressable>
          ))}
        </View>

        <View style={styles.logout_container}>
          <View style={styles.content}>
            <Image
              source={require("../assets/logout_icon.jpeg")}
              style={styles.logos}
            />
            <Text style={styles.menu_text}>Logout</Text>
          </View>
        </View>
        <View style={styles.social}>
          <Icon
            name="facebook-square"
            size={30}
            color="black"
            style={styles.social_logo}
          />
          <Icon
            name="twitter"
            size={30}
            color="black"
            style={styles.social_logo}
          />
          <Icon
            name="youtube-play"
            size={30}
            color="black"
            style={styles.social_logo}
          />
          <Icon
            name="telegram"
            size={30}
            color="black"
            style={styles.social_logo}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Drawer_tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
  },
  profile_img: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: "black",
  },
  profile_sec: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
    overflow: "hidden",
  },
  profile_name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profile_link: {
    color: "blue",
  },
  content_container: {
    // backgroundColor: '#FFD6F6',
    flex: 1,
    borderRadius: 20,
    // elevation: 2,
    // marginBottom: 5,
    paddingHorizontal: 45,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  logos: {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 20,
  },

  menu_text: {
    fontSize: 17,
    flex: 1,
  },
  menu_arrow: {
    fontWeight: "bold",
    fontSize: 18,
  },
  logo_container: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    height: 150,
    width: 270,
  },
  logout_container: {
    // backgroundColor: '#FFD6F6',
    flex: 1,
    borderRadius: 10,
    // elevation: 3,
    // marginHorizontal: 5,
    marginBottom: 10,
    paddingLeft: 45,
  },
  social: {
    flexDirection: "row",
    padding: 10,
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  social_logo: {
    padding: 20,
  },
});
