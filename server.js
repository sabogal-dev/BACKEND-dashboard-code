import express from 'express';
import cors from 'cors';

import { ventasruta } from './src/routes/routes.js';

const app = express();
const PORT = 3035;
app.use(cors());


app.get('/apiDashboard', ventasruta);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});