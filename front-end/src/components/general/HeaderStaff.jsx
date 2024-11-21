import { useEffect, useState } from 'react';
const HeaderStaff = () => {
    const [username, setUsername] = useState('');
    const baseUrl = import.meta.env.VITE_PUBLIC_URL;

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            try {
                // Decode the token to extract the payload
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));

                // Extract username from the decoded payload (make sure the field exists)
                if (decodedPayload && decodedPayload.username) {
                    setUsername(decodedPayload.username);  // Set the username
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    return (
        <div>
            {/* Topbar Start */}
            <div className="navbar-custom">
                <ul className="list-unstyled topbar-menu float-end mb-0">
                    {/* User Profile Dropdown */}
                    <li className="dropdown notification-list">
                        <a
                            className="nav-link dropdown-toggle nav-user arrow-none me-0"
                            data-bs-toggle="dropdown"
                            href="#"
                            role="button"
                            aria-haspopup="false"
                            aria-expanded="false"
                        >
                            <span className="account-user-avatar">
                                <img
                                    src={`${baseUrl}/assets/images/users/avatar-1.jpg`}
                                    alt="user-image"
                                    className="rounded-circle"
                                />
                            </span>
                            <span>
                                <span className="account-user-name">{username || 'User'}</span>
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                            <div className="dropdown-header noti-title">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </div>
                            <a href="/profile/account" className="dropdown-item notify-item">
                                <i className="mdi mdi-account-circle me-1"></i>
                                <span>My Account</span>
                            </a>
                            <a href="/login" className="dropdown-item notify-item">
                                <i className="mdi mdi-logout me-1"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </li>
                </ul>
                <button className="button-menu-mobile open-left">
                    <i className="mdi mdi-menu"></i>
                </button>
            </div>
            {/* Topbar End */}
        </div>
    );
};

export default HeaderStaff
