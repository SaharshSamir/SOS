import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import WebFont from 'webfontloader';
import RegisterButton from './RegisterButton';
import { useDispatch } from "react-redux";
import { logIn } from "../../Actions/auth";
import { useHistory } from "react-router-dom";

const initialFormData = { email: "", password: "" };

const LoginForm = ({ isSignup, toggleRegisteration }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialFormData);
    const history = useHistory();
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Mitr', 'DM Sans']
            }
        });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(logIn(formData, history));
    }


    const handleChange = (e) => {
        const obj = { ...formData, [e.target.name]: e.target.value }
        setFormData(obj);

    }

    return (
        <RegisterBox>
            <Heading>
                <h1>Log In</h1>
            </Heading>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="email"
                    placeholder="elon@musk.com"
                    variant="outlined"
                    size="small"
                    name="email"
                    style={{ margin: "10px" }}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    placeholder="iLoveMars123"
                    variant="outlined"
                    size="small"
                    type="password"
                    name="password"
                    style={{ margin: "10px" }}
                    onChange={handleChange}
                />

                <RegisterButton isSignup={false} type="submit" />
            </form>
            <p>Dont't have an account? <a href="#" onClick={() => toggleRegisteration(isSignup)}>Sign Up.</a></p>
        </RegisterBox>
    )
}


const Heading = styled.div`
    font-family: "Mitr";
    display: flex;
    justify-content: center;
`

const RegisterBox = styled.div`
    /* height: 90%; */
    margin-bottom: 150px;
    margin-top: 45px;
    width: 35%;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 11px 90px -10px #717f80;
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

export default LoginForm;