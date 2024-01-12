import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { Recipe } from '../api/model/recipeModel';
import { getAllRecipes } from '../api/service/recipeService';
import RecipeComponent from './RecipeComponent';

// Define a new type that includes the 'id' property
interface RecipeWithId extends Recipe {
  id: string;
}

const thinBorder = 1 / PixelRatio.get();

const RecipesList = () => {
  // Specify the type of the recipes state
  const [recipes, setRecipes] = useState<RecipeWithId[]>([]);
  const [lastFetchedRecipe, setLastFetchedRecipe] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    const { recipes, lastFetchedRecipe } = await getAllRecipes();
    setRecipes(recipes);
    setLastFetchedRecipe(lastFetchedRecipe);
    setLoading(false);
  };

  const loadMoreRecipes = async () => {
    if (lastFetchedRecipe) {
      const { recipes: newRecipes, lastFetchedRecipe: newLastFetchedRecipe } =
        await getAllRecipes(lastFetchedRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
      setLastFetchedRecipe(newLastFetchedRecipe);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      <View style={styles.screenHeader}>
        <Text style={styles.h3}>Explore Recipes</Text>
      </View>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeComponent key={recipe.id} recipeId={recipe.id} />
        ))
      ) : (
        <Text>No recipes found</Text>
      )}
      <Button
        mode="contained"
        style={styles.loadMoreRecipesButton}
        labelStyle={styles.buttonLabel}
        onPress={loadMoreRecipes}
        disabled={!lastFetchedRecipe}
      >
        Load more recipes
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    marginTop: 32,
    paddingBottom: 16,
    borderBottomWidth: thinBorder,
    borderBottomColor: theme.colors.primary,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  loadMoreRecipesButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
});

export default RecipesList;
