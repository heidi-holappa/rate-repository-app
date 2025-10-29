/**
 * @file SignIn.js
 * @description Implements a sign-in screen for the application using Formik for form handling,
 * Yup for validation, and React Router Native for navigation. Includes a form component and
 * a container component that handles authentication logic.
 */

import { Text, TextInput, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import { useFormik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

/**
 * @constant {Object} initialValues
 * @description Defines the initial form values for the sign-in form.
 */
const initialValues = {
  username: '',
  password: '',
};

/**
 * @constant {Object} validationSchema
 * @description Yup schema for validating the sign-in form fields.
 */
const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

/**
 * @component SignInForm
 * @description A presentational component that renders the sign-in form.
 *
 * @param {Function} onSubmit - Function to be called when the form is submitted successfully.
 *
 * @returns {JSX.Element} A React Native component rendering a username and password form.
 */
export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={theme.container}>
        {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
        )}
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={formik.errors.username ? theme.inputFieldError: theme.inputField}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
        )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={formik.errors.password ? theme.inputFieldError: theme.inputField}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={theme.blueButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

/**
 * @component SignIn
 * @description Container component responsible for handling the sign-in process,
 * including authentication logic and navigation.
 *
 * @returns {JSX.Element} The sign-in screen with form handling and navigation.
 */
const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

      /**
     * @function onSubmit
     * @description Handles form submission by attempting to authenticate the user.
     * If successful, navigates to the home screen.
     *
     * @async
     * @param {Object} values - The form values submitted by the user.
     * @param {string} values.username - The entered username.
     * @param {string} values.password - The entered password.
     */
    const onSubmit = async (values) => {
      const { username, password } = values;

      try {
        const { data } = await signIn({ username, password });
        navigate('/');
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;