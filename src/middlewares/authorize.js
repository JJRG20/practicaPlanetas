exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    // const user = req.user; // asumir usuario autenticado

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    next();
  };
};
