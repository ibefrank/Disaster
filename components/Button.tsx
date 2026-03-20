import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    danger: 'bg-error',
    success: 'bg-success',
  };

  const sizeClasses = {
    small: 'px-3 py-2 rounded-md',
    medium: 'px-4 py-3 rounded-lg',
    large: 'px-6 py-4 rounded-lg',
  };

  const fontSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${
        (loading || disabled) ? 'opacity-50' : ''
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#f1f5f9" size={size === 'small' ? 'small' : 'large'} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`text-foreground font-bold text-center ${fontSizes[size]}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
