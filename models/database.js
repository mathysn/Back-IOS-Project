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
    db.run(`DROP TABLE IF EXISTS COMPONENT`);
    db.run(`DROP TABLE IF EXISTS CLIENT`);
    db.run(`DROP TABLE IF EXISTS 'ORDER'`);
    db.run(`DROP TABLE IF EXISTS ORDER_LINE`);

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
        idClient INTEGER,
        dateOrder TEXT NOT NULL,
        FOREIGN KEY (idClient) REFERENCES CLIENT (idClient)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ORDER_LINE (
        idOrder INTEGER NOT NULL,
        idComponent INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (idOrder) REFERENCES 'ORDER' (idOrder),
        FOREIGN KEY (idComponent) REFERENCES COMPONENT (idComponent)
    )`);

    db.run(`INSERT INTO COMPONENT (name, description, price, brand, type, imageURL) VALUES
        ('Intel Core i9-13900K', '13th Gen Intel Core processor, 24 cores, unlocked', 699.99, 'Intel', 'Processor', 'https://lecoingamer.ma/wp-content/uploads/2023/07/Intel-Core-i9-13900K.webp'),
        ('NVIDIA GeForce RTX 4090', 'High-end gaming graphics card with 24GB GDDR6X', 1599.99, 'NVIDIA', 'Graphics Card', 'https://s.alicdn.com/@sc04/kf/H9fa38b0a693a44a6b27fc5152e4ac3bcm.jpg_720x720q50.jpg'),
        ('Corsair Vengeance RGB Pro 32GB', '32GB (2 x 16GB) DDR4 3200MHz RAM with RGB lighting', 159.99, 'Corsair', 'Memory', 'https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Memory/CMW32GX4M2E3200C16/Gallery/Vengeance_RGB_Pro_01.webp'),
        ('Samsung 980 PRO 1TB', 'NVMe M.2 SSD with PCIe Gen 4.0', 119.99, 'Samsung', 'Storage', 'https://m.media-amazon.com/images/I/812DsfxDSVL.jpg'),
        ('ASUS ROG Strix Z790-E', 'ATX motherboard with WiFi 6E support for Intel processors', 499.99, 'ASUS', 'Motherboard', 'https://www.grosbill.com/images_produits/0c8b67e9-1068-4276-8e02-d1dbc1ee8e0e.jpg'
    )`);

    db.run(`INSERT INTO CLIENT (firstName, lastName, email, address) VALUES
        ('John', 'Doe', 'john.doe@example.com', '123 Main Street'),
        ('Jane', 'Smith', 'jane.smith@example.com', '456 Elm Street'),
        ('Alice', 'Brown', 'alice.brown@example.com', '789 Oak Street'),
        ('Robert', 'Johnson', 'robert.johnson@example.com', '101 Pine Avenue'),
        ('Emily', 'Davis', 'emily.davis@example.com', '202 Birch Lane'
    )`);
});

module.exports = db;