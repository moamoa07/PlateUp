import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CustomLoader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/gif/toaster-loader.gif')}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 100, // Set as per your GIF's size
    height: 100, // Set as per your GIF's size
  },
});

export default CustomLoader;
