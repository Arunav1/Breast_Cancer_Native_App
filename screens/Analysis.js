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
import { LineChart } from "react-native-chart-kit";
import DropDownMenuButton from "../components/CustomDropDown";
import CalendarHeatmap from "../components/CalenderHeatmap";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import moment from "moment";

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
  yLabelsOffset: 10, // Adjust this value if necessary to correctly position the labels
};

const AnalysisPage = () => {
  const [selectedChart, setSelectedChart] = useState("LineChart");
  const [PainReportVisible, setPainReportVisible] = useState(true);
  const [painData, setPainData] = useState([]);
  const [duration, setDuration] = useState("tilldate");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data based on selected duration
        const response = await axios.get(
          `http://192.168.137.31:3000/daily-entry?duration=${duration}`
        );
        const data = response.data;

        const formattedData = data.map((entry) => ({
          date: entry.date,
          painLevel: entry.painLevel !== undefined ? entry.painLevel : 0,
        }));

        setPainData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [duration]);

  const togglePainReportVisible = useCallback(() => {
    setPainReportVisible((prevState) => !prevState);
  }, []);

  const renderChart = useMemo(() => {
    if (!painData || !Array.isArray(painData) || painData.length === 0) {
      return <Text>No data available</Text>;
    }

    const data = {
      labels: painData.map((entry) => moment(entry.date).format("DD MMM")),
      datasets: [
        {
          data: painData.map((entry) =>
            typeof entry.painLevel === "number" ? entry.painLevel : 0
          ),
        },
      ],
    };

    const chartWidth = width * 0.95 + painData.length * 30; // Adjust width based on number of data points

    switch (selectedChart) {
      case "LineChart":
        return (
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={chartWidth} // Make chart width dynamic
              height={height * 0.28}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // Ensure y-axis has intervals of 1
              fromZero={true} // Ensure y-axis starts from 0
              chartConfig={{
                ...chartConfig,
                formatYLabel: (yValue) => yValue.toString(), // Explicitly format the y-axis labels
              }}
              bezier
              style={{ borderRadius: 16 }}
              verticalLabelRotation={30} // Rotate the labels for better visibility
            />
          </ScrollView>
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
              <DropDownMenuButton onSelect={setDuration} />
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
