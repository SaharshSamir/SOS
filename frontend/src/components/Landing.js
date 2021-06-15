import React, { useEffect } from 'react';
import Navbar from "./Navbar";
import styled from "styled-components";
import WebFont from 'webfontloader';
import Drawing from "../assets/Illustration.svg"
import { useHistory } from 'react-router-dom';


const Landing = () => {
    const history = useHistory();
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Cabin']
            }
        });
    }, []);

    return (
        <Container className="contianer">
            <Navbar bgColor="transparent" hoverColor="#ffe9ab" />
            <Left>
                <Content>
                    <Title>
                        <p>We Hear<br></br>your Distress Calls</p>
                    </Title>
                    <SubTitle>
                        <p>A community committed to helping each other<br></br>during this pandemic</p>
                    </SubTitle>
                    <ActionButton onClick={() => history.push("/timeline")}>
                        Get Started
                    </ActionButton>
                </Content>
            </Left>
            <Right>
                <Illustration className="Illustration">
                    <img src={Drawing} />
                </Illustration>
            </Right>
        </Container>
    )
}


const ActionButton = styled.button`
    border-radius: 5px;
    margin-top: 30px;
    background-color: #2F9726;
    border: none;
    padding: 7px 20px;
    font-size: 1.05rem;
    color: white;
    &:hover{
        cursor: pointer;
        background-color: #6ab564;

    }
`

const Illustration = styled.div`
    /* background-color: black; */
    margin-top: 20px;
    img{
        height: 400px;
        width: 400px;
    }
`

const Content = styled.div`
    margin-left: 15px;
`

const SubTitle = styled.div`
    font-family: "Cabin";
    color: #545353;
    font-size: 1.4rem;

`

const Title = styled.div`
    font-family: "Cabin";
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 15px;
`

const Left = styled.div`
    background-color: #D5F3C4;
    width: 40%;
    height: 100vh;
    display: flex;
    align-items: center;

`
const Right = styled.div`
    width: 60%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`


const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: row;
`

export default Landing;