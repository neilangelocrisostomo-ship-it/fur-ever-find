import { Ionicons } from '@expo/vector-icons';
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

export default function AdoptedPage() {
  // PARA SA POPUP MODAL
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // BACKEND-READY DATA: Connected na ang Adopter info sa Pet info
  const [adoptedList, setAdoptedList] = useState([
    {
      id: '1',
      adopterName: 'Juan Carlos',
      adopterAge: 25,
      adopterAddress: '123 Pet St., Brgy. San Jose, Cavite',
      image: 'https://via.placeholder.com/150', 
      petDetails: {
        name: 'Murphy',
        species: 'Dog',
        breed: 'Golden Retriever',
        image: 'https://via.placeholder.com/150', 
        notes: 'Adopted last December 2025. Doing great in his new home!'
      }
    },
    {
      id: '2',
      adopterName: 'Neil Crisostomo',
      adopterAge: 21,
      adopterAddress: '456 Furry Lane, Quezon City',
      image: 'https://via.placeholder.com/150',
      petDetails: {
        name: 'Luna',
        species: 'Cat',
        breed: 'Persian',
        image: 'https://via.placeholder.com/150',
        notes: 'Very sweet and loves her new family.'
      }
    }
  ]);

  const handleViewDetails = (item) => {
    setSelectedAdoption(item);
    setModalVisible(true);
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
      <View style={styles.adoptedBanner}>
        <Text style={styles.adoptedTitle}>ADOPTED</Text>
      </View>
    </View>
  );

  const AdoptionModal = () => (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle" size={32} color="#FFAD5F" />
          </TouchableOpacity>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalHeader}>Adoption Summary</Text>
            
            
            <View style={styles.modalSection}>
               <Image source={{ uri: selectedAdoption?.petDetails.image }} style={styles.petPopupImg} />
               <Text style={styles.petPopupName}>{selectedAdoption?.petDetails.name}</Text>
               <Text style={styles.petPopupSub}>{selectedAdoption?.petDetails.species} • {selectedAdoption?.petDetails.breed}</Text>
            </View>

            <View style={styles.divider} />

            
            <View style={styles.modalSection}>
              <Text style={styles.detailLabel}>Adopter Address:</Text>
              <Text style={styles.detailText}>{selectedAdoption?.adopterAddress}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.detailLabel}>Owner's Notes:</Text>
              <Text style={styles.detailText}>{selectedAdoption?.petDetails.notes}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Header />
      <AdoptionModal />
      
      <FlatList
        data={adoptedList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleViewDetails(item)}>
            
            <Image source={{ uri: item.image }} style={styles.adopterImg} />
            
            <View style={styles.cardContent}>
              <Text style={styles.label}>Adopter:</Text>
              <Text style={styles.adopterName}>{item.adopterName}</Text>
              <Text style={styles.adopterAge}>Age: {item.adopterAge}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#BBB" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={<Text style={styles.emptyText}>No adopted pets record found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  headerContainer: { backgroundColor: '#FFF', paddingTop: 50, paddingHorizontal: 20 },
  mailboxStyle: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FDF7F2', 
    padding: 12, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#FEEAD6',
    marginBottom: 15
  },
  miniLogo: { width: 50, height: 50 },
  verticalLine: { width: 1.5, height: 40, backgroundColor: '#FFD1A9', marginHorizontal: 15 },
  brandName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  brandTagline: { fontSize: 11, color: '#888' },
  adoptedBanner: { paddingVertical: 10, alignItems: 'center' },
  adoptedTitle: { fontSize: 24, fontWeight: '900', color: '#000' },

  listPadding: { padding: 20 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#E9E9E2', 
    borderRadius: 20, 
    padding: 15, 
    marginBottom: 15, 
    alignItems: 'center',
    elevation: 2 
  },
  adopterImg: { width: 75, height: 75, borderRadius: 37.5, backgroundColor: '#FFF', marginRight: 15 },
  cardContent: { flex: 1 },
  label: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  adopterName: { fontSize: 18, color: '#444' },
  adopterAge: { fontSize: 16, color: '#666' },

 
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.85, backgroundColor: '#FFF', borderRadius: 25, padding: 20, maxHeight: height * 0.8 },
  closeBtn: { position: 'absolute', right: 15, top: 15, zIndex: 1 },
  modalHeader: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  modalSection: { marginBottom: 20, alignItems: 'center' },
  petPopupImg: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  petPopupName: { fontSize: 24, fontWeight: 'bold', color: '#FFAD5F' },
  petPopupSub: { fontSize: 16, color: '#888' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 10, width: '100%' },
  detailLabel: { fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start', color: '#555' },
  detailText: { fontSize: 15, color: '#777', alignSelf: 'flex-start', marginTop: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#AAA' }
});