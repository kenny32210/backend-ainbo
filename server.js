const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

//cargar ruta
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const productoRoutes = require('./routes/producto');


//midlware para parsear el json
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', productoRoutes);



//inicializacion del puerto
const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
    console.log(`Servidor escuchando ${PORT}`);
});

