var mongoose = require("mongoose");
var Trail = require("./models/trail");
var Comment = require("./models/comment");

var data = [
	{
		name: "the default trail 01",
		image:  "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "this is an awesome pic"
	},
	
	{
		name: "the default trail 01",
		image:  "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "this is an awesome pic"
	},
	
	{
		name: "the default trail 01",
		image:  "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "this is an awesome pic"
	}
			
		]


function seedDB(){
	// REMOVE all Trails
	Trail.remove({}, function(err){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log("Removed trails!");
	// 	data.forEach(function(seed){
	// 	Trail.create(seed, function(err, trail){
	// 	if(err){
	// 		console.log(err)
	// 	} else {
	// 		console.log("added a trail");
	// 		Comment.create({
	// 			text:"This is place is greate, but I wish there was internet.",
	// 			author: "Sean"
	// 		}, function(err, comment){
	// 			if(err){
	// 				console.log(err);
	// 			} else {
	// 				trail.comments.push(comment);
	// 				trail.save();
	// 				console.log("Created new comment");
	// 			}
	// 		});
	// 		}
	// 	});
	// });
	});
	// ADD few trails
	
}
	

module.exports = seedDB;