import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            const userId = decodedPayload.id;

            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Cache-Control': 'no-cache',
                        },
                    });
                    setUserInfo(response.data.data);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    toast.error('Failed to fetch user profile');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProfile();
        } else {
            console.error("No token found");
            toast.error('No token found. Please log in.');
            navigate('/login');
            setLoading(false);
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirmation do not match.');
            return;
        }

        try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            const userId = decodedPayload.id;

            // Gửi yêu cầu đổi mật khẩu
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/profile/${userId}`,
                {
                    old_password: oldPassword,
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Password changed successfully!');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Failed to change password');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Start Content */}
            <div className="container-fluid">
                {/* Start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <h4 className="page-title">User Profile</h4>
                        </div>
                    </div>
                </div>
                {/* End page title */}

                <div className="row">
                    <div className="col-xl-4 col-lg-5">
                        <div className="card text-center">
                            <div className="card-body">
                                <img
                                    src={userInfo?.img || 'N/A'}
                                    className="rounded-circle avatar-lg img-thumbnail"
                                    alt="profile-image"
                                />
                                <div className="text-start mt-3">
                                    <p className="text-muted mb-2 font-18">
                                        <strong>User Name:</strong>
                                        <span className="ms-2">{userInfo?.username || 'N/A'}</span>
                                    </p>

                                    <p className="text-muted mb-2 font-18">
                                        <strong>Email:</strong>
                                        <span className="ms-2">{userInfo?.email || 'N/A'}</span>
                                    </p>
                                    <p className="text-muted mb-2 font-18">
                                        <strong>Gender:</strong>
                                        <span className="ms-2">
                                            {userInfo?.gender === true
                                                ? 'Male'
                                                : userInfo?.gender === false
                                                ? 'Female'
                                                : 'N/A'}
                                        </span>
                                    </p>
                                </div>
                            </div> {/* end card-body */}
                        </div> {/* end card */}
                    </div>

                    <div className="col-xl-8 col-lg-7">
                        <div className="card">
                            <div className="card-body">
                                {/* Tab navigation */}
                                <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                    <li className="nav-item">
                                        <a className="nav-link rounded-0" style={{ color: 'blue' }}>
                                            Setting
                                        </a>
                                    </li>
                                </ul>

                                {/* Change Password Section */}
                                <div>
                                    <h5 className="text-uppercase">
                                        <i className="mdi mdi-briefcase me-1"></i> Change Password
                                    </h5>

                                    {/* Old Password */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="oldpassword" className="form-label">Old Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="oldpassword" 
                                                placeholder="Enter old password" 
                                                value={oldPassword} 
                                                onChange={(e) => setOldPassword(e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="newpassword" className="form-label">New Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="newpassword" 
                                                placeholder="Enter new password" 
                                                value={newPassword} 
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="userpassword" className="form-label">Confirm New Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="userpassword" 
                                                placeholder="Enter password again" 
                                                value={confirmPassword} 
                                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary" 
                                                onClick={handleSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> {/* end card body */}
                        </div>  {/* end card */}
                    </div>
                </div>
                {/* End row */}
            </div>
            {/* End container */}

            {/* Footer */}
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            © <script>document.write(new Date().getFullYear())</script> Hyper - Coderthemes.com
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end footer-links d-none d-md-block">
                                <a href="#">About</a>
                                <a href="#">Support</a>
                                <a href="#">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Profile;
