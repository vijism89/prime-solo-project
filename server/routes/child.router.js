const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();


router.get('/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT id as value, childname as label FROM "child"
    WHERE user_id = $1;`;
    // let query = `SELECT child.id as value, child.childname as label FROM child
    // JOIN user_friend ON (user_friend.user_friend_id = child.user_id)
    //  WHERE user_friend.user_id = $1
    // union 
    // SELECT child.id as value, child.childname as label FROM child 
    // where child.user_id = $1;
    // ;`;
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
    const childname = req.body.childname;
    const dob = req.body.dob;
    const gender = req.body.gender;

    const queryText = `INSERT INTO "child" ("user_id", "childname", "dob", "gender")
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [req.user.id, childname, dob, gender])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    });
});

module.exports = router;