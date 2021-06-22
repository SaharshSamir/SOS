import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WebFont from 'webfontloader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { likePost } from "../../Actions/post";
import { useDispatch } from 'react-redux';


const Post = ({ post, user }) => {
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
        if (post.likes.includes(userName))
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
            postId: post._id,
            userName
        }
        if (!post.likes.includes(userName))
        {
            dispatch(likePost(data));
            post.likes.push(userName);
        }
        else
        {
            dispatch(likePost(data));
            post.likes.splice(post.likes.indexOf(userName), 1);
        }
    }
    const redirectToProfile = () => {
        // dispatch(fetchProfile(post._user));
        history.push(`/profilePage/${post.userName}?_user=${post._user}`);
    }

    return (
        <Card>
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

            <CardFooter>
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
                        <Count>{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</Count>
                    </Like>
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
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >
                    {"You need to be logged in."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"In order to like or comment on a post, you need to be logged in. Would you like to log in?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={() => setOpen(false)}>No</CancelButton>
                    <RedirectButton onClick={() => history.push("/register/login")}>Yes</RedirectButton>
                </DialogActions>

            </Dialog>
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

const LikeComment = styled.div``

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
    width: 75%;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0px 0px 40px -10px #6e6d6d;
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: white;
`

const CardFooter = styled.div`
    width: 100%;
    border-top: 0.5px solid black;
    padding: 10px 0 5px 5px;
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