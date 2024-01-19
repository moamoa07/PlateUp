// RecipeDetailScreen.tsx
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomLoader from '../components/CustomLoader';
import RecipeDetail from '../components/RecipeDetail';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootStackParamList } from '../navigators/RootStackParamList';
import { fetchRecipeById } from '../redux/actions/recipeActions';
import {
  selectCurrentRecipe,
  selectIsLoading,
} from '../redux/reducers/recipes';

type RecipeDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'RecipeDetail'
>;

interface RecipeDetailScreenProps {
  route: RecipeDetailScreenRouteProp;
}

function RecipeDetailScreen({ route }: RecipeDetailScreenProps) {
  console.log(route.params.recipeId);
  const { recipeId } = route.params;
  const dispatch = useAppDispatch();
  const currentRecipe = useAppSelector(selectCurrentRecipe);
  const isLoading = useAppSelector(selectIsLoading);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (recipeId) {
        dispatch(fetchRecipeById(recipeId));
      }
    });

    return unsubscribe;
  }, [navigation, recipeId, dispatch]);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
    }
  }, [recipeId, dispatch]);

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!currentRecipe || typeof currentRecipe === 'boolean') {
    // Checking if currentRecipe is not an object
    return <Text style={styles.noRecipeFoundMessage}>No recipe found!</Text>;
  }
  console.log(currentRecipe);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <RecipeDetail recipe={currentRecipe} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noRecipeFoundMessage: {
    fontFamily: 'Crake-Regular',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default RecipeDetailScreen;
