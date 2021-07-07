import React, {useState, useEffect} from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditModal from '../EditModal';





const Comment = ({comment, isCard, user}) => {
    const [isAuthComment, setIsAuthComment] = useState(false);

    useEffect(() => {
        if(user._id === comment._user){
            setIsAuthComment(true);
        }else{
            setIsAuthComment(false);
        }
    }, [user]);

    const [anchorEl, setAnchorEl] = useState(null);
    let isMoreOpen = Boolean(anchorEl);
    const handleMoreClose = () => {
        setAnchorEl(null);
    }
    const handleMoreClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const id = isMoreOpen ? 'simple-popover' : undefined;


    return (
        <Card isCard={isCard}>
            <CardHeader>
                <div style={{display: "flex"}}>
                    <AccountCircleIcon fontSize="large" />
                    <HeaderNameContainer>
                        <Name className="name" >{comment.userName}</Name>
                        <span className="divider">.</span>
                        <span className="time">{moment(comment.createdAt).fromNow()}</span>
                    </HeaderNameContainer>
                </div>
                {isAuthComment ? (
                    <IconButton aria-describedby={id} className="moreIcon" style={{padding: "5px"}} onClick={handleMoreClick}>
                        <MoreHorizIcon />
                    </IconButton>
                ) : (
                    <></>
                )}
                <Popover 
                    id={id}
                    open={isMoreOpen}
                    anchorEl={anchorEl}
                    onClose={handleMoreClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >

                    <List style={{color: "white", backgroundColor: "#37393b"}}>
                        <Button onClick={() => {}}>
                            <ListItem>
                                <ListItemIcon style={{minWidth: "0"}}>
                                    <DeleteOutlineOutlinedIcon style={{color: "#de4747"}}/>
                                </ListItemIcon>
                                <MoreText className="moreText">Delete</MoreText>
                            </ListItem>
                        </Button>
                        <Divider />
                        <Button style={{width: "100%"}} onClick={() => {}}>
                            <ListItem>
                                <ListItemIcon style={{minWidth: "0"}}>
                                    <EditOutlinedIcon style={{color: "#83b2eb"}}/>
                                </ListItemIcon>
                                <MoreText className="moreText">Edit</MoreText>
                            </ListItem>
                        </Button>
                    </List>

                </Popover>
            </CardHeader>
            <CardBody>
                <CardBodyDescription>
                    {comment.text}
                </CardBodyDescription>
            </CardBody>
        </Card>
    )
}

const MoreText = styled.p`
    padding: 0px 10px;
    font-family: 'Poppins';
    color: white;
`

const CardBody = styled.div`
    width: 100%;
    margin: 5px 0;
    padding-left: 38px;
`

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
    height: max-content;
    /* &:hover{
        text-decoration: underline;
        cursor: pointer;
    } */
`

const HeaderNameContainer = styled.div`
    margin-left: 2px;
    line-height: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .divider{
        font-size: 10px;
        font-weight: bolder;
        margin: 0 5px;
        padding-bottom: 0.2rem;
    }
    .time{
        font-family: 'Poppins';
        font-size: 15px;
        font-weight: lighter;
        height: max-content;
    }
`

const CardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    .moreIcon{
        justify-self: flex-end;
    }
`

const Card = styled.div`
    /* margin-bottom: 40px; */
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

export default Comment;