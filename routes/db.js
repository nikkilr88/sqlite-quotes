const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('quotes.db');
const { verifyAdmin } = require('../middleware');

// GET QUOTES
router.get('/', (req, res) => {
    let where = 'WHERE category IS $category ';

    db.all(
        'SELECT * FROM quotes ' +
        (req.query.category == undefined ? '' : where) +
        'ORDER BY RANDOM() LIMIT $limit',
        {
            $category: req.query.category,
            $limit: req.query.limit || '10'
        },
        (err, rows) => {
            if (err) return res.json(err);

            let response = (rows.length > 0) ? { cnt: rows.length, quotes: rows } : { query: 'No results found.' };
            res.json(response);
    });
});

// CREATE FORM
router.get('/add', verifyAdmin, (req, res) => {
    res.render('add-quote');
});

// CREATE QUOTE
router.post('/', verifyAdmin, (req, res) => {
    db.run(
        'INSERT INTO quotes VALUES ($text,$author,$category)',
        {
            $text: req.body.text,
            $author: req.body.author,
            $category: req.body.category
        },
        err => {
            if (err) {
                console.log(err)
                return res.json({ message: 'Could not add quote' });
            } 
            res.redirect('/admin');
    });
});

// UPDATE FORM
router.get('/:id', verifyAdmin, (req, res) => {
    console.log(req.params.id)
    db.get(
        'SELECT text, author, category, rowid FROM quotes WHERE rowid IS $id',
        {
            $id: req.params.id
        },
        (err, row) => {
            res.render('edit-quote', { quote: row });
        }
    );
});

// UPDATE QUOTE
router.put('/:id', verifyAdmin, (req, res) => {
     db.run(
         'UPDATE quotes SET text=$text, author=$author, category=$category WHERE rowid IS $id', 
         {
             $id: req.params.id,
             $text: req.body.text,
             $author: req.body.author,
             $category: req.body.category
         },
         err => {
             if (err) {
                 return console.log('Something went wrong...', err.message);
             }
             res.redirect('/admin');
         });
})

// DESTROY QUOTE
router.delete('/:id/del', verifyAdmin, (req, res) => {
    db.run('DELETE FROM QUOTES WHERE rowid IS $id', {
        $id: req.params.id
    },
    err => {
        if(err) return res.json({ error: 'Could not remove quote' })

        db.run('VACUUM');
        res.redirect('back');
    })
});

module.exports = router;