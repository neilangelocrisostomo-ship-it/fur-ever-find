import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function MessagePage() {
  // BACKEND-READY STATE: Empty array muna gaya ng request mo
  // Kapag may backend na, dito papasok ang matches at past conversations
  const [chats, setChats] = useState([
    // Halimbawa ng data structure mula sa backend:
    // { id: '1', name: 'Juan Carlos', lastMessage: 'Is the pet still available?', image: null },
    // { id: '2', name: 'Neil Crisostomo', lastMessage: 'Thank you!', image: null },
    // { id: '3', name: 'Lebron James', lastMessage: 'I want to adopt Murphy.', image: null },
  ]);

  // Mailbox Style Header - Pareho sa listing.js
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
      <View style={styles.titleBanner}>
        <Text style={styles.pageTitle}>Messages</Text>
      </View>
    </View>
  );

  const ChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatCard} activeOpacity={0.7}>
      <View style={styles.avatarCircle}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.avatarImg} />
        ) : (
          <Ionicons name="person" size={40} color="#D2B48C" />
        )}
      </View>
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      
      {/* Mula sa screenshot: Placeholder lang kung walang chat */}
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <View style={styles.emptyState}>
             <Ionicons name="chatbubbles-outline" size={80} color="#DDD" />
             <Text style={styles.emptyText}>No messages yet.</Text>
             <Text style={styles.emptySub}>Matches and conversations will appear here.</Text>
          </View>
        }
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
    marginBottom: 10
  },
  miniLogo: { width: 50, height: 50 },
  verticalLine: { width: 1.5, height: 40, backgroundColor: '#FFD1A9', marginHorizontal: 15 },
  brandName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  brandTagline: { fontSize: 11, color: '#888' },

  titleBanner: { 
    paddingVertical: 15, 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF'
  },
  pageTitle: { fontSize: 26, fontWeight: '900', color: '#000' }, // Bold "Messages"

  
  listPadding: { padding: 20 },
  chatCard: { 
    flexDirection: 'row', 
    backgroundColor: '#E9E9E2', // Grayish card
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 20, 
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatarCircle: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#F5F5F0', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  avatarImg: { width: 70, height: 70, borderRadius: 35 },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#444' }, // Malaking text

 
  emptyState: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#AAA', marginTop: 10 },
  emptySub: { color: '#CCC', textAlign: 'center', paddingHorizontal: 40, marginTop: 5 }
});