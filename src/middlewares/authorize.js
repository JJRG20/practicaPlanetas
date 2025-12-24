exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user; // asumimos usuario autenticado

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  };
};
