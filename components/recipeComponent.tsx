import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Recipe } from '../api/model/recipeModel';
import { getRecipeById } from '../api/service/recipeService';

interface RecipeComponentProps {
  recipeId: string;
}

const RecipeComponent: React.FC<RecipeComponentProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipeById('tKWpZramrLoHOQBHAHF5');
      setRecipe(recipeData as Recipe);
      setLoading(false);
    };

    fetchRecipe();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!recipe) {
    return <Text>No recipe found</Text>;
  }

  return (
    <View>
      {recipe.imageUrl && (
        <Image
          source={{ uri: recipe.imageUrl }}
          style={{ width: 'auto', height: 500 }}
        />
      )}
      <Text>{recipe.title}</Text>
      <Text>{recipe.description}</Text>
      <Text>{recipe.servingDetails}</Text>
      <Text>{recipe.prepTime}</Text>
      <Text>{recipe.cookTime}</Text>
      {/* Render other recipe details here */}
    </View>
  );
};

export default RecipeComponent;
