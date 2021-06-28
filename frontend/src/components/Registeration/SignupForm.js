import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import WebFont from 'webfontloader';
import RegisterButton from './RegisterButton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from "../../Actions/auth";


const initialFormData = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const SignupForm = ({ isSignup, toggleRegisteration }) => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Mitr', 'DM Sans']
            }
        });
    }, []);

    const [formData, setFormData] = useState(initialFormData);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const handelSubmit = (e) => {
        e.preventDefault();
        formData.firstName = formData.firstName.toLowerCase();
        formData.lastName = formData.lastName.toLowerCase();
        if (formData.confirmPassword !== formData.password)
        {
            setIsPasswordConfirm(false);
            return;
        }
        else
        {
            setIsPasswordConfirm(true);
            const newFormData = {
                firstName: formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1),
                lastName: formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1),
                email: formData.email,
                phoneNo: formData.phoneNo,
                password: formData.password
            }
            dispatch(signUp(newFormData, history));
        }

    }
    const handleChange = (e) => {
        const obj = { ...formData, [e.target.name]: e.target.value }
        setFormData(obj);
    }


    const handleIsSignUp = () => {
        toggleRegisteration(isSignup);
        history.push("/register/logIn")
    }

    return (
        <RegisterBox>
            <Heading>
                <h1>Create An Account</h1>
            </Heading>
            <form onSubmit={handelSubmit}>
                <NameInput>
                    <TextField
                        label="First Name"
                        placeholder="Elon"
                        name="firstName"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        style={{ margin: "10px" }}
                    />
                    <TextField
                        label="Last Name"
                        placeholder="Musk"
                        name="lastName"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        style={{ margin: "10px" }}
                    />
                </NameInput>
                <TextField
                    label="Email"
                    placeholder="elon@musk.com"
                    name="email"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    style={{ margin: "10px" }}
                />
                <TextField
                    label="Phone No"
                    name="phoneNo"
                    variant="outlined"
                    size="small"
                    type="tel"
                    onChange={handleChange}
                    style={{ margin: "10px" }}
                />
                <TextField
                    label="Password"
                    placeholder="iLoveMars123"
                    name="password"
                    variant="outlined"
                    size="small"
                    type="password"
                    onChange={handleChange}
                    style={{ margin: "10px" }}
                />
                <TextField
                    label="Re-enter Password"
                    placeholder="iLoveMars123"
                    name="confirmPassword"
                    variant="outlined"
                    size="small"
                    type="password"
                    error={!isPasswordConfirm}
                    helperText={(!isPasswordConfirm) ? "Passwords don't match" : ""}
                    onChange={handleChange}
                    style={{ margin: "10px" }}
                />
                <RegisterButton isSignup={true} type="submit" />
            </form>
            <p>Already have an account? <a onClick={handleIsSignUp} >Log in.</a></p>
        </RegisterBox>
    )
}

// onClick={() => toggleRegisteration(isSignup)}
const Heading = styled.div`
    font-family: "Mitr";
    display: flex;
    justify-content: center;
`
const NameInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
`

const RegisterBox = styled.div`
    margin-top: 7px;
    margin-bottom: 40px;
    width: 36%;
    border-radius: 20px;
    padding: 20px;
    background-color: white;
    box-shadow: 0px 11px 90px -10px #717f80;
    align-items: center;
    display: flex;
    flex-direction: column;
    form {
        display: flex;
        flex-direction: column;
        button {
            align-self: center;
        }
    }
    p {
        margin-top: 30px;
        font-family: "DM Sans";
        font-size: 15px;
        a{
            text-decoration: none;
            color: #1D30DE;
            &:visited {
                color: #1D30DE;
            }
            &:hover{
                cursor: pointer
            }
        }
    }
`

export default SignupForm;