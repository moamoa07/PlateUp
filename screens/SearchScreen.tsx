import { SafeAreaView, Text, View } from 'react-native';
import GetImage from '../components/GetImage';

function SearchScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Search Screen</Text>
        <GetImage />
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
