const postModel = require('../models/new');

// [C] Tạo mới bài viết
const createPost = async (req, res) => {
    const { userId, title, content, postType, targetUserId } = req.body;
   
    try {
        const result = await postModel.createPost(userId, title, content, postType, targetUserId);
        res.status(201).json({ message: 'Tạo bài viết thành công!', rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error('Lỗi khi tạo bài viết:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra khi tạo bài viết.' });
    }
};

// [R] Lấy tất cả bài viết
const getAllPosts = async (req, res) => {
    try {
        const result = await postModel.getAllPosts();
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách bài viết:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách bài viết.' });
    }
};

// [R] Lấy bài viết theo ID
const getPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const result = await postModel.getPostById(postId);
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        console.error('Lỗi khi lấy bài viết:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy bài viết.' });
    }
};

// [U] Cập nhật bài viết
const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content, postType, targetUserId } = req.body;

    try {
        const result = await postModel.updatePost(postId, title, content, postType, targetUserId);
        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết để cập nhật.' });
        }
        res.status(200).json({ message: 'Cập nhật bài viết thành công!' });
    } catch (err) {
        console.error('Lỗi khi cập nhật bài viết:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật bài viết.' });
    }
};

// [D] Xóa bài viết
const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const result = await postModel.deletePost(postId);
        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết để xóa.' });
        }
        res.status(200).json({ message: 'Xóa bài viết thành công!' });
    } catch (err) {
        console.error('Lỗi khi xóa bài viết:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa bài viết.' });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
