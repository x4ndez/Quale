const { User, Convo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async () => {
            return await User.find().populate('convos');
        },
        userByUsername: async (parent, { username }) => {
            return await User.findOne({ username: username });
        },
    },

    Mutation: {
        addUser: async (parent, { username, password, email }) => {

            //PROCESS USER DATA HERE

            const newUserData = {
                username: username,
                password: password,
                email: email,
            }

            const user = await User.create(newUserData);

            const token = signToken(user);

            return { token, user };

        },

        login: async (parent, { username, password }) => {

            const userInput = {
                username: username,
                password: password,
            }

            const user = await User.findOne({ username: userInput.username });

            if (!user) {
                console.log('cannot find user');
                throw AuthenticationError;
            }

            if (userInput.password === user.password) {

                const token = signToken(user);
                return { token, user };

            } else {
                console.log('wrong password');
                throw AuthenticationError;
            }

        },

        addConvo: async (parent, { roomName, createdBy }) => {

            const newConvo = {
                roomName: roomName,
                createdBy: createdBy,
            }

            const convo = await Convo.create(newConvo);

            await User.findOneAndUpdate({ _id: convo.createdBy }, {
                $addToSet: { convos: convo._id }
            }, {
                new: true,
            });

            return convo;

        }

    }

};

module.exports = resolvers;