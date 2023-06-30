const Note = require('../models/noteModel')


const deletenote = async (req, res, next) => {
    try {
        const id = req.header('id')
        const delNote = await Note.deleteOne({_id: id})
        next()
    } catch (error) {
        res.status(404).json("Sorry, Something went wrong.")
    }
}

module.exports = deletenote