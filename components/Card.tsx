import React from 'react';
import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View className={`bg-slate-800 rounded-lg p-4 border border-slate-700 ${className || ''}`}>
      {children}
    </View>
  );
}
