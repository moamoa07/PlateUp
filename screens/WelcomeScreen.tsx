import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// const getFonts = () =>
//   Font.loadAsync({
//     'Crake-Regular': require('./assets/fonts/craketest-regular.otf'),
//     'Crake-Bold': require('./assets/fonts/craketest-bold.otf'),
//     'Jost-Regular': require('./assets/fonts/Jost-VariableFont_wght.ttf'),
//   });

type RootStackParamList = {
  Welcome: undefined;
  SignInScreen: undefined;
  // Add other screens as needed
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
  // Add other props if needed
}

function Welcome({ navigation }: Props) {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to PlateUp</Text>
      <Text style={styles.p}>
        Delighted you're joining us! Create an account to save and share your
        unique recipes with our community. Start your culinary journey now!
      </Text>
      <Button
        mode="contained"
        buttonColor="#000000"
        style={styles.containedButton}
      >
        <Text>Create a profile</Text>
      </Button>
      <Button
        mode="outlined"
        textColor="#000000"
        style={styles.outlinedButton}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text>Sign in</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  h1: {
    fontSize: 40,
    textAlign: 'center',
  },
  p: {
    fontSize: 15,
    textAlign: 'center',
  },
  // textBtn: {
  //   fontFamily: 'Jost',
  // },
  containedButton: {
    borderRadius: 10,
  },
  outlinedButton: {
    borderColor: '#000000',
    borderRadius: 10,
  },
});

export default Welcome;
