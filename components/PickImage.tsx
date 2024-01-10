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
  maxSizeInMB,
  onImageUploadError,
}: PickImageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageSizeInMB = result.assets[0]?.fileSize
        ? result.assets[0].fileSize / 1024 / 1024
        : 0; // Convert bytes to MB

      // Check if the image exceeds the maximum size limit
      if (maxSizeInMB && imageSizeInMB > maxSizeInMB) {
        onImageUploadError?.(
          `Image size should be less than ${maxSizeInMB} MB`
        );
      } else {
        // Clear any previous error message
        onImageUploadError?.('');

        // Set the new image
        setSelectedImage(result.assets[0].uri);
        onChange(result.assets[0].uri); // Pass the local image URI back to the parent component
      }
    } else {
      // Clear any previous error message when no image is selected
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
