import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';


const AuthDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
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
                <CancelButton onClick={() => props.setOpen(false)}>No</CancelButton>
                <RedirectButton onClick={() => props.history.push("/register/login")}>Yes</RedirectButton>
            </DialogActions>
        </Dialog>
    )
}

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
    };

`

export default AuthDialog;