import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const getColor = (painLevel) => {
  switch (painLevel) {
    case 1:
      return "#66FF33";
    case 2:
      return "#99FF33";
    case 3:
      return "#FFCC00";
    case 4:
      return "#FF9900";
    case 5:
      return "#FF3300";
    default:
      return "#FFF";
  }
};

const CalendarHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const months = moment.months();
  const year = 2024;

  useEffect(() => {
    const fetchHeatmapData = async (monthIndex) => {
      try {
        const response = await axios.get(
          `http://192.168.137.31:3000/daily-entry`,
          {
            params: {
              month: monthIndex,
              year: year,
            },
          }
        );
        console.log(
          `Fetched heatmap data for month ${monthIndex}:`,
          response.data
        );

        const data = response.data.reduce((acc, entry) => {
          const dateKey = moment(entry.date).format("YYYY-MM-DD");
          acc[dateKey] = entry.painLevel;
          return acc;
        }, {});

        setHeatmapData((prevData) => ({
          ...prevData,
          [`${year}-${monthIndex < 10 ? `0${monthIndex}` : monthIndex}`]: data,
        }));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    months.forEach((_, index) => {
      fetchHeatmapData(index + 1);
    });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return (
    <LinearGradient style={styles.container} colors={["#E582AD", "#7131DD"]}>
      <Swiper showsPagination={false} loop={false}>
        {months.map((month, index) => {
          const monthIndex = index + 1;
          const startDate = moment(
            `${year}-${monthIndex < 10 ? `0${monthIndex}` : monthIndex}-01`
          );
          const dates = [];
          while (startDate.month() === index) {
            dates.push(startDate.clone());
            startDate.add(1, "day");
          }

          const monthData =
            heatmapData[
              `${year}-${monthIndex < 10 ? `0${monthIndex}` : monthIndex}`
            ] || {};

          return (
            <View key={index} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>
                {month} ({year})
              </Text>
              <View style={styles.calendar}>
                {dates.map((date, dateIndex) => (
                  <View
                    key={dateIndex}
                    style={[
                      styles.day,
                      {
                        backgroundColor: getColor(
                          monthData[date.format("YYYY-MM-DD")] || 0
                        ),
                      },
                    ]}
                  >
                    <Text style={styles.dayText}>{date.date()}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </Swiper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 5,
    height: height * 0.28,
    borderRadius: 16,
  },
  monthContainer: {
    width,
    alignItems: "center",
  },
  monthTitle: {
    fontWeight: "500",
    height: 25,
    textAlign: "center",
    borderRadius: 5,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: width * 0.9,
  },
  day: {
    width: width / 10 - 2,
    height: width / 10 - 2,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  dayText: {
    fontSize: 12,
  },
});

export default CalendarHeatmap;
