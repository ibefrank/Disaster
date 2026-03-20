import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function OTPScreen() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { verifyOTP } = useAuth();

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }

    try {
      setLoading(true);
      await verifyOTP(otp);
      router.push('/(auth)/profile-setup');
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      setOtp('');
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
            <Text className="text-3xl font-bold text-foreground mb-2">Verify Code</Text>
            <Text className="text-lg text-muted">
              Enter the 4-digit code sent to your phone
            </Text>
          </View>

          {/* OTP Input */}
          <View className="mb-8">
            <TextInput
              className="bg-slate-700 text-foreground px-4 py-5 rounded-lg text-2xl font-bold text-center tracking-widest border border-primary"
              placeholder="1234"
              placeholderTextColor="#94a3b8"
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
              editable={!loading}
            />
            <Text className="text-muted text-sm mt-3 text-center">
              Didn't receive the code? Tap to resend
            </Text>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            disabled={loading}
            onPress={handleVerifyOTP}
            className="bg-primary rounded-lg py-4 mb-4"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#f1f5f9" />
            ) : (
              <Text className="text-foreground text-center text-lg font-bold">
                Verify & Continue
              </Text>
            )}
          </TouchableOpacity>

          {/* Code Example */}
          <View className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <Text className="text-foreground font-semibold mb-2">Test Code</Text>
            <Text className="text-primary text-lg font-bold">1234</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
