const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./projects/projects-router')

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/', projectsRouter)

module.exports = server;