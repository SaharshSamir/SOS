import React, { useEffect } from "react";
import styled from 'styled-components';
import Navbar from '../Navbar';
import NewPost from './NewPost';
import PostsList from "./PostsList";
import { useDispatch } from 'react-redux';
import { fetchPosts } from "../../Actions/post";




const Timeline = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(fetchPosts());
    })
    // const [posts, setPosts] = useState(props.posts);

    return (
        <Container>
            <Nav className="navv">
                <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9" />
            </Nav>
            <NewPost />
            <PostsList />
        </Container>
    )

}


const Nav = styled.div`
    /* position: relative; */
    /* margin-bottom: 80px; */
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
    overflow-y: scroll;
`;




export default Timeline;