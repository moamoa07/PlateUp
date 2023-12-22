import { NavigationProp } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
  navigation: NavigationProp<
    any,
    any
  > /*Change to another type instead of any!!*/;
}

function List({ navigation }: RouterProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button mode="outlined" onPress={() => navigation.navigate('Home')}>
        Open details
      </Button>
      <Button mode="outlined" onPress={() => FIREBASE_AUTH.signOut()}>
        Sign Out
      </Button>
    </View>
  );
}

export default List;
