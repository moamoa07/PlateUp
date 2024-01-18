import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookmarksGrid from './BookmarksGrid';
import { mockRecipes } from './HomeScreen';

interface BookmarkScreenProps {
  bookmarkedRecipes: string[]; // Update the type accordingly
  toggleBookmark: (recipeId: string) => void;
}

function BookmarkScreen({
  bookmarkedRecipes,
  toggleBookmark,
}: BookmarkScreenProps) {
  return (
    <SafeAreaView>
      <BookmarksGrid
        updatedBookmarks={mockRecipes.filter((recipe) =>
          bookmarkedRecipes.includes(recipe.id)
        )}
        onRecipePress={(item: any) => console.log('Pressed recipe:', item)}
      />
    </SafeAreaView>
  );
}

export default BookmarkScreen;
