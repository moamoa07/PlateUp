import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../Theme';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchRecipes } from '../redux/actions/recipeActions';
import {
  selectHasMoreRecipes,
  selectIsLoading,
  selectLastFetchedRecipeId,
  selectRecipes,
} from '../redux/reducers/recipes';
import RecipeComponent from './RecipeComponent';

const thinBorder = 1 / PixelRatio.get();

// Get the screen width
// Calculation for styling of grid container
const { width } = Dimensions.get('window');
const containerPadding = 10; // This is the padding you want for the grid container
const numColumns = 2;
const marginSize = 8;
// Subtract container padding from the total width before dividing by the number of columns
// Total margin space taken by the gaps between thumbnails
const totalMarginSpace = (numColumns - 1) * marginSize;
// Subtract the total margin space and the padding from the width
const imageSize =
  (width - totalMarginSpace - containerPadding * 2) / numColumns;

const ExploreGrid = ({ navigation }: { navigation: any }) => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const lastFetchedRecipeId = useAppSelector(selectLastFetchedRecipeId);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMoreRecipes = useAppSelector(selectHasMoreRecipes);

  // For optimizing performance
  // Prevents unnecessary re-renders of list items when the data hasn't changed
  const RecipeComponentMemo = React.memo(RecipeComponent);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes(null, numColumns * 2)); // Fetch more items for the initial load
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasMoreRecipes) {
      dispatch(fetchRecipes(lastFetchedRecipeId, numColumns * 2));
    }
  };

  const renderRecipeItem = ({ item }: { item: RecipeWithId }) => (
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
      data={recipes}
      renderItem={renderRecipeItem}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.gridContainer}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size={'large'} color="#D6DED1" />
        ) : !hasMoreRecipes ? (
          <Text style={styles.endOfListMessage}>
            You've reached the last recipe!
          </Text>
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    width: '100%',
  },
  screenHeader: {
    marginTop: 32,
    paddingBottom: 16,
    borderBottomWidth: thinBorder,
    borderBottomColor: theme.colors.primary,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  endOfListMessage: {
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#888',
  },
  thumbnail: {
    backgroundColor: theme.colors.secondary,
    width: imageSize,
    height: imageSize,
    margin: marginSize / 2, // Apply half margin size to each side
  },
});

export default ExploreGrid;
