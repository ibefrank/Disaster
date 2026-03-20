export type EmergencyType = 'flood' | 'injury' | 'trapped' | 'food' | 'other';
export type Severity = 'low' | 'medium' | 'critical';
export type IncidentStatus = 'pending' | 'in-progress' | 'resolved';
export type UserRole = 'citizen' | 'responder';

export interface User {
  id: string;
  name: string;
  phone: string;
  emergencyContact?: string;
  role: UserRole;
  createdAt: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

export interface EmergencyReport {
  id: string;
  userId: string;
  type: EmergencyType;
  severity: Severity;
  description: string;
  location: Location;
  imageUrl?: string;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Shelter {
  id: string;
  name: string;
  type: 'hospital' | 'relief' | 'shelter';
  location: Location;
  capacity?: number;
  occupancy?: number;
  phone?: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'high' | 'critical';
  type: 'evacuation' | 'safety-tip' | 'warning';
  timestamp: number;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface NearbyHelp {
  id: string;
  name: string;
  type: Shelter['type'];
  location: Location;
  distance: number;
  phone?: string;
}
