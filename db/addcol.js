const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('quotes.db');

db.serialize(() => {
    db.run('ALTER TABLE quotes ADD COLUMN last_modified INTEGER')
    db.run(
        'UPDATE quotes SET last_modified = $date',
        {
            $date: Date.now()
        }
    )
})
