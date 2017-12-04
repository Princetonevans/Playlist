const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  artist: { type:String, required: true},
  song: { type: String, required: true },
  length: String,
  written_by: String,
  lyrics: String,
  producer: String,
  album: String,
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}
});

module.exports = mongoose.model('Song', songSchema);
