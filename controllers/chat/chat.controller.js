const ChatRoom = require('../../models/ChatRoom');

module.exports = {
    createChatroom: async (req, res) => {
        const {name} = req.body;

        const chatRoomExists = await ChatRoom.findOne({name});

        if (chatRoomExists){
            res.status(401).json({
                message: 'ChatRoom with this name is already exist'
            })
        }

        const chatRoom = new ChatRoom({
            name
        });

        await chatRoom.save();

        res.json({
            message: 'ChatRoom created'
        })

    },

    getAllChatrooms: async (req, res) => {
        const chatrooms = await ChatRoom.find({});

        res.json(chatrooms);

    }
};
