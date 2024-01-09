import { SafeAreaView, View } from 'react-native';
import AddRecipeForm from '../components/AddRecipeForm';

function AddRecipeScreen() {
  return (
    <SafeAreaView>
      <View>
        <AddRecipeForm />
      </View>
    </SafeAreaView>
  );
}

export default AddRecipeScreen;
