import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Navbar from '../Navbar';
import NewPost from './NewPost';
import PostsList from "./PostsList";
import { useDispatch } from 'react-redux';
import { fetchPosts } from "../../Actions/post";
import { connect } from "react-redux";





const Timeline = (props) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({})
    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    useEffect(() => {
        setUser(props.authData);
    }, [props]);

    return (
        <Container>
            <Nav className="navv">
                <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9" />
            </Nav>
            {user ? (<NewPost />) : (<> </>)}
            <PostsList />
        </Container>
    )

}


const Nav = styled.div`
    height: 10vh;
    width: 100%;
`;

const Container = styled.div`
    padding: 0;
    margin: 0;
    /* margin-bottom: 30px; */
    /* height: 100vh; */
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    background-color: #f5f1ed;
    /* overflow-y: scroll; */
`;


const mapStateToProps = ({ auth }) => {
    return auth;
}

export default connect(mapStateToProps)(Timeline);
