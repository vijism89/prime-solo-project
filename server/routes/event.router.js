const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// getting the event detail 
router.get('/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM "event"
    WHERE user_id = $1 AND status != 'D'`;
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

// getting the event detail for calender
router.get('/cal/:id', (req,res) => {
    console.log(req.params.id);
    let query = `select c.childname ||':'|| e.eventname as title, startdate as start, enddate as end, 'false' as allDay,
     '' as resouce  from  user_child_event uce join child c on uce.child_id=c.id
    join event e on e.id=uce.event_id where e.status!='D' and c.user_id =$1;`;
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

router.get('/success/:id', (req,res) => {
    console.log(req.params.id);
    let query = `select c.childname, e.eventname  from  user_child_event uce join child c on uce.child_id=c.id
    join event e on e.id=uce.event_id where e.status!='D' and c.user_id =$1;`;
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


// POST a new order
router.post('/', async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            userId,
            eventname,
            startdate,
            enddate,
            place,
            hostinfo,
            comments,
            invites
        } = req.body;
        await client.query('BEGIN')
        const eventInsertResults = await client.query(`INSERT INTO "event" ("user_id", "eventname", "startdate","enddate", "place", "contact_info", "comments", "status")
        VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id;`, [userId, eventname, startdate, enddate, place, hostinfo, comments, 'N']);
        console.log('here 1');
        const eventId = eventInsertResults.rows[0].id;
// creating another query to insert the event and child relationship
        await Promise.all(invites.map(invite => {
            const insertEventChildText = `INSERT INTO "user_child_event" ("event_id", "child_id", "status") VALUES ($1, $2, $3)`;
            const insertEventChildValues = [eventId, invite.value, 'N'];
            return client.query(insertEventChildText, insertEventChildValues);
        }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/event', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

router.delete('/:id',(req, res) => {
    console.log('delete this', req.params.id)
    let sqlQuery = `
    UPDATE "event" 
    SET status = 'D'
    WHERE "id" = $1;`
    pool.query(sqlQuery, [req.params.id])
    .then((result) => {
        console.log('response from DELETE route:', result);
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error in DELETE route:', error);
        res.sendStatus(500);
    });
})

module.exports = router;