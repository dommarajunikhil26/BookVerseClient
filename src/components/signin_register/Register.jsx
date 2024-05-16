import Form from '../utility/Form';

const Register = () => {

    return (
        <Form
            formHeader="Register"
            navigateExternalLink="signin"
            signinHeader="Already have an account?"
            buttonName="Register"
            signinButtonName="Signin Here!"
        />
    )
}

export default Register;