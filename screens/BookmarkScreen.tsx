import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../Theme';
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.h3}>Bookmarked Recipes</Text>

      {bookmarkedRecipes.length === 0 ? (
        <View style={styles.noBookmarksTextContainer}>
          <Text style={styles.noBookmarksText}>
            You haven't bookmarked any recipes yet!
          </Text>
        </View>
      ) : (
        <BookmarksGrid
          updatedBookmarks={mockRecipes.filter((recipe) =>
            bookmarkedRecipes.includes(recipe.id)
          )}
          onRecipePress={(item: any) => console.log('Pressed recipe:', item)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  noBookmarksText: {
    fontFamily: 'Crake-Regular',
    fontSize: 35,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookmarksTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    paddingHorizontal: 20,
  },
});

export default BookmarkScreen;
