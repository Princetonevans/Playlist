const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  artist: { type:String, required: true},
  song: { type: String, required: true },
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}
});

module.exports = mongoose.model('Song', songSchema);
