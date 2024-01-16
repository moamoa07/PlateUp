import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { RecipeWithId } from '../api/model/recipeModel';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchRecipes } from '../redux/actions/recipeActions';
import RecipeComponent from './RecipeComponent';

const thinBorder = 1 / PixelRatio.get();

const RecipeList = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipes.recipes);
  console.log('Recipes in component:', recipes);
  const lastFetchedRecipe = useAppSelector(
    (state) => state.recipes.lastFetchedRecipeId
  );
  const isLoading = useAppSelector((state) => state.recipes.isLoading);
  const hasMoreRecipes = useAppSelector(
    (state) => state.recipes.hasMoreRecipes
  );

  useEffect(() => {
    dispatch(fetchRecipes(null, 2)); // Fetch initial 2 recipes
  }, [dispatch]);

  useEffect(() => {
    console.log('Component updated with new recipes:', recipes);
  }, [recipes]);

  const handleLoadMore = () => {
    dispatch(fetchRecipes(lastFetchedRecipe, 2)); // Fetch next 2 recipes
  };

  return (
    <ScrollView>
      <View style={styles.screenHeader}>
        <Text style={styles.h3}>Explore Recipes</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {recipes
            .filter((recipe): recipe is RecipeWithId => !!recipe.id)
            .map((recipe) => (
              <RecipeComponent key={recipe.id} recipe={recipe} />
            ))}
        </>
      )}
      {!isLoading && hasMoreRecipes && (
        <TouchableOpacity
          onPress={handleLoadMore}
          style={styles.buttonTouchable}
        >
          <Button
            mode="contained"
            style={styles.loadMoreButton}
            labelStyle={styles.buttonLabel}
          >
            Load More Recipes
          </Button>
        </TouchableOpacity>
      )}

      {!isLoading && !hasMoreRecipes && (
        <Text style={styles.endOfListMessage}>
          You've reached the last recipe.
        </Text>
      )}
    </ScrollView>
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
  buttonTouchable: {
    borderRadius: 10,
    flex: 1,
  },
  loadMoreButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
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
