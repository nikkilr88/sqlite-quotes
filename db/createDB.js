const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('quotes.db');
const quoteData = require('./quoteData');

db.serialize(() => {    
    db.run("CREATE TABLE IF NOT EXISTS quotes (text TEXT, author TEXT, category TEXT)");

    const delAll = new Promise((resolve, reject) => {
        db.run('DELETE FROM quotes', err => {
            if (err) return reject(err);
            resolve('Deleted!');
        });
    });
    
    delAll
    .then(msg => {
        console.log(msg);
        quoteData.forEach(quote => {
            db.run('INSERT INTO quotes VALUES ($text,$author,$category)', 
            {
                $text: quote.text, 
                $author: quote.author, 
                $category: quote.category
            },
            err => {
                if(err) return console.log(err);
                console.log('Row added!');
            });
        });
        db.close();
    });    
});
