const express = require('express');
const Newrouter = express.Router();
const postController = require('../controllers/new');
const checkRole = require('../middlewares/checkAdminRole');

Newrouter.get('/', postController.getAllPosts);

// Lấy bài viết theo ID (cho phép tất cả user)
Newrouter.get('/view/:id', postController.getPostById);

// Tạo mới bài viết (chỉ admin và manager)
Newrouter.post('/cr',  postController.createPost);

// Cập nhật bài viết (chỉ admin và manager)
Newrouter.put('/up/:id', postController.updatePost);

// Xóa bài viết (chỉ admin)
Newrouter.delete('/de/:id',  postController.deletePost);

module.exports = Newrouter;
