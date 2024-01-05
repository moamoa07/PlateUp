import { SafeAreaView, Text, View } from 'react-native';
import RecipeComponent from '../components/NewRecipeComponent';

function ExploreScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Explore Screen</Text>
        <RecipeComponent recipeId="tKWpZramrLoHOQBHAHF5" />
      </View>
    </SafeAreaView>
  );
}

export default ExploreScreen;
