import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

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
      console.log(response);
      alert('Check your email!');
    } catch (error: any) {
      console.log(error);
      alert('Registration failed, try again!' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text>Sign In</Text>
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
              Sign In
            </Button>
            <Button mode="contained" onPress={createProfile}>
              Create Profile
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
});

export default SignIn;
