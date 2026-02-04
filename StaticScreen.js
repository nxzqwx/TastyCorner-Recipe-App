import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const StaticScreen = ({ onBackPress }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Static Text */}
      <View style={styles.staticContent}>
        <Text style={styles.staticText}>
          Welcome to TastyCorner! {'\n\n'}
          TastyCorner is your ultimate destination for culinary inspiration and gastronomic adventures. Dive into a world of flavor and creativity, where every dish tells a story and every recipe is a masterpiece waiting to be discovered. Whether you're an aspiring chef, a seasoned home cook, or simply someone who enjoys good food, TastyCorner caters to your appetite for delicious experiences. {'\n\n'}
          Explore an extensive collection of recipes spanning cuisines from around the globe. From classic comfort foods to innovative fusion dishes, there's something to tantalize every taste bud. Discover the secrets of traditional recipes passed down through generations, or unleash your creativity with modern twists on old favorites. {'\n\n'}
          But TastyCorner is more than just a recipe repository; it's a vibrant community of food lovers and culinary enthusiasts. Connect with like-minded individuals, share your culinary creations, and exchange tips and tricks to elevate your cooking game. Whether you're looking for advice on perfecting your pie crust or seeking recommendations for the best ramen joints in town, the TastyCorner community has your back. {'\n\n'}
          Join us on a mouthwatering journey of culinary exploration and discovery. From kitchen novices to seasoned pros, everyone has a place at TastyCorner. Let's cook, share, and savor together!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  staticContent: {
    marginTop: 60, // Adjust spacing as needed
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  staticText: {
    fontSize: 18,
    color: '#000000',
    lineHeight: 24,
  },
});

export default StaticScreen;
