import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

type RootStackParamList = {
  Welcome: undefined;
  SignInScreen: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
}

function Welcome({ navigation }: Props) {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1500, // Just an example duration, adjust as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnimation }]}>
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
        <Text style={[styles.textBtn]}>Create a profile</Text>
      </Button>
      <Button
        mode="outlined"
        textColor="#000000"
        style={styles.outlinedButton}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={[styles.textBtn]}>Sign in</Text>
      </Button>
    </Animated.View>
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
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
  },
  p: {
    fontSize: 15,
    fontFamily: 'Jost-Regular',
    textAlign: 'center',
  },
  textBtn: {
    fontFamily: 'Jost-Regular',
  },
  containedButton: {
    borderRadius: 10,
  },
  outlinedButton: {
    borderColor: '#000000',
    borderRadius: 10,
  },
});

export default Welcome;
