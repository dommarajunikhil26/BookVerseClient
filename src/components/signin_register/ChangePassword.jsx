import { useNavigate } from "react-router-dom";
import Form from "../utility/Form";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/authSlice";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const field1Validate = (value) => value.length >= 10 ? "" : "Password must be at least 10 characters";
    const field2Validate = (value, field1) => value === field1 ? "" : "Passwords do not match";

    const handleSubmit = ({ field1: newPassword }) => {
        dispatch(changePassword(newPassword)).then(() => {
            navigate("/signin")
        })
    };

    return (
        <Form
            formHeader="Change Password for your account"
            field1Name="New Password"
            field2Name="Type new password again"
            field1Type="password"
            field1Validate={field1Validate}
            field2Validate={field2Validate}
            field2AutoComplete="new-password"
            buttonName="Change Password"
            navigateExternalLink="signin"
            showForgotPassword={false}
            onSubmit={handleSubmit}
        />
    );
};

export default ChangePassword;
