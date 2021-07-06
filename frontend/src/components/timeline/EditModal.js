import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '../Utils/Card';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';
import {update} from '../../Actions/post';

const EditModal = (props) => {

    const ModalStyles={
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: props.post.title, 
        description: props.post.description, 
        contactInfo:  props.post.contactInfo
    });
    const [isErrorTitle, setIsErrorTitle] = useState(false);
    const [isErrorContact, setIsErrorContact] = useState(false);

    const handleChange = e => {

        const obj = { ...formData, [e.target.name]: e.target.value }
        setFormData(obj);
    }

    const handleSubmit = e => {
        // e.preventDefault();

        if (!formData.title || !formData.contactInfo)
        {
            setIsErrorTitle((!formData.title) ? true : false);
            setIsErrorContact((!formData.contactInfo) ? true : false);
        } else
        {
            setFormData(formData);
            // e.target.reset()
            dispatch(update({...formData, postId: props.post._id, postUser: props.post._user, userName: props.post.userName}));
            props.setOpen(false);
        }
    }

    return (
       
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={() => props.setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            style={ModalStyles}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Card isCard={true}>
                <Fade in={props.open}>
                    <FormContainer onSubmit={handleSubmit}>
                        <TextField
                            placeholder="I will/want..."
                            label="Title"
                            defaultValue={props.post.title}
                            variant="outlined"
                            name="title"
                            fullWidth
                            error={isErrorTitle}
                            helperText={(isErrorTitle) ? "Required" : ""}
                            onChange={handleChange}
                            style={{ margin: "10px", width: "100%" }}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            defaultValue={props.post.description}
                            name="description"
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={5}
                            style={{ margin: "10px" }}
                        />
                        <TextField
                            placeholder="How to contact you?"
                            label="Contact info"
                            defaultValue={props.post.contactInfo}
                            variant="outlined"
                            name="contactInfo"
                            fullWidth
                            error={isErrorContact}
                            helperText={(isErrorContact) ? "Required" : ""}
                            onChange={handleChange}
                            style={{ margin: "10px" }}
                        />
                        <ButtonDiv>
                            <PostButton type="submit">Post</PostButton>
                        </ButtonDiv>
                    </FormContainer>
                </Fade>
            </Card>
        </Modal>

    )
}


const ButtonDiv = styled.div`
    display: flex;
    margin: 10px;
`;

const PostButton = styled.button`
    background-color: #2665DE; 
    color: white;
    width: max-content;
    border-radius: 5px;
    padding: 5px 25px 5px 25px;
    font-size: 20px;
    border: none;
    &:hover{
        cursor: pointer;
        background-color: #4a88ff;
    }
`;

const FormContainer = styled.form`
    width: 70vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
    display: flex;
    padding: 20px 50px;
`;


export default EditModal;