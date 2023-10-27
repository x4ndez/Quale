const typeDefs = `

type Query {
    users: [User]!
    userById(userId: ID!): User
    convosRecent: [Convo]
    convoById(convoId: String!): Convo
}

type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    addConvo(roomName: String!, createdBy: ID!): Convo
    addCommentToConvo(convoId: ID!, commentContent: String, createdBy: ID!): Convo
    updateInfoById(userId: ID!, name: String! phone: String!, city: String!, country: String!): User
    updateInterestsById(userId: ID!, interests: [String]): User
    addFriend(userId: ID!, friendId: ID!): User
}

type User {
    _id: ID
    username: String
    password: String
    email: String
    friends: [User]
    convos: [Convo]
    info: Info
    interests: [String]
}

type Info {
    name: String
    phone: String
    city: String
    country: String
}

type Auth {
    token: ID!
    user: User!
}

type Convo {
    _id: ID
    roomName: String
    comments: [Comment]
    createdBy: User
    createdAt: String
}

type Comment {
    _id: ID
    comment: String
    createdBy: User
    createdAt: String
}

`;

module.exports = typeDefs;