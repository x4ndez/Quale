const { Schema, model } = require("mongoose");

//   Table comments {
//     _id ID
//     comment String
//     createdAt String
//     createdBy User
//   }

const commentSchema = new Schema(

    {
        comment: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {

        toJSON: {
            virtuals: true,
            getters: true,
        },

    }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;