import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Log Out',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
          <Text className="text-muted text-sm">Your emergency information</Text>
        </View>

        {/* User Info */}
        <Card className="mb-4">
          <Text className="text-muted font-semibold text-xs mb-1">Full Name</Text>
          <Text className="text-foreground text-xl font-bold mb-4">
            {user?.name || 'Not provided'}
          </Text>

          <Text className="text-muted font-semibold text-xs mb-1">Phone Number</Text>
          <Text className="text-foreground text-base mb-4">
            {user?.phone || 'Not provided'}
          </Text>

          <Text className="text-muted font-semibold text-xs mb-1">Emergency Contact</Text>
          <Text className="text-foreground text-base mb-4">
            {user?.emergencyContact || 'Not provided'}
          </Text>

          <Text className="text-muted font-semibold text-xs mb-1">Role</Text>
          <Text className="text-foreground text-base capitalize">
            {user?.role || 'Unknown'}
          </Text>
        </Card>

        {/* Quick Settings */}
        <View className="mb-8">
          <Text className="text-foreground font-bold text-lg mb-4">Settings</Text>

          <TouchableOpacity className="bg-slate-800 rounded-lg p-4 mb-2 flex-row justify-between items-center">
            <Text className="text-foreground font-semibold">Location Services</Text>
            <Text className="text-success text-sm font-bold">Enabled</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-slate-800 rounded-lg p-4 mb-2 flex-row justify-between items-center">
            <Text className="text-foreground font-semibold">Notifications</Text>
            <Text className="text-success text-sm font-bold">On</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-slate-800 rounded-lg p-4 flex-row justify-between items-center">
            <Text className="text-foreground font-semibold">Dark Mode</Text>
            <Text className="text-success text-sm font-bold">On</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <Card className="mb-8">
          <Text className="text-foreground font-bold mb-3">About DisasterAlert</Text>
          <Text className="text-muted text-sm leading-relaxed">
            DisasterAlert is your real-time emergency response platform. We connect affected communities with emergency responders to save lives during disasters.
          </Text>
          <View className="flex-row mt-4 pt-4 border-t border-slate-700">
            <Text className="text-muted text-xs flex-1">Version 1.0.0</Text>
            <Text className="text-muted text-xs">Last updated: Today</Text>
          </View>
        </Card>

        {/* Logout Button */}
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="danger"
          size="large"
        />

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
