module.exports = function protectPageMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
}