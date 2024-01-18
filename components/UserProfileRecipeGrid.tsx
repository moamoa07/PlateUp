import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RecipeWithId } from '../api/model/recipeModel';
import { fetchUserRecipes, selectUserRecipes } from '../redux/reducers/recipes';
import { currentUser } from '../redux/reducers/users';
import { AppDispatch, RootState } from '../redux/store';

// Get the screen width
// Calculation for styling of grid container
const { width } = Dimensions.get('window');
const numColumns = 3;
const marginSize = 4; // You can adjust the margin size here
const imageSize = (width - (numColumns + 1) * marginSize) / numColumns;

function UserProfileRecipeGrid({ navigation }: { navigation: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(currentUser)?.id ?? '';
  const userRecipes = useSelector((state: RootState) =>
    selectUserRecipes(state, userId)
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRecipes(userId));
    }
  }, [userId, dispatch]);

  const renderRecipeThumbnail = ({ item }: { item: RecipeWithId }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Image
        source={{
          uri:
            item.imageUrl ??
            require('../assets/img/add-new-recipe-placeholder.png'),
        }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={userRecipes}
      renderItem={renderRecipeThumbnail}
      contentContainerStyle={styles.gridContainer}
      // Define styles for numColumns and other layout properties
      numColumns={3}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: marginSize,
  },
  thumbnail: {
    width: imageSize, // Width calculated based on screen width and margins
    height: imageSize, // Same value for height to maintain aspect ratio
    margin: marginSize,
  },
});

export default UserProfileRecipeGrid;
