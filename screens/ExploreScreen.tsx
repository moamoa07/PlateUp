import { SafeAreaView, View } from 'react-native';
import ExploreGrid from '../components/ExploreGrid';

function ExploreScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <View>
        {/* <RecipeList /> */}
        <ExploreGrid navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default ExploreScreen;
