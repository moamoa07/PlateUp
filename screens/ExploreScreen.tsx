import { SafeAreaView, View } from 'react-native';
import RecipesList from '../components/RecipeList';

function ExploreScreen() {
  return (
    <SafeAreaView>
      <View>
        <RecipesList />
      </View>
    </SafeAreaView>
  );
}

export default ExploreScreen;
