import { useNavigate } from 'react-router-dom';
import Form from '../utility/Form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const field1Validate = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address";
    const field2Validate = (value) => value.length >= 10 ? "" : "Password must be at least 10 characters";

    const handleSubmit = ({ field1: email, field2: password }) => {
        dispatch(registerUser({ email, password })).then(() => {
            navigate("/signin");
        })
    };

    return (
        <Form
            formHeader="Register in to your account"
            field1Name="Email address"
            field2Name="Password"
            field1Type="email"
            field1Validate={field1Validate}
            field2Validate={field2Validate}
            buttonName="Register"
            navigateExternalLink="signin"
            signinHeader="Already have an account?"
            signinButtonName="Signin Here!"
            showForgotPassword={false}
            onSubmit={handleSubmit}
        />
    );
};

export default Register;
