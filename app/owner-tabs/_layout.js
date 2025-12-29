import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#FFAD5F',
      headerShown: false,
      tabBarStyle: { height: 70, paddingBottom: 12 }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="listing"
        options={{
          title: 'MyListing',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="adopted"
        options={{
          title: 'Adopted',
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Message',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}