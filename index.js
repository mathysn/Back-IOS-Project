const express = require('express');
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("yaml");
const swaggerFile = fs.readFileSync("./swaggerConfig.yaml", "utf8");
const swaggerDocument = yaml.parse(swaggerFile);

const componentRoutes = require('./routes/component.routes');
const clientRoutes = require('./routes/client.routes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/component', componentRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
