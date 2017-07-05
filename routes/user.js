/**
 * User Page
 * Created by Alexey S. Kiselev on June 2017.
 */

var express = require('express');
var router = express.Router();
var jaguardb = require('jaguardb').JaguarDb;
var db = new jaguardb();
var path = require('path'),
    __parentDir = path.dirname(module.parent.filename);

// Get info
router.get('/getprofile/:userid', function(req, res) {
    db.connect(path.join(__parentDir,'db'),function(err){
        if(err) {
            res.json({status: 'error', message: 'Error occured'});
            return false;
        }
        db.find({userid: req.params.userid},{},function(err,docs){
            if(err) {
                res.json({status: 'error', message: 'Error occured'});
                return false;
            } else {
                if(!!docs.length) {
                    res.json({status: 'success', userid: req.params.userid, userprofile: docs[0].userprofile});
                } else {
                    res.json({status: 'error', message: 'User not found!'});
                    return false;
                }
            }
        });
    });
});

// Update
router.post('/saveprofile/:userid', function(req,res) {
    db.connect(path.join(__parentDir,'db'),function(err){
        if(err) {
            res.json({status: 'error', message: 'Error occured'});
            return false;
        }
        db.find({userid: req.params.userid},{},function(err,docs){
            if(err) {
                res.json({status: 'error', message: 'Error occured'});
                return false;
            } else {
                if(!!docs.length) {
                    // Found
                    db.update({_id: docs[0]._id, userid: docs[0].userid, userprofile: req.body.userprofile}, function(err){
                        if(err) {
                            res.json({status: 'error', message: 'Error occured'});
                            return false;
                        } else {
                            res.json({status: 'success', message: 'Inforamtion about user ' + req.params.userid + ' was updated'});
                        }
                    });
                } else {
                    res.json({status: 'error', message: 'User ' + req.params.userid + ' not found'});
                }
            }
        });
    });
});

// Create
router.get('/createuser/:userid', function(req, res) {
    db.connect(path.join(__parentDir,'db'),function(err){
        if(err) {
            res.json({status: 'error', message: 'Error occured'});
            return false;
        }
        db.find({userid: req.params.userid},{},function(err,docs){
            if(err) {
                res.json({status: 'error', message: 'Error occured'});
                return false;
            } else {
                if(!!docs.length) {
                    res.json({status: 'already exists', message: 'User ' + req.params.userid + ' is already exists'});
                } else {
                    db.insert({userid: req.params.userid, userprofile: ''},function(err,insertedData){
                        if(err) {
                            res.json({status: 'error', message: 'Error occured'});
                            return false;
                        } else {
                            res.json({status: 'success', message: 'User ' + req.params.userid + ' was recorded to base'});
                        }
                    });
                }
            }
        });
    });
});

module.exports = router;
