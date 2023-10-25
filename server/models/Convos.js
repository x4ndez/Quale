const { Schema, model } = require("mongoose");

//   Table convos {
//     _id ID
//     nickname String
//     createdAt String
//     createdBy User
//     //banList [users]
//     content [comments]
//   }

const convoSchema = new Schema(

    {
        roomName: {
            type: String,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'comment',
            },
        ],
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

const Convo = model("convo", convoSchema);

module.exports = Convo;