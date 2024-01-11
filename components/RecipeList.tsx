import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import { Recipe } from '../api/model/recipeModel';
import { getAllRecipes } from '../api/service/recipeService';
import RecipeComponent from './RecipeComponent';

// Define a new type that includes the 'id' property
interface RecipeWithId extends Recipe {
  id: string;
}

const RecipesList = () => {
  // Specify the type of the recipes state
  const [recipes, setRecipes] = useState<RecipeWithId[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = await getAllRecipes();
        setRecipes(allRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeComponent key={recipe.id} recipeId={recipe.id} />
        ))
      ) : (
        <Text>No recipes found</Text>
      )}
    </ScrollView>
  );
};

export default RecipesList;
