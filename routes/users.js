var express = require('express');
var router = express.Router();
var userService = require('../userService');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json({users: users});
  } catch (err) {
    next(err);
  }
});



module.exports = router;