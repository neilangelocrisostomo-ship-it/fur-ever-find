import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();

  // --- BACKEND-READY STATE ---
  // Placeholder data habang wala pang real database connection
  const [userProfile, setUserProfile] = useState({
    name: 'Juan Dela Cruz',
    email: 'Juan@gmail.com',
    contact: '09956846231',
    location: 'Cavite',
    preferences: {
      activityLevel: 'Very Active',
      livingSituation: 'Apartment'
    }
  });

  // Edit States
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null); // 'email', 'contact', 'location', etc.
  const [tempValue, setTempValue] = useState('');

  // --- HANDLERS ---
  const handleEditPress = (field, currentVal) => {
    setEditingField(field);
    setTempValue(currentVal);
    setEditModalVisible(true);
  };

  const handleSave = () => {
    // BACKEND-READY: Dito mo tatawagin ang update API (e.g., axios.put)
    if (editingField.includes('.')) {
      // Para sa nested preferences
      const [parent, child] = editingField.split('.');
      setUserProfile(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: tempValue }
      }));
    } else {
      setUserProfile(prev => ({ ...prev, [editingField]: tempValue }));
    }
    setEditModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => router.replace('/signin') }
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/fureverfindlogo.png')} style={styles.flexibleLogo} resizeMode="contain" />
        <View style={styles.headerText}>
          <Text style={styles.brandTitle}>Fur-Ever Find</Text>
          <Text style={styles.brandSubtitle}>Find Your Best Friend</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.rehomeBadge} onPress={() => router.replace('/owner-tabs/listing')}>
        <Text style={styles.rehomeText}>Start rehoming ❤️</Text>
      </TouchableOpacity>

      {/* PROFILE PIC SECTION */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.avatarCircle} onPress={() => handleEditPress('name', userProfile.name)}>
          <Ionicons name="person" size={60} color="#FFAD5F" />
          <View style={styles.miniPencilBadge}><Ionicons name="pencil" size={12} color="white" /></View>
        </TouchableOpacity>
        <Text style={styles.userName}>{userProfile.name}</Text>
      </View>

      {/* ADOPTION PREFERENCES (Editable) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Adoption Preferences</Text>
        
        <TouchableOpacity 
          style={styles.prefItem} 
          onPress={() => handleEditPress('preferences.activityLevel', userProfile.preferences.activityLevel)}
        >
          <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#999" />
          <Text style={styles.prefText}>Activity level: {userProfile.preferences.activityLevel}</Text>
          <Ionicons name="chevron-forward" size={16} color="#BBB" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.prefItem}
          onPress={() => handleEditPress('preferences.livingSituation', userProfile.preferences.livingSituation)}
        >
          <Ionicons name="home-outline" size={20} color="#999" />
          <Text style={styles.prefText}>Living Situation: {userProfile.preferences.livingSituation}</Text>
          <Ionicons name="chevron-forward" size={16} color="#BBB" style={{marginLeft: 'auto'}} />
        </TouchableOpacity>
      </View>

      {/* PERSONAL INFORMATION (Editable) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Email: {userProfile.email}</Text>
          <TouchableOpacity onPress={() => handleEditPress('email', userProfile.email)}>
            <Ionicons name="pencil" size={18} color="#FFAD5F" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Contact No.: {userProfile.contact}</Text>
          <TouchableOpacity onPress={() => handleEditPress('contact', userProfile.contact)}>
            <Ionicons name="pencil" size={18} color="#FFAD5F" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Location: {userProfile.location}</Text>
          <TouchableOpacity onPress={() => handleEditPress('location', userProfile.location)}>
            <Ionicons name="pencil" size={18} color="#FFAD5F" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />

      {/* --- EDIT MODAL --- */}
      <Modal visible={isEditModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Information</Text>
            <TextInput 
              style={styles.modalInput} 
              value={tempValue} 
              onChangeText={setTempValue}
              placeholder="Enter new value..."
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.05, paddingTop: 50, marginBottom: 10 },
  flexibleLogo: { width: width * 0.22, height: width * 0.22, marginRight: 15 },
  headerText: { flex: 1 },
  brandTitle: { fontSize: width * 0.06, fontWeight: 'bold' },
  brandSubtitle: { fontSize: width * 0.03, color: '#888' },
  rehomeBadge: { backgroundColor: '#FFD1A1', alignSelf: 'flex-start', marginLeft: 20, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, marginBottom: 10 },
  rehomeText: { fontSize: 12, fontWeight: 'bold' },
  profileSection: { alignItems: 'center', marginVertical: 10 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFE5B4', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFAD5F' },
  miniPencilBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFAD5F', borderRadius: 10, padding: 4 },
  userName: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  sectionCard: { backgroundColor: '#F3F3ED', marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 20, elevation: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  prefItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFD1A1', borderRadius: 12, padding: 12, marginBottom: 10 },
  prefText: { marginLeft: 10, color: '#666', fontSize: 14 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#DDD', paddingVertical: 12 },
  infoText: { color: '#666', fontSize: 14, flex: 0.9 },
  logoutBtn: { backgroundColor: '#FFAD5F', marginHorizontal: 20, padding: 15, borderRadius: 15, alignItems: 'center', elevation: 3 },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 25, elevation: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: { padding: 12, flex: 0.45, alignItems: 'center' },
  cancelBtnText: { color: '#999', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#FFAD5F', padding: 12, borderRadius: 10, flex: 0.45, alignItems: 'center' },
  saveBtnText: { color: 'white', fontWeight: 'bold' }
});