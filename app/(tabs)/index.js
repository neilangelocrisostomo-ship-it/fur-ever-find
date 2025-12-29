import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Dimensions,
  Image, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // BACKEND: Dito ilalagay ang pets mula sa database (GET /api/pets)
  const [pets, setPets] = useState([
    {
      id: '1',
      name: 'Murphy',
      age: '6 months',
      breed: 'Labradoodle',
      traits: 'High Energy, Middle size dog, Good With kids, House trained',
      medical: ['Anti Rabies', '3x deworm'],
      image: 'https://via.placeholder.com/400x400.png?text=Murphy'
    }
  ]);

  const renderCard = (card) => (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
      
      <View style={styles.cardContent}>
        <View style={styles.infoLeft}>
          <Text style={styles.petName}>{card.name}</Text>
          <Text style={styles.petSub}>{card.age} • {card.breed}</Text>
          <Text style={styles.traitText}>{card.traits}</Text>
        </View>

        <View style={styles.infoRight}>
          <Text style={styles.medicalTitle}>Medical Information</Text>
          {card.medical.map((med, i) => (
            <View key={i} style={styles.medicalRow}>
              <Ionicons name="checkbox-outline" size={14} color="#999" />
              <Text style={styles.medicalItem}>{med}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.btnX}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnHeart}>
          <FontAwesome name="heart" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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

      <View style={styles.swiperContainer}>
        <Swiper
          cards={pets}
          renderCard={renderCard}
          stackSize={2}
          backgroundColor={'transparent'}
          verticalSwipe={false}
          cardIndex={0}
          // BACKEND: Itatawag ang API kapag nag-swipe right (POST /api/match)
          onSwipedRight={(index) => console.log('Matched with:', pets[index].name)}
        />
      </View>
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
    marginBottom: 5 
  },
  
  flexibleLogo: { 
    width: width * 0.22, 
    height: width * 0.22, 
    marginRight: 15 
  },
  headerText: { flex: 1 },
  brandTitle: { fontSize: width * 0.06, fontWeight: 'bold' },
  brandSubtitle: { fontSize: width * 0.03, color: '#888' },
  swiperContainer: { flex: 1, marginTop: -10 },
  card: {
    height: height * 0.65, 
    backgroundColor: '#FFF',
    borderRadius: 25,
    elevation: 4,
    shadowOpacity: 0.1,
  },
  cardImage: { width: '100%', height: '55%', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  cardContent: { flexDirection: 'row', padding: 15, justifyContent: 'space-between' },
  infoLeft: { width: '55%' },
  petName: { fontSize: 22, fontWeight: 'bold' },
  petSub: { fontSize: 12, color: '#666', marginBottom: 5 },
  traitText: { fontSize: 11, color: '#888', lineHeight: 16 },
  infoRight: { width: '40%' },
  medicalTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  medicalRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  medicalItem: { fontSize: 10, color: '#666', marginLeft: 5 },
  actionRow: { flexDirection: 'row', justifyContent: 'center', gap: 30, marginTop: 10 },
  btnX: { 
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', 
    borderWidth: 1, borderColor: '#FFAD5F', justifyContent: 'center', alignItems: 'center' 
  },
  btnHeart: { 
    width: 60, height: 60, borderRadius: 30, 
    backgroundColor: '#FFAD5F', justifyContent: 'center', alignItems: 'center' 
  },
});