const db = require('../models/database');

// Récupérer tous les composants
exports.fetchComponents = async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM COMPONENT', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Récupérer un composant par son ID
exports.fetchComponentById = async (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM COMPONENT WHERE idComponent = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Ajouter un nouveau composant
exports.createComponent = async ({ name, description, price, brand, type, imageURL }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO COMPONENT (name, description, price, brand, type, imageURL) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, description, price, brand, type, imageURL],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        idComponent: this.lastID,
                        name,
                        description,
                        price,
                        brand,
                        type,
                        imageURL
                    });
                }
            }
        );
    });
};

// Mettre à jour un composant
exports.updateComponent = async (id, { name, description, price, brand, type, imageURL }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE COMPONENT SET name = ?, description = ?, price = ?, brand = ?, type = ?, imageURL = ? WHERE idComponent = ?`,
            [name, description, price, brand, type, imageURL, id],
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

// Supprimer un composant
exports.removeComponent = async (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM COMPONENT WHERE idComponent = ?`, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};