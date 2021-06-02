import React, { useEffect } from "react";
import styled from "styled-components"
import WebFont from 'webfontloader';
import { useHistory } from 'react-router-dom';


const Navbar = ({ bgColor }) => {
    const history = useHistory();
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Cabin']
            }
        });
    }, []);
    return (
        <Container bgColor={bgColor}>
            <Logo>
                <p>SOS</p>
            </Logo>
            <NavItems>
                <NavItem>About</NavItem>
                <NavItem onClick={() => history.push("/register")}>Sign Up</NavItem>
                <NavItem>Log In</NavItem>
            </NavItems>
        </Container>
    )
}


const NavItems = styled.ul`
    display: flex;
    list-style: none;
    font-family: "Cabin";
    justify-content: space-between;
    width: 25%;
    
`

const NavItem = styled.li`
    font-size: 1.4rem;
    /* margin: 0 10px; */
    padding: 5px 15px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: #e8e8e8;
    }

`

const Logo = styled.div`
    cursor: pointer;
    font-family: "Cabin";
    font-weight: bold;
    font-size: 2.7rem;
`

const Container = styled.div`
    width: 100%;
    height:10vh;
    background-color: ${props => props.bgColor};
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: absolute;
`

export default Navbar;