import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import styled from 'styled-components';


const CommentSection  = (props) => {

    console.log(props);
    const {postId} = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const thePost = props.posts.find(post => post._id === postId);
        setPost(thePost)
    }, [props])

    const renderPosts = () => {
        return post?.comments?.map((comment, idx) => {
            return <Comment comment={comment} isCard={false} key={idx}/>
        })
    }
    
    return (
        <Container>
            {renderPosts()}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 40px;
`

const mapStateToProps = ({posts}) => {
    return {posts};
}

export default connect(mapStateToProps)(CommentSection);