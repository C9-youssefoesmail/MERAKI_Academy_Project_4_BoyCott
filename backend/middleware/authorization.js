const authorization = (text) => {
  return (req, res, next) => {
    const { permissions } = req.token.role;
    if (!permissions.includes(text)) {
      res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    } else {
      next();
    }
  };
};

module.exports = authorization