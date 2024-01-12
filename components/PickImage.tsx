import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import { PickImageProps } from '../types/PickImageProps';
import ImageViewer from './ImageViewer';

function PickImage({
  onChange,
  resetTrigger,
  onResetComplete,
  errorMessage,
  onImageUploadError,
}: PickImageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];

      try {
        const compressedImage = await ImageManipulator.manipulateAsync(
          selectedAsset.uri,
          [{ resize: { width: 1080 } }], // Might have to adjust this after testing
          { compress: 0.7 } // Compression 70% - might have to adjust this after testing
        );

        setSelectedImage(compressedImage.uri);
        onChange(compressedImage.uri);
        onImageUploadError?.('');
      } catch (error) {
        console.error('Error during image manipulation:', error);
        onImageUploadError?.('Error compressing the image');
      }
    } else {
      onImageUploadError?.('');
      alert('You did not select any image.');
    }
  };

  useEffect(() => {
    if (resetTrigger) {
      setSelectedImage(null);
      onChange(null);
      if (onResetComplete) {
        onResetComplete();
      }
    }
  }, [resetTrigger, onChange, onResetComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={require('../assets/waffle.jpg')}
          selectedImage={selectedImage}
        />
      </View>
      <Button
        onPress={pickImageAsync}
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Add image
      </Button>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.primary,
    color: '#fff',
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 10,
    width: '100%',
    height: 400,
    // height: 40,
  },
  errorMessage: {
    fontFamily: 'Jost-Regular',
    color: 'red',
    fontSize: 16,
    marginTop: 6,
  },
});

export default PickImage;
