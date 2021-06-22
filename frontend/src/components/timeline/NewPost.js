import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { upload } from '../../Actions/post';
import { useDispatch, connect } from 'react-redux';


const intialFormData = { title: "", description: "", contactInfo: "" }
const NewPost = ({ authData }) => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState(intialFormData);
    const [isErrorTitle, setIsErrorTitle] = useState(false);
    const [isErrorContact, setIsErrorContact] = useState(false);
    const handleChange = e => {

        const obj = { ...formData, [e.target.name]: e.target.value }
        setFormData(obj);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!formData.title || !formData.contactInfo)
        {
            setIsErrorTitle((!formData.title) ? true : false);
            setIsErrorContact((!formData.contactInfo) ? true : false);
        } else
        {
            setFormData(intialFormData);
            e.target.reset();
            dispatch(upload(formData));
        }
    }
    const renderForm = () => {
        return (
            <FormContainer onSubmit={handleSubmit}>
                <TextField
                    placeholder="I will/want..."
                    label="Title"
                    variant="outlined"
                    name="title"
                    fullWidth
                    error={isErrorTitle}
                    helperText={(isErrorTitle) ? "Required" : ""}
                    onChange={handleChange}
                    style={{ margin: "10px" }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
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
        )
    }

    return (
        <Container>
            {renderForm()}
            <hr />
        </Container>
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
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
    display: flex;
    padding: 20px 150px;
`;

const Container = styled.div`
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f5f1ed;
`;


function mapStateToProps({ auth }) {
    return auth;
}

export default connect(mapStateToProps)(NewPost);