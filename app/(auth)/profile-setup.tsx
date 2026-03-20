import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setupProfile } = useAuth();

  const handleSetupProfile = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      setLoading(true);
      await setupProfile(name, emergencyContact);
      router.replace('/(tabs)');
    } catch (error) {
      alert('Setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center">
          {/* Header */}
          <View className="mb-12">
            <Text className="text-3xl font-bold text-foreground mb-2">Your Profile</Text>
            <Text className="text-lg text-muted">
              Help us know how to reach you in emergencies
            </Text>
          </View>

          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-foreground font-semibold mb-3 text-base">Full Name</Text>
            <TextInput
              className="bg-slate-700 text-foreground px-4 py-4 rounded-lg text-lg border border-slate-600"
              placeholder="John Doe"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
          </View>

          {/* Emergency Contact */}
          <View className="mb-8">
            <Text className="text-foreground font-semibold mb-3 text-base">
              Emergency Contact (Optional)
            </Text>
            <TextInput
              className="bg-slate-700 text-foreground px-4 py-4 rounded-lg text-lg border border-slate-600"
              placeholder="+1 (555) 000-0001"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
              editable={!loading}
            />
            <Text className="text-muted text-sm mt-2">
              A trusted contact we can reach on your behalf
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            disabled={loading}
            onPress={handleSetupProfile}
            className="bg-primary rounded-lg py-4 mb-4"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#f1f5f9" />
            ) : (
              <Text className="text-foreground text-center text-lg font-bold">
                Get Started
              </Text>
            )}
          </TouchableOpacity>

          {/* Privacy Notice */}
          <View className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <Text className="text-foreground text-sm">
              Your information is secure and will only be used in emergency situations to help you and your community.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
