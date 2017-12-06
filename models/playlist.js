const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
  url: String,
  submitted_by: String,
  playlistName: String
});

module.exports = mongoose.model('Playlist', playlistSchema);
