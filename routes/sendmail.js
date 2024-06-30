// routes/emailRoutes.js

const express = require('express');
const { sendOrderEmails } = require('../controller/sendmailController');
const router = express.Router();

router.post('/send-order-emails', sendOrderEmails);

module.exports = router;