// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';

export default function Layout() {
  // Load the icon fonts - more important for Android
  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
  });

  // Android sometimes needs a moment to process fonts even after "loaded"
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      // Small delay for Android to process fonts
      if (Platform.OS === 'android') {
        setTimeout(() => setReady(true), 200);
      } else {
        setReady(true);
      }
    }
  }, [fontsLoaded]);

  if (!ready) {
    return null; // Or a loading indicator
  }

  return (
    <Tabs
      screenOptions={{
        // Force icon refresh on Android
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#888',
        tabBarButton: HapticTab,
      }}
      
    >
     
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
        
        
      />
      <Tabs.Screen
        name="Logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Realtime"
        options={{
          title: 'Realtime Data',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

