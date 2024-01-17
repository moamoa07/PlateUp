import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  PixelRatio,
  StyleSheet,
  Text,
  View,
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

const RecipeList = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const lastFetchedRecipeId = useAppSelector(selectLastFetchedRecipeId);
  const isLoading = useAppSelector(selectIsLoading);
  const hasMoreRecipes = useAppSelector(selectHasMoreRecipes);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes(null, 3));
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasMoreRecipes) {
      dispatch(fetchRecipes(lastFetchedRecipeId, 3));
    }
  };

  return (
    <FlatList
      data={recipes.filter((recipe): recipe is RecipeWithId => !!recipe.id)}
      renderItem={({ item }) => <RecipeComponent recipe={item} />}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      ListHeaderComponent={
        <View style={styles.screenHeader}>
          <Text style={styles.h3}>Explore Recipes</Text>
        </View>
      }
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : !hasMoreRecipes ? (
          <Text style={styles.endOfListMessage}>You've reached the end!</Text>
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default RecipeList;
