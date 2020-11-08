var mongoose = require('mongoose');

var servidor= 'localhost:27017';
var db='customize';

class Database{
    constructor(){
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(()=>{
            console.log('Se conectó a mongo');
        }).catch((error)=>{
            console.log(error);
        })
    };
};

module.exports = new Database();