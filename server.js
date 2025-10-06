const express = require("express");
const path = require("path");
const session = require('express-session');
const nocache = require('nocache');
const hbs = require("hbs");
const connectDB = require("./db/connectDB");

const app = express();
const PORT = 3000;

// Database connection
connectDB();

// Middlewares
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// HBS helpers
hbs.registerHelper("eq", (a, b) => a === b);

// Routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
    res.redirect('/user/login');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

// Start server
app.listen(PORT, () => {
    console.log("-----------------Server Running----------------");
    console.log(`Server Running on port : http://localhost:${PORT}`);
});
