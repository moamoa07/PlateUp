import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from '../api/model/recipeModel';
import {
  getBookmarkedRecipes,
  getRecipeById,
} from '../api/service/recipeService';
import RecipeComponent from '../components/RecipeComponent';

function BookmarkScreen() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          let recipeIds = await getBookmarkedRecipes(user.uid);

          // recipeIds = recipeIds.map((id: string) =>
          //   id ? id.replace(/"/g, '') : ''
          // );

          console.log('recipeIds', recipeIds);

          const recipes = await Promise.all(
            recipeIds.map(async (id: string) => {
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
            })
          );

          console.log('recipes', recipes);

          // Filter out null recipes before setting the state
          setBookmarkedRecipes(recipes.filter((recipe) => recipe !== null));
        } catch (error) {
          console.error('Error fetching bookmarked recipes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookmarkedRecipes();
  }, []);

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
      <FlatList
        data={bookmarkedRecipes}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => <RecipeComponent recipeId={item.id} />}
      />
    </SafeAreaView>
  );
}

export default BookmarkScreen;
