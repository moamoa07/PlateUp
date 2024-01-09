import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Recipe } from '../api/model/recipeModel';
import { getRecipeById } from '../api/service/recipeService';
import BookmarkIcon from './icons/BookmarkIcon';
import LikeIcon from './icons/LikeIcon';

interface RecipeComponentProps {
  recipeId: string;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [showIngredients, setShowIngredients] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipeById('YHDXJmf2vSlMPwQiTiQm');
      setRecipe(recipeData as Recipe);
      setLoading(false);
    };

    fetchRecipe();
  }, []);

  const toggleSection = (section: 'ingredients' | 'instructions') => {
    setShowIngredients(section === 'ingredients');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!recipe) {
    return <Text>No recipe found</Text>;
  }

  return (
    <View>
      <View>
        {recipe.imageUrl && (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ width: 'auto', height: 50 }}
          />
        )}
        <View style={styles.actions}>
          <LikeIcon size={32} fill={'#232323'} />
          <BookmarkIcon size={32} fill={'#232323'} />
        </View>
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text>{recipe.servingDetails}</Text>
        <View style={styles.details}>
          <Text>Preptime: {recipe.prepTime}</Text>
          <Text>Cooktime: {recipe.cookTime}</Text>
        </View>
        <Text>{recipe.description}</Text>

        {/* Buttons to toggle between Ingredients and Instructions */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, showIngredients && styles.activeButton]}
            onPress={() => toggleSection('ingredients')}
          >
            <Text
              style={[
                styles.buttonText,
                showIngredients && styles.activeButtonText,
              ]}
            >
              Ingredients
            </Text>
          </TouchableOpacity>
          <Text style={styles.divider}>|</Text>
          <TouchableOpacity
            style={[styles.button, !showIngredients && styles.activeButton]}
            onPress={() => toggleSection('instructions')}
          >
            <Text
              style={[
                styles.buttonText,
                !showIngredients && styles.activeButtonText,
              ]}
            >
              Instructions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Ingredients or Instructions based on the selected section */}
        {showIngredients
          ? recipe.ingredients?.map((group, index) => (
              <View key={index}>
                {group.ingredientSubtitle && (
                  <Text style={styles.subtitle}>
                    {group.ingredientSubtitle}
                  </Text>
                )}
                {group.items?.map((ingredient, i) => (
                  <Text
                    key={i}
                  >{`${ingredient.quantity} ${ingredient.name}`}</Text>
                ))}
              </View>
            ))
          : recipe.instructions?.map((group, index) => (
              <View key={index}>
                {group.instructionSubtitle && (
                  <Text style={styles.subtitle}>
                    {group.instructionSubtitle}
                  </Text>
                )}
                {group.steps?.map((step, i) => (
                  <Text key={i}>{`${i + 1}. ${step.instruction}`}</Text>
                ))}
              </View>
            ))}

        {/* Render other recipe details here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    marginTop: 48,
    gap: 24,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Jost-Regular',
    fontWeight: 'bold',
    fontSize: 20,
  },
  information: {
    margin: 10,
    gap: 6,
  },
  subtitle: {
    fontWeight: '700',
    fontFamily: 'Jost-Regular',
  },
  buttonsContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    // marginHorizontal: 5,
    borderRadius: 5,
  },
  activeButton: {
    // backgroundColor: '#ccc',
  },
  buttonText: {
    // fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  activeButtonText: {
    fontWeight: 'bold',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    marginHorizontal: 10,
  },
});

export default RecipeComponent;
