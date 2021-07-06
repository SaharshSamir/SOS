import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import Post from './Post';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";


const PostsList = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        setPosts(props.posts);
        setUser(props.auth?.authData?.newUser);
    }, [props]);

    const redirectToPostPage = (post) => {
        history.push(`/post/${post._id}`);
    }

    const renderPosts = () => {


        const newPosts = [];
        const searchedPosts = [];

        for(let i=posts.length-1; i>=0; i--){
            newPosts.push(
                <Post post={posts[i]}  key={i} user={user} redirectToPostPage={redirectToPostPage} isCard={true}/>
            )
        }

        for(let i=props.searchedPosts.length-1; i>=0; i--){
            searchedPosts.push(
                <Post post={props.searchedPosts[i]} key={i} user={user} redirectToPostPage={redirectToPostPage} isCard={true}/>
            )
        }


        console.log(props.searchedPosts);

        return (searchedPosts.length !== 0)? searchedPosts : newPosts;

    }

    return (
        <Container className="container">
            {(posts.length==0)? <CircularProgress /> : renderPosts()}
        </Container>
    )
}


const Container = styled.div`
    margin-top: 30px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const mapStateToProps = ({ posts, auth }) => {

    return { posts, auth }

}
export default connect(mapStateToProps)(PostsList)