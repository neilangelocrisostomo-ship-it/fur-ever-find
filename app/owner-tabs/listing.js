import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ListingDashboard() {
  const [isPosting, setIsPosting] = useState(false);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState('Active');
  const [errors, setErrors] = useState({});
 
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '', gender: '', dob: '', species: '',
    selectedTraits: [],
    goodWithKids: true, friendly: true, houseTrained: true,
    vaccinated: false, dewormed: false,
    homeCheck: false, otherPets: false, fencedYard: false,
    isFree: true, notes: ''
  });

  const [myListings, setMyListings] = useState([
    {
      id: '1',
      name: 'Murphy',
      age: '6 months',
      status: 'Active',
      image: 'https://via.placeholder.com/150',
      matches: 3,
      gender: 'Male',
      species: 'Dog',
      traits: ['Playful', 'Curious'],
      medical: ['Vaccinated', '3x dewormed'],
      requirements: ['Home Check', 'Fenced Yard'],
      notes: 'He is very energetic and loves to play fetch.'
    }
  ]);

  // --- LOGIC: REMOVE LISTING (BACKEND READY) ---
  const handleRemoveListing = (id) => {
    Alert.alert(
      "Remove Listing",
      "Sigurado ka ba na gusto mong burahin ang post na ito? Hindi na ito mababalik.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            // Dito ilalagay ang API call sa backend 
            setMyListings(prev => prev.filter(item => item.id !== id));
            setModalVisible(false);
          } 
        }
      ]
    );
  };

  const validateStep1 = () => {
    let s1Errors = {};
    if (!formData.name) s1Errors.name = true;
    if (!formData.gender) s1Errors.gender = true;
    if (!formData.dob) s1Errors.dob = true;
    if (!formData.species) s1Errors.species = true;
   
    setErrors(s1Errors);
    if (Object.keys(s1Errors).length > 0) {
      Alert.alert("Required Fields", "Please fill up all required pet information.");
      return false;
    }
    return true;
  };

  const toggleTrait = (trait) => {
    setFormData(prev => ({
      ...prev,
      selectedTraits: prev.selectedTraits.includes(trait)
        ? prev.selectedTraits.filter(t => t !== trait)
        : [...prev.selectedTraits, trait]
    }));
  };

  const handlePublish = () => {
    const newEntry = {
      id: Math.random().toString(),
      name: formData.name,
      age: formData.dob,
      status: 'Active',
      image: 'https://via.placeholder.com/150',
      matches: 0,
      gender: formData.gender,
      species: formData.species,
      traits: formData.selectedTraits,
      medical: [formData.vaccinated && 'Vaccinated', formData.dewormed && '3x dewormed'].filter(Boolean),
      requirements: [formData.homeCheck && 'Home Check', formData.otherPets && 'Other pets in home', formData.fencedYard && 'Fenced Yard'].filter(Boolean),
      notes: formData.notes
    };

    setMyListings([newEntry, ...myListings]);
    setIsPosting(false);
    setStep(1);
    setFormData({ name: '', gender: '', dob: '', species: '', selectedTraits: [], goodWithKids: true, friendly: true, houseTrained: true, vaccinated: false, dewormed: false, homeCheck: false, otherPets: false, fencedYard: false, isFree: true, notes: '' });
  };

  const Header = () => (
    <View style={styles.headerBox}>
      <View style={styles.mailboxStyle}>
        <Image source={require('../../assets/images/fureverfindlogo.png')} style={styles.miniLogo} resizeMode="contain" />
        <View style={styles.verticalLine} />
        <View>
          <Text style={styles.brandName}>Fur-Ever Find</Text>
          <Text style={styles.brandTagline}>Find Your Best Friend</Text>
        </View>
      </View>
    </View>
  );

  const DetailModal = () => (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle" size={30} color="#FFAD5F" />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: selectedPet?.image }} style={styles.detailImg} />
            <Text style={styles.detailName}>{selectedPet?.name}</Text>
            <Text style={styles.detailSub}>{selectedPet?.species} • {selectedPet?.gender} • {selectedPet?.age}</Text>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Traits:</Text>
              <Text style={styles.detailText}>{selectedPet?.traits.join(', ')}</Text>
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Medical Info:</Text>
              {selectedPet?.medical.map((m, i) => <Text key={i} style={styles.detailText}>• {m}</Text>)}
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Requirements:</Text>
              {selectedPet?.requirements.map((r, i) => <Text key={i} style={styles.detailText}>• {r}</Text>)}
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Notes:</Text>
              <Text style={styles.detailText}>{selectedPet?.notes || "No additional notes."}</Text>
            </View>

           
            <TouchableOpacity 
              style={styles.removeBtn} 
              onPress={() => handleRemoveListing(selectedPet?.id)}
            >
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text style={styles.btnTextWhite}>Remove Listing</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (isPosting) {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.formPadding} showsVerticalScrollIndicator={false}>
          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Introduce Your Pet!</Text>
              <Text style={styles.stepSub}>Share details to find their perfect home</Text>
              <TouchableOpacity style={styles.uploadArea}>
                <Ionicons name="camera-outline" size={50} color="#333" />
                <Text style={styles.uploadText}>Upload Photo & Videos</Text>
              </TouchableOpacity>
              <TextInput style={[styles.inputFull, errors.name && styles.errorBorder]} placeholder="Name: *" value={formData.name} onChangeText={(v) => {setFormData({...formData, name: v}); setErrors({...errors, name: false});}} />
              <View style={styles.row}>
                <TextInput style={[styles.inputFull, {flex:1, marginRight:10}, errors.gender && styles.errorBorder]} placeholder="Gender: *" value={formData.gender} onChangeText={(v) => {setFormData({...formData, gender: v}); setErrors({...errors, gender: false});}} />
                <TextInput style={[styles.inputFull, {flex:1}, errors.dob && styles.errorBorder]} placeholder="Date of Birth: *" value={formData.dob} onChangeText={(v) => {setFormData({...formData, dob: v}); setErrors({...errors, dob: false});}} />
              </View>
              <TextInput style={[styles.inputFull, errors.species && styles.errorBorder]} placeholder="Species: (Dog, Cat, bird etc.) *" value={formData.species} onChangeText={(v) => {setFormData({...formData, species: v}); setErrors({...errors, species: false});}} />
              <TouchableOpacity style={styles.mainBtn} onPress={() => validateStep1() && setStep(2)}><Text style={styles.btnText}>Next</Text></TouchableOpacity>
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Tell Us About Their Personality</Text>
              <Text style={styles.labelTitle}>Key Traits</Text>
              <View style={styles.traitsGrid}>
                {['Playful', 'Shy', 'Calm', 'Independent', 'Curious'].map(t => (
                  <TouchableOpacity key={t} onPress={() => toggleTrait(t)} style={[styles.traitChip, formData.selectedTraits.includes(t) && styles.traitActive]}>
                    <Text style={[styles.traitText, formData.selectedTraits.includes(t) && styles.traitTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.labelTitle}>Temperament Details</Text>
              {['goodWithKids', 'friendly', 'houseTrained'].map(key => (
                <View key={key} style={styles.switchRow}>
                  <Text style={styles.capText}>{key.replace(/([A-Z])/g, ' $1')}</Text>
                  <Switch value={formData[key]} onValueChange={(v) => setFormData({...formData, [key]: v})} trackColor={{ true: '#00C2A0' }} />
                </View>
              ))}
              <Text style={styles.labelTitle}>Medical Information</Text>
              <TouchableOpacity style={styles.checkRow} onPress={() => setFormData({...formData, vaccinated: !formData.vaccinated})}>
                <Ionicons name={formData.vaccinated ? "checkbox" : "square-outline"} size={24} color="#00C2A0" />
                <Text style={styles.checkLabel}>Vaccinated</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkRow} onPress={() => setFormData({...formData, dewormed: !formData.dewormed})}>
                <Ionicons name={formData.dewormed ? "checkbox" : "square-outline"} size={24} color="#00C2A0" />
                <Text style={styles.checkLabel}>3x dewormed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mainBtn} onPress={() => setStep(3)}><Text style={styles.btnText}>Next</Text></TouchableOpacity>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.stepTitle}>Find Their Perfect Home!</Text>
              <Text style={styles.labelTitle}>Adoption Requirements</Text>
              {['homeCheck', 'otherPets', 'fencedYard'].map(key => (
                <TouchableOpacity key={key} style={styles.checkRow} onPress={() => setFormData({...formData, [key]: !formData[key]})}>
                  <Ionicons name={formData[key] ? "checkbox" : "square-outline"} size={24} color="#00C2A0" />
                  <Text style={styles.checkLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.labelTitle}>Adoption Fee</Text>
              <View style={styles.switchRow}><Text>Free</Text><Switch value={formData.isFree} onValueChange={(v) => setFormData({...formData, isFree: v})} trackColor={{ true: '#00C2A0' }}/></View>
              <TextInput style={styles.bigInput} placeholder="Additional Notes For Adopter" multiline value={formData.notes} onChangeText={(v) => setFormData({...formData, notes: v})} />
              <TouchableOpacity style={styles.mainBtn} onPress={handlePublish}><Text style={styles.btnText}>Publish listing</Text></TouchableOpacity>
            </View>
          )}
          <Text style={styles.stepNum}>{step} of 3</Text>
          <TouchableOpacity onPress={() => setIsPosting(false)} style={{marginTop: 15}}><Text style={{textAlign:'center', color: '#FF4D4D'}}>Cancel</Text></TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <DetailModal />
      <View style={styles.dashboardContainer}>
        <TouchableOpacity style={styles.postTrigger} onPress={() => setIsPosting(true)}>
          <Ionicons name="add-circle" size={28} color="white" />
          <Text style={styles.postTriggerText}>Create New Pet Post</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>MY LISTINGS</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity onPress={() => setActiveTab('Active')} style={[styles.tabItem, activeTab === 'Active' && styles.tabActive]}><Text style={[styles.tabLabel, activeTab === 'Active' && styles.tabLabelActive]}>Active ({myListings.length})</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Pending')} style={[styles.tabItem, activeTab === 'Pending' && styles.tabActive]}><Text style={[styles.tabLabel, activeTab === 'Pending' && styles.tabLabelActive]}>Pending (0)</Text></TouchableOpacity>
        </View>
        <FlatList
          data={activeTab === 'Active' ? myListings : []}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => { setSelectedPet(item); setModalVisible(true); }}>
              <Image source={{ uri: item.image }} style={styles.cardImg} />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardSub}>{item.age}</Text>
                {item.matches > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{item.matches} New Match!</Text></View>}
              </View>
              <Ionicons name="chevron-forward" size={24} color="#CCC" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  headerBox: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#FFF' },
  mailboxStyle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF7F2', padding: 12, borderRadius: 15, borderWidth: 1, borderColor: '#FEEAD6' },
  miniLogo: { width: 50, height: 50 },
  verticalLine: { width: 1.5, height: 40, backgroundColor: '#FFD1A9', marginHorizontal: 15 },
  brandName: { fontSize: 20, fontWeight: 'bold' },
  brandTagline: { fontSize: 11, color: '#888' },
  dashboardContainer: { flex: 1, padding: 20 },
  postTrigger: { backgroundColor: '#FFAD5F', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, borderRadius: 12 },
  postTriggerText: { color: 'white', fontWeight: 'bold', marginLeft: 10, fontSize: 18 },
  sectionTitle: { textAlign: 'center', fontSize: 22, fontWeight: '900', marginVertical: 15 },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#EEE', marginBottom: 15 },
  tabItem: { paddingVertical: 10, width: '45%', alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#FF4D4D' },
  tabLabel: { fontSize: 16, color: '#AAA' },
  tabLabelActive: { color: '#FF4D4D', fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#E9E9E2', borderRadius: 20, padding: 15, marginBottom: 12, alignItems: 'center' },
  cardImg: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#FFF' },
  cardName: { fontSize: 18, fontWeight: 'bold' },
  cardSub: { color: '#777' },
  badge: { backgroundColor: '#FFAD5F', alignSelf: 'flex-start', paddingHorizontal: 10, borderRadius: 10, marginTop: 5 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  
  // FORM STYLES (ORIGINAL)
  formPadding: { padding: 20 },
  stepTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  stepSub: { textAlign: 'center', color: '#777', marginBottom: 15 },
  uploadArea: { height: 130, borderStyle: 'dashed', borderWidth: 1, borderColor: '#333', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  uploadText: { marginTop: 8, fontWeight: '500' },
  inputFull: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FFE0B2', borderRadius: 8, padding: 12, marginBottom: 12 },
  errorBorder: { borderColor: 'red', borderWidth: 2 },
  row: { flexDirection: 'row' },
  labelTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  traitsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  traitChip: { backgroundColor: '#EEE', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  traitActive: { backgroundColor: '#FFB74D' },
  traitText: { fontSize: 13, fontWeight: '600', color: '#333' },
  traitTextActive: { color: '#FFF' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  capText: { textTransform: 'capitalize' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkLabel: { marginLeft: 10, fontSize: 16, color: '#444' },
  mainBtn: { backgroundColor: '#FFAD5F', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  bigInput: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, height: 90, textAlignVertical: 'top' },
  stepNum: { textAlign: 'center', marginTop: 20, color: '#AAA' },

  // MODAL VIEW STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.85, height: height * 0.7, backgroundColor: '#FAF9F6', borderRadius: 25, padding: 20 },
  closeBtn: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  detailImg: { width: '100%', height: 180, borderRadius: 15, marginBottom: 15 },
  detailName: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  detailSub: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 20 },
  detailSection: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  detailLabel: { fontSize: 18, fontWeight: 'bold', color: '#FFAD5F' },
  detailText: { fontSize: 16, color: '#555', marginTop: 5 },

  // ADDED BUTTON STYLE
  removeBtn: { backgroundColor: '#FF4D4D', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 12, marginTop: 10 },
  btnTextWhite: { color: 'white', fontWeight: 'bold', marginLeft: 10 }
});