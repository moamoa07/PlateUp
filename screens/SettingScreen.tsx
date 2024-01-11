import { Link } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Modal, Portal, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import AccountIcon from '../components/icons/AccountIcon';
import HelpIcon from '../components/icons/HelpIcon';
import SignOutIcon from '../components/icons/SignOutIcon';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setSignOutState } from '../redux/users';

function SettingScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const onSignOut = async () => {
    try {
      hideModal(); // Close the modal before signing out
      await FIREBASE_AUTH.signOut();

      // Dispatch the signOut action to update the Redux store
      dispatch(setSignOutState());

      console.log('User signed out successfully');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <Link to={{ screen: 'Home' }} style={styles.link}>
          <View style={styles.linkContent}>
            <AccountIcon size={32} fill={'#232323'} />
            <Text style={styles.text}>Edit Profile</Text>
          </View>
        </Link>
        <Link to={{ screen: 'Home' }} style={styles.link}>
          <View style={styles.linkContent}>
            <HelpIcon size={32} fill={'#232323'} />
            <Text style={styles.text}>Help</Text>
          </View>
        </Link>

        <Button
          mode="outlined"
          onPress={showModal}
          style={styles.button}
          icon={() => <SignOutIcon size={32} fill={'#232323'} />}
        >
          <Text style={[styles.text, { color: '#232323' }]}>Sign Out</Text>
        </Button>

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalText}>
              Are you sure you want to sign out?
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button
                onPress={hideModal}
                mode="outlined"
                style={styles.modalButton}
              >
                Go back
              </Button>
              <Button
                onPress={onSignOut}
                mode="contained"
                style={styles.modalButton}
              >
                Sign Out
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontFamily: 'Crake-Bold',
    fontSize: 24,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Jost-Regular',
    marginLeft: 10,
  },
  link: {
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },

  linkContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 40,
    padding: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  modalText: {
    fontFamily: 'Jost-Regular',
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 10,
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});

export default SettingScreen;
