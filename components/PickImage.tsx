import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../Theme';
import ImageViewer from './ImageViewer';

function PickImage({
  onChange,
  resetTrigger, // new prop to listen for a reset signal
}: {
  onChange: (imageUrl: string | null) => void;
  resetTrigger: boolean; // this could be a number that increments to indicate a reset
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      onChange(result.assets[0].uri);

      // await addImage({
      //   imageUrl: result.assets[0].uri,
      // });
    } else {
      alert('You did not select any image.');
    }
  };

  // Effect to reset the image when the form is submitted
  useEffect(() => {
    if (resetTrigger) {
      setSelectedImage(null); // this clears the local state for the image
      onChange(null); // this tells the parent component to clear its image state as well
    }
  }, [resetTrigger, onChange]);

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
});

export default PickImage;
