import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, Modal } from 'react-native';
import bcrypt from 'bcryptjs';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // PASSWORD IS CoComan543

  const hashedPassword = '$2a$12$M.GbmJSxThNtUKAedv2PuOHNUEolEikNwitN4h2TzLLgA/RNVcAdO'; // Replace this with your hashed password

  const handleSignIn = () => {
    if (username === 'axg8935' && bcrypt.compareSync(password, hashedPassword)) {
      setModalMessage('You have successfully signed in.');
      setShowModal(true);
      // Navigate to 'Home' when login is successful
      navigation.navigate('MainScreen');
    } else {
      setModalMessage('Incorrect username or password.');
      setShowModal(true);
    }
  };

  return (
    <ImageBackground
      source={require('./components/images/sign-in-bg.jpg')}
      style={[styles.background, { width, height }]}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.titleText}>TastyCorner</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleText: {
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: height * 0.075,
    paddingVertical: 12,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
