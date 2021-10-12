const express = require('express');

const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const multer = require('../utils/multer');

const router = express.Router();

router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.findOne);
router.post('/items',  multer.uploadMultiple, itemController.create);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);
router.get('/:category', itemController.getbycategory);

module.exports = router;