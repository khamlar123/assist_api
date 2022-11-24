'use strict';
const router = require('express').Router();
const sh = require("./sharedFunc");
const { sequelize, DataTypes } = require('../config/database');
const Menu = require('../models/menu')(sequelize, DataTypes);

router.get('/getmenue', async(req, res) => {
    try{
        const finItem = await Menu.findAll();
        res.status(200).json(finItem);
    }catch(e){
        res.status(500).json(e);
    }
});

router.get('/getmenuebyparentid', async(req, res) => {
    try{
        const filterItem = await Menu.findOne({
            where:{id: req.query.id}
        });

        if(!filterItem){
            res.status(200).json(`not have parent id !`);
            return;
        }

        const items = await Menu.findAll({
            where:{parentId: filterItem.id}
        });

        resl = {
            menue: filterItem,
            subMenue: items
        }

        res.status(200).json(resl);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addmenue', sh.uploadImgFunc().single('imgUrl') ,async(req, res) => {
    try{
        const findItem = await Menu.findOne({where:{name: req.body.name}});
        if(findItem){
            res.status(200).json('menu already exists');
            return;
        }

        const addMenu = await Menu.create({
            name: req.body.name,
            parentId: req.body.parentId,
            imgUrl: ( req.file == null)? '': req.file.filename,
        });

        res.status(200).json(addMenu.id);

    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deletemenue', async(req, res) => {
    try{
        const findItem = await Menu.findAll({
            where:{parentId: req.body.id}
        });

        if(findItem.length > 0){
            res.status(200).json(`ca't delete menue`);
            return;
        }

        try{
            sh.deleteImgFunc(findItem.imgUrl);
        }catch(e){

        }

        const deleteItem = await Menu.destroy({
            where:{id: findItem.id}
        });

        res.status(200).json(deleteItem.id);

    }catch(e){
        res.status(500).json(e);
    }
});

router.put('/editmenue',sh.uploadImgFunc().single('imgUrl'), async(req, res) => {
    try{
        const findItem = await Menu.findOne({where:{id: req.body.id}});
        if(!findItem){
            res.status(200).json(`not have a menue`);
            return;
        }   
        findItem.name = req.body.name;
        findItem.imgUrl = ( req.file == null)? findItem.imgUrl : req.file.filename;
        const updateItem = await Menu.update(
            findItem.dataValues, {where:{id: findItem.id}}
        );
        res.status(200).json(updateItem[0]);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports =router; 