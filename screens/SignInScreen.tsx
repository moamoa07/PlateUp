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
  const [isFocused, setFocused] = useState(false);

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
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView behavior="padding">
        <Text style={[styles.title]}>Sign In</Text>
        <TextInput
          value={email}
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          contentStyle={{ fontFamily: 'Jost-Regular' }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          outlineStyle={{
            borderRadius: 10,
            borderColor: isFocused
              ? theme.colors.primary
              : theme.colors.secondary,
          }}
          style={[styles.textInput, { marginBottom: 10 }]}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          label="Password"
          mode="outlined"
          autoCapitalize="none"
          contentStyle={{ fontFamily: 'Jost-Regular' }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          outlineStyle={{
            borderRadius: 10,
            borderColor: isFocused
              ? theme.colors.primary
              : theme.colors.secondary,
          }}
          style={[styles.textInput]}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={[styles.passwordText, { color: theme.colors.primary }]}>
          Forgot password?
        </Text>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            labelStyle={{ marginHorizontal: 0 }}
            style={[styles.button]}
            onPress={signIn}
          >
            <Text style={[styles.textWhite]}>Sign in</Text>
          </Button>
        </View>
        {/* <View style={[styles.termsTextContainer]}>
          <Text style={[styles.termsText]}>
            By signing up, you agree to PlateUp's
          </Text>
          <Text>Terms of Use & Privacy Policy</Text>
        </View> */}
        <View style={[styles.linkContainer]}>
          <Text style={[styles.linkText1]}>New to PlateUp?</Text>
          <Text style={[styles.linkText2]}>Create a profile</Text>
        </View>

        {/* <Button mode="contained" onPress={createProfile}>
            <Text style={styles.textWhite}>Create Profile</Text>
          </Button> */}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 100,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    fontSize: 24,
    height: 30,
    marginBottom: 15,
  },
  textInput: {
    width: 260,
    borderRadius: 25,
  },
  passwordText: {
    fontFamily: 'Jost-Regular',
    marginLeft: 5,
    marginTop: 4,
    marginBottom: 30,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    borderRadius: 10,
  },
  textWhite: {
    fontFamily: 'Jost-Regular',
    fontSize: 15,
    color: '#fff',
  },
  termsTextContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },
  termsText: {
    color: '#696969',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  linkText1: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  linkText2: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
});

export default SignInScreen;
