import React from 'react';
import styled from 'styled-components';

const Card = (props) => {

    return (
        <MyCard isCard={props.isCard}>
            {props.children}
        </MyCard>
    )
}

const MyCard = styled.div`
    /* margin-bottom: 60px; */
    width: ${props => props.isCard ? "max-content" : "100%"};
    border-radius: ${props => props.isCard ? "20px" : "0"};
    border: ${props => props.isCard ? "none" : "1px solid black"};
    padding: 20px;
    box-shadow: ${props => props.isCard ? "0px 0px 40px -10px rgb(110, 109, 109)" : "none"};
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.isCard ? "white" : "transparent"};
`
export default Card;