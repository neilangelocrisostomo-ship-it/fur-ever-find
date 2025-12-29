import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function SetUpProfile2() {
  const router = useRouter();

  // 1. Backend-Ready States
  const [address, setAddress] = useState('');
  const [livingSituation, setLivingSituation] = useState(''); // e.g., Rent/Own
  const [homeType, setHomeType] = useState(''); // e.g., Apartment/House
  const [peopleInHome, setPeopleInHome] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // Basic Validation
    if (!address || !livingSituation || !homeType || !peopleInHome) {
      Alert.alert("Missing Info", "Please fill in all home details to continue.");
      return;
    }

    setIsLoading(true);

    try {
      // --- FUTURE DATABASE INTEGRATION ---
      console.log("Saving Step 2 data to backend:", { 
        address, 
        livingSituation, 
        homeType, 
        peopleInHome 
      });

      // Simulating database save time
      setTimeout(() => {
        setIsLoading(false);
        router.push('/step3'); // Navigate to the final step
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Could not save your home profile.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentCard}>
          
          {/* Large Logo Header */}
          <View style={styles.header}>
            <Image
              source={require('../assets/images/fureverfindlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Tell Us About Your Home</Text>
            <Text style={styles.subTitle}>Just a few quick questions!</Text>
          </View>

          {/* Home Input Fields */}
          <View style={styles.inputContainer}>
            
            {/* Current Address */}
            <View style={styles.inputWrapper}>
              <Ionicons name="home-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Current Address"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                editable={!isLoading}
              />
            </View>

            {/* Living Situation */}
            <View style={styles.inputWrapper}>
              <Ionicons name="key-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Living Situation (e.g., Own/Rent)"
                style={styles.input}
                value={livingSituation}
                onChangeText={setLivingSituation}
                editable={!isLoading}
              />
            </View>

            {/* Home Type */}
            <View style={styles.inputWrapper}>
              <FontAwesome5 name="building" size={18} color="#999" style={styles.icon} />
              <TextInput
                placeholder="(e.g., Apartment, House)"
                style={styles.input}
                value={homeType}
                onChangeText={setHomeType}
                editable={!isLoading}
              />
            </View>

            {/* Number of People */}
            <View style={styles.inputWrapper}>
              <Ionicons name="people-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Number of People in home"
                style={styles.input}
                value={peopleInHome}
                onChangeText={(text) => setPeopleInHome(text.replace(/[^0-9]/g, ''))} // Numeric only
                keyboardType="number-pad"
                editable={!isLoading}
              />
            </View>

          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={[styles.nextButton, isLoading && { backgroundColor: '#FFD1A1' }]} 
            onPress={handleNext}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.nextButtonText}>NEXT</Text>
            )}
          </TouchableOpacity>

          {/* Progress Pagination: 2 of 3 */}
          <View style={styles.progressContainer}>
            <Text style={styles.stepText}>2 of 3 </Text>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    paddingVertical: 40,
  },
  contentCard: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFD1A1', 
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
    width: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#FFAD5F', 
    width: '100%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#888',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFAD5F',
    borderColor: '#FFAD5F',
  },
});