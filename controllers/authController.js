const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dayjs = require("dayjs")
const { users } = require("../models")

const index = (req, res) => {
    res.render('pages/Login')
}

const login = async (req, res) => {
    const { email, password } = req.query

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await users.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
            const token = jwt.sign({ id: user.id, role_type: user.role_type }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

            res.cookie('access_token', token, { httpOnly: true, secure: true, maxAge: 3600 * 1000 });

            res.json({
                status: 200,
                message: 'Logged in',
                result: {
                    user_id: user.id,
                    access_token: token,
                    token_type: 'Bearer',
                    role_type: user.role_type,
                    expires_at: dayjs().add(1, 'hour').format("YYYY-MM-DD HH:mm:ss"),
                },
            })
        }
        else {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
    })
}

module.exports = {
    login,
    index
}