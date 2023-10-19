const express = require("express");
// const session = require("express-session");
const db = require('./config/mongodb');

// SETUP express
const server = express();
const PORT = process.env.PORT || 3001;

// SETUP express-session
// server.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//     })
// );

// SETUP server
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.set('trust proxy', true);

// SETUP mongoDB
db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
