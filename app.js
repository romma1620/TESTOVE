const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {authRouter, chatRouter} = require('./routes');
const keys = require('./config/keys');

const port = process.env.PORT || 1616;
const jwt = require('jwt-then');

const app = express();

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));
//
// app.use(passport.initialize());
// require('./middleware/passport/passport.middleware')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const io = require('socket.io').listen(app.listen(port, () => console.log(`Server start on ${port}`)));

require("./models/User");
require("./models/Message");

const Message = mongoose.model('messages');
const User = mongoose.model('users');


// io.use(async (socket, next) => {
//     try {
//         const token = socket.headers.authorization.split('')[1];
//         const payload = await jwt.verify(token, keys.JWT);
//         socket.userId = payload.id;
//         next();

        io.sockets.on('connect', (socket) => {
            console.log('Connected ' + socket.userId);

            socket.on('disconnect', () => {
                console.log('Disconnect ' + socket.userId)
            })

            socket.on('joinRoom', ({chatroomId}) => {
                socket.join(chatroomId);
                console.log('User join chatroom: ' + chatroomId)
            })

            socket.on('leaveRoom', ({chatroomId}) => {
                socket.leave(chatroomId);
                console.log('User leave chatroom: ' + chatroomId)
            })

            socket.on('chatroomMessage', async ({chatroomId, message}) => {
                if (message.trim().length > 0) {
                    const user = await User.findOne({id: socket.userId})
                    const newMessage = new Message({
                        chatroom: chatroomId,
                        user: socket.userId,
                        message
                    });

                    io.to(chatroomId).emit('newMessage', {
                        message,
                        name: user.name,
                        surname: user.surname,
                        userId: socket.userId,
                    });

                    await newMessage.save();

                }
            })
    //
            //     });
            //
            // } catch (e) {
            // }



});





app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

