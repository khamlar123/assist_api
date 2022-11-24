'use strict';
const router = require('express').Router();
const sh = require("./sharedFunc");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { sequelize, DataTypes } = require('../config/database');
const Categories = require('../models/categories')(sequelize, DataTypes);

router.get('/getcategory', async (req, res) => {
    try{
        const filterItems = await Categories.findAll({
            where:{
                name: {[Op.like]:"%"+req.query.kw+"%"}
            }
        });
    
        res.status(200).json(filterItems);
    }catch(e){
        res.status(500).json(e);
    }
});

router.get('/getcategoryid', async (req, res) => {
    try{
        const finIteme = await Categories.findOne({
            where:{
                id: req.query.catid
            }
        });

        if(!finIteme){
            res.status(404).json('catid not found !');
            return;
        }

        const filterSub = await Categories.findAll({
            where: {parentId: finIteme.id}
        });

        const resl ={
            category: finIteme,
            subCategory: filterSub,
        }

        res.status(200).json(resl);
    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/addcategory',sh.uploadImgFunc().single('imgUrl') ,async (req, res) => {
    try{
        const addModel = await Categories.create({
            name: req.body.name,
            parentId: req.body.parentId,
            storeId: req.body.storeId,
            imgUrl: ( req.file == null)? '': req.file.filename,
        });
        res.status(200).json(addModel.id);
    }catch(e){
        res.status(500).json(e);
    }
});

router.delete('/deletecategory', async (req, res)=> {
    try{
        const findItem = await Categories.findOne({
            where: req.query.cateid
        });

        if(!findItem){
            res.status(404).json('category undefined');
            return; 
        }

        try{
            sh.deleteImgFunc(findItem.imgUrl);
        }catch(e){}

        const deleteItem = await Categories.destroy({
            where: {id: findItem.id}
        });

        res.status(200).json(deleteItem[0]);

    }catch(e){
        res.status(500).json(e);
    }
});

router.post('/editcategory',sh.uploadImgFunc().single('imgUrl') ,async (req, res) => {
    try{
        const finItem = await Categories.findOne({
            where:{
                id: req.body.id
            }
        });

        if(!finItem){
            res.status(404).json('categories undefined');
            return;
        }

        finItem.name = req.body.name;
        finItem.parentId = req.body.parentId;
        finItem.storeId = req.body.storeId;
        finItem.imgUrl = ( req.file == null)? finItem.imgUrl: req.file.filename;

        const addModel = await Categories.update(finItem.dataValues,{
            where:{id: finItem.id}
        });

        res.status(200).json(addModel.id);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports =router; 