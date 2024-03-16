    const express = require('express');
    const connection = require('../connection');
    const router = express.Router();
    var auth = require('../services/authentication');
    var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body;
    query = "insert into category (categoryName) values(?)";
    connection.query(query, [category.categoryName], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Category Added Successfully" });
        } 
        else {
            return res.status(500).json(err);
        }
    });
});

router.get('/get', auth.authenticateToken, (req, res, next) => {
    let query = "select * from category order by categoryName";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } 
        else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    query = "update category set categoryName=? where categoryId=?";
    connection.query(query, [product.categoryName, product.categoryId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Category id not found" });
            }
            return res.status(200).json({ message: "Category Updated Successfully" });
        }    
            else {
                return res.status(500).json(err);
            }
    });
});

router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from category where categoryId=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Category id not found" });
            }
            return res.status(200).json({ message: "Category Deleted Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;