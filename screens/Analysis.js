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
  yLabelsOffset: 10,
};

const AnalysisPage = () => {
  const [selectedChart, setSelectedChart] = useState("LineChart");
  const [PainReportVisible, setPainReportVisible] = useState(true);
  const [painData, setPainData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [duration, setDuration] = useState("tilldate");
  const [painDays, setPainDays] = useState({
    veryHigh: 0,
    high: 0,
    medium: 0,
    low: 0,
    veryLow: 0,
  });

  const [leftBreastData, setLeftBreastData] = useState([]);
  const [rightBreastData, setRightBreastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.137.31:3000/daily-entry?duration=${duration}`
        );
        const data = response.data;

        const formattedData = data.map((entry) => ({
          date: entry.date,
          painLevel: entry.painLevel !== undefined ? entry.painLevel : 0,
          selectedPeriodDay: entry.selectedPeriodDay.toLowerCase(),
          selectedSide: entry.selectedSide,
          selectedLeftLocations: entry.selectedLeftLocations || [],
          selectedRightLocations: entry.selectedRightLocations || [],
        }));

        setPainData(formattedData);

        // Calculate days for each pain level
        const painDaysCount = {
          veryHigh: formattedData.filter((d) => d.painLevel === 5).length,
          high: formattedData.filter((d) => d.painLevel === 4).length,
          medium: formattedData.filter((d) => d.painLevel === 3).length,
          low: formattedData.filter((d) => d.painLevel === 2).length,
          veryLow: formattedData.filter((d) => d.painLevel === 1).length,
        };

        setPainDays(painDaysCount);

        const pieChartData = [
          {
            name: "Very High",
            pain: painDaysCount.veryHigh,
            color: "#FF3300",
            legendFontColor: "#000",
            legendFontSize: 15,
          },
          {
            name: "High",
            pain: painDaysCount.high,
            color: "#FF9900",
            legendFontColor: "#000",
            legendFontSize: 15,
          },
          {
            name: "Medium",
            pain: painDaysCount.medium,
            color: "#FFCC00",
            legendFontColor: "#000",
            legendFontSize: 15,
          },
          {
            name: "Low",
            pain: painDaysCount.low,
            color: "#99FF33",
            legendFontColor: "#000",
            legendFontSize: 15,
          },
          {
            name: "Very Low",
            pain: painDaysCount.veryLow,
            color: "#FFFF00",
            legendFontColor: "#000",
            legendFontSize: 15,
          },
        ];

        setPieData(pieChartData);

        // Calculate left and right breast data dynamically
        const leftBreast = calculateBreastData(formattedData, "Left");
        const rightBreast = calculateBreastData(formattedData, "Right");

        setLeftBreastData(leftBreast);
        setRightBreastData(rightBreast);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [duration]);

  // Helper function to calculate breast data dynamically
  const calculateBreastData = (data, side) => {
    const allLocations = data
      .flatMap((entry) => entry[`selected${side}Locations`])
      .filter((value, index, self) => self.indexOf(value) === index);

    return allLocations.map((position) => {
      const positionData = data.filter(
        (entry) =>
          entry.selectedSide === side &&
          entry[`selected${side}Locations`].includes(position)
      );

      const painLevelCounts = {
        veryHigh: positionData.filter((entry) => entry.painLevel === 5).length,
        high: positionData.filter((entry) => entry.painLevel === 4).length,
        medium: positionData.filter((entry) => entry.painLevel === 3).length,
        low: positionData.filter((entry) => entry.painLevel === 2).length,
        veryLow: positionData.filter((entry) => entry.painLevel === 1).length,
      };

      const totalDays = positionData.length;

      const painLabel =
        painLevelCounts.veryHigh > 0
          ? "Very High"
          : painLevelCounts.high > 0
          ? "High"
          : painLevelCounts.medium > 0
          ? "Medium"
          : painLevelCounts.low > 0
          ? "Low"
          : "Very Low";

      return {
        position,
        painLabel,
        totalDays,
      };
    });
  };

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
          getDotColor: (value, index) =>
            painData[index].selectedPeriodDay === "yes" ? "red" : "green", // Mark dots red if selectedPeriodDay is "yes"
        },
      ],
    };

    const chartWidth = width * 0.95 + painData.length * 30;

    switch (selectedChart) {
      case "LineChart":
        return (
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={chartWidth}
              height={height * 0.28}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1}
              fromZero={true}
              chartConfig={{
                ...chartConfig,
                formatYLabel: (yValue) => yValue.toString(),
              }}
              bezier
              style={{ borderRadius: 16 }}
              verticalLabelRotation={30}
              getDotColor={(value, index) =>
                painData[index].selectedPeriodDay === "yes" ? "red" : "green"
              }
            />
          </ScrollView>
        );
      case "heatmap":
        return <CalendarHeatmap />;
      default:
        return null;
    }
  }, [selectedChart, painData]);

  const renderPieChart = useMemo(() => {
    if (!pieData || pieData.length === 0) {
      return <Text>No data available for Pie Chart</Text>;
    }

    return (
      <PieChart
        data={pieData}
        width={width * 0.95}
        height={150}
        chartConfig={chartConfig}
        accessor={"pain"}
        backgroundColor={"transparent"}
        paddingLeft={-20}
        center={[30, 5]}
        absolute
      />
    );
  }, [pieData]);

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
                {renderPieChart}
              </View>

              <View style={styles.textView}>
                <Text style={styles.textHeading}>Pain During Menstruation</Text>
                <View
                  style={{
                    justifyContent: "space-around",
                    paddingHorizontal: 70,
                  }}
                >
                  <View style={styles.menstrualTextHeader}>
                    <Text style={styles.textReportHeader}>Pain Label</Text>
                    <Text style={styles.textReportHeader}>Days</Text>
                  </View>
                  <View style={styles.menstrualTextContainer}>
                    <Text style={styles.textReport}>Very High:</Text>
                    <Text style={styles.menstrualdayText}>
                      {painDays.veryHigh}
                    </Text>
                  </View>
                  <View style={styles.menstrualTextContainer}>
                    <Text style={styles.textReport}>High:</Text>
                    <Text style={styles.menstrualdayText}>{painDays.high}</Text>
                  </View>
                  <View style={styles.menstrualTextContainer}>
                    <Text style={styles.textReport}>Medium:</Text>
                    <Text style={styles.menstrualdayText}>
                      {painDays.medium}
                    </Text>
                  </View>
                  <View style={styles.menstrualTextContainer}>
                    <Text style={styles.textReport}>Low:</Text>
                    <Text style={styles.menstrualdayText}>{painDays.low}</Text>
                  </View>
                  <View style={styles.menstrualTextContainer}>
                    <Text style={styles.textReport}>Very Low:</Text>
                    <Text style={styles.menstrualdayText}>
                      {painDays.veryLow}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Left Breast Table */}
              <View style={styles.textView}>
                <Text style={styles.textHeading}>Left Breast</Text>
                <View style={styles.tableHeader}>
                  <Text style={styles.textReportHeader}>Position</Text>
                  <Text style={styles.textReportHeader}>Pain Label</Text>
                  <Text style={styles.textReportHeader}>Days</Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-around",
                    paddingHorizontal: 70,
                  }}
                >
                  {leftBreastData.map((item, index) => (
                    <View key={index} style={styles.breastTableRow}>
                      <Text style={styles.textReport}>{item.position}</Text>
                      <Text style={styles.textReport}>{item.painLabel}</Text>
                      <Text style={styles.textReport}>{item.totalDays}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Right Breast Table */}
              <View style={styles.textView}>
                <Text style={styles.textHeading}>Right Breast</Text>
                <View style={styles.tableHeader}>
                  <Text style={styles.textReportHeader}>Position</Text>
                  <Text style={styles.textReportHeader}>Pain Label</Text>
                  <Text style={styles.textReportHeader}>Days</Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-around",
                    paddingHorizontal: 70,
                  }}
                >
                  {rightBreastData.map((item, index) => (
                    <View key={index} style={styles.breastTableRow}>
                      <Text style={styles.textReport}>{item.position}</Text>
                      <Text style={styles.textReport}>{item.painLabel}</Text>
                      <Text style={styles.textReport}>{item.totalDays}</Text>
                    </View>
                  ))}
                </View>
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
  menstrualTextHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 3,
    marginHorizontal: 25,
  },
  menstrualTextContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 3,
    marginHorizontal: 25,
  },
  textReportHeader: {
    fontWeight: "500",
    borderBottomWidth: 2,
    paddingBottom: 3,
    marginRight: 10,
    marginBottom: 8,
    borderColor: "#E280AF",
  },
  textReport: {
    paddingTop: 5,
    marginHorizontal: 2,
    textAlign: "center",
  },
  menstrualdayText: {
    paddingRight: 23,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 70,
  },
  breastTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default AnalysisPage;
