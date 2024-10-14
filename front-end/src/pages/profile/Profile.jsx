
const Profile = () => {
  const user = {
    image: 'https://via.placeholder.com/150', // Đường dẫn ảnh đại diện
    username: 'JohnDoe',
    phone: '0123456789',
    email: 'johndoe@example.com'
  };

  return (
    <div className="profile-container">
      <img src={user.image} alt="profile" className="profile-image" />
      <h2 className="profile-username">{user.username}</h2>
      <p className="profile-phone"><strong>Phone:</strong> {user.phone}</p>
      <p className="profile-email"><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
