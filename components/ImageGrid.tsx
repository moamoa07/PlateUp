import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

const ImageGrid = () => {
  const data = [
    {
      url: require('../assets/gridImages/grid-friedrice.png'),
      date: '010101',
    },
    {
      url: require('../assets/gridImages/grid-lasange.png'),
      date: '010102',
    },
    {
      url: require('../assets/gridImages/grid-pasta.png'),
      date: '010103',
    },
    {
      url: require('../assets/gridImages/grid-pizza.png'),
      date: '010104',
    },
    {
      url: require('../assets/gridImages/grid-ramen.png'),
      date: '010105',
    },
    {
      url: require('../assets/gridImages/grid-sandwich.png'),
      date: '010106',
    },
    {
      url: require('../assets/gridImages/grid-soup.png'),
      date: '010107',
    },
    {
      url: require('../assets/gridImages/grid-tacos.png'),
      date: '010108',
    },
    {
      url: require('../assets/gridImages/grid-toast.png'),
      date: '010109',
    },

    // Add more data items as needed
  ];

  const numberOfCols = 3;

  return (
    <View>
      <FlatList
        data={data}
        style={styles.flatlist}
        keyExtractor={(item, index) => item.date}
        numColumns={numberOfCols}
        renderItem={({ item, index }) => (
          <View style={styles.imageFlex}>
            <Image style={styles.image} source={item.url} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 12,
  },
  imageFlex: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    width: '33%', // 3 columns
  },
  image: {
    height: 120,
    width: '100%',
  },
});

export default ImageGrid;
