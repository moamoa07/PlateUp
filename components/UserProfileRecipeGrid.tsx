import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUserRecipes } from '../redux/reducers/recipes';
import { currentUser } from '../redux/users';

// ... other imports

const UserProfileRecipeGrid = ({ navigation, userId }) => {
  // State to hold user's recipes
  const [userRecipes, setUserRecipes] = useState([]);
  // In your UserProfile component
  const userId = useSelector(currentUser)?.id; // Assuming currentUser returns the logged-in user
  const userRecipes = useSelector((state) => selectUserRecipes(state, userId));

  useEffect(() => {
    // Fetch recipes for the given userId
    // Update setUserRecipes with the fetched data
  }, [userId]);

  const renderRecipeThumbnail = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
      {/* Add other details like title, etc., if needed */}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={userRecipes}
      renderItem={renderRecipeThumbnail}
      // Define styles for numColumns and other layout properties
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  thumbnail: {},
});

export default UserProfileRecipeGrid;
