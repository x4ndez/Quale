const { Schema, model } = require("mongoose");

const infoSchema = new Schema(

    {
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        interests: [],

    },
    {

        toJSON: {
            virtuals: true,
            getters: true,
        },

    }
);

module.exports = infoSchema;