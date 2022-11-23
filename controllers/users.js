'use strict';
const router = require('express').Router();
const {sequelize, DataTypes} = require('../config/database');
const Users = require('../models/user')(sequelize, DataTypes);

router.get('/users', async(req, res) => {
    let items = await Users.findAll();
    res.status(200).json(items);
});



module.exports =router;