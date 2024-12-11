import express, { json } from 'express';
import dishRoutes from './routes/dishRoutes';
import orderRoutes from './routes/orderRoutes';
import clientRoutes from './routes/clientRoutes';
require('dotenv').config();

const app = express();
app.use(json());

app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});