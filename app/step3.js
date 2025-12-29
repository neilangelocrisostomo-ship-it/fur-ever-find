import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

export default function SetUpProfile3() {
  const router = useRouter();

  // 1. Backend-Ready States
  const [dailyRoutine, setDailyRoutine] = useState(''); // Active/Moderate
  const [hoursAway, setHoursAway] = useState(''); // Numeric hours
  const [previousPet, setPreviousPet] = useState(''); // Dog, Cat, etc.
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async () => {
    // Basic Validation
    if (!dailyRoutine || !hoursAway || !previousPet) {
      Alert.alert("Final Step", "Please fill in all details to complete your profile.");
      return;
    }

    setIsLoading(true);

    try {
      // --- FUTURE DATABASE INTEGRATION POINT ---
      console.log("Submitting final profile data to backend:", { 
        dailyRoutine, 
        hoursAway, 
        previousPet 
      });

      // Simulating database save time
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          "Success!", 
          "Your profile is complete. Welcome to Fur-Ever Find!",
          [{ text: "Get Started", onPress: () => router.replace('/(tabs)') }]
        );
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Could not save your profile. Please try again.");
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

          {/* Adopter Profile Inputs */}
          <View style={styles.inputContainer}>
            
            {/* Header / Label Field */}
            <View style={[styles.inputWrapper, styles.headerField]}>
              <Ionicons name="person-outline" size={20} color="#000" style={styles.icon} />
              <Text style={styles.headerFieldText}>Adopter Profile Setup</Text>
            </View>

            {/* Daily Routine */}
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="calendar-clock-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="How Active is Your Daily Routine?"
                style={styles.input}
                value={dailyRoutine}
                onChangeText={setDailyRoutine}
                editable={!isLoading}
              />
            </View>
            <Text style={styles.hintText}>(Sedentary, Moderately Active, Very Active)</Text>

            {/* Hours Away */}
            <View style={styles.inputWrapper}>
              <Ionicons name="time-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Average Hours Away From Home Daily"
                style={styles.input}
                value={hoursAway}
                onChangeText={(text) => setHoursAway(text.replace(/[^0-9]/g, ''))} // Numeric
                keyboardType="number-pad"
                editable={!isLoading}
              />
            </View>

            {/* Previous Pets */}
            <Text style={styles.questionLabel}>Have you owned a pet before?</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome5 name="dog" size={18} color="#999" style={styles.icon} />
              <TextInput
                placeholder="What kind of pet? (Dog, cat, bird etc.)"
                style={styles.input}
                value={previousPet}
                onChangeText={setPreviousPet}
                editable={!isLoading}
              />
            </View>

          </View>

          {/* Next/Finish Button */}
          <TouchableOpacity 
            style={[styles.nextButton, isLoading && { backgroundColor: '#FFD1A1' }]} 
            onPress={handleFinish}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.nextButtonText}>GET STARTED</Text>
            )}
          </TouchableOpacity>

          {/* Progress Pagination: 3 of 3 */}
          <View style={styles.progressContainer}>
            <Text style={styles.stepText}>3 of 3 </Text>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
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
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 140,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
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
    marginBottom: 20,
  },
  headerField: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  headerFieldText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
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
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
    width: 25,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  hintText: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 10,
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