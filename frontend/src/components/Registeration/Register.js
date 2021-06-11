import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Navbar from "../Navbar";


const Register = () => {
    const params = useParams();
    // const [type, setType] = useState(useParams().type)
    const result = (params.type === "signUp") ? false : true;
    const [isSignup, setIsSignup] = useState(result);

    const toggleRegisteration = (isSignup) => {
        setIsSignup(!isSignup);
    }
    useEffect(() => {
        toggleRegisteration(result)
    }, [params])


    const renderRegiser = () => {
        return (isSignup) ?
            <SignupForm isSignup={isSignup} toggleRegisteration={toggleRegisteration} />
            :
            <>
                <LoginForm isSignup={isSignup} toggleRegisteration={toggleRegisteration} />
            </>
    }

    // const renderSwitch = () => {
    //     return (isSignup) ?
    //         <p>Already have an account? <a>Log in.</a></p>
    //         :
    //         <p>Dont't have an account? <a>Sign Up.</a></p>

    // }

    return (

        <Container className="container">
            <Nav className="navv">
                <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9" />
            </Nav>

            {renderRegiser()}


        </Container>
    )
}



const Nav = styled.div`
    /* position: relative;s */
    margin-bottom: 80px;
    height: 10vh;
    width: 100%;
`

const Container = styled.div`
    padding: 0;
    margin: 0;
    /* margin-bottom: 30px; */
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f1ed;
    overflow-y: scroll;
`






export default Register;