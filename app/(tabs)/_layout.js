import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FFAD5F',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { height: 70, paddingBottom: 10 },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Message',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-text" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rehome"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}