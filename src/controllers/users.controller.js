const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 1. Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Crear usuario
    const user = await User.create({
      username,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      idUser: user.idUser,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};
