const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, required: true}, //id of the user that posted the comment
    _post: {type: Schema.Types.ObjectId, required: true}, //id of the post that the comment is posted on
    createdAt: {type: Date, default: new Date()},
    userName: {type: String, required: true}, // username of the user that posted the comment
    text: {type: String, required: true},
});

module.exports = commentSchema;

