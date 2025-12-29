import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  
  // 1. Backend-Ready States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. Validation & Future Backend Function
  const handleSignIn = async () => {
    // Basic email validation check (must contain @ and a dot)
    const emailRegex = /\S+@\S+\.\S+/;
    
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address (e.g., name@example.com)");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password Error", "Password must be at least 6 characters.");
      return;
    }

    // Start loading spinner
    setIsLoading(true);

    try {
      // --- FUTURE BACKEND CODE HERE ---
      // Example: const user = await signInWithEmail(email, password);
      console.log("Connecting to database with:", email);

      // Simulating a 2-second database check
      setTimeout(() => {
        setIsLoading(false);
        router.push('/step1'); // Move to setup profile
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>

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
            editable={!isLoading} // Lock input during loading
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

        <TouchableOpacity onPress={() => Alert.alert("Forgot Password", "Email reset link sent.")}>
          <Text style={styles.forgotText}>Forgot password ?</Text>
        </TouchableOpacity>

        {/* Sign In Button with Loading Spinner */}
        <TouchableOpacity 
          style={[styles.signInButton, isLoading && { backgroundColor: '#FFD1A1' }]} 
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.signInText}>SIGN IN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.socialLabel}>Sign In With</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}><FontAwesome6 name="google" size={24} color="#DB4437" /></TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}><FontAwesome6 name="facebook" size={24} color="#4267B2" /></TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}><FontAwesome6 name="x-twitter" size={24} color="#000" /></TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpLink}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6', justifyContent: 'center', alignItems: 'center' },
  content: { width: '90%', maxWidth: 400 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 40 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFD1A1', borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 15 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  forgotText: { textAlign: 'right', color: '#333', fontSize: 12, marginBottom: 30, fontWeight: '500' },
  signInButton: { backgroundColor: '#FFAD5F', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  signInText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { marginHorizontal: 10, color: '#000', fontWeight: 'bold' },
  socialLabel: { textAlign: 'center', color: '#666', marginBottom: 20 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginBottom: 40 },
  socialBtn: { padding: 5 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { color: '#888', fontSize: 14 },
  signUpLink: { color: '#000', fontWeight: 'bold', fontSize: 14 },
});