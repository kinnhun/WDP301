const express = require('express');
const Newrouter = express.Router();
const postController = require('../controllers/new');
const checkRole = require('../middlewares/checkAdminRole');

Newrouter.get('/', postController.getAllPosts);

// Lấy bài viết theo ID (cho phép tất cả user)
Newrouter.get('/view/:id', postController.getPostById);

// Tạo mới bài viết (chỉ admin và manager)
Newrouter.post('/admin/cr',  postController.createPost);

// Cập nhật bài viết (chỉ admin và manager)
Newrouter.put('/admin/up/:id', postController.updatePost);

// Xóa bài viết (chỉ admin)
Newrouter.delete('/admin/de/:id',  postController.deletePost);

module.exports = Newrouter;
