import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../utility/Form";
import { loginUser } from '../redux/authSlice';
import { auth } from "../firebase/Firebase";

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async ({ field1: email, field2: password }) => {
        const response = await dispatch(loginUser({ email, password }));
        if (response.meta.requestStatus === 'fulfilled') {
            const user = auth.currentUser;
            if (user) {
                const idToken = await user.getIdToken();
                localStorage.setItem('idToken', idToken);
            }
        }
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
