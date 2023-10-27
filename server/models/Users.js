const { Schema, model } = require("mongoose");
const infoSchema = require('./Info');

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
        info: {
            name: {
                type: String,
                default: '',
            },
            phone: {
                type: String,
                default: '',
            },
            city: {
                type: String,
                default: '',
            },
            country: {
                type: String,
                default: '',
            },

        },
        interests: [String],
    },
    {

        toJSON: {
            virtuals: true,
            getters: true,
        },

    }
);

const User = model("user", userSchema);

module.exports = User;