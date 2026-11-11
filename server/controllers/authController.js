const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    usuario = new Usuario({ nombre, email, password });
    await usuario.save(); // El middleware en Usuario.js encripta el password

    // Crear y firmar el JWT
    const payload = { usuario: { id: usuario.id, rol: usuario.rol } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (error, token) => {
      if (error) throw error;
      res.status(201).json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// POST /api/auth/login
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const passwordCorrecto = await usuario.compararPassword(password);
    if (!passwordCorrecto) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Crear y firmar el JWT
    const payload = { usuario: { id: usuario.id, rol: usuario.rol } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};