import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useIncidents } from '@/context/IncidentContext';
import { Alert } from '@/types';
import { Card } from '@/components/Card';

export default function AlertsScreen() {
  const { alerts, markAlertAsRead, getAlerts } = useIncidents();
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unread = alerts.filter((a) => !a.read).length;
    setUnreadCount(unread);
  }, [alerts]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getAlerts();
    setRefreshing(false);
  };

  const handleAlertPress = async (alert: Alert) => {
    if (!alert.read) {
      await markAlertAsRead(alert.id);
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-critical bg-critical/10';
      case 'high':
        return 'border-warning bg-warning/10';
      default:
        return 'border-success bg-success/10';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-foreground">Alerts</Text>
            {unreadCount > 0 && (
              <View className="bg-critical rounded-full px-3 py-1">
                <Text className="text-foreground font-bold text-sm">{unreadCount}</Text>
              </View>
            )}
          </View>
          <Text className="text-muted text-sm mt-1">Emergency updates & safety tips</Text>
        </View>

        {/* Alerts List */}
        {alerts.length > 0 ? (
          <FlatList
            data={alerts}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleAlertPress(item)}
                activeOpacity={0.7}
                className={`border-2 rounded-lg p-4 mb-3 ${getSeverityColor(item.severity)}`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-foreground font-bold text-base flex-1">
                        {item.title}
                      </Text>
                      {!item.read && (
                        <View className="w-2 h-2 rounded-full bg-critical" />
                      )}
                    </View>
                    <Text className="text-muted text-sm mt-2">{item.message}</Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-muted text-xs">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Text>
                  <Text
                    className={`text-xs font-semibold capitalize ${
                      item.severity === 'critical' ? 'text-critical' : 'text-warning'
                    }`}
                  >
                    {item.type.replace('-', ' ')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-muted text-lg">No alerts at the moment</Text>
            <Text className="text-muted text-sm mt-2">Stay safe!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
