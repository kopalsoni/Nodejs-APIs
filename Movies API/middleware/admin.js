

module.exports = function (req, res, next) {

    // 401 Unauthorized     - if information passed is incorrect
    // 403 Forbidden        -- even if info is correct, but you're not allowed to access

    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}