import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import theme from '../Theme';
import { recipeSchema } from '../api/schema/recipeSchema';
import { addRecipe } from '../api/service/recipeService';
import { FormErrors } from '../types/FormErrors';
import PickImage from './PickImage';
import RemoveIcon from './icons/RemoveIcon';
import TimerIcon from './icons/TimerIcon';

const AddRecipeForm = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [servingDetails, setServingDetails] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredientGroups, setIngredientGroups] = useState([
    { ingredientSubtitle: '', items: [{ quantity: '', name: '' }] },
  ]);
  const [instructionGroups, setInstructionGroups] = useState([
    { instructionSubtitle: '', steps: [{ instruction: '' }] },
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Function to add ingredient group
  const addIngredientGroup = () => {
    setIngredientGroups([
      ...ingredientGroups,
      { ingredientSubtitle: '', items: [{ quantity: '', name: '' }] },
    ]);
  };

  // Function to add ingredient item with quantity and name of ingredient
  const addIngredientItem = (groupIndex: number) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].items.push({ quantity: '', name: '' });
    setIngredientGroups(newGroups);
  };

  const handleIngredientChange = (
    groupIndex: number,
    itemIndex: number,
    field: 'quantity' | 'name',
    value: string
  ) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].items[itemIndex][field] = value;
    setIngredientGroups(newGroups);

    const errorKey = `ingredients[${groupIndex}].items[${itemIndex}].${field}`;
    setFormErrors({ ...formErrors, [errorKey]: undefined });
  };

  // For ingredient subtitle changes
  const handleIngredientSubtitleChange = (
    groupIndex: number,
    value: string
  ) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].ingredientSubtitle = value;
    setIngredientGroups(newGroups);

    const errorKey = `ingredients[${groupIndex}].ingredientSubtitle`;
    setFormErrors({ ...formErrors, [errorKey]: undefined });
  };

  // Function to handle removal of an ingredient item
  const removeIngredientItem = (groupIndex: number, itemIndex: number) => {
    const newGroups = [...ingredientGroups];
    newGroups[groupIndex].items.splice(itemIndex, 1);
    setIngredientGroups(newGroups);
  };

  const addInstructionGroup = () => {
    setInstructionGroups([
      ...instructionGroups,
      { instructionSubtitle: '', steps: [{ instruction: '' }] },
    ]);
  };

  const addInstructionStep = (groupIndex: number) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].steps.push({ instruction: '' });
    setInstructionGroups(newGroups);
  };

  const handleInstructionChange = (
    groupIndex: number,
    stepIndex: number,
    value: string
  ) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].steps[stepIndex].instruction = value;
    setInstructionGroups(newGroups);

    // Clear the respective error
    const errorKey = `instructions[${groupIndex}].steps[${stepIndex}].instruction`;
    setFormErrors({ ...formErrors, [errorKey]: undefined });
  };

  const removeInstructionStep = (groupIndex: number, stepIndex: number) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].steps.splice(stepIndex, 1);
    setInstructionGroups(newGroups);
  };

  // For instruction subtitle changes
  const handleInstructionSubtitleChange = (
    groupIndex: number,
    value: string
  ) => {
    const newGroups = [...instructionGroups];
    newGroups[groupIndex].instructionSubtitle = value;
    setInstructionGroups(newGroups);

    const errorKey = `instructions[${groupIndex}].instructionSubtitle`;
    setFormErrors({ ...formErrors, [errorKey]: undefined });
  };

  // Handle submit function
  const handleSubmit = async () => {
    Keyboard.dismiss();

    try {
      // Validate form data using Yup
      await recipeSchema.validate(
        {
          imageUrl,
          title,
          description,
          servingDetails,
          prepTime,
          cookTime,
          ingredients: ingredientGroups,
          instructions: instructionGroups,
          additionalNotes,
        },
        { abortEarly: false }
      );

      const newRecipe = {
        imageUrl,
        title,
        description,
        servingDetails,
        prepTime,
        cookTime,
        ingredients: ingredientGroups,
        instructions: instructionGroups,
        additionalNotes,
      };

      await addRecipe(newRecipe);
      console.log('Recipe added successfully');

      // Reset form fields after successful submission
      setImageUrl(null);
      setTitle('');
      setDescription('');
      setServingDetails('');
      setPrepTime('');
      setCookTime('');
      setIngredientGroups([
        { ingredientSubtitle: '', items: [{ quantity: '', name: '' }] },
      ]);
      setInstructionGroups([
        { instructionSubtitle: '', steps: [{ instruction: '' }] },
      ]);
      setAdditionalNotes('');
      setFormSubmitted((prev) => !prev);
      setFormErrors({}); // La till denna sist

      // Alert user of success
      Alert.alert('Success', 'Your recipe has been shared!', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Failed to add recipe:', error);

      if (error instanceof Yup.ValidationError) {
        // Reduce Yup errors into a single object
        const newErrors = error.inner.reduce((acc, err) => {
          // Assert that err.path is a string
          const path = err.path || '';
          return { ...acc, [path]: err.message };
        }, {});
        setFormErrors(newErrors);
      } else {
        // Handle other types of errors (like network errors)
        Alert.alert('Error', 'Failed to add recipe. Please check your input.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h3}>Add new recipe</Text>

        {/* ImageUrl */}
        <PickImage onChange={setImageUrl} resetTrigger={formSubmitted} />

        {/* Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the title of your recipe"
            placeholderTextColor="#888"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setFormErrors({ ...formErrors, title: undefined }); // Clear the title error
            }}
          />
          {formErrors.title && (
            <Text style={styles.errorMessage}>{formErrors.title}</Text>
          )}
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe your recipe"
            placeholderTextColor="#888"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setFormErrors({ ...formErrors, description: undefined }); // Clear the description error
            }}
            multiline
          />
          {formErrors.description && (
            <Text style={styles.errorMessage}>{formErrors.description}</Text>
          )}
        </View>

        {/* Serving details */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>How much will the recipe make? *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 4 servings, 12 cookies"
            placeholderTextColor="#888"
            value={servingDetails}
            onChangeText={(text) => {
              setServingDetails(text);
              setFormErrors({ ...formErrors, servingDetails: undefined }); // Clear the servingDetails error
            }}
          />
          {formErrors.servingDetails && (
            <Text style={styles.errorMessage}>{formErrors.servingDetails}</Text>
          )}
        </View>

        {/* Time - prep time and cook time */}
        <View style={styles.inputGroup}>
          <View style={styles.timeLabelContainer}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.iconWrapper}>
              <TimerIcon size={28} fill={'#232323'} />
            </View>
          </View>

          <View style={styles.timeInputGroup}>
            <View style={styles.timeInputContainer}>
              <Text style={styles.subLabel}>Prep Time *</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="e.g., 20 min"
                placeholderTextColor="#888"
                value={prepTime}
                onChangeText={(text) => {
                  setPrepTime(text);
                  setFormErrors({ ...formErrors, prepTime: undefined }); // Clear the prepTime error
                }}
              />
              {formErrors.prepTime && (
                <Text style={styles.errorMessage}>{formErrors.prepTime}</Text>
              )}
            </View>
            <View style={styles.timeInputContainer}>
              <Text style={styles.subLabel}>Cook Time</Text>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="e.g., 1 h"
                placeholderTextColor="#888"
                value={cookTime}
                onChangeText={(text) => {
                  setCookTime(text);
                  setFormErrors({ ...formErrors, cookTime: undefined }); // Clear the cookTime error
                }}
              />
              {formErrors.cookTime && (
                <Text style={styles.errorMessage}>{formErrors.cookTime}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Quantity and ingredients */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.label}>Ingredients</Text>
          {ingredientGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.ingredientsGroup}>
              <Text style={styles.subLabel}>Subtitle</Text>
              <View style={styles.ingredientSubtitleContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a subtitle"
                  placeholderTextColor="#888"
                  value={ingredientGroups[groupIndex].ingredientSubtitle}
                  onChangeText={(text) =>
                    handleIngredientSubtitleChange(groupIndex, text)
                  }
                />
                {formErrors[
                  `ingredients[${groupIndex}].ingredientSubtitle`
                ] && (
                  <Text style={styles.errorMessage}>
                    {
                      formErrors[
                        `ingredients[${groupIndex}].ingredientSubtitle`
                      ]
                    }
                  </Text>
                )}
              </View>
              <View style={styles.subLabelQuantityAndIngredientRow}>
                <Text style={[styles.subLabel, styles.quantityLabel]}>
                  Quantity *
                </Text>
                <Text style={[styles.subLabel, styles.ingredientLabel]}>
                  Ingredient *
                </Text>
              </View>
              {group.items.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={styles.quantityAndIngredientsInputGroup}
                >
                  <View style={styles.quantityInputContainer}>
                    <TextInput
                      style={[styles.input, styles.quantityInput]}
                      placeholder="Quantity"
                      placeholderTextColor="#888"
                      value={
                        ingredientGroups[groupIndex].items[itemIndex].quantity
                      }
                      // value={item.quantity}
                      onChangeText={(text) =>
                        handleIngredientChange(
                          groupIndex,
                          itemIndex,
                          'quantity',
                          text
                        )
                      }
                    />
                    {formErrors[
                      `ingredients[${groupIndex}].items[${itemIndex}].quantity`
                    ] && (
                      <Text style={styles.errorMessage}>
                        {
                          formErrors[
                            `ingredients[${groupIndex}].items[${itemIndex}].quantity`
                          ]
                        }
                      </Text>
                    )}
                  </View>

                  <View style={styles.ingredientInputContainer}>
                    <TextInput
                      style={[styles.input, styles.ingredientsInput]}
                      placeholder="Ingredient"
                      placeholderTextColor="#888"
                      // value={item.name}
                      value={ingredientGroups[groupIndex].items[itemIndex].name}
                      onChangeText={(text) =>
                        handleIngredientChange(
                          groupIndex,
                          itemIndex,
                          'name',
                          text
                        )
                      }
                    />
                    {formErrors[
                      `ingredients[${groupIndex}].items[${itemIndex}].name`
                    ] && (
                      <Text style={styles.errorMessage}>
                        {
                          formErrors[
                            `ingredients[${groupIndex}].items[${itemIndex}].name`
                          ]
                        }
                      </Text>
                    )}
                  </View>
                  <View style={styles.removeIngredientIconWrapper}>
                    <TouchableOpacity
                      onPress={() =>
                        removeIngredientItem(groupIndex, itemIndex)
                      }
                    >
                      <RemoveIcon size={28} fill={'#232323'} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => addIngredientItem(groupIndex)}
                style={styles.buttonTouchable}
              >
                <Button
                  mode="outlined"
                  style={styles.addIngredientButton}
                  labelStyle={styles.buttonLabel}
                >
                  Add Ingredient
                </Button>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={addIngredientGroup}
            style={styles.buttonTouchable}
          >
            <Button
              mode="outlined"
              style={styles.addIngredientGroupButton}
              labelStyle={styles.buttonLabel}
              onPress={addIngredientGroup}
            >
              Add Ingredient Group
            </Button>
          </TouchableOpacity>
        </View>

        {/* Step and instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.label}>Instructions</Text>
          {instructionGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.instructionGroup}>
              <Text style={styles.subLabel}>Subtitle</Text>
              <TextInput
                style={styles.input}
                placeholder="Add a subtitle"
                placeholderTextColor="#888"
                value={instructionGroups[groupIndex].instructionSubtitle}
                onChangeText={(text) =>
                  handleInstructionSubtitleChange(groupIndex, text)
                }
              />
              {formErrors[
                `instructions[${groupIndex}].instructionSubtitle`
              ] && (
                <Text style={styles.errorMessage}>
                  {
                    formErrors[
                      `instructions[${groupIndex}].instructionSubtitle`
                    ]
                  }
                </Text>
              )}
              <Text style={[styles.subLabel, styles.instructionLabel]}>
                Instruction *
              </Text>
              {group.steps.map((step, stepIndex) => (
                <View key={stepIndex} style={styles.stepAndinstructionGroup}>
                  <Text style={styles.stepNumber}>{stepIndex + 1}.</Text>
                  <View style={styles.instructionInputContainer}>
                    <View style={styles.instructionInputGroup}>
                      <TextInput
                        style={[styles.input, styles.instructionInput]}
                        placeholder="Add an instruction"
                        placeholderTextColor="#888"
                        // value={step.instruction}
                        value={
                          instructionGroups[groupIndex].steps[stepIndex]
                            .instruction
                        }
                        multiline
                        onChangeText={(text) =>
                          handleInstructionChange(groupIndex, stepIndex, text)
                        }
                      />
                      {formErrors[
                        `instructions[${groupIndex}].steps[${stepIndex}].instruction`
                      ] && (
                        <Text style={styles.errorMessage}>
                          {
                            formErrors[
                              `instructions[${groupIndex}].steps[${stepIndex}].instruction`
                            ]
                          }
                        </Text>
                      )}
                    </View>
                    <View style={styles.removeInstructionIconWrapper}>
                      <TouchableOpacity
                        onPress={() =>
                          removeInstructionStep(groupIndex, stepIndex)
                        }
                      >
                        <RemoveIcon size={28} fill={'#232323'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => addInstructionStep(groupIndex)}
                style={styles.buttonTouchable}
              >
                <Button
                  mode="outlined"
                  style={styles.addInstructionButton}
                  labelStyle={styles.buttonLabel}
                >
                  Add Instruction
                </Button>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={addInstructionGroup}
            style={styles.buttonTouchable}
          >
            <Button
              mode="outlined"
              style={styles.addInstructionGroupButton}
              labelStyle={styles.buttonLabel}
            >
              Add Instruction Group
            </Button>
          </TouchableOpacity>
        </View>

        {/* Additional notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional notes</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Add extra details to your recipe"
            placeholderTextColor="#888"
            value={additionalNotes}
            onChangeText={(text) => {
              setAdditionalNotes(text);
              setFormErrors({ ...formErrors, additionalNotes: undefined }); // Clear the additional notes error
            }}
            multiline
          />
          {formErrors.additionalNotes && (
            <Text style={styles.errorMessage}>
              {formErrors.additionalNotes}
            </Text>
          )}
        </View>

        {/* Info to user about obligatory input fields */}
        <Text style={styles.message}>
          Please note: Fields marked with an asterisk (*) must be filled in to
          complete the submission.
        </Text>

        {/* Submit button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonTouchable}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Share Recipe
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
    gap: 24,
  },
  h3: {
    fontSize: 28,
    fontFamily: 'Crake-Regular',
    textAlign: 'center',
    color: theme.colors.primary,
  },
  inputGroup: {
    display: 'flex',
    gap: 5,
  },
  label: {
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.primary,
  },
  description: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
    color: '#666', // Optional: Set the color to differentiate from other text
    marginBottom: 5,
  },
  input: {
    fontFamily: 'Jost-Regular',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100, // Larger height for multi-line input
    textAlignVertical: 'top', // Aligns text to the top for multiline
    paddingTop: 8,
  },
  subLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.primary,
  },
  timeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconWrapper: {
    paddingBottom: 7, // Adjust as needed
  },
  timeInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  timeInputContainer: {
    flex: 1,
  },
  timeInput: {
    // Adjust styles for time-specific inputs here
  },
  ingredientSubtitleContainer: {},
  ingredientsContainer: {
    gap: 8,
  },
  ingredientsGroup: {
    // gap: 8,
  },
  subLabelQuantityAndIngredientRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 18,
  },
  quantityAndIngredientsInputGroup: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  quantityLabel: {
    flex: 2,
  },
  ingredientLabel: {
    flex: 6,
  },
  quantityInputContainer: {
    flex: 2,
    marginRight: 16,
  },
  quantityInput: {},
  ingredientInputContainer: {
    flex: 5,
    marginRight: 6,
  },
  ingredientsInput: {},
  removeIngredientIconWrapper: {
    marginTop: 8,
  },
  addIngredientButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 10,
  },
  addIngredientGroupButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  buttonTouchable: {
    borderRadius: 10,
    flex: 1,
  },
  instructionsContainer: {
    gap: 8,
  },
  instructionGroup: {
    // gap: 8,
  },
  stepAndinstructionGroup: {
    marginBottom: 12,
    flex: 1,
    justifyContent: 'flex-start',
  },
  instructionLabel: {
    marginTop: 16,
  },
  stepNumber: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
    color: theme.colors.primary,
    marginBottom: 5,
  },
  instructionInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  instructionInputGroup: {
    flex: 9,
    justifyContent: 'center',
  },
  instructionInput: {
    height: 100, // Larger height for multi-line input
    textAlignVertical: 'top', // Aligns text to the top for multiline
    paddingTop: 8,
  },
  removeInstructionIconWrapper: {
    marginTop: 35,
  },
  addInstructionButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 10,
  },
  addInstructionGroupButton: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  button: {
    fontFamily: 'Jost-Regular',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  buttonLabel: {
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  errorMessage: {
    fontFamily: 'Jost-Regular',
    color: 'red',
    fontSize: 16,
    marginTop: 5,
  },
  message: {
    fontFamily: 'Jost-Regular',
    fontSize: 14,
  },
});

export default AddRecipeForm;
