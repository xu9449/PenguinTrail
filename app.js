var express 		= require("express"),
    app 			= express(),
    bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport    	= require("passport"),
	flash 			= require("connect-flash"),
	LocalStrategy 	= require("passport-local"),
	methodOverride  = require("method-override"),
	Trail 			= require("./models/trail"),
	Comment     	= require("./models/comment"),
	User        	= require("./models/user"),
	seedDB  		= require("./seed")
//requiring routes
var commentRoutes 	= require("./routes/comments"),
	trailRoutes 	= require("./routes/trails"),
	indexRoutes		= require("./routes/index")

require('dotenv').config();
console.log(process.env);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://"+process.env.MONGODB_USERNAME+":"+process.env.MONGODB_PASSWORD+"@penguintrail-bbxuu.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!')
}).catch(err => {
	console.log('ERROR' + err.message);	
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");	
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();
//seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Sean is the best person",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add req.user to all the pages
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/trails",trailRoutes);
app.use("/trails/:id/comments",commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The PenguineTrail Server Has Started!")
});