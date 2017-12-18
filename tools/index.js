module.exports = {
    requireAuthentication(req, res, next) {
        if (!req.session.user) {res.json({
            code: '00002',
            msg: '请先登录'
        })}
        else next()
    }
}