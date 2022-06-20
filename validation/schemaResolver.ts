import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required('passsword is required'),
  })
  .required();
