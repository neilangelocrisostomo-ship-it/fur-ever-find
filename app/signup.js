import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function SignUpScreen() {
  const router = useRouter();
  
  // Backend-Ready States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // 1. Validation Logic
    const emailRegex = /\S+@\S+\.\S+/;
    
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address with an '@'.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // 2. Simulated Backend Call
    setIsLoading(true);
    try {
      console.log("Creating account for:", email);
      
      // Simulate network delay for database registration
      setTimeout(() => {
        setIsLoading(false);
        
        // SUCCESS ALERT: On click "OK", go back to Sign In screen
        Alert.alert(
          "Success", 
          "Account created successfully! Please sign in.", 
          [{ text: "OK", onPress: () => router.replace('/signin') }]
        );
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Fur-Ever Find today!</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={[styles.signUpButton, isLoading && { backgroundColor: '#FFD1A1' }]} 
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.signUpText}>SIGN UP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signin')}>
              <Text style={styles.signInLink}>Sign In.</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  content: { width: '90%', maxWidth: 400 },
  backButton: { marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFD1A1', borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 15 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  signUpButton: { backgroundColor: '#FFAD5F', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  signUpText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  footerText: { color: '#888', fontSize: 14 },
  signInLink: { color: '#000', fontWeight: 'bold', fontSize: 14 },
});