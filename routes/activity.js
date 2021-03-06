var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//var Activity=require('../model/db_Activities');

var mongojs=require("mongojs");
var db=mongojs("mongodb://kartik:kartik.kd@ds153501.mlab.com:53501/user",['activityinfo']);


// Get all Task by username
router.get('/activity/:id', function(req, res, next){
    var user=req.params.id;
    db.activityinfo.find({username: user}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Get all Task by ID
router.get('/activitybyid/:id', function(req, res, next){

    db.activityinfo.find({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/addactivity', function(req, res, next){
    var activity = req.body;
    console.log("activity: "+JSON.stringify(activity));
    if(!activity.username || !activity.activity){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.activityinfo.save(activity, function(err, activity){
            if(err){
                res.json({success:false,msg:'Failed to add activity'});
            }
          else{

                res.json({success:true,msg:'Activity added'});
          }
        });
    }
});


// Delete Task
router.delete('/deletetask/:id', function(req, res, next){
    db.activityinfo.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});


// Update Task
router.put('/edittask/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.username){
        updTask.username = task.username;
    }

    if(task.activity){
        updTask.activity = task.activity;
    }
    if(task.loggedin){
        updTask.loggedin = task.loggedin;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.activityinfo.update({ _id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }else {

            res.json(task);
        }
    });
    }
});
module.exports = router;
