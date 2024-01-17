import { SafeAreaView, View } from 'react-native';
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

export default ExploreScreen;
