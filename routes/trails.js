var express = require("express");
var router 	= express.Router();
var Trail = require("../models/trail");
var middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", function(req, res){
	
	Trail.find({}, function(err, allTrails){
		if(err){
			console.log(err);
		} else {
			res.render("trails/index", {trails: allTrails, currentUser: req.user});
		}
	});	
});

// Create - add new trail to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	var name 	= req.body.name;
	var time 	= req.body.time;
	var image 	= req.body.image;
	var desc 	= req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	
	
	var newTrail = {
		name: name,
		time: time,
		image: image,
		description: desc,
		author: author
	}
	Trail.create(newTrail, function(err, newlyCreated){
			if(err){
				console.log(err);
			} else {
				console.log(newlyCreated);
				res.redirect("/trails");
			}
		 });
	});



router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("trails/new.ejs");
});

// SHOW-shows more info about one trail
router.get("/:id", function(req,res){
	Trail.findById(req.params.id).populate("comments").exec(function(err, foundTrail){
		if(err){
			console.log(err);
		} else {
			console.log(foundTrail)
			res.render("trails/show", {trail: foundTrail});
		}
	});
});

//EDIT TRAIL ROUTE
router.get("/:id/edit", middleware.checkTrailOwnership, function(req,res){
		Trail.findById(req.params.id, function(err, foundTrail){
			if(err){
				req.flash("error", "Trail not found");
			} else {
			res.render("trails/edit", {trail: foundTrail});
			}
				
			});	
});

//UPDATE TRAIL
router.put("/:id",middleware.checkTrailOwnership, function(req,res){
	// find and update the correct trails
	Trail.findByIdAndUpdate(req.params.id, req.body.trail, function(err, updatedTrail){
		if(err){
			res.redirect("/trails");
		} else {
			res.redirect("/trails/" + req.params.id);
		}
	})
})

//DESTROY campground router
router.delete("/:id", middleware.checkTrailOwnership, function(req, res){
	Trail.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/trails");
		} else{
			res.redirect("/trails");
		}
	});
});


module.exports = router;

