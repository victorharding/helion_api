const Message = require('../models/Message')
const asyncHandler = require('express-async-handler')

const getAllMessages = async (req, res) => {
    const messages = await Message.find().lean()

    // If no users 
    if (!messages?.length) {
        return res.status(400).json({ message: 'No messages found' })
    }

    res.json(messages)
}

const createNewMessage = asyncHandler(async (req, res) => {
    const { name, email, text } = req.body

    // Confirm data
    if (!name || !email|| !text ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    const messageObject = { name,email, text}

    const message = await Message.create(messageObject)

    if (message) { //created 
        res.status(201).json({ message: `New message revieved we will send respnd to ${email}` })
    } else {
        res.status(400).json({ message: 'Invalid data received' })
    }
})

const deleteMessage = asyncHandler(async (req, res) => {
    
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID Required' })
    }


    // Does the user exist to delete?
    const message = await Message.findById(id).exec()

    if (!message) {
        return res.status(400).json({message: 'Message not found' })
    }

    const result = await message.deleteOne()

    const reply = `Message from ${result.name} ${result.email} with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllMessages,
    createNewMessage,
    deleteMessage
}