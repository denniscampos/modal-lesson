import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(4).max(15).required('Password must be a min of 4 characters.'),
  })
  .required();
