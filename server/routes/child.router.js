const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM "child"
    WHERE user_id = $1;`;
    pool.query(query,[req.params.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        })
}
) 

//handle POST request with kid data
router.post('/:id', (req, res) => {
    console.log(req.body) 
    const kid = req.body.kid;
    const dob = req.body.dob;
    const gender = req.body.gender;

    const queryText = `INSERT INTO "child" ("user_id", "kid", "dob", "gender")
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [req.user.id, kid, dob, gender])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    });
});

module.exports = router;