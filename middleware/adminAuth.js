// Check if admin is logged in
const checkSession = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// Redirect to dashboard if already logged in
const isLogin = (req, res, next) => {
    if (req.session.admin) {
        res.redirect('/admin/dashboard');
    } else {
        next();
    }
}

// Prevent back button after logout
const preventBackHistory = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
};

module.exports = {
    checkSession,
    isLogin,
    preventBackHistory,
}
