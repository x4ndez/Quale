const { Schema, model } = require("mongoose");
const commentSchema = require('./Comments');

const privateConvoSchema = new Schema(

    {
        comments: [commentSchema],
        recipients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
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

const PrivateConvo = model("privateConvo", privateConvoSchema);

module.exports = PrivateConvo;