
import Text from './Text';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useReview from '../hooks/useReview';
import * as yup from 'yup';
import theme from '../theme';

const styles = StyleSheet.create({
    formContainer: {
        padding: 15,
        backgroundColor: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
}); 

const initialValues = {
        repositoryName: '',
        ownerName: '',
        rating: '',
        text: '',
    };

const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository name is required'),
    ownerName: yup.string().required('Owner name is required'),
    rating: yup.number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating cannot be more than 100'),
    text: yup.string(),
});


const ReviewFormContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });




    return (
        // Container implementation goes here
        <View style={styles.formContainer}>
            <TextInput
                placeholder="Repository owner Name"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
                style={styles.input}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                placeholder="Repository Name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
                style={styles.input}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
                placeholder="Rating between 0 and 100"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                keyboardType="numeric"
                style={styles.input}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
            )}
            <TextInput
                placeholder="Review"
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                style={styles.input}
                multiline
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.text}</Text>
            )}
            <Pressable 
                onPress={formik.handleSubmit}
                style={styles.submitButton}
            >
                <Text style={styles.submitButtonText}>Create a review</Text>
            </Pressable>
        </View>
    );
}



const ReviewForm = () => {
    const [createReview] = useReview();
    const navigate = useNavigate();

    const onSubmit = async (review) => {
        
        
        const { repositoryName, ownerName, rating, text } = review;
        try {
            // Submission logic goes here
            const { data } = await createReview({ repositoryName, ownerName, rating, text });
            console.log('Review created:', data);
            const repositoryId = data.createReview.repositoryId;
            navigate(`/repository/${repositoryId}`);
            

        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        // Form implementation goes here
        <ReviewFormContainer onSubmit={onSubmit} />
    );
}

export default ReviewForm;