/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/bookLogo.jpg';

const Form = ({
    formHeader,
    field1Name,
    field2Name,
    field1Type,
    buttonName,
    navigateExternalLink,
    showForgotPassword,
    signinHeader,
    signinButtonName,
    field1Validate,
    field2Validate,
    field2AutoComplete = "current-password"
}) => {
    const [field1, setField1] = useState("");
    const [field2, setField2] = useState("");
    const [field1Error, setField1Error] = useState("");
    const [field2Error, setField2Error] = useState("");

    const navigate = useNavigate();

    const handleField1Change = useCallback((e) => {
        const value = e.target.value;
        setField1(value);
        setField1Error(field1Validate ? field1Validate(value) : "");
    }, [field1Validate]);

    const handleField2Change = useCallback((e) => {
        const value = e.target.value;
        setField2(value);
        setField2Error(field2Validate ? field2Validate(value, field1) : "");
    }, [field2Validate, field1]);

    const handleSigninClick = () => {
        navigate(`/${navigateExternalLink}`);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
    };

    const handleForgotPasswordClick = () => {
        navigate("/changePassword");
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src={logo} alt="Book Verse" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{formHeader}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="field1" className="block text-sm font-medium leading-6 text-gray-900">{field1Name}</label>
                        <div className="mt-2">
                            <input
                                id="field1"
                                name="field1"
                                type={field1Type}
                                autoComplete={field1Type === 'email' ? "email" : "new-password"}
                                value={field1}
                                required
                                onChange={handleField1Change}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {field1Error && <p className="text-red-500 text-xs font-semibold">{field1Error}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="field2" className="block text-sm font-medium leading-6 text-gray-900">{field2Name}</label>
                            {showForgotPassword && (
                                <div className="text-sm">
                                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={handleForgotPasswordClick}>Forgot password?</button>
                                </div>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                id="field2"
                                name="field2"
                                type="password"
                                autoComplete={field2AutoComplete}
                                value={field2}
                                required
                                onChange={handleField2Change}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {field2Error && <p className="text-red-500 text-xs font-semibold">{field2Error}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{buttonName}</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    {signinHeader}
                    <button type="button" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1" onClick={handleSigninClick}>{signinButtonName}</button>
                </p>
            </div>
        </div>
    );
};

export default Form;
