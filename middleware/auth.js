const User = require("../model/userModel");

// Check if user is logged in
const checkSession = (req, res, next) => {
    if (req.session.user && req.session.user.id) {
        next();
    } else {
        res.redirect("/user/login");
    }
}

// Check if user is blocked
const checkUserStatus = async (req, res, next) => {
    try {
        if (!req.session.user || !req.session.user.id) {
            return res.redirect("/user/login");
        }

        const user = await User.findById(req.session.user.id);
        if (!user) return res.redirect("/user/login");

        if (user.status === "blocked") {
            delete req.session.user;
            return res.render("user/blocked", {
                message: "Your account has been blocked by admin."
            });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.redirect("/user/login");
    }
}

// Redirect to home if already logged in
const isLogin = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/user/home');
    }
    next();
}

module.exports = {
    checkSession,
    checkUserStatus,
    isLogin
};
