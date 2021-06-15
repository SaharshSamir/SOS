const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    likes: {
        type: [String],
        default: []
    },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() }
})
//something
mongoose.model("posts", postSchema);

