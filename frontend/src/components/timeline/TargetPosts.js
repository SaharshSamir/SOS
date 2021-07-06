import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import Post from './Post';
import CircularProgress from '@material-ui/core/CircularProgress';


const TargetPosts = (props) => {

    const {title} = useParams();
    const [targetPosts, setTargetPosts] = useState([])
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        const posts = props.posts.filter(post => post.title === title);
        setTargetPosts(posts);
        setUser(props.auth?.authData?.newUser);
    }, []);

    const redirectToPostPage = (post) => {
        console.log(post.title);
    }

    const renderPosts = () => {
        return targetPosts?.map((post, idx) => {
            return (
                <Post post={post} key={idx} user={user} redirectToPostPage={redirectToPostPage} isCard={true}/>
            )
        })
    }

    console.log(renderPosts());

    return (
        <Container>
            <Nav>
                <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9" isSearch={false}/>
            </Nav>
            {(targetPosts.length === 0)? <CircularProgress /> : renderPosts()}
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
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f1ed;
    overflow-y: auto;
`;

const mapStateToProps = ({posts, auth}) => {
    return {posts, auth}
}

export default connect(mapStateToProps)(TargetPosts);