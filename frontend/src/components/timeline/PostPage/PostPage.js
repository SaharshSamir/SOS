import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Navbar from '../../Navbar/Navbar';
import PostSection from './PostSection';
import CommentSection from './CommentSection';
import AuthDialog from '../../Utils/AuthDialog';
import { fetchPosts, commentPost } from "../../../Actions/post";
import { useParams } from 'react-router-dom';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
const PostPage = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, []);
    
    const {postId} = useParams();
    const [text, setText] = useState("");
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setUser(props.authData?.newUser);
    }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user){
            setOpen(true);
            return;
        }
        const data = {
            commentUserName: user.firstName + " " + user.lastName,
            text,
            postId,
        }
        dispatch(commentPost(data));
        e.target.reset();
    }
    
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleClose = () => {
        setOpen(!open);
    }
    
    return (
        <Container>
            <Navbar bgColor="#D5F3C4" hoverColor="#b8d1a9"/>
            <PostSection />
            <CommentInput onSubmit={handleSubmit}>
                <Input>
                    <TextField id="outlined-basic" label="Comment" fullWidth variant="outlined" onChange={handleChange}/>
                </Input>
                <SendComment type="submit">
                    <SendIcon fontSize="large"/>
                </SendComment>
            </CommentInput>
            <CommentSection />
            <AuthDialog 
                open={open}
                onClose={handleClose}
                setOpen={setOpen}
                history={history}
            />
        </Container>
    )
}


const SendComment = styled.button`
    background-color: #2665DE; 
    color: white;
    width: max-content;
    border-radius: 5px;
    padding: 5px 25px 5px 25px;
    border: none;
    &:hover{
        cursor: pointer;
        background-color: #4a88ff;
    }
`

const Input = styled.div`
    width: 90%;
`
const CommentInput = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

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

const mapStateToProps = ({auth}) => {
    return auth;
}

export default connect(mapStateToProps)(PostPage);