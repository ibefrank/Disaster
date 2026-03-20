import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const tabBarOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: '#ef4444',
    tabBarInactiveTintColor: '#64748b',
    tabBarStyle: {
      backgroundColor: '#1e293b',
      borderTopColor: '#334155',
      paddingBottom: 8,
      height: 60,
    },
    headerShown: false,
  };

  return (
    <Tabs
      screenOptions={tabBarOptions}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarLabel: 'Map',
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarLabel: 'Report',
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarLabel: 'Alerts',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}
