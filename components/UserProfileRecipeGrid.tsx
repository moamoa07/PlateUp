import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RecipeWithId } from '../api/model/recipeModel';
import { fetchUserRecipes, selectUserRecipes } from '../redux/reducers/recipes';
import { currentUser } from '../redux/reducers/users';
import { AppDispatch, RootState } from '../redux/store';

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
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={userRecipes}
      renderItem={renderRecipeThumbnail}
      style={styles.gridContainer}
      // Define styles for numColumns and other layout properties
      numColumns={3}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    marginVertical: 0,
    display: 'flex',
    gap: 4,
  },
  thumbnail: {
    width: 120,
    height: 120,
    flex: 3,
  },
});

export default UserProfileRecipeGrid;
