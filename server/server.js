require('dotenv').config();
const express = require('express');
const db = require('./config/mongodb');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const authExtension = require('./utils/auth');
const path = require('path');

//todo: smtp connect

const server = express();
const PORT = process.env.PORT || 3001;

const { typeDefs, resolvers } = require('./schemas');
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {

    await apolloServer.start();

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use('/setup/graphql', expressMiddleware(apolloServer, {
        context: authExtension,
    }));

    if (process.env.NODE_ENV === 'production') {
        server.use(express.static(path.join(__dirname, '../client/dist')));

        server.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        server.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });
    });

}

startApolloServer();
