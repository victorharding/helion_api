const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')

router.route('/')
     .get(contactController.getAllMessages)
    .post(contactController.createNewMessage)
    // .patch(contactController.updateMessage)
    .delete(contactController.deleteMessage)

module.exports = router