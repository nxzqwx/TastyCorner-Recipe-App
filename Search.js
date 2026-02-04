import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

// Import your images
import card1Image from './components/images/cards/card1.jpg';
import card2Image from './components/images/cards/card2.jpg';
import card3Image from './components/images/cards/card3.jpg';
import card4Image from './components/images/cards/card4.jpg';

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const foodDescriptions = {
    Vegan:
      'Vegan food is free from any animal products, including meat, dairy, and eggs. It consists primarily of fruits, vegetables, grains, nuts, and seeds.',
    Meat: 'Meat dishes include various types of animal flesh, such as beef, pork, chicken, and fish. These dishes are often cooked in various ways, including grilling, frying, and roasting.',
    'Gluten Free':
      'Gluten-free food does not contain gluten, a protein found in wheat, barley, and rye. It is suitable for people with gluten intolerance or celiac disease.',
    'Low carb':
      'Low-carb diets restrict carbohydrate intake, focusing on protein, fat, and non-starchy vegetables. They are often used for weight loss and managing blood sugar levels.',
    Easy: 'Easy recipes are simple and quick to prepare, requiring minimal cooking skills and ingredients. They are ideal for beginners or busy individuals looking for convenient meal options.',
    Quick:
      'Quick recipes are designed to be prepared in a short amount of time, usually within 30 minutes or less. They are perfect for those who want to make a delicious meal without spending too much time in the kitchen.',
  };

  const handleCardPress = (text) => {
    setModalText(foodDescriptions[text]);
    setModalVisible(true);
  };

  // Filter cards based on search query
  const filteredCards = Object.keys(foodDescriptions).filter((food) =>
    food.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)} // Update search query
      />

      {/* Cards */}
      {filteredCards.map((food, index) => (
        <View key={index} style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(food)}>
            <View style={styles.cardImageWrapper}>
              <Image source={getImage(food)} style={styles.cardImage} />
              <View style={styles.cardImageOverlay} />
              <Text style={styles.cardText}>{food}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Function to get image based on food category
const getImage = (food) => {
  switch (food) {
    case 'Vegan':
      return card1Image;
    case 'Meat':
      return card2Image;
    case 'Gluten Free':
      return card3Image;
    case 'Low carb':
      return card4Image;
    case 'Easy':
      return card1Image;
    case 'Quick':
      return card2Image;
    default:
      return card1Image; // Default image
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Increased gap between rows
  },
  card: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5, // Adjust gap between cards
  },
  cardImageWrapper: {
    width: '100%',
    height: 125,
    resizeMode: 'cover',
    position: 'relative',
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardText: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF', // White text color
    fontWeight: 'bold', // Added fontWeight for better readability
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FFFF00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Search;
