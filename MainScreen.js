import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import StaticScreen from './StaticScreen'; // Import the StaticScreen component
import Search from './Search';
import Upload from './Upload';
import Profile from './Profile';
import Settings from './Settings';

const { width, height } = Dimensions.get('window');

// Import your icons
import HomeIcon from './components/images/icons/home.png';
import SearchIcon from './components/images/icons/search.png';
import PlusIcon from './components/images/icons/plus.png';
import UserIcon from './components/images/icons/user.png';
import CogIcon from './components/images/icons/cog.png';
import BackgroundImage from './components/images/homescreen-bg.jpg'; // Import the background image

export default function MainScreen() {
  const [selectedItem, setSelectedItem] = useState('Home');
  const [showTastyCorner, setShowTastyCorner] = useState(true);

  const handleMenuItemPress = (item) => {
    if (item === 'Home') {
      // Always navigate to MainScreen when Home is pressed
      setSelectedItem('Home');
      setShowTastyCorner(true); // Show TastyCorner
    } else {
      setSelectedItem(item);
    }
  };

  const handleTastyCornerPress = () => {
    setSelectedItem('Static'); // Change to Static screen
  };

  // Map icons to their respective items
  const iconMapping = {
    Home: HomeIcon,
    Search: SearchIcon,
    Upload: PlusIcon,
    Profile: UserIcon,
    Settings: CogIcon,
  };

  // Handle back press for StaticScreen
  const handleStaticScreenBackPress = () => {
    setSelectedItem('Home'); // Go back to Home screen
  };

  // Render the corresponding screen based on the selected item
  const renderScreen = () => {
    switch (selectedItem) {
      case 'Home':
        return (
          <View style={styles.container}>
            <Image
              source={BackgroundImage}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            {showTastyCorner && (
              <TouchableOpacity
                onPress={handleTastyCornerPress}
                style={styles.card}>
                <Text style={styles.cardText}>What is TastyCorner?</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case 'Search':
        return <Search />;
      case 'Upload':
        return <Upload />;
      case 'Profile':
        return <Profile />;
      case 'Settings':
        return <Settings />;
      case 'Static': // New case for StaticScreen
        return <StaticScreen onBackPress={handleStaticScreenBackPress} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderScreen()}
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {Object.keys(iconMapping).map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => handleMenuItemPress(item)}
            style={[
              styles.bottomNavItem,
              selectedItem === item && styles.selectedItem,
            ]}>
            <Image
              source={iconMapping[item]}
              style={
                selectedItem === item
                  ? styles.selectedIcon
                  : styles.unselectedIcon
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const iconSize = 30; // Adjust icon size as needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Yellow background
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Specific RGBA values for black transparency
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 40, // Increased padding
    borderRadius: 20, // Increased border radius
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Position the card on top of the background
    top: height / 2 - 100, // Adjust vertical position as needed
  },
  cardText: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000', // Black text color,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFF00', // Yellow background
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderRadius: 15, // Adjust the radius as needed
  },
  bottomNavItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    width: iconSize,
    height: iconSize,
    tintColor: '#000000', // Black icon for selected item
  },
  unselectedIcon: {
    width: iconSize,
    height: iconSize,
    tintColor: '#FFFFFF', // White icon for unselected item
  },
  selectedItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50, // Rounded background for selected item
    padding: 8, // Adjust padding as needed
  },
});
