const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles; // Assuming roles are included in the JWT
        const hasRole = userRoles.some(role => allowedRoles.includes(role));
        if (!hasRole) return res.sendStatus(403);
        next();
    };
};
