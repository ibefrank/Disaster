import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useIncidents } from '@/context/IncidentContext';
import { useLocation } from '@/context/LocationContext';
import { EmergencyType, Severity } from '@/types';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

const EMERGENCY_TYPES: EmergencyType[] = ['flood', 'injury', 'trapped', 'food', 'other'];
const SEVERITY_LEVELS: Severity[] = ['low', 'medium', 'critical'];

export default function ReportScreen() {
  const router = useRouter();
  const { reportIncident } = useIncidents();
  const { userLocation, loading: locationLoading } = useLocation();
  const [emergencyType, setEmergencyType] = useState<EmergencyType>('flood');
  const [severity, setSeverity] = useState<Severity>('medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('Please describe the emergency');
      return;
    }

    if (!userLocation) {
      alert('Unable to get your location. Please try again.');
      return;
    }

    try {
      setLoading(true);
      await reportIncident({
        type: emergencyType,
        severity,
        description,
        location: userLocation,
      });

      alert('Emergency reported! Help is on the way.');
      router.back();
    } catch (error) {
      alert('Failed to report emergency. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-critical mb-2">Report Emergency</Text>
          <Text className="text-muted">Provide details to help responders</Text>
        </View>

        {/* Emergency Type */}
        <View className="mb-6">
          <Text className="text-foreground font-semibold mb-3">Type of Emergency</Text>
          <FlatList
            data={EMERGENCY_TYPES}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setEmergencyType(item)}
                className={`p-4 rounded-lg mb-2 border-2 ${
                  emergencyType === item
                    ? 'bg-primary border-primary'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <Text
                  className={`font-semibold capitalize ${
                    emergencyType === item ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>

        {/* Severity */}
        <View className="mb-6">
          <Text className="text-foreground font-semibold mb-3">Severity Level</Text>
          <View className="flex-row gap-2">
            {SEVERITY_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setSeverity(level)}
                className={`flex-1 p-3 rounded-lg border-2 ${
                  severity === level
                    ? 'bg-primary border-primary'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <Text
                  className={`font-bold text-center capitalize ${
                    severity === level ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-foreground font-semibold mb-3">Description</Text>
          <TextInput
            className="bg-slate-800 text-foreground px-4 py-4 rounded-lg border border-slate-700 h-24 text-base"
            placeholder="What's happening? Be as specific as possible..."
            placeholderTextColor="#94a3b8"
            multiline
            value={description}
            onChangeText={setDescription}
            editable={!loading}
          />
          <Text className="text-muted text-xs mt-2">
            {description.length} characters
          </Text>
        </View>

        {/* Location Info */}
        <Card className="mb-6">
          <Text className="text-foreground font-semibold mb-2">Your Location</Text>
          {locationLoading ? (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color="#ef4444" />
              <Text className="text-muted ml-2">Getting location...</Text>
            </View>
          ) : userLocation ? (
            <Text className="text-muted text-sm">
              Lat: {userLocation.latitude.toFixed(4)}, Lon: {userLocation.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text className="text-error text-sm">Location unavailable</Text>
          )}
        </Card>

        {/* Submit Button */}
        <Button
          title={loading ? 'Submitting...' : 'Report Emergency'}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !userLocation}
          variant="danger"
          size="large"
        />

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
