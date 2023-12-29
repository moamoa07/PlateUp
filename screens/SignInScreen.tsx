import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';

function SignIn() {
  const theme = useTheme();
  const [isLoaded] = useFonts({
    CrakeRegular: require('../assets/fonts/craketest-regular.otf'),
    CrakeBold: require('../assets/fonts/craketest-bold.otf'),
    Jost: require('../assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('You signed in!');
    } catch (error) {
      console.log(error);
      alert('Registration failed, try again!');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(response);
      alert('Check your email!');
    } catch (error: any) {
      /*Change to another type instead of any!!*/
      console.log(error);
      alert('Registration failed, try again!' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      onLayout={handleOnLayout}
    >
      <KeyboardAvoidingView behavior="padding">
        <Text style={[styles.title]}>Sign In</Text>
        <TextInput
          value={email}
          label="Email"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          label="Password"
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size={'large'} color="#ae45d1" />
        ) : (
          <>
            <Button mode="outlined" onPress={signIn}>
              <Text style={styles.text}>Sign In</Text>
            </Button>
            <Button mode="contained" onPress={createProfile}>
              <Text style={styles.textWhite}>Create Profile</Text>
            </Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'CrakeBold',
  },
  text: {
    fontFamily: 'Jost',
  },
  textWhite: {
    fontFamily: 'Jost',
    color: '#fff',
  },
});

export default SignIn;
