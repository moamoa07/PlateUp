import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const ImageGrid = () => {
  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      <View style={styles.imageFlex}>
        <Image source={require('../assets/cupcake.png')} style={styles.image} />
      </View>
      <View style={styles.imageFlex}>
        <Image source={require('../assets/cupcake.png')} style={styles.image} />
      </View>
      <View style={styles.imageFlex}>
        <Image source={require('../assets/cupcake.png')} style={styles.image} />
      </View>
      <View style={styles.imageFlex}>
        <Image source={require('../assets/cupcake.png')} style={styles.image} />
      </View>
      <View style={styles.imageFlex}>
        <Image source={require('../assets/cupcake.png')} style={styles.image} />
      </View>
      <View style={styles.imageFlex}>
        <Image source={require('../assets/cupcake.png')} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageFlex: {
    width: '30%',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100, // Adjust the height as needed
    borderRadius: 8, // Optional: add border radius for rounded corners
  },
});

export default ImageGrid;
