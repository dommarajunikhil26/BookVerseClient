import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../utility/Form";
import { loginUser } from '../redux/authSlice';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = ({ field1: email, field2: password }) => {
        dispatch(loginUser({ email, password }));
    };

    return (
        <Form
            formHeader="Sign in to your account"
            field1Name="Email address"
            field2Name="Password"
            field1Type="email"
            field1Validate={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address"}
            field2Validate={(value) => value.length >= 6 ? "" : "Password must be at least 6 characters"}
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
