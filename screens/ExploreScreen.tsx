import { SafeAreaView, StyleSheet, View } from 'react-native';
import RecipeList from '../components/RecipeList';

function ExploreScreen() {
  return (
    <SafeAreaView>
      <View>
        <RecipeList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default ExploreScreen;
