import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

function Start() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to PlateUp</Text>
      <Text style={styles.p}>
        Delighted you're joining us! Create an account to save and share your
        unique recipes with our community. Start your culinary journey now!
      </Text>
      <Button mode="contained" buttonColor="#000000">
        Create a profile
      </Button>
      <Button mode="outlined" textColor="#000000" style={styles.outlinedButton}>
        Sign in
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
  },
  p: {
    fontSize: 15,
    textAlign: 'center',
  },
  outlinedButton: {
    borderColor: '#000000',
  },
});

export default Start;
