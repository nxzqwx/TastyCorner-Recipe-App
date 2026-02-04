import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

const handleSubmit = () => {
  const titleLength = title.trim().length;
  const ingredientCount = ingredients.trim().split(',').length;
  const instructionPoints = instructions.trim().split(/\d+\./).length - 1;

  let errorMessage = '';

  if (titleLength <= 3) {
    errorMessage += 'Title must be more than 3 characters.\n';
  }

  if (ingredientCount < 3) { // Changed condition to less than 3 or equal to 3
    errorMessage += 'Ingredients must contain 3 or more items.\n';
  }

  if (instructionPoints <= 1) {
    errorMessage += 'Instructions must have more than 1 numbered point.';
  }

  if (errorMessage === '') {
    setModalText('Success!');
    setModalVisible(true);
  } else {
    setModalText(errorMessage);
    setModalVisible(true);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Recipe</Text>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Ingredients:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Enter ingredients list"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Instructions:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Enter instructions"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Center content vertically
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100, // Height for multiline input fields
  },
  submitButton: {
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
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
    textAlign: 'center',
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

export default Upload;
