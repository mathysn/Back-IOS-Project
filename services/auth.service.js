const db = require('../models/database');

exports.addClient = async ({ firstName, lastName, email, address }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO CLIENT (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,
            [firstName, lastName, email, address],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ idClient: this.lastID, firstName, lastName, email, address });
                }
            }
        );
    });
};

exports.findClientByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM CLIENT WHERE email = ?`,
            [email],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};