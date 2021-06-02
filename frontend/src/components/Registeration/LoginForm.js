import React, { useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import WebFont from 'webfontloader';
import RegisterButton from './RegisterButton';

const LoginForm = ({ isSignup, toggleRegisteration }) => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Mitr', 'DM Sans']
            }
        });
    }, []);
    return (
        <RegisterBox>
            <Heading>
                <h1>Log In</h1>
            </Heading>
            <form>
                {/* <NameInput>
                    <TextField
                        label="First Name"
                        placeholder="Elon"
                        variant="outlined"
                        size="small"
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        label="Last Name"
                        placeholder="Musk"
                        variant="outlined"
                        size="small"
                        style={{ margin: "20px" }}
                    />
                </NameInput> */}
                <TextField
                    label="email"
                    placeholder="elon@musk.com"
                    variant="outlined"
                    size="small"
                    style={{ margin: "10px" }}
                />
                <TextField
                    label="Password"
                    placeholder="iLoveMars123"
                    variant="outlined"
                    size="small"
                    style={{ margin: "10px" }}
                />

                <RegisterButton isSignup={false} />
            </form>
            <p>Dont't have an account? <a onClick={() => toggleRegisteration(isSignup)}>Sign Up.</a></p>
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

export default LoginForm;