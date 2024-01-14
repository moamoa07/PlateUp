import { Link } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { CustomUser } from '../api/model/userModel';
import { CreateProfileSchema } from '../api/schema/createProfileSchema';
import TermsAndPrivacyModal from '../components/TermsAndPrivacyModal';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setUser } from '../redux/users';

function CreateProfileScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const [username, setUsername] = useState('');
  const [isFocused, setFocused] = useState(false);
  const dispatch = useAppDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // This code works, but is blocked by the rules on db, will keep this if we have time to
  // do it in another way but still keep this code here :)

  // const checkUsernameAvailability = async (username: string) => {
  //   const usersCollection = collection(FIREBASE_DB, 'users');
  //   const usernameQuery = query(
  //     usersCollection,
  //     where('displayName', '==', username)
  //   );
  //   const querySnapshot = await getDocs(usernameQuery);

  //   return querySnapshot.size > 0; // If size > 0, username is taken; otherwise, it's available.
  // };

  const createProfile = async () => {
    try {
      // const usernameExists = await checkUsernameAvailability(username);

      // if (usernameExists) {
      //   Alert.alert(
      //     'Username is already taken. Please choose a different one.'
      //   );
      //   return;
      // }

      await CreateProfileSchema.validate(
        { email, password, username },
        { abortEarly: false }
      );

      if (password !== confirmPassword) {
        Alert.alert('Password does not match');
        return;
      }

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

      const defaultProfileImageUrl =
        'https://github.com/moamoa07/PlateUp/assets/113519935/a3aa104c-d5ff-4d1b-bcd5-54a10fd00fd7';

      await updateProfile(user, {
        displayName: username,
        photoURL: defaultProfileImageUrl,
      });

      const newUser: CustomUser = {
        id: user.uid,
        displayName: username,
        email: email,
        photoURL: defaultProfileImageUrl,
      };

      // Write user data to Firestore
      await addDoc(collection(FIREBASE_DB, 'users'), newUser);

      dispatch(setUser(newUser));

      Alert.alert('Profile created successfully!');
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const errorMessage = error.errors.join('\n');
        Alert.alert('Validation failed', errorMessage);
      } else {
        console.log('Error creating user profile:', error.message);
        Alert.alert('Registration failed', `Error: ${error.message}`);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
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
            style={[styles.textInput, { marginBottom: 10 }]}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            value={confirmPassword}
            label={
              <Text style={{ fontFamily: 'Jost-Regular' }}>
                Confirm password
              </Text>
            }
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
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View style={[styles.buttonContainer]}>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              labelStyle={{ marginVertical: 10 }}
              style={[styles.button]}
              onPress={createProfile}
            >
              <Text style={styles.textWhite}>Sign up</Text>
            </Button>
          </View>
          <TermsAndPrivacyModal
            isVisible={isModalVisible}
            hideModal={hideModal}
          />
          <View style={[styles.termsTextContainer]}>
            <Text style={[styles.termsText]}>
              By signing up, you agree to PlateUp's
            </Text>
            <Text onPress={showModal}>Terms of Use & Privacy Policy</Text>
          </View>
          <View style={[styles.linkContainer]}>
            <Text style={[styles.linkText1]}>Already have a profile?</Text>
            <Link to={{ screen: 'SignInScreen' }}>
              <Text style={[styles.linkText2]}>Sign in</Text>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    fontSize: 24,
    height: 30,
    marginBottom: 20,
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
    fontSize: 16,
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
