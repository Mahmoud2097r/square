if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express  = require('express'),
path           = require('path'),
methodOverride = require('method-override'),
mongoose       = require('mongoose'),
session        = require('express-session'),
passport       = require('passport'),
app            = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


// Configure Passport and session
app.use(
	session({
		secret            : 'This is a secret',
		resave            : false,
		saveUninitialized : true
	})
);

app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// database setup //
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
let url = process.env.MONGODB_COMPASS;
mongoose.connect(url);
const db = mongoose.connection;
db.on(
	'error',
	console.error.bind(console, 'connection error:')
);
db.once('open', () => {
	console.log('Coneccted');
});



const indexRoutes = require('./routes');
const slidesRoutes = require('./routes/slides');



app.use('/', indexRoutes);
app.use('/admin-square/dash-board', slidesRoutes);

// catch 404 and forward to err handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error Handler
app.use((err, req, res, next) => {
	console.log(err.message);
	res.redirect('back');
});




app.listen(3000, () => {
    console.log('http://localhost:3000');
});