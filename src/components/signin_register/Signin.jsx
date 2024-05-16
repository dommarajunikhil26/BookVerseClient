import Form from "../utility/Form";

const Signin = () => {
    const field1Validate = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address";
    const field2Validate = (value) => value.length >= 10 ? "" : "Password must be at least 10 characters";

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
        />
    );
};

export default Signin;
