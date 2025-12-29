import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function MessagesScreen() {
  // BACKEND: Dito papasok ang listahan ng mga chats mula sa database
  const [conversations, setConversations] = useState([]);

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageCard}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.petImage }} style={styles.avatar} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.shelterName}>{item.shelterName}</Text>
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

      <Text style={styles.pageTitle}>Messages</Text>

      {/* Empty State / List logic */}
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png' }} 
            style={styles.emptyIcon} 
          />
          <Text style={styles.emptyText}>No messages yet.</Text>
          <Text style={styles.emptySub}>Matches will appear here once you're connected!</Text>
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
  
  flexibleLogo: { 
    width: width * 0.22, 
    height: width * 0.22, 
    marginRight: 15 
  },
  headerText: { flex: 1 },
  brandTitle: { fontSize: width * 0.06, fontWeight: 'bold' },
  brandSubtitle: { fontSize: width * 0.03, color: '#888' },
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 15,
    color: '#000'
  },
  listContainer: { paddingHorizontal: 20 },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E9E2', 
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFF'
  },
  avatar: { width: '100%', height: '100%' },
  textContainer: { marginLeft: 15, flex: 1 },
  shelterName: { fontSize: 16, fontWeight: '600', color: '#444' },
  emptyState: { flex: 0.7, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIcon: { width: 100, height: 100, opacity: 0.2, marginBottom: 20 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#888' },
  emptySub: { textAlign: 'center', color: '#AAA', marginTop: 10 }
});