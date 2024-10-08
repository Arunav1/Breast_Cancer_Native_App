import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Verification from "./screens/Verification";
import PersonalMedicalHistoryScreen from "./screens/PersonalMedicalHistoryScreen";
import Tabs from "./screens/BottomTab";
import Dashboard from "./screens/Dashboard";
import DailyEntry from "./screens/DailyEntry";
import AssociatedSymptoms from "./screens/AssociatedSymptoms";
import AnalysisPage from "./screens/Analysis";
import Drawer_tab from "./screens/Drawer_Tab";
import { TransitionPresets } from "@react-navigation/stack";
import ProfilePage from "./screens/Profile";
import LongTermSymptoms from "./screens/LongTermSymptoms";
import FamilyCancerHistoryQuestion from "./screens/FamilyMedicalHistoryQuestion";
import PatientQRCode from "./screens/QRcode";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Sen-Regular.ttf"),
    bold: require("./assets/fonts/Sen-Bold.ttf"),
    extraBold: require("./assets/fonts/Sen-ExtraBold.ttf"),
  });

  // Hide the splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null while fonts are still loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Register">
              {/* <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Verification"
                component={Verification}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PersonalMedicalHistoryScreen"
                component={PersonalMedicalHistoryScreen}
                options={{
                  headerShown: false,
                }}
              /> */}
              {/* <Stack.Screen
                name="BottomTab"
                component={Tabs}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DailyEntry"
                component={DailyEntry}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AssociatedSymptoms"
                component={AssociatedSymptoms}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Analysis"
                component={AnalysisPage}
                options={{
                  headerTitleStyle: {
                    marginLeft: "45%",
                  },
                  headerShown: true,
                  headerStyle: { backgroundColor: "#E582AD" },
                }}
              />
              <Stack.Screen
                name="DrawerTab"
                component={Drawer_tab}
                options={{
                  headerTitle: "",
                  headerStyle: { backgroundColor: "#E582AD", height: 70 },
                  ...TransitionPresets.SlideFromRightIOS, // You can customize the animation here
                  gestureDirection: "horizontal-inverted",
                }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="LongTermSymptoms"
                component={LongTermSymptoms}
                options={{
                  headerTitleAlign: "center",
                  headerShown: false,
                  headerStyle: { backgroundColor: "#FFF0F6" },
                }}
              />
              <Stack.Screen
                name="FamilyCancerHistoryQuestion"
                component={FamilyCancerHistoryQuestion}
                options={{
                  headerStyle: { backgroundColor: "#E582AD" },
                  headerShown: false,
                }}
              /> */}
              <Stack.Screen
                name="PatientQRCode"
                component={PatientQRCode}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
