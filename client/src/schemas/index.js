import * as yup from 'yup';


// user login Schema
export const loginSchema = yup.object({
  email: yup.string().email('Invalid email address.').required('Email is required.'),
  password: yup.string().min(2).required('Please Enter Your Password'),
})

// User registeration Schema
export const registerSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name can be at most 50 characters long'),

  email: yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),

  phone: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  work: yup.string()
    .required('Work is required')
    .min(2, 'Work must be at least 2 characters long')
    .max(100, 'Work can be at most 100 characters long'),

  password: yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password can be at most 50 characters long'),

  confirmpassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});
