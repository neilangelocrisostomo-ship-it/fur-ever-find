import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MatchesScreen() {
  const router = useRouter();
  
  // --- MODAL STATE ---
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // --- MOCK BACKEND DATA (Backend-Ready Structure) ---
  const mockMatches = [
    { 
      id: '1', 
      name: 'Murphy', 
      image: 'https://via.placeholder.com/150',
      age: '6 months',
      species: 'Dog',
      gender: 'Male',
      traits: ['Playful', 'Curious'],
      medical: ['Vaccinated', '3x dewormed'],
      notes: 'Loves to play with balls and very friendly with kids.'
    },
    { 
      id: '2', 
      name: 'Andrei', 
      image: 'https://via.placeholder.com/150',
      age: '1 year',
      species: 'Dog',
      gender: 'Male',
      traits: ['Calm', 'Independent'],
      medical: ['Vaccinated'],
      notes: 'Very disciplined and knows basic commands.'
    },
    { 
      id: '3', 
      name: 'Mimi', 
      image: 'https://via.placeholder.com/150',
      age: '4 months',
      species: 'Cat',
      gender: 'Female',
      traits: ['Shy', 'Sweet'],
      medical: ['Dewormed'],
      notes: 'Looking for a quiet home.'
    },
    { 
      id: '4', 
      name: 'Chaeyoung', 
      image: 'https://via.placeholder.com/150',
      age: '2 years',
      species: 'Cat',
      gender: 'Female',
      traits: ['Affectionate', 'Active'],
      medical: ['Full Vaccine'],
      notes: 'Very talkative and loves to cuddle.'
    },
  ];

  const [matchedPets] = useState(mockMatches);

  // --- HANDLERS ---
  const openPetInfo = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const renderMatchCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={() => openPetInfo(item)}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
        <View style={styles.heartBadge}><Text style={{ fontSize: 12 }}>❤️</Text></View>
        <View style={styles.nameLabel}>
          <Text style={styles.petName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/fureverfindlogo.png')} 
          style={styles.flexibleLogo} 
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.brandTitle}>Fur-Ever Find</Text>
          <Text style={styles.brandSubtitle}>Find Your Best Friend</Text>
        </View>
      </View>

      {/* --- INFO POPUP MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeBtn} 
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={32} color="#FFAD5F" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{ uri: selectedPet?.image }} style={styles.detailImg} />
              <Text style={styles.detailName}>{selectedPet?.name}</Text>
              <Text style={styles.detailSub}>
                {selectedPet?.species} • {selectedPet?.gender} • {selectedPet?.age}
              </Text>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Traits:</Text>
                <Text style={styles.detailText}>{selectedPet?.traits.join(', ')}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Medical History:</Text>
                {selectedPet?.medical.map((m, i) => (
                  <Text key={i} style={styles.detailText}>• {m}</Text>
                ))}
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>About {selectedPet?.name}:</Text>
                <Text style={styles.detailText}>{selectedPet?.notes}</Text>
              </View>

              <TouchableOpacity 
                style={styles.modalChatBtn}
                onPress={() => {
                  setModalVisible(false);
                  router.push('/messages');
                }}
              >
                <Text style={styles.modalChatBtnText}>Message Owner</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* --- MAIN LIST --- */}
      {matchedPets.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.bannerContainer}>
             <Text style={styles.bannerText}>It's a match!</Text>
          </View>

          <FlatList
            data={matchedPets}
            renderItem={renderMatchCard}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => router.push('/messages')}
          >
            <Text style={styles.chatButtonText}>Start Conversations</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Matches Found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: width * 0.05, 
    paddingTop: 50,
    marginBottom: 10 
  },
  flexibleLogo: { width: width * 0.22, height: width * 0.22, marginRight: 15 },
  headerText: { flex: 1 },
  brandTitle: { fontSize: width * 0.06, fontWeight: 'bold' },
  brandSubtitle: { fontSize: width * 0.03, color: '#888' },
  bannerContainer: { alignItems: 'center', marginVertical: 10 },
  bannerText: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  listContainer: { paddingHorizontal: 15, paddingBottom: 100 },
  cardContainer: { width: '50%', padding: 8 },
  card: { backgroundColor: '#FFF', borderRadius: 15, elevation: 4, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  petImage: { width: '100%', height: 140 },
  heartBadge: { position: 'absolute', top: 5, right: 5, backgroundColor: 'white', borderRadius: 12, padding: 3 },
  nameLabel: { backgroundColor: '#F3F3ED', paddingVertical: 10, alignItems: 'center' },
  petName: { fontWeight: 'bold', fontSize: 18, color: '#444' },
  chatButton: { position: 'absolute', bottom: 25, alignSelf: 'center', backgroundColor: '#FFAD5F', width: '90%', padding: 18, borderRadius: 15, alignItems: 'center', elevation: 5 },
  chatButtonText: { color: '#444', fontWeight: 'bold', fontSize: 17 },
  
  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.85, height: height * 0.75, backgroundColor: '#FAF9F6', borderRadius: 25, padding: 20 },
  closeBtn: { position: 'absolute', right: 15, top: 15, zIndex: 1 },
  detailImg: { width: '100%', height: 200, borderRadius: 20, marginBottom: 15 },
  detailName: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  detailSub: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 20 },
  detailSection: { marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  detailLabel: { fontSize: 18, fontWeight: 'bold', color: '#FFAD5F', marginBottom: 5 },
  detailText: { fontSize: 16, color: '#555' },
  modalChatBtn: { backgroundColor: '#FFAD5F', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  modalChatBtnText: { color: '#444', fontWeight: 'bold', fontSize: 16 }
});