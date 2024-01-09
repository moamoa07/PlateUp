import { SafeAreaView, Text, View } from 'react-native';
import RecipeComponent from '../components/RecipeComponent';

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
