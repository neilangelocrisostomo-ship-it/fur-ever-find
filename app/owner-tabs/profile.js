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

export default function ProfilePage() {
  const router = useRouter();

  // --- BACKEND-READY STATE ---
  const [userProfile, setUserProfile] = useState({
    name: 'Juan Dela Cruz',
    email: 'Juan@gmail.com',
    contact: '09956846231',
    location: 'Cavite',
    activityLevel: 'Very Active',
    livingSituation: 'Apartment'
  });

  // Edit States para sa Modal
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null); 
  const [tempValue, setTempValue] = useState('');

  // --- HANDLERS ---
  const handleEditPress = (field, currentVal) => {
    setEditingField(field);
    setTempValue(currentVal);
    setEditModalVisible(true);
  };

  const handleSave = () => {
    // BACKEND-READY: Dito ilalagay ang logic para i-update ang database (e.g., fetch API)
    setUserProfile(prev => ({ ...prev, [editingField]: tempValue }));
    setEditModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            console.log("User logged out");
            router.replace('/signin'); // Lilipat sa signin.js
          } 
        }
      ]
    );
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.mailboxStyle}>
        <Image 
          source={require('../../assets/images/fureverfindlogo.png')} 
          style={styles.miniLogo} 
          resizeMode="contain" 
        />
        <View style={styles.verticalLine} />
        <View>
          <Text style={styles.brandName}>Fur-Ever Find</Text>
          <Text style={styles.brandTagline}>Find Your Best Friend</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        
        {/* START ADOPTING BUTTON */}
        <TouchableOpacity 
          style={styles.startAdoptingBtn} 
          onPress={() => router.push('/(tabs)/rehome')} 
        >
          <View style={styles.btnRow}>
            <Text style={styles.startAdoptingText}>Start Adopting</Text>
            <Ionicons name="heart" size={16} color="red" style={{marginLeft: 5}} />
          </View>
        </TouchableOpacity>

        {/* PROFILE PICTURE SECTION */}
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            style={styles.avatarCircle}
            onPress={() => handleEditPress('name', userProfile.name)}
          >
            <Ionicons name="person" size={60} color="#D2B48C" />
            <View style={styles.miniPencilBadge}><Ionicons name="pencil" size={12} color="white" /></View>
          </TouchableOpacity>
          <Text style={styles.userName}>{userProfile.name}</Text>
        </View>

        {/* ADOPTION PREFERENCES SECTION (Editable) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Adoption Preferences</Text>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleEditPress('activityLevel', userProfile.activityLevel)}
          >
            <Ionicons name="calendar-outline" size={20} color="#888" />
            <Text style={styles.infoLabel}>Activity level: {userProfile.activityLevel}</Text>
            <Ionicons name="chevron-forward" size={16} color="#BBB" style={{marginLeft: 'auto'}} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleEditPress('livingSituation', userProfile.livingSituation)}
          >
            <Ionicons name="home-outline" size={20} color="#888" />
            <Text style={styles.infoLabel}>Living Situation: {userProfile.livingSituation}</Text>
            <Ionicons name="chevron-forward" size={16} color="#BBB" style={{marginLeft: 'auto'}} />
          </TouchableOpacity>
        </View>

        {/* PERSONAL INFORMATION SECTION (Editable) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Email: {userProfile.email}</Text>
            <TouchableOpacity onPress={() => handleEditPress('email', userProfile.email)}>
              <MaterialCommunityIcons name="pencil-outline" size={20} color="#FFAD5F" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Contact No.: {userProfile.contact}</Text>
            <TouchableOpacity onPress={() => handleEditPress('contact', userProfile.contact)}>
              <MaterialCommunityIcons name="pencil-outline" size={20} color="#FFAD5F" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Location: {userProfile.location}</Text>
            <TouchableOpacity onPress={() => handleEditPress('location', userProfile.location)}>
              <MaterialCommunityIcons name="pencil-outline" size={20} color="#FFAD5F" />
            </TouchableOpacity>
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* --- EDIT MODAL --- */}
      <Modal visible={isEditModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update {editingField}</Text>
            <TextInput 
              style={styles.modalInput} 
              value={tempValue} 
              onChangeText={setTempValue}
              placeholder="Type here..."
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  headerContainer: { backgroundColor: '#FFF', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10 },
  mailboxStyle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF7F2', padding: 12, borderRadius: 15, borderWidth: 1, borderColor: '#FEEAD6' },
  miniLogo: { width: 50, height: 50 },
  verticalLine: { width: 1.5, height: 40, backgroundColor: '#FFD1A9', marginHorizontal: 15 },
  brandName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  brandTagline: { fontSize: 11, color: '#888' },
  scrollPadding: { padding: 20 },
  startAdoptingBtn: { backgroundColor: '#FFAD5F', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: '#000', marginBottom: 20 },
  btnRow: { flexDirection: 'row', alignItems: 'center' },
  startAdoptingText: { fontWeight: 'bold', color: '#000', fontSize: 12, textDecorationLine: 'underline' },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFD1A9', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  miniPencilBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFAD5F', borderRadius: 10, padding: 4 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  sectionCard: { backgroundColor: '#E9E9E2', borderRadius: 15, padding: 20, marginBottom: 20, elevation: 2 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  infoRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAF9F6', borderWidth: 1, borderColor: '#FFAD5F', borderRadius: 10, padding: 12, marginBottom: 10 },
  infoLabel: { marginLeft: 10, fontSize: 16, color: '#555' },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 10 },
  detailText: { fontSize: 16, color: '#444', flex: 0.9 },
  logoutBtn: { backgroundColor: '#FFAD5F', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  logoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 25, elevation: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', textTransform: 'capitalize' },
  modalInput: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: { padding: 12, flex: 0.45, alignItems: 'center' },
  cancelBtnText: { color: '#999', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#FFAD5F', padding: 12, borderRadius: 10, flex: 0.45, alignItems: 'center' },
  saveBtnText: { color: 'white', fontWeight: 'bold' }
});