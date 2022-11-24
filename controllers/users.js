'use strict';
const router = require('express').Router();
const sh = require("./sharedFunc");
const { sequelize, DataTypes } = require('../config/database');
const Users = require('../models/user')(sequelize, DataTypes);
const Stores = require('../models/store')(sequelize, DataTypes);
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get('/usersbyid', async(req, res) => {
    try{
        const finItem = await Users.findOne({where: {id: req.query.userId}});
        res.status(200).json(finItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/register',sh.uploadImgFunc().single('imgUrl') , async(req, res) => {
    try{
        const findItem = await Users.findOne({where: {userName: req.body.userName}});
        if(findItem){
            res.status(200).json('user has exists !');
            return;
        }
    
        const addUser = await Users.create({
            userName: req.body.userName,
            password: req.body.password,
            displayName: req.body.displayName,
            imageUrl: ( req.file == null)? '': req.file.filename,
            sotreId: req.body.sotreId,
        });
    
        res.status(200).json(addUser.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/checkstore', async(req, res) => {
    try{
        const finStore = await Stores.findOne({
            where: {name: req.body.stroeName}
        });

        if(finStore){
            res.status(200).json(0);
            return;
        }else{
            res.status(200).json(1);
            return;
        }

    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/registerstore',sh.uploadImgFunc().single('imgUrl'), async(req, res) => {
    try{
        let x = 0;
        const addStore = await Stores.create({
            name: req.body.stroeName,
            active: 0, // 0 not active, 1 active
            imgUrl: req.file.filename,
        });
    
        if(addStore){
            x++
            const addUser = await Users.create({
                userName: req.body.userName,
                password: req.body.password,
                displayName: req.body.displayName,
                imageUrl: '',
                storeId: addStore.id,
            });
        }
    
        (x > 0)? res.status(200).json(addStore.id): null ;
    }catch(e){
        res.status(500).json(e);
    }
})

router.delete('/deleteuser', async(req, res) => {
    try{
        const findItem = await Users.findOne({where: {userName: req.body.userName}});
        if(!findItem){
            res.status(200).json(`no't have user!`);
            return;
        }

        try{
            sh.deleteImgFunc(findItem.imageUrl);
        }catch(e){};

        const deleteItem = await Users.destroy({
            where: {id: findItem.id}
        });
        res.status(200).json(deleteItem[0]);

    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/updateuser',sh.uploadImgFunc().single('imgUrl') , async(req, res) => {
    try{
        const findItem = await Users.findOne({where: {userName: req.body.userName}});
        if(!findItem){
            res.status(200).json(`no't have user!`);
            return;
        }
    
        findItem.userName = req.body.userName;
        findItem.password = req.body.password;
        findItem.displayName = req.body.displayName;
        findItem.imageUrl = ( req.file == null)? findItem.imageUrl: req.file.filename;
        findItem.sotreId = req.body.sotreId;
    
        const updateIetm = await Users.update(
            findItem.dataValues,
            {where: {id: findItem.id}}
        );
    
        res.status(200).json(updateIetm.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/changepassword', async(req, res) => {
    try{
        const findItem = await Users.findOne({where: {userName: req.body.userName}});
        if(!findItem){
            res.status(200).json(`no't have user!`);
            return;
        }

        findItem.password = req.body.password;
        const updateUser = await Users.update(
            findItem.dataValues, {where:{id: findItem.id}}
        );
        res.status(200).json(updateUser[0]);

    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/login', async(req, res) => {
    try{
        const findUser = await Users.findOne({
            where: {
                [Op.and]:[
                   { userName: req.body.userName},
                   { password: req.body.password }
                ]
            }
        });

        const findStore = await Stores.findOne({
            where:{
                [Op.and]:[
                    {id: findUser.id},
                    {active: 1},
                ]
            }
        });

        if(!findStore){
            res.status(200).json('plese with addmin approved your store');
            return;
        }

        let mapData = {
            userName: findUser.userName,
            storeName: findStore.name,
            displayName: findUser.displayName,
            imgUrl: findUser.imgUrl,
        }


        const resl = {
            autuh: sh.sigToken(mapData),
        };

        res.status(200).json(resl);


    }catch(e){
        res.status(500).json(e);
    }
});




module.exports =router; 