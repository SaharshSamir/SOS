import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';
import moment from 'moment';

const Comment = ({comment, isCard}) => {
    return (
        <Card isCard={isCard}>
            <CardHeader>
                <AccountCircleIcon fontSize="large" />
                <HeaderNameContainer>
                    <Name className="name" >{comment.userName}</Name>
                    <span className="divider">.</span>
                    <span className="time">{moment(comment.createdAt).fromNow()}</span>
                </HeaderNameContainer>
            </CardHeader>
            <CardBody>
                <CardBodyDescription>
                    {comment.text}
                </CardBodyDescription>
            </CardBody>
        </Card>
    )
}


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