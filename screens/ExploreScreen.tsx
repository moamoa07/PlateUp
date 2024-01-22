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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default ExploreScreen;
