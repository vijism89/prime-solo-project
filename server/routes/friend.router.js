const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// getting the event detail 
router.get('/dd/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT id AS value, email AS label FROM "user"
    WHERE id != $1 AND id NOT IN 
    (SELECT user_friend_id FROM "user_friend" WHERE user_id = $2 )
    ORDER BY email ASC;`;
    pool.query(query,[req.params.id, req.params.id])
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
            userFriends
        } = req.body;
        await client.query('BEGIN')
        // const friendInsertResults = await client.query(`INSERT INTO "user_friend" ("user_id", "user_friend_id", "status")
        // VALUES ($1, $2, $3) RETURNING id;`, [userId, userFriends, 'N']);
        // console.log('here 1');
        // const friendId = friendInsertResults.rows[0].id;

        await Promise.all(userFriends.map(friend => {
            const insertFriendText = `INSERT INTO "user_friend" ("user_id", "user_friend_id", "status") VALUES ($1, $2, $3)`;
            const insertFriendValues = [userId, friend.value, 'N'];
            return client.query(insertFriendText, insertFriendValues);
        }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/friend', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

// router.delete('/:id',(req, res) => {
//     console.log('delete this', req.params.id)
//     let sqlQuery = `
//     UPDATE "event" 
//     SET status = 'D'
//     WHERE "id" = $1;`
//     pool.query(sqlQuery, [req.params.id])
//     .then((result) => {
//         console.log('response from DELETE route:', result);
//         res.sendStatus(200)
//     }).catch((error) => {
//         console.log('error in DELETE route:', error);
//         res.sendStatus(500);
//     });
// })

module.exports = router;