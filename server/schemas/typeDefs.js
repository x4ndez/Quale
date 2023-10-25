const typeDefs = `

type Query {
    users: [User]!
    userByUsername(username: String!): User
}

type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
}

type User {
    _id: ID
    username: String
    password: String
    email: String
}

type Auth {
    token: ID!
    user: User!
}

`;

module.exports = typeDefs;