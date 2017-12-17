const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongo = require('mongoskin');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var bazap = mongo.db('mongodb://localhost:27017/tododo');

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/tododo', (err, db) => {
     
    //var juzer = db.collection('users');
        if (err) return console.log(err);
        
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users').find().toArray().then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//insert user
router.post('/new', function(req, res, next){
    var juser = req.body;
    
    console.log(req.body);

    if(!juser.name || !(juser.isCompleted + '')){
        
        res.status(400);
        res.json({
            "error":"invalid data"
        });
    } else{
        bazap.collection('users').save(juser, function(err,result){
            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        });
    }
});


module.exports = router;