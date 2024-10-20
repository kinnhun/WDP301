const sql = require('mssql');

// Tạo mới bài viết
const createPost = async (userId, title, content, postType, targetUserId) => {
    return await sql.query`
        INSERT INTO [dbo].[Posts] 
            ([user_id], [title], [content], [post_type], [target_user_id], [created_at], [updated_at])
        VALUES 
            (${userId}, ${title}, ${content}, ${postType}, ${targetUserId}, SYSDATETIME(), SYSDATETIME())
    `;
};

// Lấy tất cả bài viết
const getAllPosts = async () => {
    return await sql.query`SELECT * FROM [dbo].[Posts]`;
};

// Lấy bài viết theo ID
const getPostById = async (postId) => {
    return await sql.query`
        SELECT * FROM [dbo].[Posts] WHERE [post_id] = ${postId}
    `;
};

// Cập nhật bài viết theo ID
const updatePost = async (postId, title, content, postType, targetUserId) => {
    return await sql.query`
        UPDATE [dbo].[Posts]
        SET 
            [title] = ${title}, 
            [content] = ${content}, 
            [post_type] = ${postType}, 
            [target_user_id] = ${targetUserId}, 
            [updated_at] = SYSDATETIME()
        WHERE [post_id] = ${postId}
    `;
};

// Xóa bài viết theo ID
const deletePost = async (postId) => {
    return await sql.query`
        DELETE FROM [dbo].[Posts] WHERE [post_id] = ${postId}
    `;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
