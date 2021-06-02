import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import WebFont from 'webfontloader';
import RegisterButton from './RegisterButton';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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

    const { type } = useParams();
    const [formData, setFormData] = useState(initialFormData);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const handelSubmit = (e) => {
        e.preventDefault();
        if (formData.confirmPassword !== formData.password)
        {
            setIsPasswordConfirm(false);
            return;
        }
        else
        {
            setIsPasswordConfirm(true);
            const newFormData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            }
            dispatch(signUp(newFormData));
            // console.log(newFormData);
        }

    }
    const handleChange = (e) => {
        // console.log([e.target.name])
        const obj = { ...formData, [e.target.name]: e.target.value }
        setFormData(obj);
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
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        label="Last Name"
                        placeholder="Musk"
                        name="lastName"
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        style={{ margin: "20px" }}
                    />
                </NameInput>
                <TextField
                    label="Email"
                    placeholder="elon@musk.com"
                    name="email"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    style={{ margin: "20px" }}
                />
                <TextField
                    label="Password"
                    placeholder="iLoveMars123"
                    name="password"
                    variant="outlined"
                    size="small"
                    type="password"
                    onChange={handleChange}
                    style={{ margin: "20px" }}
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
                    style={{ margin: "20px" }}
                />
                <RegisterButton isSignup={true} type="submit" />
            </form>
            <p>Already have an account? <a onClick={() => toggleRegisteration(isSignup)}>Log in.</a></p>
        </RegisterBox>
    )
}


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
    /* height: 90%; */
    width: 45%;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 11px 90px -10px #C0C0C0;
    /* justify-content: center; */
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