const { User, Convo, PrivateConvo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
var { Types } = require('mongoose');
const { sendCode } = require('../utils/smtpFunc');

const resolvers = {

    Query: {
        // return all users
        users: async () => {

            const x = await User.find().populate('convos');
            console.log(x);
            return x;
        },
        userById: async (parent, { userId }) => {
            const y = await User.findById(userId)
                .populate('friendRequests')
                .populate('friends');
            return y;
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

            const usernameValidate = await User.findOne({ username: username });
            const emailValidate = await User.findOne({ email: email });

            //VALIDATIONS:
            // Username not in DB
            // Email not in DB
            // Password is 8 chars or greater
            // Username is ''
            // Password is ''
            if (usernameValidate ||
                emailValidate ||
                password.length < 8 ||
                username === '' ||
                email === '') {
                throw new Error('VALIDATION ERROR.');
            }

            const newUserData = {
                username: username,
                password: password,
                email: email,
            }

            const user = await User.create(newUserData);
            // email to be sent to user for activation
            // this will no longer sign a token, user must login to receive a token

            return user;

            // DEPRECATED
            // const token = signToken(user);

            // return { token, user };

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

        addFriend: async (parent, { userId, friendId }) => {

            await User.findByIdAndUpdate(userId, {
                $pull: { friendRequests: friendId },
            }, {
                returnDocument: 'after',
            });

            await User.findByIdAndUpdate(friendId, {
                $addToSet: { friends: userId }
            }, {
                returnDocument: 'after',
            });

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

        addFriendRequest: async (parent, { userId, friendId }) => {

            return await User.findByIdAndUpdate(friendId, {
                $addToSet: { friendRequests: userId }
            }, {
                returnDocument: 'after',
            });

        },

        removeFriendRequest: async (parent, { userId, friendId }) => {

            return await User.findByIdAndUpdate(userId, {
                $pull: { friendRequests: friendId },
            }, {
                returnDocument: 'after',
            });

        },

        startPrivateConvo: async (parent, { userId, friendId }) => {
            // FUNCTION DEPRECATED
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
            // FUNCTION DEPRECATED
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
            return await PrivateConvo.findById(convoIndicator.privateConvoId).populate('recipients');

        },

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
        emailExists: async (parent, { email }) => {

            const query = await User.findOne({ email: email });

            if (query) return true;
            else return false;


        },

        usernameExists: async (parent, { username }) => {

            const query = await User.findOne({ username: username });

            if (query) return true;
            else return false;


        },

        // when guided to the activate page, email will be sent IF the account has not been activated. 
        // sending the email on the activate page rather than at login will prevent two emails being sent at login
        // and if a user delayed activating after creating an account, they'll receive the email again as a reminder.
        activateVerify: async (parent, { userId }) => {

            const user = await User.findById(userId);

            if (!user.accountActivated) sendCode(user);

            return user;

        },

        activateAccount: async (parent, { userId, activateCode }) => {

            const user = await User.findById(userId);

            if (user.activateCode === activateCode) {
                const activatedUser = await User.findByIdAndUpdate(
                    userId,
                    { accountActivated: true },
                    { returnDocument: 'after' },);
                return true;
            }
            else return false;

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
    PrivateConvo: {
        recipients: async (parent) => {
            const recipiets = await PrivateConvo.findById(parent._id).populate('recipients');
            return recipiets;
        }
    },
    // User: {
    //     friendRequests: async (parent) => {
    //         // console.log(parent);
    //         const user = await User.findById(parent);
    //         return user;
    //     }
    // }

};

module.exports = resolvers;