import { View } from 'react-native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <View>
        <Text>Home Screen</Text>
      </View>
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
