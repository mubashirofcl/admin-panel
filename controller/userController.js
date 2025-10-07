const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const saltRound = 10;

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render('user/register', { message: 'All fields are required' });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).render('user/register', { message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).render('user/login', { message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).render('user/register', { message: 'Something went wrong' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).render("user/login", { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).render("user/login", { message: "Incorrect password" });

        if (user.status === "blocked") {
            return res.status(403).render("user/blocked", { message: "Your account has been blocked" });
        }

        req.session.user = { id: user._id, name: user.name, email: user.email };

        return res.status(302).redirect("/user/home");

    } catch (err) {
        console.error(err);
        return res.status(500).render("user/login", { message: "Something went wrong" });
    }
};

const logout = (req, res) => {
    delete req.session.user; 
    res.redirect('/user/login');
};


const loadRegister = (req, res) => {
    res.status(200).render('user/register');
};

const loadLogin = (req, res) => {
    if (req.session.user && req.session.user.id) return res.status(302).redirect("/user/home");
    res.status(200).render("user/login");
};

const loadHome = (req, res) => {
    if (!req.session.user || !req.session.user.id) return res.status(302).redirect("/user/login");
    res.status(200).render("user/userHome", { name: req.session.user.name });
};

module.exports = { registerUser, loadRegister, loadLogin, login, loadHome, logout };
