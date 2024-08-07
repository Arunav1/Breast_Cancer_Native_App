import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";
import { Video } from "expo-av";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import {
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";

const Dashboard = ({ navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const videoRef = useRef(null);
  const cardY = useSharedValue(0);
  console.log(cardY);
  const maxDragUp = -height * 0.3; // Limit to drag up (30% of screen height)
  const maxDragDown = 0; // Limit to drag down (initial position)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = cardY.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY > 0) {
        cardY.value = ctx.startY + event.translationY;
      } else if (cardY.value + event.translationY >= 0) {
        cardY.value = ctx.startY + event.translationY;
      }
    },
    onEnd: (_) => {
      // if (cardY.value < maxDragUp / 2) {
      //     cardY.value = withSpring(maxDragUp);
      // }
      if (cardY.value < 0) {
        cardY.value = withSpring(0); // Return to original position if dragged upwards
      } else {
        cardY.value = maxDragDown;
      }
    },
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: cardY.value }],
    };
  });

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const data = {
    from: "Dashboard",
    date: formattedDate,
  };
  // console.log(formattedDate)
  console.log(data.date);
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const date = today.getDate();
    return `${date}`;
  };
  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    if (newDate) {
      setSelectedDate(newDate);
    }
  };
  const getCurrentMonth = () => {
    const today = new Date();
    const day = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const date = today.getDate();
    return `${month}, ${day}`;
  };

  return (
    <LinearGradient
      colors={["#E582AD", "#7131DD", "#7131DD"]}
      style={styles.container}
    >
      <View style={styles.mainImageContainer}>
        <Swiper
          showsPagination={true}
          loop={true}
          autoplay={true}
          autoplayTimeout={2.5}
          paginationStyle={styles.paginationStyle}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          dotColor="gray"
          activeDotColor="black"
          style={{ height: height * 0.26 }}
        >
          <Image
            source={require("../assets/th.jpeg")}
            style={styles.mainImage}
          />
          <Image
            source={require("../assets/breastImage.png")}
            style={styles.mainImage}
          />
          <Video
            ref={videoRef}
            source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
            style={styles.mainImage}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted
          />
          <Image
            source={require("../assets/OIP.jpeg")}
            style={styles.mainImage}
          />
        </Swiper>
      </View>
      <Text style={{ textTransform: "capitalize", color: "#ffffff" }}>
        Breast cancer is a disease in which abnormal breast cells grow out of
        control and form tumours. If left unchecked, the tumours can spread
        throughout the body and become fatal. Breast cancer cells begin inside
        the milk ducts and/or the milk-producing lobules of the breast. The
        earliest form (in situ) is not life-threatening and can be detected in
        early stages. Cancer cells can spread into nearby breast tissue
        (invasion). This creates tumours that cause lumps or thickening.
        Invasive cancers can spread to nearby lymph nodes or other organs
        (metastasize). Metastasis can be life-threatening and fatal. Treatment
        is based on the person, the type of cancer and its spread. Treatment
        combines surgery, radiation therapy and medications.
      </Text>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <LinearGradient
            style={styles.cardContent}
            colors={["#FFF0F6", "#FFD6F6", "#FFD6F6", "#C96EB9"]}
          >
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../assets/dash.png")}
                  style={{ height: 15, width: 40, margin: 0 }}
                />
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.userProgressContaier}>
                  <Swiper
                    showsPagination={false}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={5}
                  >
                    <View style={styles.userProgressItem}>
                      <Text>Profile</Text>
                    </View>
                    <View style={styles.userProgressItem}>
                      <Text> Health Profile</Text>
                    </View>
                    <View style={styles.userProgressItem}>
                      <Text>Appointment</Text>
                    </View>
                    <View style={styles.userProgressItem}>
                      <Text>Profile</Text>
                    </View>
                  </Swiper>
                </View>

                {/* <View > */}
                <View style={styles.activityContainer}>
                  <Pressable
                    style={styles.activityItem}
                    onPress={() => navigation.navigate("DailyEntry")}
                  >
                    <ImageBackground
                      source={require("../assets/Activity.jpg")} // Replace with your image URL or local image
                      style={styles.imageBackground}
                      imageStyle={styles.imageStyle}
                    >
                      <View style={styles.logContainer}>
                        {showDatePicker && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={selectedDate}
                            mode="date"
                            is24Hour={true}
                            display="spinner"
                            maximumDate={new Date()}
                            onChange={handleDateChange}
                          />
                        )}
                        <Pressable
                          style={styles.grayCircle}
                          onPress={() => setShowDatePicker(true)}
                        >
                          {/* <View style={styles.whiteCircle}> */}
                          <Image
                            source={require("../assets/cal.png")}
                            style={{ height: 32, width: 32 }}
                          />
                          <Text
                            style={{
                              position: "absolute",
                              top: 17,
                              fontWeight: "bold",
                            }}
                          >
                            {getCurrentDate()}
                          </Text>
                          <Text style={styles.dateText}>
                            {getCurrentMonth()}
                          </Text>
                          {/* </View> */}
                        </Pressable>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          margin: 0,
                          padding: 0,
                          bottom: 10,
                        }}
                      >
                        <Text style={styles.activityTitle}>Activity</Text>
                        <Text style={styles.logText}>Log Today's Pain</Text>
                      </View>
                    </ImageBackground>
                  </Pressable>
                  <View>
                    <Pressable
                      style={styles.activityItem2}
                      onPress={() => {
                        navigation.navigate("Analysis");
                      }}
                    >
                      <ImageBackground
                        source={require("../assets/Analysis.jpg")} // Replace with your image URL or local image
                        style={styles.imageBackground}
                        imageStyle={styles.imageStyle}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.logText}>Analysis</Text>
                        </View>

                        <View style={styles.logContainer}></View>
                      </ImageBackground>
                    </Pressable>
                    <Pressable style={styles.activityItem3}>
                      <ImageBackground
                        source={require("../assets/Doctor.jpg")} // Replace with your image URL or local image
                        style={styles.imageBackground}
                        imageStyle={styles.imageStyle}
                      >
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.activityTitle}>Doctor</Text>
                        </View>

                        <View style={styles.logContainer}></View>
                      </ImageBackground>
                    </Pressable>
                  </View>
                </View>

                {/* </Pressable> */}
                <Text style={styles.activityTitle}>Actions</Text>
                <ScrollView
                  contentContainerStyle={styles.actionsContainer}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.actionWrapper}>
                    <TouchableOpacity
                      style={styles.actionItem}
                      onPress={() => navigation.navigate("MedicalReport")}
                    >
                      <Image
                        source={require("../assets/report.png")}
                        style={styles.actionImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Progress </Text>
                  </View>
                  <View style={styles.actionWrapper}>
                    <TouchableOpacity style={styles.actionItem}>
                      <Image
                        source={require("../assets/Search-Medicine.png")}
                        style={styles.actionImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Medicine</Text>
                  </View>
                  <View style={styles.actionWrapper}>
                    <TouchableOpacity
                      style={styles.actionItem}
                      onPress={() =>
                        navigation.navigate("AssSymptoms", data.date)
                      }
                    >
                      <Image
                        source={require("../assets/Symptoms.png")}
                        style={styles.actionImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Symptoms</Text>
                  </View>
                  <View style={styles.actionWrapper}>
                    <TouchableOpacity
                      style={styles.actionItem}
                      onPress={() => navigation.navigate("HealthNews")}
                    >
                      <Image
                        source={require("../assets/Health-News.png")}
                        style={styles.actionImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Health News</Text>
                  </View>
                </ScrollView>
              </ScrollView>
            </Animatable.View>
          </LinearGradient>
        </Animated.View>
      </PanGestureHandler>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");
const cardHeight = height * 0.68;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mainImageContainer: {
    flexDirection: "row",
  },
  mainImage: {
    width: width * 0.93,
    margin: 5,
    height: height * 0.21,
    borderRadius: 7,
    resizeMode: "cover",
  },
  activityContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  paginationStyle: {
    bottom: 15,
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 7,
    height: 7,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 9,
    height: 9,
    borderRadius: 5,
    margin: 3,
  },
  dotStyle: {
    backgroundColor: "rgba(0,0,0,.2)",
  },
  activeDotStyle: {
    backgroundColor: "#000",
  },

  userProgressContaier: {
    height: height * 0.1,
    width: width * 0.93,
    backgroundColor: "#ECB4E0",
    borderRadius: 15,
    paddingVertical: 19,
    paddingHorizontal: 20,
    marginLeft: 5,
    marginBottom: 10,
    shadowColor: "black",
    // elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  userProgressItem: {
    height: height * 0.06,
    width: width * 0.9,
    alignContent: "center",
    paddingLeft: 10,
    justifyContent: "center",
    // backgroundColor: '#ECB4E0',
    backgroundColor: "",
    borderRadius: 10,
    // borderWidth: 1
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // marginLeft: 10,
    marginTop: 0,
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: cardHeight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    elevation: 10,
    justifyContent: "space-evenly",
  },
  cardContent: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  activityItem: {
    height: height * 0.21,
    width: width * 0.47,
    backgroundColor: "#ECB4E0",
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 8,
    shadowColor: "black",
    elevation: 10,
    overflow: "hidden",
  },
  activityItem2: {
    height: height * 0.1,
    width: width * 0.44,
    backgroundColor: "#ECB4E0",
    borderRadius: 15,
    // padding: 10,
    shadowColor: "black",
    elevation: 10,
    overflow: "hidden",
    marginBottom: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 10,
  },

  activityItem3: {
    height: height * 0.1,
    width: width * 0.44,
    backgroundColor: "#ECB4E0",
    borderRadius: 15,
    // padding: 10,
    shadowColor: "black",
    elevation: 10,
    overflow: "hidden",
  },
  dateText: {
    borderRadius: 5,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "black",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  dayText: {
    backgroundColor: "#E0E0E0",
    padding: 5,
    borderRadius: 3,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  logContainer: {
    justifyContent: "center",
  },
  logText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  grayCircle: {
    // backgroundColor: '#E582AD',
    borderRadius: 15,
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 10,
    // marginTop: 5,
    // top: 10
  },
  whiteCircle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: width * 0.4,
    height: 63,
    alignItems: "center",
    justifyContent: "center",
  },
  logIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 20,
    marginBottom: 110,
  },
  actionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#ECB4E0",
    borderRadius: 10,
    height: 90,
    width: 90,
    elevation: 10,
  },
  actionItem: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  actionImage: {
    height: 40,
    width: 40,
  },
});

export default Dashboard;
