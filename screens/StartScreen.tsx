import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function Start() {
  const [fontsLoaded] = useFonts({
    CrakeRegular: require('../assets/fonts/craketest-regular.otf'),
    CrakeBold: require('../assets/fonts/craketest-bold.otf'),
    Jost: require('../assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  return (
    <View style={styles.container}>
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
        <Text style={styles.textBtn}>Create a profile</Text>
      </Button>
      <Button mode="outlined" textColor="#000000" style={styles.outlinedButton}>
        <Text style={styles.textBtn}>Sign in</Text>
      </Button>
    </View>
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
    textAlign: 'center',
    fontFamily: 'CrakeRegular',
  },
  p: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Jost',
  },
  textBtn: {
    fontFamily: 'Jost',
  },
  containedButton: {
    borderRadius: 10,
  },
  outlinedButton: {
    borderColor: '#000000',
    borderRadius: 10,
  },
});

export default Start;
