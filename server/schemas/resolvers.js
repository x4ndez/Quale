const { User, Convo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {
        // return all users
        users: async () => {
            return await User.find().populate('convos');
        },
        userById: async (parent, { userId }) => {
            return await User.findById(userId);
        },
        // return 5 most recent conversations: Used for the dashboard recent convos display.
        convosRecent: async () => {
            return await Convo.find({}).sort({ createdAt: -1 }).limit(5);
        },
        convoById: async (parent, { convoId }) => {
            return await Convo.findById(convoId);
            // .populate('comments.createdBy');
        },
    },
    Mutation: {
        addUser: async (parent, { username, password, email }) => {

            //PROCESS USER DATA HERE

            //USERNAME VALIDATION


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

        },

        addCommentToConvo: async (parent, { convoId, commentContent, createdBy }) => {

            const newComment = {
                comment: commentContent,
                createdBy: createdBy,
            }

            return await Convo.findByIdAndUpdate(convoId, {
                $addToSet: { comments: newComment }
            }, {
                returnDocument: 'after',
            });

        },

        updateInfoById: async (parent, { userId, name, phone, city, country }) => {

            const updateInfo = {
                name: name,
                phone: phone,
                city: city,
                country: country,
            }

            console.log({ info: updateInfo });

            return await User.findByIdAndUpdate(userId, { info: updateInfo }, {
                returnDocument: 'after',
            });

        },

        updateInterestsById: async (parent, { userId, interests }) => {

            const updateInterests = interests;

            return await User.findByIdAndUpdate(userId, { interests: updateInterests }, {
                returnDocument: 'after',
            });

        },

        //ADD FRIEND

        addFriend: async (parent, { userId, friendId }) => {

            return await User.findByIdAndUpdate(userId, {
                $addToSet: { friends: friendId }
            }, {
                returnDocument: 'after',
            });

        },

        //DELETE FRIEND

    },

    Convo: {
        createdBy: async (parent) => {
            const user = await User.findById(parent.createdBy);
            return user;
        }
    },

    Comment: {
        createdBy: async (parent) => {
            const user = await User.findById(parent.createdBy);
            return user;
        }
    }

};

module.exports = resolvers;