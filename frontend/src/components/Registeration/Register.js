import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Navbar from "../Navbar";


const Register = () => {
    const params = useParams();
    const result = (params.type === "signUp") ? false : true;
    const [isSignup, setIsSignup] = useState(result);

    const toggleRegisteration = (isSignup) => {
        setIsSignup(!isSignup);
    }
    useEffect(() => {
        toggleRegisteration(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [params])


    const renderRegiser = () => {
        return (isSignup) ?
            <SignupForm isSignup={isSignup} toggleRegisteration={toggleRegisteration} />
            :
            <>
                <LoginForm isSignup={isSignup} toggleRegisteration={toggleRegisteration} />
            </>
    }

   

    return (

        <Container className="container">
            
            <Navbar bgColor="transparent" hoverColor="#acf1f2" />

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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%);
    overflow-y: auto;
`






export default Register;