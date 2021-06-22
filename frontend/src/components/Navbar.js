import React, { useEffect, useState } from "react";
import styled from "styled-components"
import WebFont from 'webfontloader';
import { useHistory, useLocation } from 'react-router-dom';
import { logOut, checkUser } from "../Actions/auth";
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";


const Navbar = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    useEffect(() => {
        checkUser(user, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Cabin']
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleLogOut = () => {
        setUser(null);
        logOut(dispatch);
    }


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
        const token = user ? user.token : null;

        if (token)
        {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
        }
    }, [location])

    const renderNavItems = () => {
        if (user)
        {
            return user ?
                (
                    <NavItems>
                        <NavItem hoverColor={props.hoverColor}>{user.newUser.firstName} {user.newUser.lastName}</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/timeline")}>Home</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={handleLogOut}>Log Out</NavItem>
                    </NavItems>
                )
                :
                (
                    <NavItems>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/timeline")}>Home</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/signUp")}>Sign Up</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/logIn")}>Log In</NavItem>
                    </NavItems>
                )
        }
        else
        {
            return (
                <NavItems>
                    <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/timeline")}>Home</NavItem>
                    <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/signUp")}>Sign Up</NavItem>
                    <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/logIn")}>Log In</NavItem>
                </NavItems>
            )
        }
    }

    return (
        <Container bgColor={props.bgColor}>
            <Logo onClick={() => history.push("/")}>
                <p>SOS</p>
            </Logo>

            {renderNavItems(user)}
        </Container>
    )
}


const NavItems = styled.ul`
    display: flex;
    list-style: none;
    font-family: "Cabin";
    justify-content: space-between;
    width: 28%;
    
`

const NavItem = styled.li`
    font-size: 1.4rem;
    /* margin: 0 10px; */
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    flex-shrink: 0.2;
    &:hover {
        cursor: pointer;
        background-color: ${props => props.hoverColor};
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
    position: sticky;
    top: 0;
`

export default Navbar;