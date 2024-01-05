import { SafeAreaView, Text, View } from 'react-native';
import AddRecipeForm from '../components/AddRecipeForm';

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
