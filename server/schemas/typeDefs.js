const typeDefs = `

type Query {
    users: [User]!
}

type Mutation {
    addUser: User
}

type User {
    _id: ID
    username: String!
    password: String!
    email: String!
}

`;

module.exports = typeDefs;