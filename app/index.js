import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signin');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/fureverfindlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center' },
  logo: { width: 350, height: 350 },
});