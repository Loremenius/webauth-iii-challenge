const express = require('express');
const helmet = require('helmet');

const usersRoute = require('./routeOne/users-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api", usersRoute);

module.exports = server;