const jwt = require('jsonwebtoken')

const config = process.env

const veriflyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if(!token){
        return res.status(403).send("A Token is required for authentication")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded

    } catch (error) {
        res.status(400).send("Invalid Token")
    }

    return next()
}

module.exports = veriflyToken