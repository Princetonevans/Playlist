const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const session  = require('express-session');
const bcrypt   = require('bcrypt');
const app      = express();
const PORT     = process.env.PORT || 3000;




// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/playlist';

mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;

// test db connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// We're not using this yet, but we will
const usersModel = require('./models/users.js');

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(session({
  secret: "awevionadlefsdfs",
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));
// controllers
const playlistController = require('./controllers/playlist.js');
const songsController = require('./controllers/songs.js');
const sessionsController = require('./controllers/session.js');

app.use('/playlist', playlistController);
app.use('/songs', songsController);
app.use('/user', sessionsController);

// root route
app.get('/', (req, res) => res.redirect('/playlist'));

// Listener
app.listen(PORT, () => {
  console.log('===========================');
  console.log('Playlist app on port: ', PORT);
  console.log('===========================');
});
