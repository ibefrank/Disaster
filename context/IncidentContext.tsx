import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyReport, Alert, ChatMessage } from '@/types';
import { useAuth } from './AuthContext';

interface IncidentContextType {
  incidents: EmergencyReport[];
  alerts: Alert[];
  messages: ChatMessage[];
  reportIncident: (data: Omit<EmergencyReport, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  getIncidents: () => Promise<void>;
  updateIncidentStatus: (incidentId: string, status: EmergencyReport['status']) => Promise<void>;
  getAlerts: () => Promise<void>;
  markAlertAsRead: (alertId: string) => Promise<void>;
  sendMessage: (receiverId: string, message: string) => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

// Mock data for shelters and alerts
const MOCK_SHELTERS = [
  {
    id: 's1',
    name: 'Community Center Alpha',
    type: 'shelter' as const,
    location: { latitude: 37.7749, longitude: -122.4194, timestamp: Date.now() },
  },
  {
    id: 's2',
    name: 'St. Mary Hospital',
    type: 'hospital' as const,
    location: { latitude: 37.7849, longitude: -122.4094, timestamp: Date.now() },
  },
];

const MOCK_ALERTS = [
  {
    id: 'a1',
    title: 'Flood Warning',
    message: 'Heavy rainfall expected in next 2 hours',
    severity: 'high' as const,
    type: 'evacuation' as const,
    timestamp: Date.now() - 3600000,
    read: false,
  },
  {
    id: 'a2',
    title: 'Safety Tip',
    message: 'During floods, move to higher ground immediately',
    severity: 'high' as const,
    type: 'safety-tip' as const,
    timestamp: Date.now() - 7200000,
    read: false,
  },
];

export function IncidentProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState<EmergencyReport[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (user) {
      getIncidents();
      getAlerts();
    }
  }, [user]);

  const reportIncident = async (data: Omit<EmergencyReport, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newIncident: EmergencyReport = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        userId: user?.id || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updated = [...incidents, newIncident];
      setIncidents(updated);
      await AsyncStorage.setItem('incidents', JSON.stringify(updated));
    } catch (error) {
      console.error('Report incident error:', error);
      throw error;
    }
  };

  const getIncidents = async () => {
    try {
      const stored = await AsyncStorage.getItem('incidents');
      if (stored) {
        setIncidents(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Get incidents error:', error);
    }
  };

  const updateIncidentStatus = async (incidentId: string, status: EmergencyReport['status']) => {
    try {
      const updated = incidents.map((inc) =>
        inc.id === incidentId ? { ...inc, status, updatedAt: new Date().toISOString() } : inc
      );
      setIncidents(updated);
      await AsyncStorage.setItem('incidents', JSON.stringify(updated));
    } catch (error) {
      console.error('Update incident error:', error);
      throw error;
    }
  };

  const getAlerts = async () => {
    try {
      const stored = await AsyncStorage.getItem('alerts');
      if (stored) {
        setAlerts(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Get alerts error:', error);
    }
  };

  const markAlertAsRead = async (alertId: string) => {
    try {
      const updated = alerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      );
      setAlerts(updated);
      await AsyncStorage.setItem('alerts', JSON.stringify(updated));
    } catch (error) {
      console.error('Mark alert read error:', error);
      throw error;
    }
  };

  const sendMessage = async (receiverId: string, message: string) => {
    try {
      const newMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: user?.id || '',
        receiverId,
        message,
        timestamp: Date.now(),
        read: false,
      };

      const updated = [...messages, newMessage];
      setMessages(updated);
      await AsyncStorage.setItem('messages', JSON.stringify(updated));
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  };

  const getMessages = async (userId: string) => {
    try {
      const stored = await AsyncStorage.getItem('messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Get messages error:', error);
    }
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        alerts,
        messages,
        reportIncident,
        getIncidents,
        updateIncidentStatus,
        getAlerts,
        markAlertAsRead,
        sendMessage,
        getMessages,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidents() {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error('useIncidents must be used within IncidentProvider');
  }
  return context;
}
