const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los productos
router.post('/producto', (req, res) => {
    console.log(req.body);

    //datos
    const{}=req.body;
})
