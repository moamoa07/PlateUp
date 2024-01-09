import * as Yup from 'yup';

export const recipeSchema = Yup.object().shape({
  imageUrl: Yup.string().nullable(), // Since it can be string or null
  title: Yup.string().required('Please add a title'),
  description: Yup.string().required('Please add a description'),
  servingDetails: Yup.string().required('Please add serving details'),
  prepTime: Yup.string().required('Please add prep time'),
  cookTime: Yup.string().nullable(), // Nullable as it is optional
  ingredients: Yup.array().of(
    Yup.object().shape({
      ingredientSubtitle: Yup.string().nullable(),
      items: Yup.array()
        .of(
          Yup.object().shape({
            quantity: Yup.string().required('Please add quantity'),
            name: Yup.string().required('Please add ingredient'),
          })
        )
        .required('At least one ingredient is required'),
    })
  ),
  instructions: Yup.array().of(
    Yup.object().shape({
      instructionSubtitle: Yup.string().nullable(),
      steps: Yup.array()
        .of(
          Yup.object().shape({
            instruction: Yup.string().required('Please add instruction'),
          })
        )
        .required('At least one instruction step is required'),
    })
  ),
  additionalNotes: Yup.string().nullable(),
});
