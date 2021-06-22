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

        console.log("in controller");
        console.log(post);
        res.send({ message: "ho gaya", newPost });
    } catch (e)
    {
        console.log(e.message);
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
        console.log(`error in likePost: ${e}`);
    }
}

exports.likePost = likePost;
exports.upload = upload;
exports.timelinePosts = timelinePosts;