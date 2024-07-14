import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Text } from 'react-native';
import { TransitionPresets } from '@react-navigation/stack';

import Dashboard from './Dashboard';
import Doctor from './doctor';
import Dr_Appointments from './Appointment';
import CustomHeader, { CustomHeaderRight } from './Header';

// Creating bottom tab and stack navigators
const Tab = createBottomTabNavigator();
const AppointmentsStack = createStackNavigator();

// Custom button for the tab navigator
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: -20, justifyContent: 'center', alignItems: 'center' }}
    onPress={onPress}
  >
    <View
      style={{
        width: 65,
        height: 65,
        borderRadius: 20,
        backgroundColor: '#E582AD',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

// Stack navigator for Appointments with animation
const AppointmentsStackScreen = () => (
  <AppointmentsStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      ...TransitionPresets.ModalSlideFromBottomIOS,
    }}
  >
    <AppointmentsStack.Screen
      name="Dr_Appointments"
      component={Dr_Appointments}
      options={{ headerShown: false }}
    />
  </AppointmentsStack.Navigator>
);

// Tab navigator with all screens including the stack for Appointments
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let text;

          // Set icon names and labels for each tab
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              text = 'Home';
              break;
            case 'Search Doctors':
              iconName = focused ? 'person' : 'person-outline';
              text = 'Search Dr.';
              break;
            case 'Appointments':
              iconName = 'calendar-number-outline';
              text = 'Appointments';
              size = focused ? 35 : 20;
              break;
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <Icon name={iconName} size={size} color={color} />
              <Text style={{ color: 'black', fontSize: 11 }}>{text}</Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 65,
          position: 'absolute',
          margin: 10,
          marginBottom:15,
          borderRadius: 10,
          // paddingHorizontal:3,
        },
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerTitle: '', // Set the custom header here
        headerLeft: () => <CustomHeader />,
        headerRight: () => <CustomHeaderRight />,
        headerStyle: {
          backgroundColor: '#E582AD',
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      
      <Tab.Screen
        name="Appointments"
        component={AppointmentsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="calendar-number-outline" size={35} color={focused ? 'black' : 'white'} />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    <Tab.Screen name="Search Doctors" component={Doctor} />
    </Tab.Navigator>
  );
};

export default Tabs;
