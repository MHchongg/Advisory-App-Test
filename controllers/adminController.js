const { listings } = require("../models")

const index = async (req, res) => {
    const listingss = await listings.findAll()
    res.render('pages/Admin/Listing', { listings: listingss })
}

const store = async (req, res) => {
    const { name } = req.body

    if (!name || name.trim() === "") {
        res.status(400).json({ message: "Invalid input" })
    }
    else {
        await listings.create({
            name: name,
            user_id: req.user.id
        })

        res.status(201).json({ message: "Add new listing successfully" })
    }
}

const edit = async (req, res) => {
    const { id } = req.params

    const listing = await listings.findByPk(id)

    res.render('pages/Admin/ListingEdit', { listing: listing })
}

const update = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name || name.trim() === "") {
        res.status(400).json({ message: "Invalid input" })
    }
    else {
        try {
            const listing = await listings.findByPk(id)
            if (!listing) {
                res.status(404).json({ message: 'Listing not found' })
            }
            else {
                listing.name = name
                await listing.save()

                res.status(200).json({ message: 'Listing updated successfully' })
            }
        } catch (error) {
            console.error('Error updating listing:', error.message)
            res.status(500).json({ message: `Error updating listing: ${error.message}` })
        }
    }
}

const destroy = async (req, res) => {
    const { id } = req.params

    try {
        const listing = await listings.findByPk(id)
        if (!listing) {
            res.status(404).json({ message: 'Listing not found' })
        }
        else {
            await listing.destroy()
            res.status(200).json({ message: 'Listing deleted successfully' })
        }
    } catch (error) {
        console.error('Error deleting listing:', error.message)
        res.status(500).json({ message: `Error deleting listing: ${error.message}` })
    }
}

module.exports = {
    index,
    store,
    edit,
    update,
    destroy
}