const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos
router.post('/producto', (req, res) => {
    console.log(req.body);

    //datos
    const{Nombre , Descripcion,Precio,Imagen}=req.body;
    // Validación de datos
    if(!Nombre || !Descripcion || !Precio || !Imagen){
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Insertar producto en la base de datos
        const query = 'INSERT INTO Productos (Nombre, Descripcion, Precio, Imagen) VALUES (?, ?, ?, ?)';
        
        db.query(query, [Nombre, Descripcion, Precio, Imagen], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al registrar el producto', error: err.message });
            }
            res.status(201).json({ 
                message: 'Producto registrado exitosamente',
                productId: result.insertId 
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error al registrar el producto', error: err.message});
    }
});

module.exports= router;