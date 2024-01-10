import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import RecipeComponent from '../components/RecipeComponent';

function ExploreScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <RecipeComponent recipeId="YHDXJmf2vSlMPwQiTiQm" />
          <RecipeComponent recipeId="YsEeThwnjcQLgrvcfV8C" />
          <RecipeComponent recipeId="hUQJOb6u5anmmwJSYTUf" />
          <RecipeComponent recipeId="B3yWoTcfXgR7WqzFKDBG" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default ExploreScreen;
