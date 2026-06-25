module.exports = function(allowed = []){
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: 'No user in request' });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' });
    next();
  }
}
