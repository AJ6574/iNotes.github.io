const express = require('express')
const {body, validationResult} = require('express-validator')
const bodyParser = require('body-parser')
const Note = require('../models/noteModel')
const fetchuser = require('../middleware/fetchuser')
const deletenote = require('../middleware/deletnote')

const router = express.Router()


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());




//Router 1: Creating New notes
router.post('/add-note', fetchuser, [
    body('title', 'The title must be between 2 to 30 characters long').isLength({min: 2}),
    body('desc', 'The description must not be empty').exists()//validation inputs
], async (req,res) => {
    const validationerr = validationResult(req)//checking if there is any validation error
    if(!validationerr.isEmpty())//if error occurs in validation a 404 status will be sent with errors array
    {
        res.status(404).json({validationerr})
    }
    else{
        const {title, desc} = req.body//fetching title and desc from req body
        const userId = req.user.Id//fetching user id sent by middleware
        try{
            const note = await Note.create({ //creating new note note
                UserID: userId,
                Title: title,
                Description: desc
            })
            res.json(note)//sending the new note as response
        }catch(err){//if any error occurs while performing above tasks then this code will compile
            res.status(404).json("Sorry Something went wrong")
        }
        
    }
})
//Router 2: Updating notes
router.post('/update-note', deletenote, fetchuser, [
    body('newtitle', 'The title must be between 2 to 30 characters long').isLength({min: 2}),
    body('newdesc', 'The description must not be empty').exists()//validation inputs
], async (req,res) => {
    const validationerr = validationResult(req)//checking if there is any validation error
    if(!validationerr.isEmpty())//if error occurs in validation a 404 status will be sent with errors array
    {
        res.status(404).json({validationerr})
    }
    else{
        const {newtitle, newdesc} = req.body//fetching title and desc from req body for the updated note
        const userId = req.user.Id//fetching user id sent by middleware
        const delNote = req.delNote//fetching the title of the previous note that is going to be updated
        try{
            const note = await Note.create({ //creating new note note
                UserID: userId,
                Title: newtitle,
                Description: newdesc
            })
            res.json({note, delNote})//sending the new note as response
        }catch(err){//if any error occurs while performing above tasks then this code will compile
            console.log(err)
            res.status(404).json({err})
        }
        
    }
})

//Router 3: deleting notes
router.post('/delete-note', deletenote, async (req,res) => {
    const delNote = req.delNote//fetching the title of the note that has been deleted
    res.send({delNote})
})
//Router 4: fetch notes
router.post('/fetch-note', fetchuser, async (req,res) => {
    const userId = req.user.Id
    const notes = await Note.find({UserID: userId})
    res.send(notes)
})

module.exports = router