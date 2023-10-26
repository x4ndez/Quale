const typeDefs = `

type Query {
    users: [User]!
    userByUsername(username: String!): User
    convosRecent: [Convo]
    convoById(convoId: String!): Convo
}

type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    addConvo(roomName: String!, createdBy: ID!): Convo
    addCommentToConvo(convoId: ID!, commentContent: String, createdBy: ID!): Convo
}

type User {
    _id: ID
    username: String
    password: String
    email: String
    convos: [Convo]
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