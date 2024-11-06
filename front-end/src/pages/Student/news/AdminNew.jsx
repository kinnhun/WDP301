// AdminNew.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Import react-hot-toast

const AdminNew = () => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Notification');
  const [targetUserId, setTargetUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        if (decodedPayload && decodedPayload.id) {
          setUserId(decodedPayload.id);
        } else {
          toast.error('Token không chứa userId.');
        }
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
        toast.error('Token không hợp lệ. Vui lòng đăng nhập lại.');
      }
    } else {
      toast.error('Không tìm thấy token. Vui lòng đăng nhập.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Không tìm thấy userId. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/news/admin/cr`,
        {
          userId,
          title,
          content,
          postType,
          targetUserId,
        }
      );
      toast.success(response.data.message);  // Hiển thị thông báo thành công
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Có lỗi xảy ra khi tạo bài viết.');  // Hiển thị thông báo lỗi
    }
  };

  return (
    <Container className="mt-4">
      <h3>Tạo Bài Viết Mới</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="content" className="mt-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập nội dung"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postType" className="mt-3">
          <Form.Label>Loại bài viết</Form.Label>
          <Form.Select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="Notification">Notification</option>
            <option value="News">News</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="targetUserId" className="mt-3">
          <Form.Label>ID Người dùng mục tiêu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập ID người dùng mục tiêu"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Tạo Bài Viết
        </Button>
      </Form>
    </Container>
  );
};

export default AdminNew;
