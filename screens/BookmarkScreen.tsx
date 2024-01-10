import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from '../api/model/recipeModel';
import {
  getBookmarkedRecipes,
  getRecipeById,
} from '../api/service/recipeService';
import RecipeComponent from '../components/RecipeComponent';

interface RecipeWithId extends Recipe {
  id: string;
}

const fetchRecipesByIds = async (recipeIds: string[]) => {
  return Promise.all(
    recipeIds.map(async (id: string) => {
      try {
        const recipe = await getRecipeById(id);
        console.log('Processing recipe with id:', id);
        if (recipe) {
          // Only process the recipe if it is not null
          console.log('Recipe found:', recipe);
          return recipe;
        } else {
          console.log('Recipe not found for ID:', id);
          return null;
        }
      } catch (error) {
        console.error('Error fetching recipe with ID:', id, error);
        return null;
      }
    })
  );
};

function BookmarkScreen() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<RecipeWithId[]>(
    []
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          let recipeIds: string[] = await getBookmarkedRecipes(user.uid);
          recipeIds = recipeIds.filter((id) => !!id);

          console.log('recipeIds', recipeIds);

          const recipes = await fetchRecipesByIds(recipeIds);

          console.log('recipes', recipes);

          // Filter out null recipes before setting the state
          setBookmarkedRecipes(recipes as RecipeWithId[]);
          console.log('recipes test', recipes);
        } catch (error) {
          console.error('Error fetching bookmarked recipes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  useEffect(() => {
    console.log('Updated bookmarkedRecipes:', bookmarkedRecipes);
  }, [bookmarkedRecipes]);

  if (isLoading) {
    return (
      <SafeAreaView>
        <View>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      {bookmarkedRecipes.length > 0 ? (
        bookmarkedRecipes.map((recipe) => (
          <RecipeComponent key={recipe.id} recipeId={recipe.id} />
        ))
      ) : (
        <Text>No recipes found</Text>
      )}
    </SafeAreaView>
  );
}

export default BookmarkScreen;
