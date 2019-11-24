const express = require("express");
const mongoose= require("mongoose");
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};


io.on('connection', socket => {
    const { user } = socket.handshake.query;
    
    connectedUsers[user] = socket.id;
});

//banco de dados
mongoose.connect('mongodb+srv://tinDev:tinDev@cluster0-s1zam.mongodb.net/tinDev?retryWrites=true&w=majority', {useNewUrlParser: true});

//Middleware
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

//Rotas
const routes = require("./routes");

app.use(cors());
app.use(express.json());//aqui o express vai entender o JSON
app.use(routes);

server.listen(process.env.PORT || 3333);