import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface ImageViewerProps {
  placeholderImageSource: any;
  selectedImage: string | null;
}

function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: ImageViewerProps) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  loadingIndicator: {
    position: 'absolute',
  },
});

export default ImageViewer;
