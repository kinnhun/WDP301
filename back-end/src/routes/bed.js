const express = require('express');
const routerBed = express.Router();

const bedController = require('../controllers/bed');

// Lấy tất cả giường
routerBed.get('/', bedController.getAllBeds);

// Lấy giường theo ID
routerBed.get('/:bed_id', bedController.getBedById);

// Tạo giường mới
routerBed.post('/', bedController.createBed);

// Cập nhật giường theo ID
routerBed.put('/:bed_id', bedController.updateBed);

// Xóa giường theo ID
routerBed.delete('/:bed_id', bedController.deleteBed);

module.exports = routerBed;
