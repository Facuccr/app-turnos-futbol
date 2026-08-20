// importacion de navegacion por pestanas e iconos
import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// estructura de navegacion inferior con pestanas principales
export default function TabLayout() {
  // obtencion del tema para colorear las pestanas activas
  const colorScheme = useColorScheme();

  // definicion de las pantallas de catalogo e historial
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Canchas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={size ?? 24} name="sports-soccer" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Mis Turnos',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={size ?? 24} name="event-note" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
