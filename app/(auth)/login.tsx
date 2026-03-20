import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!phone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    try {
      setLoading(true);
      await login(phone);
      router.push('/(auth)/otp');
    } catch (error) {
      alert('Login failed. Please try again.');
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
            <Text className="text-4xl font-bold text-foreground mb-2">DisasterAlert</Text>
            <Text className="text-lg text-muted">Emergency Response in Real Time</Text>
          </View>

          {/* Phone Input */}
          <View className="mb-8">
            <Text className="text-foreground font-semibold mb-3 text-base">Phone Number</Text>
            <TextInput
              className="bg-slate-700 text-foreground px-4 py-4 rounded-lg text-lg border border-slate-600"
              placeholder="+1 (555) 000-0000"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
            />
            <Text className="text-muted text-sm mt-2">
              We'll send you a verification code
            </Text>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            className="bg-primary rounded-lg py-4 mb-4"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#f1f5f9" />
            ) : (
              <Text className="text-foreground text-center text-lg font-bold">
                Send Code
              </Text>
            )}
          </TouchableOpacity>

          {/* Info Box */}
          <View className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <Text className="text-foreground font-semibold mb-2">For Testing</Text>
            <Text className="text-muted text-sm mb-2">
              Phone: +1-555-0000
            </Text>
            <Text className="text-muted text-sm">
              OTP: 1234
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
