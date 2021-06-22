import React, {useEffect, useState} from 'react';
import Post from '../timeline/Post';
import {connect} from 'react-redux';
import styled from 'styled-components';

const UserPosts = (props) => {

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    console.log("props outside useEffect: ");
    console.log(props);

    useEffect(() => {
        setUser(props.auth?.authData?.newUser);
        setPosts(props.profile?.userPosts);
    }, [props]);


    const renderPosts = (posts) => {
        return posts?.map((post, postIdx) => {
            return (
                <Post post={post} key={postIdx} user={user} />
            )
        })
    }

    return (
        <Container>
            {renderPosts(posts)}
        </Container>
    )
}


const Container = styled.div`
    margin-top: 30px;
    /* height: 100%; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`


const mapStateToProps = ({ profile, auth }) => {
    profile = profile.profile;
    return {profile, auth};
}

export default connect(mapStateToProps)(UserPosts);