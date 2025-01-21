const db = require('../models/database');

exports.fetchClientById = async (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM CLIENT WHERE idClient = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

exports.modifyClient = async (id, data) => {
    return new Promise((resolve, reject) => {
        const { firstName, lastName, address } = data;
        db.run(
            `UPDATE CLIENT SET firstName = ?, lastName = ?, address = ? WHERE idClient = ?`,
            [firstName, lastName, address, id],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};
