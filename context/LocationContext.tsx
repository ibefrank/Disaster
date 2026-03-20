import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Location as LocationType, Shelter } from '@/types';

interface LocationContextType {
  userLocation: LocationType | null;
  loading: boolean;
  error: string | null;
  shelters: Shelter[];
  requestLocationPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<void>;
  getShelters: () => Shelter[];
  getNearbyHelp: (limit?: number) => Shelter[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const MOCK_SHELTERS: Shelter[] = [
  {
    id: 's1',
    name: 'Community Center Alpha',
    type: 'shelter',
    location: { latitude: 37.7749, longitude: -122.4194, accuracy: 10, timestamp: Date.now() },
    capacity: 500,
    occupancy: 245,
  },
  {
    id: 's2',
    name: 'St. Mary Hospital',
    type: 'hospital',
    location: { latitude: 37.7849, longitude: -122.4094, accuracy: 10, timestamp: Date.now() },
    capacity: 300,
    occupancy: 150,
    phone: '+1-555-0101',
  },
  {
    id: 's3',
    name: 'Central Relief Center',
    type: 'relief',
    location: { latitude: 37.7649, longitude: -122.4294, accuracy: 10, timestamp: Date.now() },
    capacity: 1000,
    occupancy: 600,
    phone: '+1-555-0102',
  },
];

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shelters] = useState<Shelter[]>(MOCK_SHELTERS);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        await getCurrentLocation();
        return true;
      }
      setError('Location permission denied');
      return false;
    } catch (err) {
      console.error('Permission error:', err);
      setError('Failed to request location permission');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || undefined,
        timestamp: location.timestamp,
      });
      setError(null);
    } catch (err) {
      console.error('Location error:', err);
      setError('Failed to get location');
      // Set default location for testing
      setUserLocation({
        latitude: 37.7749,
        longitude: -122.4194,
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  };

  const getShelters = (): Shelter[] => {
    return shelters;
  };

  const getNearbyHelp = (limit = 5): Shelter[] => {
    if (!userLocation) return shelters.slice(0, limit);

    const nearby = shelters.map((shelter) => {
      const dx = shelter.location.latitude - userLocation.latitude;
      const dy = shelter.location.longitude - userLocation.longitude;
      const distance = Math.sqrt(dx * dx + dy * dy) * 111; // Rough km conversion
      return { ...shelter, distance };
    });

    return nearby
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, limit);
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        loading,
        error,
        shelters,
        requestLocationPermission,
        getCurrentLocation,
        getShelters,
        getNearbyHelp,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
}
