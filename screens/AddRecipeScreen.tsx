import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import theme from '../Theme';
import AddRecipeForm from '../components/AddRecipeForm';

function AddRecipeScreen() {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.screenHeader}>
          <Text style={styles.h3}>Add New Recipe</Text>
        </View>
        <AddRecipeForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    marginTop: 32,
    paddingBottom: 16,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
});

export default AddRecipeScreen;
