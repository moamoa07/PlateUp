import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../Theme';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchUserRecipes } from '../redux/actions/recipeActions';
import {
  selectHasMoreUserRecipes,
  selectLoadingUserRecipes,
  selectUserLastFetchedRecipeId,
  selectUserRecipes,
} from '../redux/reducers/recipes';
import CustomLoader from './CustomLoader';
import UserProfileHeader from './UserProfileHeader';

// Get the screen width
// Calculation for styling of grid container
const { width } = Dimensions.get('window');
const containerPadding = 10; // This is the padding you want for the grid container
const numColumns = 3;
const marginSize = 8;
// Subtract container padding from the total width before dividing by the number of columns
// Total margin space taken by the gaps between thumbnails
const totalMarginSpace = (numColumns - 1) * marginSize;
// Subtract the total margin space and the padding from the width
const imageSize =
  (width - totalMarginSpace - containerPadding * 2) / numColumns;

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

  const renderHeader = () => {
    return <UserProfileHeader />;
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
      {/* <Text>{item.title}</Text> */}
    </TouchableOpacity>
  );

  const renderNoRecipesMessage = () => {
    if (userRecipes.length === 0 && !loadingUserRecipes) {
      return (
        <>
          <Text style={styles.noRecipeMessage}>
            You haven't added any recipes yet.
          </Text>
          <Text style={[styles.noRecipeMessage, styles.gap]}>
            Get stated by clicking the '+' to share your recipes!
          </Text>
        </>
      );
    }
    return null;
  };

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
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
          <CustomLoader />
        ) : !hasMoreUserRecipes && userRecipes.length > 0 ? (
          <Text style={styles.endOfListMessage}>
            You've loaded all recipes!
          </Text>
        ) : null
      }
      ListEmptyComponent={renderNoRecipesMessage}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center', // Changed to 'stretch' to fill the container width
    padding: containerPadding,
    width: '100%',
  },
  thumbnail: {
    backgroundColor: theme.colors.secondary,
    width: imageSize,
    height: imageSize,
    margin: marginSize / 2, // Apply half margin size to each side
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
    width: imageSize,
  },
  noRecipeMessage: {
    fontFamily: 'Crake-Regular',
    fontSize: 35,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  gap: {
    marginTop: 40,
  },
});

export default UserProfileRecipeGrid;
