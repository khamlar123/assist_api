'use strict';
const router = require('express').Router();
const sh = require("./sharedFunc");
const { sequelize, DataTypes } = require('../config/database');
const Users = require('../models/user')(sequelize, DataTypes);
const Stores = require('../models/store')(sequelize, DataTypes);

Stores.hasOne(Users, { foreignKey: "storeId" });
Users.belongsTo(Stores, { foreignKey: "storeId" });

router.get('/getpendingapproved', async(req, res) => {
    try{
        const findItems = await Stores.findAll({
            where:{
                active: 0
            },
            include:[
                {model: Users}
            ]
        });
    
        res.status(200).json(findItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/approved', async(req, res) => {
    try{
        const findStore = await Stores.findOne({
            where:{
                id: req.query.storeId
            }
        });

        if(!findStore){
            res.status(404).json('store undefined');
            return;
        }
        findStore.active = 1;
        const approved = await Stores.update(findStore.dataValues, {where:{id:findStore.id}});
        res.status(200).json(approved[0]);
        
    }catch(e){
        res.status(500).json(e);
    }
});


module.exports =router; 