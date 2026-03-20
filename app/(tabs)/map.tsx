import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useLocation } from '@/context/LocationContext';
import { useIncidents } from '@/context/IncidentContext';
import { EmergencyReport, Shelter } from '@/types';
import { Card } from '@/components/Card';
import { SeverityBadge } from '@/components/SeverityBadge';

export default function MapScreen() {
  const { userLocation, getShelters, getNearbyHelp, loading } = useLocation();
  const { incidents } = useIncidents();
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<EmergencyReport | null>(null);
  const [mapMode, setMapMode] = useState<'incidents' | 'shelters'>('incidents');

  useEffect(() => {
    setShelters(getShelters());
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#ef4444" />
        <Text className="text-muted mt-4">Loading map...</Text>
      </SafeAreaView>
    );
  }

  const displayItems = mapMode === 'incidents' ? incidents : shelters;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-foreground">Emergency Map</Text>
          <Text className="text-muted text-sm">Live incidents and resources</Text>
        </View>

        {/* Mode Toggle */}
        <View className="flex-row gap-2 mb-4">
          <TouchableOpacity
            onPress={() => setMapMode('incidents')}
            className={`flex-1 py-3 rounded-lg border-2 ${
              mapMode === 'incidents'
                ? 'bg-primary border-primary'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            <Text
              className={`font-semibold text-center ${
                mapMode === 'incidents' ? 'text-foreground' : 'text-muted'
              }`}
            >
              Incidents ({incidents.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapMode('shelters')}
            className={`flex-1 py-3 rounded-lg border-2 ${
              mapMode === 'shelters'
                ? 'bg-primary border-primary'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            <Text
              className={`font-semibold text-center ${
                mapMode === 'shelters' ? 'text-foreground' : 'text-muted'
              }`}
            >
              Shelters ({shelters.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* User Location */}
        {userLocation && (
          <Card className="mb-4">
            <Text className="text-foreground font-semibold">Your Location</Text>
            <Text className="text-muted text-sm mt-2">
              Lat: {userLocation.latitude.toFixed(4)}
            </Text>
            <Text className="text-muted text-sm">
              Lon: {userLocation.longitude.toFixed(4)}
            </Text>
          </Card>
        )}

        {/* List */}
        <View className="flex-1">
          {mapMode === 'incidents' ? (
            incidents.length > 0 ? (
              <FlatList
                data={incidents}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedIncident(item)}
                    activeOpacity={0.7}
                  >
                    <Card className="mb-3">
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1">
                          <Text className="text-foreground font-semibold capitalize">
                            {item.type}
                          </Text>
                          <Text className="text-muted text-sm mt-1 line-clamp-2">
                            {item.description}
                          </Text>
                        </View>
                        <SeverityBadge severity={item.severity} size="small" />
                      </View>
                      <Text className="text-muted text-xs mt-2">
                        Status: {item.status}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-muted">No active incidents</Text>
              </View>
            )
          ) : shelters.length > 0 ? (
            <FlatList
              data={shelters}
              renderItem={({ item }) => (
                <Card className="mb-3">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <Text className="text-foreground font-semibold">{item.name}</Text>
                      <Text className="text-muted text-sm mt-1 capitalize">
                        {item.type}
                      </Text>
                    </View>
                  </View>
                  {item.capacity && item.occupancy && (
                    <Text className="text-muted text-sm">
                      Occupancy: {item.occupancy}/{item.capacity}
                    </Text>
                  )}
                  <Text className="text-muted text-sm mt-1">
                    Lat: {item.location.latitude.toFixed(4)}
                  </Text>
                  <Text className="text-muted text-sm">
                    Lon: {item.location.longitude.toFixed(4)}
                  </Text>
                </Card>
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-muted">No shelters available</Text>
            </View>
          )}
        </View>
      </View>

      {/* Incident Detail Modal */}
      <Modal
        visible={selectedIncident !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedIncident(null)}
      >
        {selectedIncident && (
          <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1 p-4">
              <TouchableOpacity
                onPress={() => setSelectedIncident(null)}
                className="mb-4"
              >
                <Text className="text-primary font-semibold text-lg">Close</Text>
              </TouchableOpacity>

              <Card className="mb-4">
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <Text className="text-2xl font-bold text-foreground capitalize">
                      {selectedIncident.type}
                    </Text>
                  </View>
                  <SeverityBadge severity={selectedIncident.severity} />
                </View>

                <Text className="text-muted font-semibold mb-2">Description</Text>
                <Text className="text-foreground text-base mb-4">
                  {selectedIncident.description}
                </Text>

                <Text className="text-muted font-semibold mb-2">Status</Text>
                <Text className="text-foreground text-base capitalize mb-4">
                  {selectedIncident.status}
                </Text>

                <Text className="text-muted font-semibold mb-2">Location</Text>
                <Text className="text-foreground text-sm">
                  Lat: {selectedIncident.location.latitude.toFixed(4)}
                </Text>
                <Text className="text-foreground text-sm">
                  Lon: {selectedIncident.location.longitude.toFixed(4)}
                </Text>

                <Text className="text-muted text-xs mt-4">
                  Reported: {new Date(selectedIncident.createdAt).toLocaleString()}
                </Text>
              </Card>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}
