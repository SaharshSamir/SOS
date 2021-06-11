import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import WebFont from 'webfontloader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const PostsList = (props) => {
    const [posts, setPosts] = useState(props.posts);

    useEffect(() => {
        setPosts(props.posts);
    }, [props])

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Poppins']
            }
        });
    }, [])

    const renderPosts = () => {

        return posts.map(post => {
            return (
                <Card>
                    <CardHeader className="card-header">

                        <AccountCircleIcon />
                        <HeaderNameContainer>
                            <Name className="name">{post.userName}</Name>
                        </HeaderNameContainer>

                    </CardHeader>
                    <CardBody>
                        {post.title}
                    </CardBody>
                </Card>
            )
        })
    }

    return (
        <Container>
            {renderPosts()}
        </Container>
    )
}

const HeaderNameContainer = styled.div``
const HeaderAvatarContainer = styled.div``

const CardBody = styled.div`
    width: 100%;
    font-family: 'Poppins';
`

const Name = styled.p`
    margin: 0;
    font-size: 20px;
    font-family: 'Poppins';
    font-weight: bold;
`

const CardHeader = styled.div`
    width: 100%;
    display: flex;
`

const Card = styled.div`
    margin-bottom: 30px;
    width: 75%;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 11px 90px -10px #C0C0C0;
    /* justify-content: center; */
    align-items: center;
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const mapStateToProps = ({ posts }) => {

    return { posts }

}
export default connect(mapStateToProps)(PostsList)