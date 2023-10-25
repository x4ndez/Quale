require('dotenv').config();
const express = require('express');
const db = require('./config/mongodb');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authExtension } = require('./utils/auth');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

//todo: smtp connect

const server = express();
const PORT = process.env.PORT || 3001;

const { typeDefs, resolvers } = require('./schemas');
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const httpServer = createServer(server);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const startApolloServer = async () => {

    await apolloServer.start();

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    // server.use('/setup/graphql', expressMiddleware(apolloServer));
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

        httpServer.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });

        io.on('connect', (socket) => {

            socket.on('create', (userInp_roomName) => {

                const roomName = userInp_roomName;
                console.log(`Room created: ${roomName}`);

                socket.join(roomName);
                // io.to(roomName).emit('chat', `The room has been created: ${roomName}`);

                socket.on('chat', (socket2) => {
                    console.log(`Message sent: ${socket2}`);
                    io.to(roomName).emit('chat', socket2);
                });

            });

        });

    });

}

startApolloServer();
