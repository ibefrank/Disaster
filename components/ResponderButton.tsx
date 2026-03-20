import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ResponderAccess } from './ResponderAccess';

export function ResponderButton() {
  const [showResponderModal, setShowResponderModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowResponderModal(true)}
        className="absolute bottom-20 right-4 bg-accent rounded-full p-4 shadow-lg"
      >
        <Text className="text-foreground font-bold text-base">Responder</Text>
      </TouchableOpacity>

      <ResponderAccess
        visible={showResponderModal}
        onClose={() => setShowResponderModal(false)}
      />
    </>
  );
}
