# Ritik Suthar - Full Stack Developer Portfolio 🚀

A modern, high-performance, dynamic personal portfolio built with the **MERN Stack** (React.js, Node.js, Express.js, MongoDB), tailored to match your minimalist black-and-white aesthetic with smooth micro-interactions, responsive design, and an exclusive, password-protected **Admin Management Panel**.

![Portfolio Overview](client/public/ritik.jpg)

---

## ✨ Features

- **Exact UI Alignment**: Built according to your design mockup:
  - **Header**: Sleek "RS" brand logo, smooth navigation (`Home`, `About`, `Skills`, `Projects`, `Contact`), and `"Get In Touch ↗"` pill button.
  - **Hero Section**: Distinctive typography, custom South Asian developer portrait in black hoodie, artistic orbital sketch doodles, and the handwritten quote:
    ```
    Build
    Learn
    Improve
    Repeat
    ```
  - **Key Metrics Ribbon**:
    - `</>` **10+** Projects Built
    - 🎓 **BCA** Currently Pursuing
    - ⚡ **MERN** Tech Stack
    - 🎯 **Always** Learning New Things
  - **Featured Projects**: Interactive cards with project description, tech tags, and arrow buttons directly opening your **live deployed link**.
  - **Tech Stack Badges**: Polished badges for React, Node.js, MongoDB, JavaScript, Tailwind CSS, C++, HTML, CSS, Git & GitHub, Express, and DSA.
  - **About Section**: Detailed story, problem-solving mindset, clean code philosophy, and education background.
  - **Contact Form**: Functional message submission that saves inquiries directly into your private Admin Inbox.

---

## 🔒 Private Admin Section (Exclusive Access)

Only **you (Ritik)** have access to add, update, and delete projects and skills:

- **Admin Login**: Click the **Lock icon** in the navbar or footer.
  - **Default Username:** `ritik`
  - **Default Password:** `admin123`
- **Dynamic Projects Management**:
  - Add new projects with a **Title**, **Description**, **Deployed Live URL**, **GitHub URL**, **Tech Tags**, and **Category**.
  - Toggle whether a project appears on the main page **Featured Ribbon**.
  - Edit or Delete existing projects with one click.
- **Dynamic Skills Management**:
  - Add and delete skills, customize proficiency percentages, categories, and icon identifiers.
- **Private Inbox**:
  - View all contact inquiries submitted through your portfolio form.
- **Password Security**:
  - Change your admin password anytime directly from the admin dashboard.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Lucide Icons, Vanilla Modern CSS with CSS custom properties and micro-animations.
- **Backend**: Node.js, Express.js, JWT (JSON Web Tokens) Authentication, Bcrypt password hashing, CORS.
- **Database**: MongoDB with Mongoose schemas (`Project`, `Skill`, `Message`, `Admin`) with an intelligent, persistent local storage fallback so the application works 100% out of the box even before local MongoDB is started!

---

## 🚀 Getting Started

### 1. Start the Backend API (Port 5000)
```powershell
cd server
npm run dev
```

### 2. Start the Frontend Application (Port 5173)
```powershell
cd client
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## ⚙️ MongoDB Configuration

In `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ritik_portfolio
JWT_SECRET=ritik_suthar_portfolio_secret_jwt_key_2026_super_secure
ADMIN_USERNAME=ritik
ADMIN_PASSWORD=admin123
```
*You can replace `MONGODB_URI` with your MongoDB Atlas connection string at any time!*
