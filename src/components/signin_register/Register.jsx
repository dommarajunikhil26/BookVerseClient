import Form from '../utility/Form';

const Register = () => {
    const field1Validate = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address";
    const field2Validate = (value) => value.length >= 10 ? "" : "Password must be at least 10 characters";

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
        />
    );
};

export default Register;
