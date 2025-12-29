import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

export default function SetUpProfile1() {
  const router = useRouter();

  // 1. Backend-Ready States
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. Numeric Only Handler for Phone Number
  const handlePhoneChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Removes any non-number character
    setPhone(numericValue);
  };

  const handleNext = async () => {
    // Validation
    const emailRegex = /\S+@\S+\.\S+/;

    if (!fullName || !dob || !email || !phone) {
      Alert.alert("Missing Info", "Please fill in all fields to continue.");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address with an '@'.");
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);

    try {
      // --- DATABASE INTEGRATION POINT ---
      console.log("Saving user profile to backend...", { fullName, dob, email, phone });

      // Simulating a database save delay
      setTimeout(() => {
        setIsLoading(false);
        router.push('/step2'); // Moves to Step 2
      }, 1500);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Could not save data. Check your connection.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentCard}>
          
          {/* Logo Section */}
          <View style={styles.header}>
            <Image
              source={require('../assets/images/fureverfindlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandTitle}>Fur-Ever Find</Text>
            <Text style={styles.brandSubtitle}>Find Your Best Friend</Text>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Tell Us About Yourself</Text>
            <Text style={styles.subTitle}>Just a few quick questions!</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                editable={!isLoading}
              />
              <Ionicons name="person-outline" size={20} color="#999" />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Date Of birth (MM/DD/YYYY)"
                style={styles.input}
                value={dob}
                onChangeText={setDob}
                editable={!isLoading}
              />
              <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#999" />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Email Address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Ionicons name="mail-outline" size={20} color="#999" />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Phone Number"
                style={styles.input}
                value={phone}
                onChangeText={handlePhoneChange} // Strictly numbers only
                keyboardType="number-pad" // Opens number pad
                maxLength={11}
                editable={!isLoading}
              />
              <Ionicons name="call-outline" size={20} color="#999" />
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

          {/* Progress Pagination */}
          <View style={styles.progressContainer}>
            <Text style={styles.stepText}>1 of 3 </Text>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
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
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#888',
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