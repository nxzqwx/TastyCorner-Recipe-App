import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Button, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const Settings = () => {
  const [randomDishes, setRandomDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [userGuess, setUserGuess] = useState({
    calories: '',
    fat: '',
    protein: '',
    carbs: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const fetchRandomDishes = async () => {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4b3b2cca40msh01271817ab94eacp134bccjsn0d8c8d3dea22',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setRandomDishes(data.recipes.map(recipe => recipe.title));
    } catch (error) {
      console.error('Error fetching random dishes:', error);
    }
  };

  useEffect(() => {
    fetchRandomDishes();
  }, []);

  const fetchNutritionData = async () => {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title=${encodeURIComponent(
      selectedDish
    )}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4b3b2cca40msh01271817ab94eacp134bccjsn0d8c8d3dea22',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  const handleGuess = () => {
    if (!nutritionData) {
      return;
    }

    let correctGuessCount = 0;
    const nutrientKeys = ['calories', 'fat', 'protein', 'carbs'];

    for (const key of nutrientKeys) {
      const userValue = parseFloat(userGuess[key]);
      const min = nutritionData[key].confidenceRange95Percent.min;
      const max = nutritionData[key].confidenceRange95Percent.max;

      if (userValue >= min && userValue <= max) {
        correctGuessCount++;
      }
    }

    if (correctGuessCount >= 3) {
      setModalContent({ title: 'Success', message: 'Your guesses are mostly correct!', nutritionData });
      setModalVisible(true);
    } else {
      setModalContent({ title: 'Failure', message: 'YOU FAILED', nutritionData });
      setModalVisible(true);
    }
  };

  const handleChange = (key, value) => {
    setUserGuess(prevState => ({ ...prevState, [key]: value }));
  };

   return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Picker
        selectedValue={selectedDish}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setSelectedDish(itemValue)}>
        <Picker.Item label="Select a dish" value="" />
        {randomDishes.map((dish, index) => (
          <Picker.Item key={index} label={dish} value={dish} />
        ))}
      </Picker>
      <Button title="Get Nutrition Data" onPress={fetchNutritionData} />
      {nutritionData && (
        <View style={{ marginTop: 20 }}>
          {Object.keys(nutritionData).map((nutrient, index) => (
            <TextInput
              key={index}
              placeholder={index > 1 ? `Guess for ${nutrient} (g)` : `Guess for ${nutrient}`} // Only adding "(g)" for the last three input fields
              keyboardType="numeric"
              value={userGuess[nutrient]}
              onChangeText={(value) => handleChange(nutrient, value)}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5, paddingHorizontal: 10 }}
            />
          ))}
          <Button title="Check Guess" onPress={handleGuess} />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalText}>{modalContent.message}</Text>
            {modalContent.nutritionData && (
              <View>
                <Text>Correct Nutrient Data:</Text>
                {Object.keys(modalContent.nutritionData).map((nutrient, index) => (
                  <Text key={index}>{nutrient}: {modalContent.nutritionData[nutrient].value} {modalContent.nutritionData[nutrient].unit}</Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default Settings;
