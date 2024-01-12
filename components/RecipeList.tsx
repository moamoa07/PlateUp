import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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
import { Recipe } from '../api/model/recipeModel';
import { getAllRecipes } from '../api/service/recipeService';
import RecipeComponent from './RecipeComponent';

// Define a new type that includes the 'id' property
interface RecipeWithId extends Recipe {
  id: string;
}

const thinBorder = 1 / PixelRatio.get();

const RecipesList = () => {
  const [recipes, setRecipes] = useState<RecipeWithId[]>([]);
  const [lastFetchedRecipe, setLastFetchedRecipe] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);

  const fetchRecipes = async (
    lastRecipe: QueryDocumentSnapshot<DocumentData> | null = null
  ) => {
    if (isFetchingMore) {
      return; // Prevent multiple fetches at the same time
    }

    setIsFetchingMore(true);
    const fetchedData = await getAllRecipes(lastRecipe);
    setRecipes((prev) =>
      lastRecipe ? [...prev, ...fetchedData.recipes] : fetchedData.recipes
    );
    setLastFetchedRecipe(fetchedData.lastFetchedRecipe);
    setHasMoreRecipes(!!fetchedData.lastFetchedRecipe);
    setLoading(false);
    setIsFetchingMore(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <ScrollView>
      <View style={styles.screenHeader}>
        <Text style={styles.h3}>Explore Recipes</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {recipes.map((recipe) => (
            <RecipeComponent key={recipe.id} recipeId={recipe.id} />
          ))}
        </>
      )}
      {hasMoreRecipes && (
        <TouchableOpacity
          onPress={() => fetchRecipes(lastFetchedRecipe)}
          disabled={isFetchingMore}
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

      {!hasMoreRecipes && !isLoading && (
        <Text style={styles.endOfListMessage}>You've reached the last recipe.</Text>
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

export default RecipesList;
