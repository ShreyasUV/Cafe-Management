const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    query = "insert into product (pName, categoryId, description, price, status) values (?, ?, ?, ?, 'true')";
    connection.query(query, [product.pName, product.categoryId, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product Added Successsfully." });
        } else {
            return res.status(500).json(err);
       }
    });
});

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select p.pId, p.pName, p.description, p.price, p.status, c.categoryId, c.categoryName from product as p INNER JOIN category as c where p.categoryId = c.categoryId"; 
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } 
        else {
            return res.status(500).json(err);   
        }
    });
});

router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select pId, pName from product where categoryId=? and status='true'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
       }
    });
});

router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select pId, pName, description, price from product where pId=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err);
       }
    });
});

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    var query = "update product set pName=?, categoryId=?, description=?,price=? where pId=?";
    connection.query(query, [product.pName, product.categoryId, product.description, product.price, product.pId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id not found" });
            }
           return res.status(200).json({message:"Product Updated Successfully"})
        } 
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from product where pId=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id not found" });
            }
            return res.status(200).json({ message: "Product Deleted Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let user = req.body;
    let query = "update product set status=? where pId=?";
    connection.query(query, [user.status, user.pId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id not found" });
            }
            return res.status(200).json({ message: "Product Status Updated Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;