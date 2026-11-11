const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Leer el token del header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No hay token, permiso denegado' });
  }

  // Extraer el token del formato "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Formato de token inválido' });
  }

  try {
    // Verificar el token con la clave secreta
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = cifrado.usuario; // Extrae el id y rol del usuario
    next(); // Pasa al siguiente controlador
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido o ha expirado' });
  }
};