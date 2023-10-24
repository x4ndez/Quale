const { User } = require('../models');

const resolvers = {

    Query: {
        users: async () => {
            return User.find();
        }
    },

    Mutation: {
        addUser: async (parent, { username, password, email }) => {

            const newUser = {
                username: username,
                password: password,
                email: email,
            }

            return User.create(newUser);
        }
    }

};

module.exports = resolvers;