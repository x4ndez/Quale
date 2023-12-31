const { Schema, model } = require("mongoose");
const infoSchema = require('./Info');
const { generateCode } = require('../utils/common');

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
        friendRequests: [
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
        privateConvos: [{

            reqUserId: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            privateConvoId: {
                type: Schema.Types.ObjectId,
                ref: 'privateConvo',
            }

        }],
        // generates a 6 digit code, the arg is the number of digits you want the code.
        activateCode: {
            type: String,
            default: generateCode(6),
        },
        // sets to true once the user has activated their account.
        // will be checked upon every login.
        // will receive JWT only on successful login.
        accountActivated: {
            type: Boolean,
            default: false,
        }
    },
    {

        toJSON: {
            virtuals: true,
            getters: true,
        },
        // toObject: { virtuals: true, },

        virtuals: {

            friendsCount: {
                get: function () {
                    return this.friends.length;
                },
            },
            friendsRequestCount: {
                get: function () {
                    const reqCount = this.friendRequests.length;
                    return reqCount;
                },
            }


        },



    }
);

// Virtual to hold the friend request count
// userSchema.virtual('requestCount').get(() => {
//     return this.friendRequests.length;
// });

// Virtual to hold the friend count
// userSchema.virtual('friendsCount').get(function () {
//     return 1;
// });

const User = model("user", userSchema);

module.exports = User;