import React, {useEffect} from 'react';
import WebFont from 'webfontloader';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';




const UserInfo = (props) => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Poppins']
            }
        });
    }, []);
    console.log(props);
    return(
        <Container>
            <Left>
                <AccountCircleIcon className="accountCircle"/>
            </Left>
            <Middle>
                <Name>{props.username}</Name>
                <Posts>
                    <span>{props.profile?.userPosts?.length}</span> Posts
                </Posts>
                 <ContactInfo>
                    <Email><span>Email: </span>{props.profile?.user.email}</Email>
                    <PhoneNo><span>Phone No: </span>{props.profile?.user.phoneNo}</PhoneNo>
                </ContactInfo>
            </Middle>
            <Right></Right>
        </Container>
    )
}


const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-size: 1rem;
    font-family: 'Poppins';
`

const Email = styled.div`
    span{
        font-weight: bold;
    }
`
const PhoneNo= styled.div`
    span{
        font-weight: bold;
    }
`

const Posts = styled.div`
    font-size: 2rem;
    font-family: 'Poppins';
    span{
        font-weight: bold
    }
`

const Name = styled.p`
    font-family: 'Poppins';
    font-size: 3rem;
    font-weight: bold;
`

const Left = styled.div`
    width: 15%;
    /* background-color: cyan; */
    padding: 20px;
    svg{
        font-size: 6em;
        margin-left: 40px;
    }
`

const Middle = styled.div`
    width: 65%;
    /* background-color: yellow; */
    padding: 20px;
`

const Right = styled.div`
    width: 20%;
    /* background-color: pink; */
`

const Container = styled.div`
    padding: 0;
    margin: 0;
    /* margin-bottom: 30px; */
    /* height: 100vh; */
    width: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    /* justify-content: center; */
    background-color: #f5f1ed;
    /* overflow-y: scroll; */
`


const mapStateToProps = ({ profile }) => {
    return profile;
}

export default connect(mapStateToProps)(UserInfo);