import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import Post from './Post';




const PostsList = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        setPosts(props.posts);
        setUser(props.auth.authData);
    }, [props])
    // console.log(props.auth);

    const renderPosts = () => {

        return posts.map((post, postIdx) => {
            console.log(post);
            return (
                <Post post={post} key={postIdx} user={user} />
                // <> </>
            )
        })
    }

    return (
        <Container className="container">
            {renderPosts()}
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