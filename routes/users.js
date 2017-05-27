var express = require('express');
var router = express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
//var mongojs=require("mongojs");
//var db=mongojs("mongodb://kartik:kartik.kd@ds153501.mlab.com:53501/user",['userinfo']);
const User=require('../models/user');

// Get Single Task
router.get('/edit/:id', function(req, res, next){
    db.userinfo.findOne({username: req.params.id}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});



//Save Task
router.post('/signup', function(req, res, next){
  let newUser=new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
  });
   console.log("in");
  User.addUser(newUser,(err,user)=>{
    if(err){
      res.json({success:false,msg:'Failed to register user'});
    }
    else{
      res.json({success:true,msg:'User registered'});
    }
  })
});


//login
router.post('/login', function(req, res, next){


    var user=req.body.username;
    var pwd=req.body.password;
    db.userinfo.find({ username : user,password:pwd}, function(err, task){
           if(err)
           {
               res.send("Error has occurred");
           }
           else
           {
               console.log("List: "+task);
               res.json(task);
           }
      });
});

// Update Task
router.put('/editaccount/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.firstname){
        updTask.firstname = task.firstname;
    }
     if(task.lastname){
        updTask.lastname = task.lastname;
    }
     if(task.email){
        updTask.email = task.email;
    }
    if(task.username){
        updTask.username = task.username;
    }

    if(task.password){
        updTask.password = task.password;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.userinfo.update({ _id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }else {
            res.json(task);
        }
    });
    }
});

// Get Single Task
router.post('/authenticate', function(req, res, next){
    const username=req.body.username;
    const password=req.body.password;
    console.log("unm: "+username);
    User.getUserByUsername(username,(err,user)=>{
      if(err) throw err;
      if(!user){
        return res.json({success:false,msg:'User not found'});
      }

      User.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
          const token=jwt.sign(user,config.secret,{
            expiresIn:604800 //1 week
          });

          res.json({
            success:true,
            token:'JWT '+token,
            user:{
              id:user._id,
              firstname:user.firstname,
              lastname:user.lastname,
              email:user.email,
              username:user.username,
              password:user.password
            }
          });
        }else{
          return res.json({success:false,msg:'wrong password'});
        }
      });
    });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  res.json({user:req.user});
});

module.exports = router;
