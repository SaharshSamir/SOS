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
    // const userName = new URLSearchParams(search).get("userName");
    // console.log(userName);

    //http://localhost:3000/profilePage/Saharsh%20Samir?_user=60cdffd575453f40c883ab1d
    useEffect(() => {
        const _user = new URLSearchParams(search).get("_user");
        console.log(_user);
        dispatch(fetchProfile(_user));
    }, [])
    console.log(props);

    // const contactInfo = {
    //     email: props.profile.user.email,
    //     phoneNo: props.profile.user.phoneNo
    // }
    // console.log(contactInfo);
    
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
    /* margin-bottom: 30px; */
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    background-color: #f5f1ed;
    overflow-y: auto;
`




export default ProfilePage;