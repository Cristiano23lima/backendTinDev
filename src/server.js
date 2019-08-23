const express = require("express");
const mongoose= require("mongoose");
const cors = require('cors');
const server = express();

//banco de dados
mongoose.connect('mongodb+srv://tinDev:tinDev@cluster0-s1zam.mongodb.net/tinDev?retryWrites=true&w=majority', {useNewUrlParser: true});

//Rotas
const routes = require("./routes");

server.use(cors());
server.use(express.json());//aqui o express vai entender o JSON
server.use(routes);

server.listen(process.env.PORT || 3333);