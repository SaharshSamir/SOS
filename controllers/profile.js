const mongoose = require("mongoose");
const User = mongoose.model("users");
const Post = mongoose.model("posts");

const userProfile = async (req, res) => {
    const userId = req.query.userId;
    let user = await User.findById(userId);
    let posts = await Post.find({ _user: userId });
    thePosts = posts.map((post) => post._doc)

    //add usernames to each post in posts array
    const userPosts = thePosts.map((post) => {
        return {
            ...post,
            userName: user.firstName + ' ' + user.lastName
        }
    })
    user = user._doc
    profile = { userPosts, user};

    res.send(profile);
}

exports.userProfile = userProfile;