import * as yup from 'yup'

export const searchSchema = yup.object().shape({
  street: yup.string().min(3).required(),
})
