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
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});      

router.post('/', function(req, res){
	console.log('employee post was hit!');
	pool.connect(function(errorConnectingToDatabase, client, done){
		if(errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
            client.query('INSERT INTO employees (first_name, last_name, job_title, annual_salary) VALUES ($1, $2, $3, $4);', 
            [req.body.first_name, req.body.last_name, req.body.job_title, req.body.annual_salary], function(errorMakingQuery, result) {
				done();
				if(errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
		}
	});
});

// router.get('/', function(req, res) {
//     console.log('employee get monthly was hit');
//     pool.connect(function(errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase) {
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query('SELECT SUM(annual_salary) FROM employees;', function(errorMakingQuery, result){
//                 done();
//                 if(errorMakingQuery) {
//                     console.log('Error making database query', errorMakingQuery);
//                     res.send(result.rows);
//                 } else {
//                     res.send(result.rows);
//                 }
//             });
//         }
//     });
// });




module.exports = router;