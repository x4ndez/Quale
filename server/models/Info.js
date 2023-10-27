const { Schema, model } = require("mongoose");

const infoSchema = new Schema(

    {
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
    {

        toJSON: {
            virtuals: true,
            getters: true,
        },

    }
);

module.exports = { infoSchema };