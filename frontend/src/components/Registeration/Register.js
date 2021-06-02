import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';



const Register = () => {
    const [isSignup, setIsSignup] = useState(true);
    const toggleRegisteration = (isSignup) => {
        setIsSignup(!isSignup);
    }


    const renderRegiser = () => {
        return (isSignup) ?
            <SignupForm isSignup={isSignup} toggleRegisteration={toggleRegisteration} />
            :
            <>
                <LoginForm isSignup={isSignup} toggleRegisteration={toggleRegisteration} />
            </>
    }

    const renderSwitch = () => {
        return (isSignup) ?
            <p>Already have an account? <a>Log in.</a></p>
            :
            <p>Dont't have an account? <a>Sign Up.</a></p>

    }

    return (

        <Container className="container">

            {renderRegiser()}


        </Container>
    )
}





const Container = styled.div`
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f1ed
`






export default Register;