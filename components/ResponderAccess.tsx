import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useIncidents } from '@/context/IncidentContext';
import { useAuth } from '@/context/AuthContext';
import { EmergencyReport } from '@/types';
import { Card } from '@/components/Card';
import { SeverityBadge } from '@/components/SeverityBadge';
import { Button } from '@/components/Button';

interface ResponderAccessProps {
  visible: boolean;
  onClose: () => void;
}

export function ResponderAccess({ visible, onClose }: ResponderAccessProps) {
  const { incidents, updateIncidentStatus } = useIncidents();
  const { user } = useAuth();
  const [selectedIncident, setSelectedIncident] = useState<EmergencyReport | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'medium' | 'low'>('all');

  const filteredIncidents =
    filterSeverity === 'all'
      ? incidents
      : incidents.filter((i) => i.severity === filterSeverity);

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const severityOrder = { critical: 0, medium: 1, low: 2 };
    const aDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (aDiff !== 0) return aDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleStatusUpdate = async (incidentId: string, newStatus: EmergencyReport['status']) => {
    await updateIncidentStatus(incidentId, newStatus);
    if (newStatus === 'resolved') {
      setSelectedIncident(null);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-background">
        {!selectedIncident ? (
          <View className="flex-1">
            {/* Header */}
            <View className="p-4 flex-row justify-between items-center border-b border-slate-700">
              <View>
                <Text className="text-2xl font-bold text-foreground">
                  Responder Dashboard
                </Text>
                <Text className="text-muted text-sm">
                  Emergency incidents overview
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                className="bg-slate-800 rounded-lg p-3"
              >
                <Text className="text-foreground font-bold">Close</Text>
              </TouchableOpacity>
            </View>

            {/* Filters */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4 py-3 border-b border-slate-700"
            >
              {(['all', 'critical', 'medium', 'low'] as const).map((severity) => (
                <TouchableOpacity
                  key={severity}
                  onPress={() => setFilterSeverity(severity)}
                  className={`mr-2 px-4 py-2 rounded-full border-2 ${
                    filterSeverity === severity
                      ? 'bg-primary border-primary'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <Text
                    className={`font-semibold capitalize ${
                      filterSeverity === severity ? 'text-foreground' : 'text-muted'
                    }`}
                  >
                    {severity}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Stats */}
            <View className="flex-row gap-2 p-4">
              <Card className="flex-1">
                <Text className="text-primary text-2xl font-bold">
                  {incidents.length}
                </Text>
                <Text className="text-muted text-sm">Total</Text>
              </Card>
              <Card className="flex-1">
                <Text className="text-critical text-2xl font-bold">
                  {incidents.filter((i) => i.severity === 'critical').length}
                </Text>
                <Text className="text-muted text-sm">Critical</Text>
              </Card>
              <Card className="flex-1">
                <Text className="text-warning text-2xl font-bold">
                  {incidents.filter((i) => i.status === 'pending').length}
                </Text>
                <Text className="text-muted text-sm">Pending</Text>
              </Card>
            </View>

            {/* Incidents List */}
            <View className="flex-1 px-4">
              {sortedIncidents.length > 0 ? (
                <FlatList
                  data={sortedIncidents}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedIncident(item)}
                      activeOpacity={0.7}
                    >
                      <Card className="mb-3">
                        <View className="flex-row justify-between items-start">
                          <View className="flex-1">
                            <Text className="text-foreground font-semibold capitalize text-base">
                              {item.type}
                            </Text>
                            <Text className="text-muted text-sm mt-1 line-clamp-2">
                              {item.description}
                            </Text>
                          </View>
                          <SeverityBadge severity={item.severity} size="small" />
                        </View>
                        <View className="flex-row justify-between items-center mt-3">
                          <Text className="text-muted text-xs">
                            {new Date(item.createdAt).toLocaleTimeString()}
                          </Text>
                          <View
                            className={`px-2 py-1 rounded ${
                              item.status === 'pending'
                                ? 'bg-warning/20'
                                : item.status === 'in-progress'
                                  ? 'bg-primary/20'
                                  : 'bg-success/20'
                            }`}
                          >
                            <Text className="text-xs font-semibold text-foreground capitalize">
                              {item.status}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              ) : (
                <View className="flex-1 justify-center items-center">
                  <Text className="text-muted text-lg">No incidents</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          /* Incident Details */
          <ScrollView className="flex-1 p-4">
            <TouchableOpacity
              onPress={() => setSelectedIncident(null)}
              className="mb-4"
            >
              <Text className="text-primary font-semibold text-lg">Back</Text>
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

              <Text className="text-muted font-semibold mb-2">Current Status</Text>
              <Text className="text-foreground text-base capitalize mb-4">
                {selectedIncident.status}
              </Text>

              <Text className="text-muted font-semibold mb-2">Location</Text>
              <Text className="text-foreground text-sm mb-2">
                Lat: {selectedIncident.location.latitude.toFixed(4)}
              </Text>
              <Text className="text-foreground text-sm mb-4">
                Lon: {selectedIncident.location.longitude.toFixed(4)}
              </Text>

              <Text className="text-muted text-xs">
                Reported: {new Date(selectedIncident.createdAt).toLocaleString()}
              </Text>
            </Card>

            {/* Status Update Buttons */}
            <View className="gap-3 mb-6">
              {selectedIncident.status === 'pending' && (
                <Button
                  title="Accept & Start Response"
                  onPress={() =>
                    handleStatusUpdate(selectedIncident.id, 'in-progress')
                  }
                  variant="primary"
                  size="large"
                />
              )}
              {selectedIncident.status === 'in-progress' && (
                <Button
                  title="Mark as Resolved"
                  onPress={() =>
                    handleStatusUpdate(selectedIncident.id, 'resolved')
                  }
                  variant="success"
                  size="large"
                />
              )}
              {selectedIncident.status !== 'resolved' && (
                <Button
                  title="View Full Details"
                  onPress={() => {}}
                  variant="secondary"
                  size="large"
                />
              )}
            </View>

            <View className="h-4" />
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}
