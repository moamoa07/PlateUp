import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { FIREBASE_AUTH } from '../FirebaseConfig';

function SignInScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('You signed in!');
    } catch (error) {
      console.log(error);
      alert('Registration failed, try again!');
    }
  };

  // const createProfile = async () => {
  //   try {
  //     const response = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     // console.log(response);
  //     alert('Check your email!');
  //   } catch (error: any) {
  //     /*Change to another type instead of any!!*/
  //     console.log(error);
  //     alert('Registration failed, try again!' + error.message);
  //   }
  // };

  return (
    <View
      style={[styles.container]}
      // { backgroundColor: theme.colors.background }
    >
      <KeyboardAvoidingView behavior="padding">
        <Text style={[styles.title]}>Sign In</Text>
        <TextInput
          value={email}
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          contentStyle={{ fontFamily: 'Jost-Regular' }}
          style={[styles.textInput]}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          label="Password"
          mode="outlined"
          autoCapitalize="none"
          contentStyle={{ fontFamily: 'Jost-Regular' }}
          style={[styles.textInput]}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <>
          <Button mode="outlined" onPress={signIn}>
            <Text style={styles.text}>Sign In</Text>
          </Button>
          {/* <Button mode="contained" onPress={createProfile}>
            <Text style={styles.textWhite}>Create Profile</Text>
          </Button> */}
        </>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  title: {
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    fontSize: 24,
    height: 30,
  },
  textInput: {
    width: 250,
  },
  text: {
    fontFamily: 'Jost-Regular',
  },
  textWhite: {
    fontFamily: 'Jost-Regular',
    color: '#fff',
  },
});

export default SignInScreen;
