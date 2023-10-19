const { Schema, model } = require("mongoose");

const newSchema = new Schema(

    {
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: beautifyDate,
        },
        username: {
            type: String,
            required: true,
        },
    },
    {

        toJSON: {
            virtuals: true,
            getters: true,
        },

    }
);

const New = model("new", newSchema);

module.exports = New;