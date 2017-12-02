const express = require('express');

const router = express.Router();

const Song = require('../models/songs.js');

router.post('/', async (req, res) => {
  console.log('body data: ', req.body);
  try {
    const createdSong = await Song.create(req.body);
    res.redirect('/playlist/' + createdSong.playlist);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
