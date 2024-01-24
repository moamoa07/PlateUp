import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Images } from '../api/model/imageModel';
import { getImageById } from '../api/service/recipeService';
import CustomLoader from './CustomLoader';

function GetImage() {
  const [image, setImage] = useState<Images | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      const imageData = await getImageById('VNmkuGMeWuhqyGcYmhPp');
      setImage(imageData as Images);
      setLoading(false);
    };

    fetchImage();
  }, []);

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!image) {
    return <Text>No image found</Text>;
  }
  return (
    <View>
      {image.imageUrl && (
        <Image
          source={{ uri: image.imageUrl }}
          style={{ width: 'auto', height: 500 }}
        />
      )}
    </View>
  );
}

export default GetImage;
