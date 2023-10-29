const { User, Convo, PrivateConvo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
var { Types } = require('mongoose');

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
        getPrivateConvo: async (parent, { convoId }) => {
            return await PrivateConvo.findById(convoId);
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

        removeFriend: async (parent, { userId, friendId }) => {

            return await User.findByIdAndUpdate(userId, {
                $pull: { friends: friendId },
            }, {
                returnDocument: 'after',
            });

        },

        //DELETE FRIEND

        //START PRIVATE CONVO

        startPrivateConvo: async (parent, { userId, friendId }) => {

            const privateConvoData = await PrivateConvo.create({
                recipients: [userId, friendId]
            });

            const user = await User.findByIdAndUpdate(userId, {
                $addToSet: { privateConvos: { reqUserId: friendId, privateConvoId: privateConvoData._id } }
            }, {
                returnDocument: 'after',
            });

            const friend = await User.findByIdAndUpdate(friendId, {
                $addToSet: { privateConvos: { reqUserId: userId, privateConvoId: privateConvoData._id } }
            }, {
                returnDocument: 'after',
            });

            return privateConvoData;

        },

        checkForPrivateConvo: async (parent, { userId, friendId }) => {

            const user = await User.findById(userId);

            const convoIndicator = user.privateConvos.find((item) => {
                if (item.reqUserId.toString() === friendId) return item;
            });

            if (convoIndicator) return convoIndicator._id;
        },

        initiatePrivateConvo: async (parent, { userId, friendId }) => {

            // Pull the client's data
            const user = await User.findById(userId);

            // Check if the client already has a private convo with target user
            const convoIndicator = user.privateConvos.find((item) => {
                if (item.reqUserId.toString() === friendId) return item;
            });

            // IF: there isn't a private convo, create one and return the new private convo to the client
            if (!convoIndicator) {
                // Create new private convo
                const privateConvoData = await PrivateConvo.create({
                    recipients: [userId, friendId]
                });

                // Add the private convo "indicator" to the client
                // Private convo indicator : { reqUserId, privateConvoId }
                // reqUserID is the ID of the target user, so in the .find function above, the user can see
                // if the convo already exists betwen user and target user.
                // privateConvoId directs to the convo so the data can be pulled and given to the client.
                const user = await User.findByIdAndUpdate(userId, {
                    $addToSet: { privateConvos: { reqUserId: friendId, privateConvoId: privateConvoData._id } }
                }, {
                    returnDocument: 'after',
                });

                // Add the private convo "indicator" to the target client
                const friend = await User.findByIdAndUpdate(friendId, {
                    $addToSet: { privateConvos: { reqUserId: userId, privateConvoId: privateConvoData._id } }
                }, {
                    returnDocument: 'after',
                });

                // return the new private convo
                return privateConvoData;
            }

            // return the existing private convo
            return await PrivateConvo.findById(convoIndicator.privateConvoId);

        },

        //ADD A COMMENT TO A PRIVATE CONVO

        addCommentToPrivateConvo: async (parent, { convoId, commentContent, createdBy }) => {

            const newComment = {
                comment: commentContent,
                createdBy: createdBy,
            }

            return await PrivateConvo.findByIdAndUpdate(convoId, {
                $addToSet: { comments: newComment }
            }, {
                returnDocument: 'after',
            });

        },

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
    },
    // User: {
    //     privateConvos: async (parent) => {
    //         const user = await User.findById(parent.privateConvos);
    //         return user;
    //     }
    // }

};

module.exports = resolvers;