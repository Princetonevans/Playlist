const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

//MODELS
const Playlist = require('../models/playlist.js');
const Song = require('../models/songs.js');

// INDEX ROUTE==============================================
router.get('/', async (req, res) => {
  const song = await Song.find();

  if (req.session.logged) {

  res.render('songs/index.ejs', {
    song: song,
    username: req.session.username
  });
} else {
  res.redirect('/user/login');
}
});


router.post('/', async (req, res) => {
  console.log('body data: ', req.body);
  try {
    const createdSong = await Song.create(req.body);
    res.redirect('/playlist/' + createdSong.playlist);
  } catch (err) {
    res.send(err.message);
  }
});

// EDIT ROUTE================================
router.get ( '/:id/edit' , ( req , res ) => {
  Song.findById( req.params.id , ( err , song ) => {
        if ( err ) { console.log ( err ); }
        res.render ( './songs/edit.ejs' , { song : song }
      );
  });
});

// UPDATE ROUTE=================================
router.put( '/:id' , ( req , res ) => {
  Song.findByIdAndUpdate( req.params.id, req.body , { new : true }, ( err , song ) => {
    if ( err ) { console.log( err ); }
    res.redirect ( '/songs/' + song.id );
  });
});

module.exports = router;
