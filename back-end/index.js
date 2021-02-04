const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const http = require('http').createServer(app);
const User = require('./models/user');
const Chat = require('./models/chat');
const Message = require('./models/message');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const roles = require('./middleware/roles');

const socketIds = [];

app.use(cors());

app.use(express.json());
app.use('/register', require('./routes/register'));

app.use('/login', require('./routes/login'));

app.use('/lawyer', require('./routes/admin'));


app.use('/user', require('./routes/user'));
app.use('/chat', require('./routes/chat'));

const PORT = process.env.PORT || 5003;

const io = require('socket.io')(http);


mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

  User.findOne({ role: roles.ADMIN }, (e, r) => {
    if (!r) {
      console.log('here')
      let user = new User({
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com',
        role: roles.ADMIN
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash('admin', salt, (err, hashedPassword) => {
          user.password = hashedPassword;
          user.save();
        });
      });
    }
  })
  io.on("connection", socket => {
    socket.on('msg', async (msg) => {
      msg = JSON.parse(msg);
      const { action, payload } = msg;
      switch (action) {
        case 'JOIN':
          jwt.verify(payload.token, 'secret', (err, payload) => {
            if (err) {
              throw err;
            }
            socketIds[payload.id] = socket.id;
          });
          break;
        case 'SEND_MESSAGE':
          jwt.verify(payload.token, 'secret', (err, p) => {
            if (err) {
              throw err;
            }
            Chat.findOne({
              users: {
                $all: [payload.user, p.id]
              }
            }, (e, r) => {
              if (!r) {
                const chat = new Chat({
                  users: [payload.user, p.id]
                });
                chat.save((e, r) => {
                  if (!e) {
                    new Message({
                      body: payload.message,
                      user: p.id,
                      date: new Date(),
                      chat: r._id
                    }).save((e, r) => {
                      if (!e && socketIds[payload.user]) {
                        io.to(socketIds[payload.user]).emit('msg', JSON.stringify(r))
                      }
                    })
                  }
                })
              }
              chat.save((e, r) => {
                if (!e) {
                  new Message({
                    body: payload.message,
                    user: p.id,
                    date: new Date(),
                    chat: r._id
                  }).save((e, r) => {
                    if (!e && socketIds[payload.user]) {
                      io.to(socketIds[payload.user]).emit('msg', JSON.stringify(r))
                    }
                  })
                }
              })
            })
          });

      }
    })
  })
  http.listen(PORT, (err) => {
    if (err) {
      throw err.message;
    }
    console.log(`Server is running on PORT ${PORT}`);
  });

})
