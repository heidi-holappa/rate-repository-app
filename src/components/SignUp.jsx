
import { Text, TextInput, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Alert } from 'react-native';

import { useFormik } from 'formik';
import * as yup from 'yup';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

import theme from '../theme';



/**
 * @constant {Object} initialValues
 * @description Defines the initial form values for the sign-up form.
 */
const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

/**
 * @constant {Object} validationSchema
 * @description Yup schema for validating the sign-up form fields.
 */
const validationSchema = yup.object().shape({
    // Username is a required string with a length between 5 and 30
    username: yup
    .string().required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
    // Password is a required string with a length between 5 and 50
    password: yup
    .string().required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
    // Password confirmation matches the password
    passwordConfirmation: yup
    .string().required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

/**
 * @component SignUpForm
 * @description A presentational component that renders the sign-up form.
 *
 * @param {Function} onSubmit - Function to be called when the form is submitted successfully.
 *
 * @returns {JSX.Element} A React Native component rendering a username and password form.
 */
export const SignUpForm = ({ onSubmit }) => {
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
      <TextInput
        placeholder="Password Confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        style={formik.errors.passwordConfirmation ? theme.inputFieldError: theme.inputField}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={theme.blueButton}>Sign up</Text>
      </Pressable>
    </View>
  );
};

/**
 * @component SignUp
 * @description Container component responsible for handling the sign-up process,
 * including authentication logic and navigation.
 *
 * @returns {JSX.Element} The sign-up screen with form handling and navigation.
 */
const SignUp = () => {
    const [signUp] = useSignUp();
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
      const { username, password, passwordConfirmation } = values;

      if (password !== passwordConfirmation) {
        console.log("Passwords do not match");
        return;
      }

      try {
        const { data } = await signUp({ username, password });
        console.log(data);
        // Alert the user if the username is already taken

        // Sign the user in after successful sign-up
        const { data2 } = await signIn({ username, password });

        navigate('/');
      } catch (error) {
        // Let's show client some error information:
        if (error.graphQLErrors?.length > 0) {
            const gqlError = error.graphQLErrors[0];

            // Example checks:
            if (gqlError.message.includes("is already taken")) {
                Alert.alert("This username is already taken. Please choose another one.");
            } else {
            Alert.alert("Something went wrong. Please try again.");
            }
        } else {
            Alert.alert("Network error. Please check your connection.");
        }
        console.log(error);
      }
    };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;