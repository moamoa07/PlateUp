import { Link } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { CustomUser } from '../api/model/userModel';
import { CreateProfileSchema } from '../api/schema/createProfileSchema';
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
          style={[styles.textInput, { marginBottom: 10 }]}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          value={confirmPassword}
          label={
            <Text style={{ fontFamily: 'Jost-Regular' }}>Confirm password</Text>
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
            labelStyle={{ marginHorizontal: 0 }}
            style={[styles.button]}
            onPress={createProfile}
          >
            <Text style={styles.textWhite}>Sign up</Text>
          </Button>
        </View>

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <ScrollView>
              <Text style={styles.modalTitleText}>
                Terms of Use & Privacy Policy
              </Text>
              <View style={styles.modalButtonContainer}>
                <Text>
                  <Text style={styles.modalHeading}>Terms of Use:</Text>
                  {'\n\n'}
                  <Text>
                  Welcome to PlateUp! By accessing and using our app, you agree
                  to comply with and be bound by the following terms and
                  conditions. If you disagree with any part of these terms,
                  please do not use our app.
                  </Text>
                  {'\n\n'}
                  <Text style={styles.subheading}>User Conduct:</Text>
                  {'\n\n'}
                  Users are responsible for the content they post on PlateUp.
                  Respect the rights and privacy of other users. Do not engage
                  in any activities that violate local, state, or international
                  laws.
                  {'\n\n'}
                  <Text style={styles.subheading}>Content Guidelines:</Text>
                  {'\n\n'}
                  Users should not post content that is offensive,
                  discriminatory, or harmful. Respect copyright and intellectual
                  property rights when sharing content.
                  {'\n\n'}
                  <Text style={styles.subheading}>Privacy:</Text>
                  {'\n\n'}
                  Your privacy is important to us. Please review our Privacy
                  Policy to understand how we collect, use, and protect your
                  personal information.
                  {'\n\n'}
                  <Text style={styles.subheading}>Account Security:</Text>
                  {'\n\n'}
                  Keep your login credentials confidential. Report any
                  unauthorized access to your account.
                  {'\n\n'}
                  <Text style={styles.subheading}>Termination:</Text>
                  {'\n\n'}
                  PlateUp reserves the right to terminate accounts that violate
                  our terms of use.
                  {'\n\n'}
                  <Text style={styles.heading}>Privacy Policy:</Text>
                  {'\n\n'}
                  Your privacy is important to us. This Privacy Policy explains
                  how PlateUp collects, uses, and protects your personal
                  information.
                  {'\n\n'}
                  <Text style={styles.subheading}>Information We Collect:</Text>
                  {'\n\n'}
                  PlateUp collects information provided by users during account
                  registration. We may collect data related to your app usage
                  and interactions.
                  {'\n\n'}
                  <Text style={styles.subheading}>
                    How We Use Your Information:
                  </Text>
                  {'\n\n'}
                  Personal information is used to enhance your PlateUp
                  experience. We may use aggregated data for analytics and app
                  improvement.
                  {'\n\n'}
                  <Text style={styles.subheading}>Data Security:</Text>
                  {'\n\n'}
                  PlateUp employs measures to protect your data from
                  unauthorized access. We use secure connections for data
                  transmission.
                  {'\n\n'}
                  <Text style={styles.subheading}>Cookies:</Text>
                  {'\n\n'}
                  PlateUp uses cookies to enhance user experience. Users can
                  manage cookie preferences in their app settings.
                  {'\n\n'}
                  <Text style={styles.subheading}>Third-Party Links:</Text>
                  {'\n\n'}
                  PlateUp may contain links to third-party websites. We are not
                  responsible for their privacy practices.
                  {'\n\n'}
                  <Text style={styles.subheading}>
                    Changes to Privacy Policy:
                  </Text>
                  {'\n\n'}
                  PlateUp may update this Privacy Policy. Users will be notified
                  of any significant changes.
                  {'\n\n'}
                  By using PlateUp, you agree to the terms outlined in this
                  Privacy Policy.
                </Text>
                <Button
                  onPress={hideModal}
                  mode="outlined"
                  style={styles.modalButton}
                >
                  Close
                </Button>
              </View>
            </ScrollView>
          </Modal>
        </Portal>
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
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 40,
    marginTop: 20,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    backgroundColor: 'pink',
  },
  subheading: {
    backgroundColor: 'lightblue',
  },
  modalButton: {
    borderRadius: 10,
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default CreateProfileScreen;
