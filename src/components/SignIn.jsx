import { Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={theme.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={theme.inputField}
      />
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={theme.inputField}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={theme.blueButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username;
    const password = values.password;
    
    console.log(values);
    
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;