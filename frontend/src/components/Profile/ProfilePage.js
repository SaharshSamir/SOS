import React, { useEffect } from 'react';
import Navbar from "../Navbar";
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../../Actions/profile'
import styled from 'styled-components';


const ProfilePage = (props) => {
    const dispatch = useDispatch();
    const { userName } = useParams();
    const search = props.location.search;
    useEffect(() => {
        const _user = new URLSearchParams(search).get("_user");
        console.log(_user);
        dispatch(fetchProfile(_user));
    }, [])
    console.log(props);

    
    return (
        <Container className="profilepage">
            <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9" />
            <UserInfo 
                username={userName} 
            />
            <hr />
            <UserPosts />
        </Container>
    )
}

const Container = styled.div`
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f1ed;
    overflow-y: auto;
`

export default ProfilePage;