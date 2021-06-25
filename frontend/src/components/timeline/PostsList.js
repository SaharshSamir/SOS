import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import Post from './Post';
import CircularProgress from '@material-ui/core/CircularProgress';


const PostsList = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        setPosts(props.posts);
        setUser(props.auth?.authData?.newUser);
    }, [props]);

    const redirectToPostPage = (post) => {
        console.log(post.title);
        history.push(`/post/${post._id}`);
    }

    const renderPosts = () => {

        return posts.map((post, postIdx) => {
            return (
                <Post post={post}  key={postIdx} user={user} redirectToPostPage={redirectToPostPage} isCard={true}/>
            )
        })
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