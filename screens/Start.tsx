import { StyleSheet, Text, View } from 'react-native';

function Start() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to PlateUp</Text>
      <Text style={styles.p}>
        Delighted you're joining us! Create an account to save and share your
        unique recipes with our community. Start your culinary journey now!
      </Text>
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
  },
  h1: {
    fontSize: 40,
    textAlign: 'center',
  },
  p: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Start;
