import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { Recipe } from '../api/model/recipeModel';
import { getRecipeById } from '../api/service/recipeService';
import BookmarkIcon from './icons/BookmarkIcon';
import EatIcon from './icons/EatIcon';
import LikeIcon from './icons/LikeIcon';
import TimerIcon from './icons/TimerIcon';

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
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.user}>
          <Avatar.Image
            size={50}
            source={require('../assets/cupcakeprofile.png')}
          />
          <Text style={styles.username}>MoaHedendahl</Text>
        </View>
        {recipe.imageUrl && (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={{ width: 'auto', height: 500 }}
          />
        )}
        <View style={styles.actions}>
          <LikeIcon size={32} fill={'#232323'} />
          <BookmarkIcon size={32} fill={'#232323'} />
        </View>
        <View style={styles.recipeInfo}>
          <Text style={styles.textMedium}>801 Likes</Text>
        </View>
      </View>
      <View style={styles.information}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.details}>
          <EatIcon size={24} fill={'#232323'} />
          <Text style={styles.text}>{recipe.servingDetails}</Text>
        </View>
        <View style={styles.details}>
          <TimerIcon size={24} fill={'#232323'} />
          <Text style={styles.text}>
            <Text style={styles.textMedium}>Preptime:</Text> {recipe.prepTime}
          </Text>
          {recipe.cookTime && (
            <View>
              <Text style={styles.text}>
                <Text style={styles.textMedium}>Cooktime:</Text>{' '}
                {recipe.cookTime}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.text}>{recipe.description}</Text>

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
              <View key={index} style={styles.group}>
                {group.ingredientSubtitle && (
                  <Text style={styles.subtitle}>
                    {group.ingredientSubtitle}
                  </Text>
                )}
                {group.items?.map((ingredient, i) => (
                  <Text
                    key={i}
                    style={styles.listIngredients}
                  >{`${ingredient.quantity} ${ingredient.name}`}</Text>
                ))}
              </View>
            ))
          : recipe.instructions?.map((group, index) => (
              <View key={index} style={styles.group}>
                {group.instructionSubtitle && (
                  <Text style={styles.subtitle}>
                    {group.instructionSubtitle}
                  </Text>
                )}
                {group.steps?.map((step, i) => (
                  <Text key={i} style={styles.listInstructions}>{`${i + 1}. ${
                    step.instruction
                  }`}</Text>
                ))}
              </View>
            ))}

        {/* Render other recipe details here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // padding: 16,
    // marginTop: 48,
    // gap: 24,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  title: {
    fontFamily: 'Jost-Medium',
    fontSize: 20,
    marginTop: 10,
  },
  information: {
    marginHorizontal: 10,
    gap: 6,
  },
  subtitle: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginBottom: 2,
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
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  activeButtonText: {
    fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
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
  listInstructions: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    marginVertical: 3,
  },
  listIngredients: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  text: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  textMedium: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },
  recipeInfo: {
    marginHorizontal: 10,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  username: {
    fontFamily: 'Jost-Medium',
    fontSize: 20,
  },
  group: { marginVertical: 5 },
});

export default RecipeComponent;
