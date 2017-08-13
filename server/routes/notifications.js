const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/notification.js');
const User = require('../models/user.js');
const moment = require('moment');
const getUserBySession = require('../utils/getUserBySession');

notificationRouter.route('/')
  .get((req, res) => {
    User.findById(req.session.user, (err, user) => {
      if (err) {
        res.statusMessage = 'Something went wrong, try again later.';
        res.status(500).end();
      }
    }).then((user) => {
      Notification.find({ 'time': { '$gte': user ? user.created : new Date(2017, 1, 1) } },
        (err, notifications) => {
          if (err) {
            res.statusMessage = 'Something went wrong, try again later.';
            res.status(500).end();
          }
          res.json(notifications);
        }).sort({ time: -1 });
    });
  })
  .post((req, res) => {
    const notification = new Notification(req.body);

    notification.time = Date.now();
    notification.viewed = false;

    notification.save((err, notifications) => {
      if (err) {
        res.statusMessage = 'Failed to send notification.';
        res.status(500).end();
      } else {
        res.json({ notification });
      }
    });
  });

notificationRouter.route('/:id')
  .get((req, res) => {
    Notification.findById(req.params.id, (err, notification) => {
      if (err) {
        res.statusMessage = 'Failed to find notification.';
        res.status(500).end();
      } else {
        res.send(notification);
      }
    });
  })
  .put((req, res) => {
    Notification.findOne({ _id: req.params.id }, (err, notification) => {
      if (err) {
        return res.send(err);
      }
      Object.assign(notification, req.body);
      notification.save((error) => {
        if (error) {
          res.statusMessage = 'Failed to save notification.';
          res.status(500).end();
        }
        res.json(notification);
      });
    });
  })
  .delete((req, res) => {
    Notification
      .findByIdAndRemove(req.params.id).exec()
      .then(notification => res.send({
        message: 'Note successfully deleted',
        id: req.params.id
      })
      )
      .catch((err) => {
        res.statusMessage = 'Failed to delete notification.';
        res.status(500).end();
      });


    // Notification.findByIdAndRemove(req.params.id), (err, notification) => {
    //   if (err) {
    //     res.statusMessage = 'Failed to delete notification.';
    //     res.status(500).end();
    //   } else {
    //     res.send({
    //       message: 'Note successfully deleted',
    //       id: req.params.id
    //     });
    //   }
    // });
  });

module.exports = notificationRouter;
