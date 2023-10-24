const { Schema, model } = require("mongoose");

// Table users {
//     _id ID
//     username String
//     password String
//     createdAt String
//     friends [friends]
//     convos [convos]

//   }

const userSchema = new Schema(

    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        convos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'convo',
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

const User = model("Users", userSchema);

module.exports = User;