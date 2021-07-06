import React, { useEffect, useState } from "react";
import styled from "styled-components"
import WebFont from 'webfontloader';
import { useHistory, useLocation } from 'react-router-dom';
import { logOut, checkUser } from "../../Actions/auth";
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";
import Search from './Searchbar';



const searchSuggestionsStyles = {
    backgroundColor: "#37393b",

}

const Navbar = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

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
    
    const userName = user?.newUser.firstName + " " + user?.newUser.lastName;
    const handleProfileRedirect = () => {
        history.push(`/profilePage/${userName}?_user=${user.newUser._id}`);
    } 

    const renderNavItems = () => {
        if (user)
        {
            return user ?
                (
                    <NavItems isAuth={true}>
                        <NavItem hoverColor={props.hoverColor} onClick={handleProfileRedirect}>{user.newUser.firstName} {user.newUser.lastName}</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/timeline")}>Home</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={handleLogOut}>Log Out</NavItem>
                    </NavItems>
                )
                :
                (
                    <NavItems isAuth={false}>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/timeline")}>Home</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/signUp")}>Sign Up</NavItem>
                        <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/logIn")}>Log In</NavItem>
                    </NavItems>
                )
        }
        else
        {
            return (
                <NavItems isAuth={false}>
                    <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/timeline")}>Home</NavItem>
                    <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/signUp")}>Sign Up</NavItem>
                    <NavItem hoverColor={props.hoverColor} onClick={() => history.push("/register/logIn")}>Log In</NavItem>
                </NavItems>
            )
        }
    }

    const handleSearchInput = (e) => {
        setSearchText(e.target.value);
        setAnchorEl(searchText? e.currentTarget : null);
        setIsSearchOpen(Boolean(anchorEl));

    }
    
    const renderSearchBar = () => {
        return (props.isSearch) ? 
            (
                <Search bgColor={props.bgColor}/>
                
            )
            :
            (
                <></>
            )    
    }

    return (
        <Container bgColor={props.bgColor}>
            <Logo onClick={() => history.push("/")}>
                <p>SOS</p>
            </Logo>

            {renderSearchBar()}

            {renderNavItems(user)}
        </Container>
    )
}


const NavItems = styled.ul`
    display: flex;
    list-style: none;
    font-family: "Cabin";
    justify-content: space-between;
    /* width: 31%; */
    width: ${props => props.isAuth? "31%" : "27%"};
    font-size: ${props => props.isAuth? "1.3em" : "1.4em"};
    min-width: 360px;
    //1195
    flex-shrink: 5;
    
`

const NavItem = styled.li`
    /* font-size: 1.3rem; */
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    flex-shrink: 0.2;
    &:hover {
        cursor: pointer;
        background-color: ${props => props.hoverColor};
    }

`;

const SearchBar = styled.form`
    width: 47%;
    flex-shrink: 1;
    display: flex;
    margin-top: 3px;
    input[type=text]{
        border-radius: 7px;
        height: 28px;
        background-color: #a6d889;
        width: 100%;
        padding: 12px 8px;
        border: none;
        box-shadow: inset 2px 2px 8px -2px rgba(0, 0, 0, 0.83);
        color: black;
        font-size: 1.2rem;

    }
    .searchButton{
        /* height: 100%; */
        width: fit-content;
        border-radius: 5px;
        border: none;
        padding: 0;
        margin-left: 5px;
        background-color: ${props => props.searchColor};
        cursor: pointer;
        color: #3b8652;
        &:hover{
            color:#000000;
        }
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