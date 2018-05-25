const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('quotes.db');

// ADMIN LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', function (req, res) {
    if (req.body.username === process.env.USER && req.body.password === process.env.PASS) {
        req.session.user = process.env.USER;
        req.session.admin = true;
        res.redirect('admin');
    } else {
        res.redirect('/');
    }
});

// ADMIN LOGOUT
router.get('/logout', verifyAdmin, (req, res) => {
    req.session.destroy();
    res.send('Admin logged out');
});

// ADMIN PANEL
router.get('/admin', verifyAdmin, (req, res) => {
    db.all(
        'SELECT text, author, category, last_modified, rowid FROM quotes '+
        'ORDER BY last_modified DESC',
        (err, quotes) => {
            res.render('admin', {
                quotes
            });
        });
});

module.exports = router;