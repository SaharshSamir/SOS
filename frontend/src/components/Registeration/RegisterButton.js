import React from 'react';
import styled from 'styled-components';

const RegisterButton = (props) => {
    return (
        <TheButton>{(props.isSignup) ? "Sign Up" : "Log In"}</TheButton>
    )
}


const TheButton = styled.button`
    background-color: #2665DE; 
    color: white;
    width: max-content;
    border-radius: 5px;
    padding: 5px 25px 5px 25px;
    font-size: 20px;
    border: none;
    &:hover{
        cursor: pointer;
        background-color: #4a88ff;
    }
`

export default RegisterButton;