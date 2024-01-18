import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeComponent from '../components/RecipeComponent';
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
      <FlatList
        data={bookmarkedRecipes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <RecipeComponent
            recipe={mockRecipes.find((recipe) => recipe.id === item)!}
            isBookmarked={true}
            onToggleBookmark={() => toggleBookmark(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default BookmarkScreen;
