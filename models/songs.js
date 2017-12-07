const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  artist: String,
  song: String,
  length: String,
  written_by: String,
  lyrics: String,
  producer: String,
  album: String,
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}
});

module.exports = mongoose.model('Song', songSchema);
