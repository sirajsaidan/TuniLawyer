const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const Chat = require("../models/chat");


/* get user chat message
    @param user : userId
 */
router.get('/:userId', authMiddleware, async (req, res) => {
    res.json(await User.findOne({ _id: req.params.userId }) || {});
})
router.get('/byId/:userId/:page', authMiddleware, async (req, res) => {
    console.log('here')
    const { userId, page } = req.params;
    const perPage = 20;
    const chat = await Chat.findOne({ users: { $all: [req.userId, userId] } });
    if (!chat) {
        res.json({ items: [], total: 0, pageCount: 0, total: 0 });
        return;
    }
    const count = await Message.find({ chat: chat._id }).count();
    const pageCount = Math.ceil(count / perPage);
    console.log(pageCount)
    if (pageCount < page) {
        res.json({ items: [], pageCount, total: count });
        return;
    }
    const items = await Message.find({ chat: chat._id }).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
    res.json({
        items, total: count, page, perPage, pageCount, from: (page - 1) * perPage + 1,
        to: page * perPage <= count ? page * perPage : count
    });
});
router.post('/send/:user', authMiddleware, (req, res) => {
    const { user } = req.params;
    const { content } = req.body;
    Chat.findOne({
        users: {
            $all: [user, req.userId]
        }
    }, (e, r) => {
        if (!r) {
            const chat = new Chat({
                users: [user, req.userId]
            });
            chat.save((e, r) => {
                if (!e) {
                    const message = new Message({
                        chat: r._id,
                        content,
                        userId: req.userId,
                        createdAt: new Date()
                    }).save()
                }
            })
        } else {
            const message = new Message({
                content,
                chat: r._id,
                userId: req.userId,
                createdAt: new Date()
            }).save()
        }
    })
})
module.exports = router;
