import Form from "../utility/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../components/authentication/authSlice';
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const field1Validate = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address";
    const field2Validate = (value) => value.length >= 10 ? "" : "Password must be at least 10 characters";

    const handleSubmit = ({ field1: email, field2: password }) => {
        dispatch(loginUser({ email, password }));
    };

    if (isAuthenticated) {
        navigate("/");
    }

    return (
        <Form
            formHeader="Sign in to your account"
            field1Name="Email address"
            field2Name="Password"
            field1Type="email"
            field1Validate={field1Validate}
            field2Validate={field2Validate}
            buttonName="Sign in"
            navigateExternalLink="register"
            signinHeader="Not a member?"
            signinButtonName="Register Here!"
            showForgotPassword={true}
            onSubmit={handleSubmit}
        />
    );
};

export default Signin;
