import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUserRecipes } from '../redux/actions/recipeActions';
import {
  selectHasMoreUserRecipes,
  selectLoadingUserRecipes,
  selectUserLastFetchedRecipeId,
  selectUserRecipes,
} from '../redux/reducers/recipes';

// Get the screen width
// Calculation for styling of grid container
const { width } = Dimensions.get('window');
const numColumns = 3;
const marginSize = 4; // You can adjust the margin size here
const imageSize = (width - (numColumns + 1) * marginSize) / numColumns;

function UserProfileRecipeGrid({ navigation }: { navigation: any }) {
  const dispatch = useAppDispatch();
  const userRecipes = useAppSelector(selectUserRecipes);
  const loadingUserRecipes = useAppSelector(selectLoadingUserRecipes);
  const userLastFetchedRecipeId = useAppSelector(selectUserLastFetchedRecipeId);
  const hasMoreUserRecipes = useAppSelector(selectHasMoreUserRecipes);
  const INITIAL_FETCH_LIMIT = 9;
  const auth = getAuth();
  const userId = auth.currentUser?.uid ?? '';

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRecipes(userId, null, INITIAL_FETCH_LIMIT));
    }
  }, [userId, dispatch]);

  const handleLoadMore = () => {
    if (hasMoreUserRecipes && !loadingUserRecipes) {
      dispatch(
        fetchUserRecipes(userId, userLastFetchedRecipeId, INITIAL_FETCH_LIMIT)
      );
    }
  };

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
      <Text style={styles.recipeTitle}>{item.title}</Text>
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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingUserRecipes ? (
          <ActivityIndicator size={'large'} />
        ) : !hasMoreUserRecipes ? (
          <Text style={styles.endOfListMessage}>
            You've reached the last recipe!
          </Text>
        ) : null
      }
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
  endOfListMessage: {
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#888',
  },
  recipeTitle: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  userId: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserProfileRecipeGrid;
