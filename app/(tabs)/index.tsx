import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useIncidents } from '@/context/IncidentContext';
import { useLocation } from '@/context/LocationContext';
import { Card } from '@/components/Card';
import { SeverityBadge } from '@/components/SeverityBadge';
import { ResponderButton } from '@/components/ResponderButton';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { incidents } = useIncidents();
  const { userLocation } = useLocation();
  const [activeRequests, setActiveRequests] = useState(0);
  const [criticalAlerts, setCriticalAlerts] = useState(0);

  useEffect(() => {
    // Count active incidents
    const active = incidents.filter((inc) => inc.status !== 'resolved').length;
    setActiveRequests(active);
  }, [incidents]);

  const handleEmergency = () => {
    Alert.alert(
      'Report Emergency',
      'This will send your location and request for help.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Continue',
          onPress: () => router.push('/(tabs)/report'),
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
          <Text className="text-2xl font-bold text-foreground">
            Welcome, {user?.name}
          </Text>
          <Text className="text-muted text-sm mt-1">
            {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Big Emergency Button */}
        <TouchableOpacity
          onPress={handleEmergency}
          activeOpacity={0.8}
          className="bg-critical rounded-2xl py-12 mb-8 justify-center items-center shadow-lg"
        >
          <Text className="text-foreground text-5xl font-bold mb-2">SOS</Text>
          <Text className="text-foreground text-lg font-semibold">
            Report Emergency
          </Text>
          <Text className="text-foreground/80 text-sm mt-2">Tap for immediate help</Text>
        </TouchableOpacity>

        {/* Status Summary */}
        <View className="flex-row gap-3 mb-8">
          {/* Active Requests */}
          <Card className="flex-1">
            <Text className="text-primary text-2xl font-bold">{activeRequests}</Text>
            <Text className="text-muted text-sm mt-1">Active Requests</Text>
          </Card>

          {/* Critical Alerts */}
          <Card className="flex-1">
            <Text className="text-warning text-2xl font-bold">{criticalAlerts}</Text>
            <Text className="text-muted text-sm mt-1">Critical Alerts</Text>
          </Card>
        </View>

        {/* Recent Incidents */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-foreground font-bold text-lg">Recent Activity</Text>
            {incidents.length > 0 && (
              <TouchableOpacity>
                <Text className="text-primary font-semibold">View All</Text>
              </TouchableOpacity>
            )}
          </View>

          {incidents.length > 0 ? (
            <FlatList
              data={incidents.slice(0, 3)}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Card className="mb-3">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-foreground font-semibold capitalize">
                        {item.type}
                      </Text>
                      <Text className="text-muted text-sm mt-1 line-clamp-1">
                        {item.description}
                      </Text>
                    </View>
                    <SeverityBadge severity={item.severity} size="small" />
                  </View>
                  <Text className="text-muted text-xs mt-2">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </Text>
                </Card>
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Card>
              <Text className="text-muted text-center">No recent activity</Text>
            </Card>
          )}
        </View>

        {/* Quick Actions */}
        <View className="mt-6">
          <Text className="text-foreground font-bold text-lg mb-4">Quick Access</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/alerts')}
              className="flex-1 bg-slate-800 rounded-lg py-4 justify-center items-center"
            >
              <Text className="text-warning font-semibold text-sm">Alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/map')}
              className="flex-1 bg-slate-800 rounded-lg py-4 justify-center items-center"
            >
              <Text className="text-accent font-semibold text-sm">Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/profile')}
              className="flex-1 bg-slate-800 rounded-lg py-4 justify-center items-center"
            >
              <Text className="text-primary font-semibold text-sm">Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Responder Access Button */}
      <ResponderButton />
    </SafeAreaView>
  );
}
