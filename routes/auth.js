const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register route
router.post('/registro', async (req, res) => {
    console.log( req.body);
    // Desestructuración de los datos del cuerpo de la solicitud
    const { Nombre, Apellido, Email, NumeroCelular, Contraseña } = req.body;
    
    // Validación de datos
    if (!Nombre || !Apellido || !Email || !NumeroCelular || !Contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Encriptar la contraseña
        const hash = await bcrypt.hash(Contraseña, 10);
        
        // Insertar usuario en la base de datos
        const query = 'INSERT INTO Usuarios (Nombre, Apellido, Email, NumeroCelular, Contraseña) VALUES (?, ?, ?, ?, ?)';
        
        db.query(query, [Nombre, Apellido, Email, NumeroCelular, hash], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
            }
            res.status(201).json({ 
                message: 'Usuario registrado exitosamente',
                userId: result.insertId
            });
            
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error al registrar el usuario', error: err.message});
    }
});

module.exports = router;