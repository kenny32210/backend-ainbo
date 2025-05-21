const  express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Login de usuario

router.post('/login',(req,res)=>{
    console.log(req.body);
    //datos
    const {Email, Contraseña} = req.body;

    // Validación de datos
    if(!Email || !Contraseña){
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    //buscar el usuario en la base de datos
    // ...existing code...
db.query('SELECT * FROM Usuarios WHERE Email = ?',
    [Email],
    async (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }

        if(result.length == 0){
            return res.status(404).send('Usuario no encontrado');
        }

        const usuario = result[0];

        //comparar la contraseña
        const match = await bcrypt.compare(Contraseña, usuario.Contraseña);

        if(!match){
            return res.status(401).send('Contraseña incorrecta');
        }

        return res.status(200).json({
            mensaje: 'Usuario logueado exitosamente',
            Usuario:{
                Id : usuario.id,
                Nombre : usuario.Nombre,
                Email : usuario.Email,
            }
        });
    }
);
// ...existing code...
    
});
module.exports = router;