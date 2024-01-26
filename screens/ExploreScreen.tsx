import { SafeAreaView, View } from 'react-native';
import ExploreGrid from '../components/ExploreGrid';

function ExploreScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView>
      <View>
        <ExploreGrid navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default ExploreScreen;
