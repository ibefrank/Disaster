import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message }: LoadingOverlayProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-slate-800 rounded-lg p-8 items-center">
          <ActivityIndicator size="large" color="#ef4444" />
        </View>
      </View>
    </Modal>
  );
}
