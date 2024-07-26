import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  countrycode:"+91",
  phone: "1234567890",
  dob: new Date("1990-01-01"),
  gender: "Male",
  address: "123 Main St, Anytown, USA",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
  profilePicture: "https://via.placeholder.com/150",
};

const ProfilePage = ({ navigation }) => {
  const goToEditProfile = () => {
    navigation.navigate("CompleteProfile", {
      userProfile: {
        ...userProfile,
        dob: formatDate(new Date(userProfile.dob)),
      },
    });
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <LinearGradient
      colors={["#E582AD", "#7131DD", "#7131DD"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: userProfile.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.profileDetails}>
      <ScrollView>
        
          <View style={styles.heading}>
            <Text style={styles.detailsTitle}>Personal Details</Text>
          </View>
          <View style={styles.detailContainername}>
            <Text style={styles.detailTitle}>Name  :</Text>
            <Text style={styles.detailText}>{userProfile.name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Email  :</Text>
            <Text style={styles.detailText}>{userProfile.email}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Date of Birth  :</Text>
            <Text style={styles.detailText}>
              {formatDate(new Date(userProfile.dob))}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Gender  :</Text>
            <Text style={styles.detailText}>{userProfile.gender}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Mobile  :</Text>
            <Text style={styles.detailTextc}>{userProfile.countrycode}</Text>
            <Text style={styles.detailText}>{userProfile.phone}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Address  :</Text>
            <Text style={styles.detailText}>{userProfile.address}</Text>
          </View>
       
      </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goToEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToEditProfile}>
          <Text style={styles.buttonText}>Go to Homepage</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  profileDetails: {
    // marginBottom: 30,
    // borderWidth: 2,
    borderColor: "grey",
    padding: 28,
    elevation: 2,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    alignSelf: "center",
    backgroundColor:"#FFD6F6",
    width:"100%",
    height:"60%",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailContainername: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailTitle: {
    width: 120,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  detailTextc: {
    display:"flex",
    fontSize: 16,
    color: "#666",
    width:40
  },
  footer: {
    flexDirection: "row",
    justifyContent:"space-evenly",
    backgroundColor: "#FFD6F6",
    height:70,

    
  },
  button: {
   display:"flex",
    backgroundColor: "#E582AD",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    width:150,
    // height:50
    marginBottom:25
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  heading: {
    // borderWidth: 2,
    borderColor: "grey",
    paddingLeft: 20,
    justifyContent: "center",
    paddingTop: 8,
    borderRadius: 18,
    backgroundColor: "#ECB4E0",
    marginBottom: 30,
    elevation:5
  },
  linearGradient: {
    flex: 1,
  },
});

export default ProfilePage;
