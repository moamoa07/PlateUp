import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';

type RootStackParamList = {
  Welcome: undefined;
  SignInScreen: undefined;
  CreateProfileScreen: undefined;
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
}

function Welcome({ navigation }: Props) {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    });

    fadeInAnimation.start();

    return () => {
      // Clean up animation on component unmount
      fadeInAnimation.stop();
    };
  }, [fadeAnimation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnimation }]}>
      <View style={[styles.textContainer]}>
        <Text style={styles.h1}>Welcome to PlateUp</Text>
        <Text style={styles.p}>
          Delighted you're joining us! Create an account to save and share your
          unique recipes with our community. Start your culinary journey now!
        </Text>
      </View>
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        style={styles.containedButton}
        labelStyle={{ marginHorizontal: 10 }}
        onPress={() => navigation.navigate('CreateProfileScreen')}
      >
        <Text style={[styles.textBtn]}>Create a profile</Text>
      </Button>
      <Button
        mode="outlined"
        textColor={theme.colors.primary}
        style={styles.outlinedButton}
        labelStyle={{ marginHorizontal: 0 }}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={[styles.textBtn]}>Sign in</Text>
      </Button>
      <View style={[styles.imageContainer]}>
        <Image
          style={[styles.garlicImg]}
          source={require('../assets/figmaImages/garlic.png')}
        />
        <Image
          style={[styles.tomatoImg]}
          source={require('../assets/figmaImages/tomato.png')}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
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
    fontSize: 15,
  },
  containedButton: {
    borderRadius: 10,
    zIndex: 20,
  },
  outlinedButton: {
    borderColor: '#232323',
    borderRadius: 10,
    zIndex: 20,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 90,
    justifyContent: 'space-between',
    width: '100%',
  },
  garlicImg: {
    width: 90,
    height: 107,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  tomatoImg: {
    width: 190,
    height: 180,
    resizeMode: 'cover',
  },
});

export default Welcome;
