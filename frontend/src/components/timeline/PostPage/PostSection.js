import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import Post from '../Post';
import { useParams } from 'react-router-dom';




const PostSection = (props) => {

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const {postId} = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        setPosts(props.posts);
        setUser(props.auth?.authData?.newUser);
    }, [props]);

    useEffect(() => {
        const thePost = posts.find(post => post._id == postId);
        setPost(thePost);
    }, [posts])

    const renderPost = () => {
        return (
            <Post post={post} user={user} isCard={false}/>
        )
    }

    const renderSpinner = () => {
        return (
            <ContainerSpinner>
                <CircularProgress />
            </ContainerSpinner>
        )
    }
    return (
        <Container>
            {post? renderPost() : renderSpinner()}
        </Container>
    )
}

const ContainerSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 50px;
`

const Container = styled.div`
    display: flex;
    align-items: center;
`

const mapStateToProps = ({ posts, auth }) => {
    return { posts, auth }
}
export default connect(mapStateToProps)(PostSection);