
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role_id; 
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào tài nguyên này.' });
        }

        next();
    };
};

module.exports = checkRole;
