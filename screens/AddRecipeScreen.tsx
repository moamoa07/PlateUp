import { SafeAreaView, Text, View } from 'react-native';
import AddRecipeForm from '../components/RecipeForm';

function AddRecipeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Recipe Screen</Text>
        <AddRecipeForm />
      </View>
    </SafeAreaView>
  );
}

export default AddRecipeScreen;
