import { PixelRatio, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import theme from '../Theme';
import RecipesList from '../components/RecipeList';

const thinBorder = 1 / PixelRatio.get();

function ExploreScreen() {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.screenHeader}>
          <Text style={styles.h3}>Explore Recipes</Text>
        </View>
        <RecipesList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    marginTop: 32,
    paddingBottom: 16,
    borderBottomWidth: thinBorder,
    borderBottomColor: theme.colors.primary,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
});

export default ExploreScreen;
