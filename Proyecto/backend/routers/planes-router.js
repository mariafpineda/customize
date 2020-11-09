var express = require('express');
var router = express.Router();
var planes = require('../models/planes');
var mongoose = require('mongoose');

//Create plan
    router.post('/', function (req, res) {
        let plan = new planes(
            {
                
            }
        )
    })

//Read plans

//Update plan


//Delete plan


// --------- //

//Get plan


module.exports = router;