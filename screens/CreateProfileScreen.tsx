import { Link } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { CustomUser } from '../api/model/userModel';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setUser } from '../redux/users';

function CreateProfileScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const [username, setUsername] = useState('');
  const [isFocused, setFocused] = useState(false);
  const dispatch = useAppDispatch();

  const createProfile = async () => {
    try {
      console.log('Before creating user');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check if authentication was successful
      const user = userCredential.user;

      if (!user) {
        console.error('Authentication failed');
        throw new Error('Authentication failed'); // Handle this case appropriately
      }

      const defaultProfileImageUrl = '../assets/img/chokladkaka.jpeg';

      await updateProfile(user, {
        displayName: username,
        photoURL: defaultProfileImageUrl,
      });

      const newUser: CustomUser = {
        id: user.uid,
        displayName: username,
        email: email,
        photoURL: defaultProfileImageUrl,
        recipeCount: 0,
        likeCount: 0,
        followerCount: 0,
      };

      // Write user data to Firestore
      await addDoc(collection(FIREBASE_DB, 'users'), newUser);

      dispatch(setUser(newUser));

      alert('Profile created successfully. Check your email!');
    } catch (error: any) {
      console.log('Error creating user profile:', error.message);
      alert('Registration failed, try again!' + error.message);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView behavior="padding">
        <Text style={[styles.title]}>Create a profile</Text>
        <TextInput
          value={username}
          label={<Text style={{ fontFamily: 'Jost-Regular' }}>Username</Text>}
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
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          value={email}
          label={<Text style={{ fontFamily: 'Jost-Regular' }}>Email</Text>}
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
          label={<Text style={{ fontFamily: 'Jost-Regular' }}>Password</Text>}
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
        <View style={[styles.buttonContainer]}>
          <Button
            mode="contained"
            buttonColor={theme.colors.primary}
            labelStyle={{ marginHorizontal: 0 }}
            style={[styles.button]}
            onPress={createProfile}
          >
            <Text style={styles.textWhite}>Sign up</Text>
          </Button>
        </View>
        <View style={[styles.termsTextContainer]}>
          <Text style={[styles.termsText]}>
            By signing up, you agree to PlateUp's
          </Text>
          <Text>Terms of Use & Privacy Policy</Text>
        </View>
        <View style={[styles.linkContainer]}>
          <Text style={[styles.linkText1]}>Already have a profile?</Text>
          <Link to={{ screen: 'SignInScreen' }}>
            <Text style={[styles.linkText2]}>Sign in</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 70,
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
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 30,
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
    marginBottom: 60,
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

export default CreateProfileScreen;
