const mongoose = require("mongoose");
const Post = mongoose.model("posts");
const User = mongoose.model("users");

const upload = async (req, res) => {
    const { title, description } = req.body;

    try
    {
        const post = new Post({
            title,
            description,
            createdAt: new Date(),
            _user: req.userId
        }).save()
        console.log("in controller");
        res.send({ message: "ho gaya" });
    } catch (e)
    {
        console.log(e.message);
    }
}


const timelinePosts = async (req, res) => {
    try
    {
        const posts = await Post.find({});
        const getPosts = async () => {
            const newPosts = posts.map(async post => {
                const user = await User.find({_id: post._user})
                // console.log(user);
                const newPost = {...post._doc, userName: user[0].firstName + ' ' + user[0].lastName}
                return newPost
            })
            return newPosts;
        }
        thePosts = await getPosts();
        const results = await Promise.all(thePosts);
        console.log(results);
        res.send(results);
    } catch (e)
    {
        console.log(`error in timeline posts: ${e.message}`);
    }
}
exports.upload = upload;
exports.timelinePosts = timelinePosts;