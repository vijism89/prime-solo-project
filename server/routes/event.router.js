const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// getting the event detail 
router.get('/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM "event"
    JOIN "user_child_event" ON user_child_event.event_id = event.id
    JOIN "child" ON user_child_event.child_id = child.id
    WHERE child_id = $1;`;
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

// handles POST request with event data
router.post('/:id',(req, res) => {
    console.log(req.body) 
    const eventname = req.body.eventname;
    const date = req.body.date;
    const place = req.body.place;
    const contact_info = req.body.hostinfo;
    const comments = req.body.comments;

    const queryText = `INSERT INTO "event" ("user_id", "eventname", "date", "place", "contact_info", "comments")
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [req.user.id, eventname, date, place, contact_info, comments])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    });
});

module.exports = router;