import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Starting point: Splash Screen */}
      <Stack.Screen name="index" /> 
      
      {/* Authentication Screens */}
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      
      {/* Profile Setup Flow */}
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
    </Stack>
  );
}