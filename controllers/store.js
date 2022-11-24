'use strict';
const router = require('express').Router();
const sh = require("./sharedFunc");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { sequelize, DataTypes } = require('../config/database');
const Stores = require('../models/store')(sequelize, DataTypes);

router.get('/getstore', async(req, res) => {
    try{
        const filterItems = await Stores.findAll({
            where:{
                name: {[Op.like]: "%"+req.query.kw+"%"}
            }
        });
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addstore',sh.uploadImgFunc().single('imgUrl'), async(req, res) => {
    try{
        const findItem = await Stores.findOne({
            where:{name: req.body.name}
        });

        if(findItem){
            res.status(200).json(`store has exists`);
            return;
        }

        const addItem = await Stores.create({
            name: req.body.name,
            active: 0,
            imgUrl: ( req.file == null)? '': req.file.filename,
        });

        res.status(200).json(addItem.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deletestore', async(req, res) => {
    try{
        const findItem = await Stores.findOne({
            where:{
                id:req.query.id,
            }
        });

        if(!findItem){
            res.status(200).json(`not have stores`);
            return;
        }

        const deleteItem = await Stores.destroy({
            where:{id: findItem.id}
        });

        res.status(200).json(deleteItem[0]);

    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/editstore',sh.uploadImgFunc().single('imgUrl'), async(req, res) => {
    try{
        const findItem = await Stores.findOne({
            where:{
                id: req.body.id
            }
        });

        if(!findItem){
            res.status(500).json(`no't have store`);
            return;
        }

        findItem.name = req.body.name;
        findItem.imgUrl = ( req.file == null)? findItem.imgUrl: req.file.filename;
        const updateItem = await Stores.update(findItem.dataValues,{where:{id: findItem.id}});
        res.status(200).json(updateItem[0]);

    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/changestoreactive', async(req, res)=>{
    try{
        const findItem = await Stores.findOne({
            where:{
                id: req.body.id
            }
        });

        if(!findItem){
            res.status(500).json(`no't have store`);
            return;
        }

        findItem.name = req.body.name;
        const change = await Stores.update(findItem.dataValues,{
            where:{
                id: req.body.id,
            }
        });

        res.status(200).json(change[0]);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports =router; 