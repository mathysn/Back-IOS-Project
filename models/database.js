const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('There was an error while connecting to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS COMPONENT (
        idComponent INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        brand TEXT NOT NULL,
        type TEXT NOT NULL,
        imageURL TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS CLIENT (
        idClient INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS 'ORDER' (
        idOrder INTEGER PRIMARY KEY AUTOINCREMENT,
        dateOrder TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        idClient INTEGER,
        FOREIGN KEY (idClient) REFERENCES CLIENT (idClient)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ORDER_LINE (
        idOrder INTEGER NOT NULL,
        idComponent INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (idOrder) REFERENCES 'ORDER' (idOrder),
        FOREIGN KEY (idComponent) REFERENCES COMPONENT (idComponent)
    )`);
});

module.exports = db;