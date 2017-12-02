const express = require('express');
const router  = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// models
const Playlist = require('../models/playlist.js');
const Song = require('../models/songs.js');

// INDEX ROUTE==============================================
router.get('/', async (req, res) => {
  const playlist = await Playlist.find();

  if (req.session.logged) {

  res.render('playlist/index.ejs', {
    playlist: playlist,
    username: req.session.username
  });
} else {
  res.redirect('/user/login');
}
});

router.get('/new', ( req , res ) => {
  res.render ( 'playlist/new.ejs' );
});
// SHOW ROUTE================================================
router.get('/:id', async (req, res) => {
  const onePlaylist = await Playlist.findById(req.params.id);
  const songs = await Song.find({ playlist: onePlaylist._id });

  res.render('playlist/show.ejs', {
    onePlaylist: onePlaylist,
    songs: songs
 });
});

// CREATE ROUTE=====================================
router.post('/', async (req, res) => {
  try {
    const createdPlaylist = await Playlist.create(req.body);
    res.redirect('/');
    console.log(createdPlaylist);
  } catch (err) {
    res.send(err.message);
  }
});

// Edit   : GET    '/playlist/:id/edit' 5/7
router.get ( '/:id/edit' , ( req , res ) => {
  Playlist.findById( req.params.id , ( err , playlist ) => {
        if ( err ) { console.log ( err ); }
        res.render ( './playlist/edit.ejs' , { playlist : playlist }
      );
  });
});

// Update : PUT    '/playlist/:id'
router.put( '/:id' , ( req , res ) => {
  Playlist.findByIdAndUpdate( req.params.id, req.body , { new : true }, ( err , playlist ) => {
    if ( err ) { console.log( err ); }
    res.redirect ( '/playlist/' + playlist.id );
  });
});
//Delete Route ======================================
router.delete (  '/:id' , ( req , res ) => {
  Playlist.findByIdAndRemove( req.params.id , ( err , playlist ) => {
    if ( err ) { console.log( err ); }
    res.redirect ( '/playlist' );
  });
});
module.exports = router;
