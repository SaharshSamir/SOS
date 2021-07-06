import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ChangeDefault from '../timeline/SearchContext';


const searchSuggestionsStyles = {
    backgroundColor: "#37393b",

}
const Search = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [datalistId, setDatalistId] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const setTargetPosts = useContext(ChangeDefault);
    
    
    const handleSearchInput = (e) => {
        
        setSearchText(e.target.value);
        if(searchText){
            setDatalistId("posts");
        }
        else{
            setDatalistId("");  
        }
        setAnchorEl(searchText? e.currentTarget : null);
        
        setIsSearchOpen(Boolean(anchorEl));
    }
    
    // let targetPosts = []
    const renderOptions = () => {
        return (
            <datalist id={searchText? (datalistId) : ""}>
                {
                    props?.posts?.map(post => {
                        
                        return (
                            <option value={post.title} onClick={() => console.log(post.userName)}/>
                            )
                        })
                }
            </datalist>
        )
    }
    const redirectToPostPage = (post) => {
        history.push(`/post/${post._id}`);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const searchResults = props.posts.filter((post) => {
            return post.title.toLowerCase() === searchText.toLowerCase();
        });
        // targetPosts.push(targetPost);
        setTargetPosts(searchResults);
        // history.push(`search/results/${targetPost.title}`);
    }


    return (
        <SearchBar searchColor={props.bgColor} onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="search..."
                onChange={handleSearchInput}
                list="posts"
            />
            {renderOptions()}
            <button className="searchButton" onClick={() => console.log("click")}>
                <SearchIcon style={{fontSize: 30}}/>
            </button>
            
        </SearchBar>
    )
}


const SearchBar = styled.form`
    width: 47%;
    flex-shrink: 1;
    display: flex;
    margin-top: 3px;
    input[type=text]{
        border-radius: 7px;
        height: 28px;
        background-color: #a6d889;
        width: 100%;
        padding: 12px 8px;
        border: none;
        box-shadow: inset 2px 2px 8px -2px rgba(0, 0, 0, 0.83);
        color: black;
        font-size: 1.2rem;

    }
    input::-webkit-calendar-picker-indicator {
        display: none;
    }
    .searchButton{
        /* height: 100%; */
        width: fit-content;
        border-radius: 5px;
        border: none;
        padding: 0;
        margin-left: 5px;
        background-color: ${props => props.searchColor};
        cursor: pointer;
        color: #3b8652;
        &:hover{
            color:#000000;
        }
    }
`


const mapStateToProps = ({ posts, auth }) => {

    return { posts, auth }

}

export default connect(mapStateToProps)(Search);