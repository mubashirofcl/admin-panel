# 🧑‍💻 Admin Dashboard (MVC Pattern - Node.js + Express + HBS + MongoDB)

A full-featured **Admin Dashboard** built using **Node.js, Express.js, MongoDB, and Handlebars (HBS)** following the **MVC (Model–View–Controller)** architecture.  
The dashboard allows the admin to manage users — including **Add, Edit, Delete, Block, and Unblock** functionalities — with secure session handling.

---

## 🏗️ MVC Pattern Overview

The project follows the **MVC architecture** for clean and maintainable code:


| Layer | Responsibility |
|--------|----------------|
| **Model** | Handles database schema and data logic using Mongoose |
| **View** | Frontend templates using Handlebars (HBS) and Bootstrap |
| **Controller** | Contains application logic (routes, requests, and responses) |

---

## 🚀 Features

### 🔐 Authentication & Security
- Admin login and logout system  
- Session-based authentication using `express-session`  
- Prevents browser back access after logout  
- Passwords encrypted using `bcrypt`

### 👥 User Management (CRUD + Status)
- ➕ **Add User**  
- 📝 **Edit User Details**  
- ❌ **Delete User**  
- 🚫 **Block / ✅ Unblock User**  
- 👁️ **View All Users** on dashboard

### 🧭 Dashboard
- Displays user list with their current status  
- Admin can manage users directly from dashboard UI  

### 🧰 Tech Used
- **Node.js** – Backend runtime  
- **Express.js** – Web framework  
- **MongoDB** – Database  
- **Mongoose** – ODM (for schema management)  
- **HBS (Handlebars)** – Templating engine for frontend  
- **Bootstrap** – For responsive design  
- **express-session** – Session handling  
- **bcrypt** – Password encryption  

---

