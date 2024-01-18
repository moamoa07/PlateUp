import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeComponent from '../components/RecipeComponent';

export const mockRecipes = [
  {
    id: '1',
    title: 'Delicious Chocolate Cake',
    imageUrl:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    servingDetails: 'Serves 8',
    prepTime: '30 minutes',
    cookTime: '1 hour',
    description: 'A rich and moist chocolate cake that everyone will love!',
    additionalNotes: 'Make sure to let it cool before serving.',
    ingredients: [
      {
        ingredientSubtitle: 'Dry Ingredients',
        items: [
          { quantity: '2 cups', name: 'All-purpose flour' },
          { quantity: '1 cup', name: 'Cocoa powder' },
          { quantity: '1.5 teaspoons', name: 'Baking powder' },
        ],
      },
      {
        ingredientSubtitle: 'Wet Ingredients',
        items: [
          { quantity: '1.5 cups', name: 'Sugar' },
          { quantity: '3/4 cup', name: 'Vegetable oil' },
          { quantity: '4', name: 'Eggs' },
        ],
      },
    ],
    instructions: [
      {
        instructionSubtitle: 'Preparing the Batter',
        steps: [
          { instruction: 'Preheat the oven to 350°F (175°C).' },
          { instruction: 'In a bowl, whisk together the dry ingredients.' },
          { instruction: 'In another bowl, beat the eggs and add sugar.' },
        ],
      },
      {
        instructionSubtitle: 'Baking the Cake',
        steps: [
          { instruction: 'Combine the wet and dry ingredients.' },
          { instruction: 'Pour the batter into a greased cake pan.' },
          {
            instruction:
              'Bake for 1 hour or until a toothpick comes out clean.',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Sockerkaka',
    imageUrl:
      'https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    servingDetails: 'Serves 8',
    prepTime: '30 minutes',
    cookTime: '1 hour',
    description: 'A rich and moist chocolate cake that everyone will love!',
    additionalNotes: 'Make sure to let it cool before serving.',
    ingredients: [
      {
        ingredientSubtitle: 'Dry Ingredients',
        items: [
          { quantity: '2 cups', name: 'All-purpose flour' },
          { quantity: '1 cup', name: 'Cocoa powder' },
          { quantity: '1.5 teaspoons', name: 'Baking powder' },
        ],
      },
      {
        ingredientSubtitle: 'Wet Ingredients',
        items: [
          { quantity: '1.5 cups', name: 'Sugar' },
          { quantity: '3/4 cup', name: 'Vegetable oil' },
          { quantity: '4', name: 'Eggs' },
        ],
      },
    ],
    instructions: [
      {
        instructionSubtitle: 'Preparing the Batter',
        steps: [
          { instruction: 'Preheat the oven to 350°F (175°C).' },
          { instruction: 'In a bowl, whisk together the dry ingredients.' },
          { instruction: 'In another bowl, beat the eggs and add sugar.' },
        ],
      },
      {
        instructionSubtitle: 'Baking the Cake',
        steps: [
          { instruction: 'Combine the wet and dry ingredients.' },
          { instruction: 'Pour the batter into a greased cake pan.' },
          {
            instruction:
              'Bake for 1 hour or until a toothpick comes out clean.',
          },
        ],
      },
    ],
  },
];

function HomeScreen() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<string[]>([]); // Update the state type accordingly

  const toggleBookmark = (recipeId: string) => {
    setBookmarkedRecipes((prevBookmarkedRecipes) => {
      const isBookmarked = prevBookmarkedRecipes.includes(recipeId);
      const updatedBookmarks = isBookmarked
        ? prevBookmarkedRecipes.filter((id) => id !== recipeId)
        : [...prevBookmarkedRecipes, recipeId];

      console.log(updatedBookmarks); // Log the updated bookmarks
      return updatedBookmarks;
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>Home Screen</Text>
          {mockRecipes.map((recipe) => (
            <RecipeComponent
              key={recipe.id}
              recipe={recipe}
              isBookmarked={bookmarkedRecipes.includes(recipe.id)}
              onToggleBookmark={() => toggleBookmark(recipe.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
    gap: 24,
  },
});

export default HomeScreen;
