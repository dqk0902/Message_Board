"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var uuid_1 = require("uuid");
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST'],
    },
});
var PORT = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// In-memory storage for channels and messages  
var channels = [
    { id: 1, name: 'Channel 1', messages: [] },
    { id: 2, name: 'Channel 2', messages: [] },
];
var initializeChannels = function () {
    channels.forEach(function (channel) {
        channel.messages = [];
    });
};
initializeChannels();
app.get('/channels', function (req, res) {
    res.json(channels.map(function (_a) {
        var id = _a.id, name = _a.name;
        return ({ id: id, name: name });
    }));
});
app.get('/messages/:channelId', function (req, res) {
    var channelId = parseInt(req.params.channelId);
    var channel = channels.find(function (c) { return c.id === channelId; });
    res.json(channel ? channel.messages : []);
});
app.post('/:channelId', function (req, res) {
    var channelId = parseInt(req.params.channelId);
    var text = req.body.text;
    var channel = channels.find(function (c) { return c.id === channelId; });
    if (channel) {
        var newMessage = { id: (0, uuid_1.v4)(), text: text };
        channel.messages.push(newMessage);
        io.to(channelId.toString()).emit('newMessage', newMessage);
        res.json(newMessage);
    }
    else {
        res.status(404).json({ error: 'Channel not found' });
    }
});
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('join', function (channelId) {
        socket.join(channelId.toString());
    });
    socket.on('leave', function (channelId) {
        socket.leave(channelId.toString());
    });
});
server.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
