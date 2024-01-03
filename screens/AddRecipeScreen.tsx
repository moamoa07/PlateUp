import { SafeAreaView, Text, View } from 'react-native';
import AddRecipeForm from '../components/addRecipeForm';

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
