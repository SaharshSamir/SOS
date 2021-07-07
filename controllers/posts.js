const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const User = mongoose.model("users");

const upload = async (req, res) => {
    const { title, description, contactInfo } = req.body;

    try
    {
        const post = await new Post({
            title,
            description,
            contactInfo,
            createdAt: new Date(),
            _user: req.userId
        }).save();

        const user = await User.findById(req.userId);

        //add usrname to the post
        const newPost = {
            ...post._doc,
            userName: user.firstName + ' ' + user.lastName
        }
        
        res.send({ message: "ho gaya", newPost });
    } catch (e)
    {
        console.error(e.message);
    }
}

//edit post
const updatePost = async (req, res) => {

    const{ title, description, contactInfo, postId, userName } = req.body;
    try {
        const post = await Post.findById(postId);
        post.title = title;
        post.description = description;
        post.contactInfo = contactInfo;

        const updatedPost = await Post.findOneAndUpdate({_id: postId}, post, {new: true});

        const newPost = {...updatedPost, userName};
        
        res.status(201).send(newPost);
    } catch (e) {
        console.error(e);
    }
}

const likePost = async (req, res) => {
    const { postId, userName } = req.body;
    try
    {
        //get the post and the user that the post belongs to
        const post = await Post.findById(postId);
        const postUser = await User.findById(post._user);

        //if user has already liked the post then unlike the post and remove their username from likes array
        if (!post.likes.includes(userName))
        {
            post.likes = [...post.likes, userName];
        } else
        {
            post.likes.splice(post.likes.indexOf(userName), 1);
        }


        let newPost = await Post.findOneAndUpdate(
            { _id: postId },
            post,
            { new: true }
        );

        //add username to the post
        newPost = {
            ...newPost,
            userName: postUser.firstName + ' ' + postUser.lastName
        }

        res.status(201).send(newPost);
    } catch (e)
    {
        console.error(`error in likePost:`);
        console.error(e.message);
    }
}


const timelinePosts = async (req, res) => {
    try
    {
        const posts = await Post.find({});

        //add user the post belongs to, to the each post
        const getPosts = async () => {
            const newPosts = posts.map(async post => {
                const user = await User.find({ _id: post._user })
                const newPost = { ...post._doc, userName: user[0].firstName + ' ' + user[0].lastName }
                return newPost
            })
            return newPosts;
        }
        thePosts = await getPosts();
        const results = await Promise.all(thePosts);
        res.send(results);
    } catch (e)
    {
        console.log(`error in timeline posts: ${e.message}`);
    }
}



const commentPost = async (req, res) => {
    const {text, postId, commentUserName} = req.body;
    const userId = req.userId;
    
    try {
        const post = await Post.findById(postId);
        const postUser = await User.findById(post._user);
        const newComment = {
            userName: commentUserName,
            text,
            createdAt: new Date(),
            _user: userId,
            _post: postId
        }

        post.comments = [...post.comments, newComment]

        let newPost = await Post.findOneAndUpdate(
            {_id: postId},
            post,
            {new: true}
        )
        
        newPost = {
            ...newPost._doc,
            userName: postUser.firstName + ' ' + postUser.lastName
        }

        res.status(200).json({message: "comment posted successfully", newPost: newPost});
    } catch (e) {
        console.error('error in commentPost controller: ');
        console.error(e.message);
    }
}


const deletePost = async (req, res) => {
    const {postId} = req.params;
    try {
        await Post.findByIdAndDelete(postId);
        res.status(200).send("Successfully deleted");

    } catch (e) {
        console.error(e.message);
    }
}

const deleteComment = async (req, res) => {
    let {postId, commentId} = req.body;
    commentId = JSON.stringify(commentId);
    try {
        const post = await Post.findById(postId);
        const postUser = await User.findById(post._user);

        const updatedComments = post.comments.filter(comment => {
            const dbCommentId = JSON.stringify(comment._id);
            return dbCommentId !== commentId;
        });
        
        post.comments = updatedComments;
        console.log(post);

        let newPost = await Post.findOneAndUpdate(
            {_id: postId},
            post,
            {new: true}
        );

        newPost = {
            ...newPost._doc,
            userName: postUser.firstName + ' ' + postUser.lastName
        }

        res.status(200).json({message: "comment deleted succefully", newPost: newPost});


    } catch (e) {
        console.error("Error in deleteComment")
        console.error(e.message);
    }
}



exports.deleteComment = deleteComment;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.commentPost = commentPost;
exports.likePost = likePost;
exports.upload = upload;
exports.timelinePosts = timelinePosts;