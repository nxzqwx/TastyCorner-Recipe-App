import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

const Profile = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const url = 'https://low-carb-recipes.p.rapidapi.com/search?name=cake&tags=keto%3Bdairy-free&includeIngredients=egg%3Bbutter&excludeIngredients=cinnamon&maxPrepareTime=10&maxCookTime=20&maxCalories=500&maxNetCarbs=5&maxSugar=3&maxAddedSugar=0&limit=10';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4b3b2cca40msh01271817ab94eacp134bccjsn0d8c8d3dea22',
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadNextRecipe = async () => {
    const url = 'https://low-carb-recipes.p.rapidapi.com/random';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4b3b2cca40msh01271817ab94eacp134bccjsn0d8c8d3dea22',
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const randomRecipe = await response.json();

      // Update the recipes state with the new random recipe
      setRecipes([randomRecipe]);
      // Since we only have one recipe in the array, set the current index to 0
      setCurrentRecipeIndex(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
      
        <Text style={styles.name}>@axg8935</Text>
    
        <Text style={styles.detail}>Name: <Text style={styles.bold}>Antonio Gredicak Ivicek</Text></Text>
        <Text style={styles.detail}>Country: <Text style={styles.bold}>Croatia</Text></Text>
        <Text style={styles.detail}>Cooking Level: <Text style={styles.bold}>Intermediate</Text></Text>
        <Text style={styles.myRecipes}>My Recipes</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {recipes.map((recipe, index) => (
          <View key={index} style={[styles.recipeCard, index !== currentRecipeIndex && styles.hidden]}>
            <Text style={styles.recipeTitle}>{recipe.name}</Text>
            <ScrollView style={styles.descriptionScrollView}>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
            </ScrollView>
            <Text style={styles.recipeSubtitle}>Preparation Time: {recipe.prepareTime} minutes</Text>
            <Text style={styles.recipeSubtitle}>Cooking Time: {recipe.cookTime} minutes</Text>
            <Text style={styles.recipeSubtitle}>Servings: {recipe.servings}</Text>
            <Text style={styles.recipeSubtitle}>Ingredients:</Text>
            <ScrollView horizontal={true}>
              <View style={styles.ingredientsContainer}>
                {recipe.ingredients.map((ingredient, i) => (
                  <Text key={i} style={styles.ingredient}>{ingredient.name}</Text>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button title="Next Recipe" onPress={loadNextRecipe} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    paddingBottom: 25,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  myRecipes: {
    fontSize: 28,
    textAlign: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  recipeCard: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    maxHeight: 400,
    overflow: 'scroll',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionScrollView: {
    maxHeight: 100,
  },
  recipeDescription: {
    marginBottom: 10,
  },
  recipeSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  ingredient: {
    marginRight: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 450, // Adjust this value to position the button above the bottom navigation bar
    alignSelf: 'center',
  },
  hidden: {
    display: 'none',
  },
});

export default Profile;
