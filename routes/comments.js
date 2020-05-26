var express = require("express");
var router 	= express.Router({mergeParams: true});
var Trail = require("../models/trail");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comment New
router.get("/new", middleware.isLoggedIn, function(req,res){
	Trail.findById(req.params.id, function(err, trail){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {trail: trail});
		}
	})
});

// Comment Create
router.post("/", middleware.isLoggedIn, function(req,res){
	Trail.findById(req.params.id, function(err, trail){
		if(err){
			console.log(err);
			res.redirect("/trails");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					
					comment.author.id = req.user._id;
					// add username and id to comment 
					comment.author.username = req.user.username;
					//console.log("New comment username is: " +  req.user.username);
					//save comment
					comment.save();
					trail.comments.push(comment);
					trail.save();
					req.flash("success", "Successfully added comment");
					res.redirect('/trails/'+trail._id);
				}
			});
		}
	});
});

// Comment Edit Route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			// res.redirect("back");
			res.send(err);
		} else {
			res.render("comments/edit", {trail_id: req.params.id, comment: foundComment});
		}
	});
});

// Comment Update
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/trails/"+ req.params.id);
		}
	});
})

// Comment Delete
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} {
			req.flash("success", "Comment deleted");
			res.redirect("/trails/"+ req.params.id);
		}
	});
});





module.exports = router;
