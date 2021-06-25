import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WebFont from 'webfontloader';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import AuthDialog from '../Utils/AuthDialog';
import { useHistory } from 'react-router-dom';
import { likePost } from "../../Actions/post";
import { useDispatch } from 'react-redux';


const Post = ({ post, user, redirectToPostPage, isCard }) => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Poppins']
            }
        });
    }, []);
    let userName;
    if (user)
    {
        userName = user.firstName + " " + user.lastName;
    }

    const history = useHistory();
    const dispatch = useDispatch();

    const [isLike, setIsLike] = useState(false);
    const [open, setOpen] = useState(false);
    const [isContactOpen, setisContactOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open);
    }

    const handleContactOpen = (e) => {
        setisContactOpen(!isContactOpen);
    }

    useEffect(() => {
        if (post?.likes?.includes(userName))
        {
            setIsLike(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [post])


    const handleLike = () => {

        if (!user)
        {
            setOpen(true);
            return;
        }

        setIsLike(!isLike);
        const data = {
            postId: post?._id,
            userName
        }
        if (!post?.likes?.includes(userName))
        {
            dispatch(likePost(data));
            post?.likes?.push(userName);
        }
        else
        {
            dispatch(likePost(data));
            post?.likes?.splice(post.likes.indexOf(userName), 1);
        }
    }
    const redirectToProfile = () => {
        // dispatch(fetchProfile(post._user));
        history.push(`/profilePage/${post.userName}?_user=${post._user}`);
    }

   

    return (
        <Card isCard={isCard}>
            <CardHeader className="card-header">


                <AccountCircleIcon fontSize="large" />
                <HeaderNameContainer>
                    <Name className="name" onClick={redirectToProfile}>{post.userName}</Name>
                    <p className="time">{moment(post.createdAt).fromNow()}</p>
                </HeaderNameContainer>

            </CardHeader>
            <CardBody>
                <CardBodyTitle>
                    {post.title}
                </CardBodyTitle>
                <CardBodyDescription>
                    {post.description}
                </CardBodyDescription>
            </CardBody>

            <CardFooter isCard={isCard}>
                <LikeComment>
                    <Like>
                        {isLike ?
                            <FavoriteIcon
                                style={{ cursor: "pointer", color: "#f53b3b" }}
                                onClick={handleLike}
                            />
                            :
                            <FavoriteBorderIcon
                                style={{ cursor: "pointer" }}
                                onClick={handleLike}
                            />
                        }
                        <Count>{post?.likes?.length} {post?.likes?.length === 1 ? "Like" : "Likes"}</Count>
                    </Like>
                    <Comment onClick={() => isCard? redirectToPostPage(post, user) : null } isCard={isCard}>
                        <CommentOutlinedIcon />
                        <Count>{post?.comments?.length} {post?.comments?.length === 1 ? "Comment" : "Comments"}</Count>
                    </Comment>
                </LikeComment>

                <ContactButton onClick={handleContactOpen}>
                    Contact
                </ContactButton>
                <Dialog
                    open={isContactOpen}
                    onClose={() => setisContactOpen(false)}
                >
                    <DialogTitle>Contact Information:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{post.contactInfo}</DialogContentText>
                    </DialogContent>
                </Dialog>

            </CardFooter>
            <AuthDialog 
                open={open}
                onClose={handleClose}
                setOpen={setOpen}
                history={history}
            />
        </Card>
    )
};



const CancelButton = styled.div`
    padding: 5px 15px;
    margin: 5px;
    font-family: 'Poppins';
    border-radius: 3px;
    border: 1px solid #6caef5;
    cursor: pointer;
    color: #6caef5;
    &:hover{
        color: #4e88c7;
        border-color: #4e88c7;
    }
`

const RedirectButton = styled.div`
    padding: 5px 15px;
    margin: 5px;
    border-radius: 3px;
    font-family: 'Poppins';
    cursor: pointer;
    color: white;
    background-color: #6caef5;
    &:hover{
        background-color: #4e88c7;
    }

`

const Count = styled.p`
    font-family: 'Poppins';
    font-size: 13px;
    padding-top: 3px;
    margin-left: 4px;

`
const Like = styled.div`
    display: flex;
`
const Comment = styled.div`
    display: flex;
    cursor: ${props => props.isCard? "pointer": "auto"};
`

const LikeComment = styled.div`
    display: flex;
    justify-content: space-between;
    width: max-content;
    div{
        margin-right: 5px;
    }
`

const ContactButton = styled.div`
    font-family: 'Poppins';
    background-color: #ADEB89;
    padding: 3px 12px 3px 12px;
    border-radius: 20px;
    &:hover{
        background-color: #badba7;
        cursor: pointer; 
    }
`

const CardHeader = styled.div`
    width: 100%;
    display: flex;
`

const CardBody = styled.div`
    width: 100%;
    margin: 10px 0;
`

const CardBodyTitle = styled.p`
    font-size: 30px;
    font-weight: bold;
    font-family: 'Poppins';
    
`;


const CardBodyDescription = styled.p`
    font-family: 'Poppins';
    font-size: 15px;
    font-weight: ligter;
`;


const Name = styled.p`
    margin: 0;
    font-size: 20px;
    font-family: 'Poppins';
    font-weight: bold;
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }
`


const Card = styled.div`
    margin-bottom: 60px;
    width: ${props => props.isCard? "75%" : "100%"};
    border-radius: ${props => props.isCard? "20px" : "0"};
    border: ${props => props.isCard? "none" : "1px solid black"};
    padding: 20px;
    box-shadow: ${props => props.isCard? "0px 0px 40px -10px rgb(110, 109, 109)" : "none"};
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.isCard? "white": "transparent"};
`

const CardFooter = styled.div`
    width: 100%;
    border-top: ${props => props.isCard? "0.5px solid black" : "none"};
    padding: 10px 0 5px 0;
    display: flex;
    justify-content: space-between;
`;

const HeaderNameContainer = styled.div`
    margin-left: 2px;
    margin-top: 5px;
    line-height: 1em;
    .time{
        font-family: 'Poppins';
        font-size: 10px;
        font-weight: lighter;
    }
`

export default Post;