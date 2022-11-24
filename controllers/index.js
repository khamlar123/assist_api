const router = require('express').Router();

const users = require('./users');
router.use(users);
const menue = require('./menue');
router.use(menue);
const UserMenue = require('./userMenue');
router.use(UserMenue);
const addmins = require('./addmin');
router.use(addmins);

module.exports = router;