const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    likes: {
        type: Number,
        default: 0
    },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() }
})

mongoose.model("posts", postSchema);
