const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

//cargar ruta
const authRoutes = require('./routes/auth');
//midlware para parsear el json
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

//inicializacion del puerto
const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
    console.log(`Servidor escuchando ${PORT}`);
});

