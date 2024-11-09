import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminNew = () => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Notification');
  const [targetUserId, setTargetUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/news`, {
        headers: { 'Cache-Control': 'no-cache' },
      });
      const sortedPosts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Không tìm thấy userId. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/news/admin/cr`,
        { userId, title, content, postType, targetUserId }
      );
      toast.success(response.data.message);
      setShowModal(false);
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Có lỗi xảy ra khi tạo bài viết.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userId || !editingPostId) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/news/admin/up/${editingPostId}`,
        { title, content, postType, targetUserId }
      );
      toast.success(response.data.message);
      setShowModal(false);
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      toast.error('Có lỗi xảy ra khi cập nhật bài viết.');
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/news/admin/de/${postId}`);
      toast.success(response.data.message);
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Có lỗi xảy ra khi xóa bài viết.');
    }
  };

  const handleShow = (post) => {
    setShowModal(true);
    if (post) {
      setEditingPostId(post.post_id);
      setTitle(post.title);
      setContent(post.content);
      setPostType(post.post_type);
      setTargetUserId(post.target_user_id);
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setTitle('');
    setContent('');
    setPostType('Notification');
    setTargetUserId('');
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={() => handleShow(null)}>Add New</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPostId ? 'Cập Nhật Bài Viết' : 'Tạo Bài Viết Mới'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingPostId ? handleUpdate : handleSubmit}>
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
              {editingPostId ? 'Cập Nhật Bài Viết' : 'Tạo Bài Viết'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ul className="list-group mb-4">
        {currentPosts.map((post, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{post.title}</span>
            <div>
              <Button variant="info" onClick={() => handleShow(post)}>Edit</Button>
              <Button variant="danger" className="ms-2" onClick={() => handleDelete(post.post_id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>

      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
};

export default AdminNew;
