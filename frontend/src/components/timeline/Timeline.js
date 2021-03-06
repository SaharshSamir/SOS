import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import NewPost from './NewPost';
import PostsList from "./PostsList";
import { useDispatch } from 'react-redux';
import { fetchPosts } from "../../Actions/post";
import { connect } from "react-redux";
import ChangeDefault from './SearchContext';


const Timeline = (props) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [isDefault, setIsDefault] = useState(true);
    const [targetPosts, setTargetPosts] = useState([]);
    const postListRef = useRef(null);
    const [showNewPost, setShowNewPost] = useState(true);
    useEffect(() => {
        // window.location.reload();
        dispatch(fetchPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);

    useEffect(() => {
        setUser(props.authData);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [props]);

    const scrollToPost = () => postListRef.current.scrollIntoView();
    useEffect(() => {
        if(targetPosts.length !== 0){
            setShowNewPost(false);
        }else{
            setShowNewPost(true);

        }
    }, [targetPosts])

    return (
        <ChangeDefault.Provider value={setTargetPosts}>
            <Container>
                <Nav className="navv">
                    <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9" isSearch={true}/>
                </Nav>
                {(user && showNewPost)? (<NewPost scrollToPost={scrollToPost}/>) : (<> </>)}
                <PostsList ref={postListRef} searchedPosts={targetPosts}/>
            </Container>
        </ChangeDefault.Provider>
    )

}


const Nav = styled.div`
    height: 10vh;
    width: 100%;
`;

const Container = styled.div`
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f1ed;
    overflow-y: auto;
`;


const mapStateToProps = ({ auth }) => {
    return auth;
}

export default connect(mapStateToProps)(Timeline);
