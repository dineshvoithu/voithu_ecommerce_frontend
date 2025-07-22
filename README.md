# 🛍️ Voithu E-Commerce Frontend (React + Tailwind CSS)

This is the **frontend** of a full-stack e-commerce web application built using **React.js** and styled with **Tailwind CSS**. It connects to a Spring Boot backend and provides a clean UI for customers, sellers, and admins.

---

## 🌐 Live Demo

- 🔗 Frontend: [https://voithu-commerce.vercel.app](https://voithu-commerce.vercel.app)
  
---

## 💻 Technologies Used

- React.js  
- Tailwind CSS  
- Axios (API calls)  
- React Router DOM  
- JWT Token handling  
- Local Storage for session

---

## ✅ Key Features

- 🔐 JWT Login/Register for Customer & Seller  
- 👤 Role-based Dashboard (Customer, Seller, Admin)  
- 🛍️ Product Browsing by Category  
- 🛒 Add to Cart, Checkout, and Order History  
- 📦 Seller: Add/Edit/Delete Products  
- 🧑‍💼 Admin: Manage Users and Orders  
- 🎨 Fully Responsive UI with Tailwind CSS  
- 🔐 Protected routes based on roles

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Backend API URL

In your `.env` file:

```env
REACT_APP_BASE_URL=http://localhost:8080/api
```

Or directly update the Axios configuration file if not using `.env`.

### 4. Start the App

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔐 Authentication Flow

- JWT-based authentication and authorization  
- Token stored in `localStorage`  
- Protected routes for each role: Customer, Seller, Admin

---

## 🧪 Sample Routes

| Route                     | Description                      |
|---------------------------|----------------------------------|
| `/`                       | Home Page                        |
| `/login`                  | Login Page                       |
| `/register`               | Register Page                    |
| `/customer/dashboard`     | Customer: Cart & Orders          |
| `/seller/dashboard`       | Seller: Manage Products          |
| `/admin/dashboard`        | Admin: Manage Users and Orders   |

---

## 📁 Folder Structure

```
src/
├── components/        # Header, Footer, Navbars, etc.
├── pages/             # Main pages (Home, Login, Dashboard)
├── services/          # Axios API service calls
├── utils/             # Token management, helpers
├── constants/         # Roles, routes
└── App.js             # Main App routing
```

---

## 🔧 Integration

- Communicates with Spring Boot backend via REST API  
- Secured with JWT in Authorization headers  
- Handles route protection and redirection based on roles

---

## 📌 Project Info

- 🎓 MCA Final Year Project  
- 🛠 Tech Stack: React (Frontend), Spring Boot (Backend), MySQL  
- 👤 Developed by: Dinesh Voithu  
- 🔐 Authentication: JWT & Role-Based  
- 📅 Year: 2025

---

## 📫 Contact

**Dinesh Voithu**  
📧 Email: dineshvoithu@gmail.com  
🔗 LinkedIn: [linkedin.com/in/dineshvoithu](https://linkedin.com/in/dineshvoithu) 
🌐 GitHub: [github.com/dineshvoithu](https://github.com/dineshvoithu)
