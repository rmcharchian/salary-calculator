var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('employee get was hit');
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM employees;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.send(result.rows);
                }
            });
        }
    });
});      






module.exports = router;