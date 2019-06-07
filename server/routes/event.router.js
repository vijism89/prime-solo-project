const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// getting the event detail 
router.get('/uid/:id', (req,res) => {
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
router.get('/eid/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM "event"
    WHERE id = $1 AND status != 'D'`;
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
    let query = `select c.childname ||':'|| e.eventname as title, 
    to_char(startdate,'YYYY-MM-DD HH24:MI:SS') as start, to_char(enddate,'YYYY-MM-DD HH24:MI:SS') as end, 'false' as allDay,
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
    console.log('why',req.params.id);
    //req.user
    // let query = `select c.childname, e.eventname  from  user_child_event uce join child c on uce.child_id=c.id
    // join event e on e.id=uce.event_id where e.status!='D' and c.user_id =$1;`;
    let query = `select uce.emailkey, u.email, u.username, e.eventname, c.childname, uce.status from user_child_event uce, child c, event e,
    "user" u where c.id=uce.child_id  and e.id=uce.event_id and u.id=c.user_id
    and uce.event_id=$1;
   `
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
        const eventInsertResults = await client.query(`INSERT INTO "event" ("user_id", "eventname", "startdate","enddate", "place", "hostinfo", "comments", "status")
        VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id;`, [userId, eventname, startdate, enddate, place, hostinfo, comments, 'N']);
        console.log('here 1');
        const eventId = eventInsertResults.rows[0].id;
// creating another query to insert the event and child relationship
        let results=await Promise.all(invites.map(invite => {
            const insertEventChildText = `INSERT INTO "user_child_event" ("event_id", "child_id", "status", "emailkey") VALUES ($1, $2, $3, md5(random()::text)) RETURNING id,emailkey`;
            const insertEventChildValues = [eventId, invite.value, 'N'];
           
            return inviteInsertResults = client.query(insertEventChildText, insertEventChildValues);;
        }));

        await client.query('COMMIT')
        //run this query
//         select uce.emailkey, u.email, u.username, e.eventname, c.childname from user_child_event uce, child c, event e,
//  "user" u where c.id=uce.child_id  and e.id=uce.event_id and u.id=c.user_id
//  and uce.event_id=54;
        console.log('results:: ',results);
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/event', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

router.put('/change', async (req, res) => {
    const updatedEvent = req.body;
      //use the same connection for all queries
    const connection = await pool.connect()

     try {
        //begin the transaction
        await connection.query('BEGIN');
        const updatedEventQuery = `UPDATE "event" SET "eventname" = $1, "startdate" = $2, "place" = $3, "enddate" = $4, "hostinfo" = $5,"comments" = $6 WHERE id = $7;`;
        const updatedEventValues = [updatedEvent.eventname,updatedEvent.startdate,updatedEvent.place,updatedEvent.enddate,updatedEvent.hostinfo,
            updatedEvent.comments, updatedEvent.eventId];
        await connection.query(updatedEventQuery, updatedEventValues);
         //commit the transaction
         console.log('put',updatedEventQuery, updatedEventValues )
         await connection.query('COMMIT');
         res.sendStatus(200);
 
     } catch (error) {
         //if any steps fail, abort entire transaction
         await connection.query('ROLLBACK');
         console.log('transaction error - rolling back update event:', error);
         res.sendStatus(500);
 
     } finally {
         connection.release()
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