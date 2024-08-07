import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart, PieChart } from "react-native-chart-kit";
import DropDownMenuButton from "../components/CustomDropDown";
import CalendarHeatmap from "../components/CalenderHeatmap";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "3",
    stroke: "green",
  },
};

const AnalysisPage = () => {
  const [selectedChart, setSelectedChart] = useState("LineChart");
  const [PainReportVisible, setPainReportVisible] = useState(true);
  const [painData, setPainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.141.185:3000/daily-entry"
        );
        const data = response.data;

        const formattedData = data.map((entry) => ({
          date: entry.date || "Unknown",
          painLevel: entry.painLevel !== undefined ? entry.painLevel : 0,
        }));

        setPainData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const togglePainReportVisible = useCallback(() => {
    setPainReportVisible((prevState) => !prevState);
  }, []);

  const renderChart = useMemo(() => {
    if (!painData || !Array.isArray(painData) || painData.length === 0) {
      return <Text>No data available</Text>;
    }

    const data = {
      labels: painData.map((entry) => entry.date),
      datasets: [
        {
          data: painData.map((entry) =>
            typeof entry.painLevel === "number" ? entry.painLevel : 0
          ),
        },
      ],
    };

    switch (selectedChart) {
      case "LineChart":
        return (
          <LineChart
            data={data}
            width={width * 0.95}
            height={height * 0.28}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        );
      case "heatmap":
        return <CalendarHeatmap />;
      default:
        return null;
    }
  }, [selectedChart, painData]);

  return (
    <LinearGradient
      colors={["#E582AD", "#7131DD", "#7131DD"]}
      style={styles.container}
    >
      <Animatable.View animation="fadeInUpBig">
        <View style={styles.cardSection}>
          <View style={styles.chartContainer}>{renderChart}</View>

          <View style={styles.toggleSection}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>View</Text>
              <View style={styles.toggleButton}>
                <Pressable
                  style={[
                    styles.pickerButton,
                    selectedChart === "LineChart" && styles.activePickerButton,
                  ]}
                  onPress={() => setSelectedChart("LineChart")}
                >
                  <Text>Line</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.pickerButton,
                    selectedChart === "heatmap" && styles.activePickerButton,
                  ]}
                  onPress={() => setSelectedChart("heatmap")}
                >
                  <Text>Heatmap</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.dropDownContainer}>
              <Text style={styles.label}>Duration</Text>
              <DropDownMenuButton />
            </View>
          </View>

          <Pressable
            style={styles.sectionHeader}
            onPress={togglePainReportVisible}
          >
            <Text style={styles.toggleHeader}>Pain Analysis</Text>
            <Icon
              name={PainReportVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#000"
            />
          </Pressable>
          {PainReportVisible && (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.textView}>
                <Text style={styles.textHeading}>Pain Status</Text>
                <PieChart
                  data={painData.map((entry) => ({
                    name: entry.date,
                    population: entry.painLevel,
                    color: "#FF0000",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  }))}
                  width={width * 0.95}
                  height={150}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={-20}
                  center={[30, 5]}
                  absolute
                />
              </View>
            </ScrollView>
          )}
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardSection: {
    height: height * 0.99,
    padding: 8,
    backgroundColor: "#FFF0F6",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    paddingTop: 20,
  },
  chartContainer: {
    width: width * 0.95,
    alignSelf: "center",
    marginBottom: 20,
  },
  toggleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  activePickerButton: {
    backgroundColor: "#ddd",
  },
  dropDownContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
  },
  toggleHeader: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  textView: {
    marginVertical: 10,
  },
  textHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AnalysisPage;
