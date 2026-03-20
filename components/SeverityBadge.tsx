import React from 'react';
import { View, Text } from 'react-native';
import { Severity } from '@/types';

interface SeverityBadgeProps {
  severity: Severity;
  size?: 'small' | 'medium' | 'large';
}

export function SeverityBadge({ severity, size = 'medium' }: SeverityBadgeProps) {
  const colorMap = {
    critical: { bg: 'bg-critical', text: 'text-critical', label: 'Critical' },
    medium: { bg: 'bg-warning', text: 'text-warning', label: 'High' },
    low: { bg: 'bg-success', text: 'text-success', label: 'Normal' },
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const config = colorMap[severity];

  return (
    <View className={`${config.bg} ${sizeClasses[size]} rounded-full`}>
      <Text className={`font-bold text-foreground text-center`}>
        {config.label}
      </Text>
    </View>
  );
}
