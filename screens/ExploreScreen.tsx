import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import RecipeComponent from '../components/RecipeComponent';

function ExploreScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <RecipeComponent recipeId="MF6gUpKXslP7auPYphPm" />
          <RecipeComponent recipeId="TOGlPQ4OOIJPjhPxouEg" />
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
