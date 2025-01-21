const db = require('../models/database');

exports.addOrder = async ({ idClient, orderLines }) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            stmt.finalize(() => {
                const dateOrder = new Date().toISOString(); // Date de création dynamique

                // Insérer la commande après avoir calculé le prix total
                db.run(
                    `INSERT INTO 'ORDER' (idClient, dateOrder) VALUES (?, ?)`,
                    [idClient, dateOrder],
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            const orderId = this.lastID;

                            // Insérer les lignes de commande
                            const lineStmt = db.prepare(
                                `INSERT INTO ORDER_LINE (idOrder, idComponent, quantity) VALUES (?, ?, ?)`
                            );

                            orderLines.forEach((line) => {
                                lineStmt.run(orderId, line.idComponent, line.quantity);
                            });

                            lineStmt.finalize(() => resolve(orderId));
                        }
                    }
                );
            });
        });
    });
};

exports.fetchOrdersByClientId = async (clientId) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT o.idOrder, o.dateOrder, ol.idComponent, ol.quantity
             FROM 'ORDER' o
             JOIN ORDER_LINE ol ON o.idOrder = ol.idOrder
             WHERE o.idClient = ?`,
            [clientId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

exports.modifyOrder = async (id, { dateOrder, totalPrice, orderLines }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE 'ORDER' SET dateOrder = ?, totalPrice = ? WHERE idOrder = ?`,
            [dateOrder, totalPrice, id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    db.run(`DELETE FROM ORDER_LINE WHERE idOrder = ?`, [id], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            const stmt = db.prepare(
                                `INSERT INTO ORDER_LINE (idOrder, idComponent, quantity) VALUES (?, ?, ?)`
                            );
                            for (const line of orderLines) {
                                stmt.run(id, line.idComponent, line.quantity);
                            }
                            stmt.finalize();
                            resolve();
                        }
                    });
                }
            }
        );
    });
};

exports.removeOrder = async (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM ORDER_LINE WHERE idOrder = ?`, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                db.run(`DELETE FROM 'ORDER' WHERE idOrder = ?`, [id], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};
