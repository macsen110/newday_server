module.exports = {
    requireAuthentication(req, res, next) {
        if (!req.session.user) {res.json({code: '00002'})}
        else next()
    }
}