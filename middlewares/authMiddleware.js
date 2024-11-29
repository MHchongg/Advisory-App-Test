const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
    const token = req.cookies['access_token']

    if (!token) {
        res.redirect('/')
    } 
    else {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.redirect('/')
            }
            else {
                req.user = user
                next()
            }
        })
    }
}

const verifyAdmin = (req, res, next) => {
    if (req.user.role_type === 'a') {
        next()
    }
    else {
        return res.status(403).json({ message: 'No permission' })
    }
}

module.exports = {
    verifyToken,
    verifyAdmin,
}
