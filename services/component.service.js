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
exports.addComponent = async (component) => {
    const { name, description, price, brand, type, stock, imageURL } = component;
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO COMPONENT (name, description, price, brand, type, stock, imageURL)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, description, price, brand, type, stock, imageURL],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Retourne l'ID du composant ajouté
                }
            }
        );
    });
};

// Mettre à jour un composant existant
exports.updateComponent = async (id, updatedData) => {
    const { name, description, price, brand, type, stock, imageURL } = updatedData;
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE COMPONENT
             SET name = ?, description = ?, price = ?, brand = ?, type = ?, stock = ?, imageURL = ?
             WHERE idComponent = ?`,
            [name, description, price, brand, type, stock, imageURL, id],
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
exports.deleteComponent = async (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM COMPONENT WHERE idComponent = ?', [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
