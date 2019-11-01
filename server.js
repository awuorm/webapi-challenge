const express = require("express");
const cors  = require("cors");
const helmet = require("helmet");
const projectModelRouter = require("./data/helpers/projectModelRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/projects",projectModelRouter);


server.get("*",handleDefaultRequest);

function handleDefaultRequest(req,res) {
    res.json("Hello from  sprint challenge server");
}

module.exports = server;