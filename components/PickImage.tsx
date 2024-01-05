import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { addImage } from '../api/service/recipeService';
import ImageViewer from './ImageViewer';

function PickImage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      // Call addRecipe with the selected image URI
      await addImage({
        imageUrl: result.assets[0].uri,
      });
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={pickImageAsync} mode="outlined" style={styles.button}>
        <Text>Add image</Text>
      </Button>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={require('../assets/waffle.jpg')}
          selectedImage={selectedImage}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 40,
    padding: 10,
  },
  imageContainer: {
    marginTop: 10,
    width: '100%',
    height: 400,
  },
});

export default PickImage;
