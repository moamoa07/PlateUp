import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PickImage from '../components/PickImage';

function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <PickImage />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
