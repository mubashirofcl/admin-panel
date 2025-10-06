const adminModel = require('../model/adminModel');
const bcrypt = require('bcrypt');
const saltRound = 10;
const userModel = require('../model/userModel');


const loadLogin = async (req, res) => {
    res.status(200).render("admin/login");
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return res.status(401).render('admin/login', { message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(401).render('admin/login', { message: 'Invalid credentials' })
        }

        req.session.admin = true
        res.status(302).redirect('/admin/dashboard')

    } catch (error) {
        res.status(500).send(error);
    }
}

const logout = (req, res) => {
    req.session.admin = null;
    res.status(302).redirect('/admin/login');
}

const loadDashboard = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) {
            return res.status(302).redirect('/admin/login')
        }

        const user = await userModel.find({})

        res.status(200).render('admin/dashboard', { user })

    } catch (error) {
        res.status(500).send(error);
    }
}

const editUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.findByIdAndUpdate(id, {
            name,
            email,
            password: hashedPassword,
        });

        res.status(302).redirect("/admin/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
}

const toggleStatus = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).redirect("/admin/dashboard");
        }

        user.status = user.status === "active" ? "blocked" : "active";
        await user.save();

        return res.status(302).redirect("/admin/dashboard");
    } catch (err) {
        console.error(err);
        return res.status(500).redirect("/admin/dashboard");
    }
};

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findOneAndDelete({ _id: id })

        res.status(302).redirect('/admin/dashboard')

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

const listUsers = async (req, res) => {
    const searchTerm = req.query.q || "";
    try {
        const users = await userModel.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } }
            ]
        }).sort({ updatedAt: -1 });

        res.status(200).render('admin/dashboard', { user: users, q: searchTerm });
    } catch (err) {
        console.error(err);
        res.status(500).render('admin/dashboard', { user: [], q: searchTerm });
    }
};

module.exports = { loadLogin, login, loadDashboard, logout, editUser, toggleStatus, addUser, deleteUser, listUsers }
