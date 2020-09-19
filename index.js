// const app = require('./app');
// const port = process.env.PORT || 1616;
// const keys = require('./config/keys');
// const jwt = require('jwt-then');
// const mongoose = require('mongoose');
//
// const io = require('socket.io').listen(app.listen(port, () => console.log(`Server start on ${port}`)));
//
// require("./models/User");
// require("./models/Message");
//
// const Message = mongoose.model('messages');
// const User = mongoose.model('users');
//
// io.use(async (socket, req, res, next) => {
//     try {
//         const token = req.headers.authorization.split('')[1];
//         const payload = await jwt.verify(token, keys.JWT);
//         socket.userId = payload.id;
//         next();
//     } catch (e) {
//         res.status(401).json({
//             message: 'Forbidden'
//         })
//     }
//
//     io.sockets.on('connect', (socket) => {
//         console.log('Connected ' + socket.userId);
//
//         socket.on('disconnect', () => {
//             console.log('Disconnect ' + socket.userId)
//         })
//
//         socket.on('joinRoom', ({chatroomId}) => {
//             socket.join(chatroomId);
//             console.log('User join chatroom: ' + chatroomId)
//         })
//
//         socket.on('leaveRoom', ({chatroomId}) => {
//             socket.leave(chatroomId);
//             console.log('User leave chatroom: ' + chatroomId)
//         })
//
//         socket.on('chatroomMessage', async ({chatroomId, message}) => {
//             if (message.trim().length > 0) {
//                 const user = await User.findOne({id: socket.userId})
//                 const newMessage = new Message({
//                     chatroom: chatroomId,
//                     user: socket.userId,
//                     message
//                 });
//
//                 io.to(chatroomId).emit('newMessage', {
//                     message,
//                     name: user.name,
//                     surname: user.surname,
//                     userId: socket.userId,
//                 });
//
//                 await newMessage.save();
//
//             }
//         })
//
//     });
//
// });
//
//
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
//     res.header("Access-Control-Allow-Headers", "*");
//     req.io = io;
//     next();
// });
//
// //     io.on('connection', (socket) => {
// //         console.log(`Connected: ${socket.id}`);
// //
// //         socket.on('disconnect', () => {
// //             console.log(`Disconnected: ${socket.id}`)
// //         })
// //     })
// // })
