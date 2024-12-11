const db = require('../models/database');

exports.addOrder = async ({ dateOrder, totalPrice, idClient, orderLines }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO 'ORDER' (dateOrder, totalPrice, idClient) VALUES (?, ?, ?)`,
            [dateOrder, totalPrice, idClient],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    const orderId = this.lastID;
                    const stmt = db.prepare(
                        `INSERT INTO ORDER_LINE (idOrder, idComponent, quantity) VALUES (?, ?, ?)`
                    );
                    for (const line of orderLines) {
                        stmt.run(orderId, line.idComponent, line.quantity);
                    }
                    stmt.finalize();
                    resolve(orderId);
                }
            }
        );
    });
};

exports.fetchOrdersByClientId = async (clientId) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT o.idOrder, o.dateOrder, o.totalPrice, ol.idComponent, ol.quantity
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
