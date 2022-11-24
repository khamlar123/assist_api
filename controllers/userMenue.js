'use strict';
const router = require('express').Router();
const sh = require("./sharedFunc");
const { sequelize, DataTypes } = require('../config/database');
const UserMenue = require('../models/usermenu')(sequelize, DataTypes);

router.get('/getusermenue', async(req, res) => {
    try{
        const finItems = await UserMenue.findAll({
            where:{
                userId: req.query.userId,
            }
        });
        res.status(200).json(finItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addUserMenue', async(req, res) => {
    try{
        let x = 0;
        await UserMenue.destroy({
            where:{
                userId: req.body.userId,
            }
        });

        req.body.menueIds.forEach(async itx => {
          const addModel =  await UserMenue.create({
                userId: req.body.userId,
                menueId: itx,
            });
          (addModel)? x++: null;
        });

        res.status(200).json(x);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deleteUserMenue', async(req, res) => {
    try{
        const deleteItem = await UserMenue.destroy({
            where:{
                userId: req.body.userId,
                menueId: req.body.menueId,
            }
        });

        res.status(200).json(deleteItem[0]);
    }catch(e){
        res.status(500).json(e);
    }
});



module.exports =router; 