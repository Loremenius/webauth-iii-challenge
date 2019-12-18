const express = require('express');
const helmet = require('helmet');

const routeOne = require('./routeOne/route_one-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/routeOne", routeOne);

module.exports = server;