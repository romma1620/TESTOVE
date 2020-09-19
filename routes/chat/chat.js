const express = require('express');
const router = express.Router();
const {chatController} = require('../../controllers')
const passport = require('../../middleware/passport/passport.middleware')

router.get(
    '/',
    // passport,
    chatController.getAllChatrooms
)
router.post(
    '/',

    // passport,
    chatController.createChatroom
);

module.exports = router;
