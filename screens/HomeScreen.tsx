import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserFeed from '../components/UserFeed';

function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <UserFeed />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
