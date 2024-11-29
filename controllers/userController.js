const haversine = require('haversine-distance')
const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')
const { listings } = require('../models')

require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY

const getList = async (req, res) => {
    const { id, token } = req.query

    if (!token) {
        res.status(400).json({ message: "Token is required" })
    }
    else {
        jwt.verify(token, secretKey, async (err, user) => {
            if (err) {
                res.status(401).json({ message: "Invalid token" })
            }
            else {
                const page = 1
                const limit = 2

                // Menara MBMR coordinate
                const mbmrCoordinate = {
                    latitude: 3.121232798820705,
                    longitude: 101.67921911102037
                }

                try {
                    const offset = (page - 1) * limit

                    let userListings = await listings.findAll({
                        attributes: { exclude: ['user_id'] },
                        where: {
                            user_id: id
                        },
                        offset: offset,
                        limit: limit
                    })

                    userListings = userListings.map(listing => {
                        const listtingCoordinate = {
                            latitude: listing.dataValues.latitude,
                            longitude: listing.dataValues.longitude
                        }

                        const distance = haversine(mbmrCoordinate, listtingCoordinate) / 1000 // km

                        listing.dataValues.distance = distance.toFixed(2)
                        delete listing.dataValues.latitude
                        delete listing.dataValues.longitude

                        listing.dataValues.createdAt = dayjs(listing.dataValues.createdAt).format("YYYY-MM-DD HH:mm:ss")
                        listing.dataValues.updatedAt = dayjs(listing.dataValues.updatedAt).format("YYYY-MM-DD HH:mm:ss")

                        return listing.dataValues
                    })

                    res.status(200).json({
                        status: 200,
                        message: 'Success',
                        result: {
                            current_page: page,
                            data: userListings,
                        },
                    })
                } catch (error) {
                    console.error('Error fetching listings:', error.message)
                    res.status(500).json({ message: `Error fetching listings: ${error.message}` })
                }
            }
        })
    }
}

module.exports = {
    getList
}