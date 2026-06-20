# QuickChat Full-Stack 💬

A modern, real-time full-stack chat application built with the MERN stack (MongoDB, Express, React, Node.js), featuring AI integrations and rich media sharing.

## 🚀 Features

- **Real-time Messaging:** Lightning-fast chat powered by Socket.io.
- **AI Chat Integration:** Integrated with Groq AI (Llama 3.1) and Google GenAI for smart, automated responses and assistance.
- **Media Uploads:** Send images securely with seamless Cloudinary integration.
- **Authentication:** Secure user authentication using JSON Web Tokens (JWT) and Bcrypt.
- **Responsive UI:** A beautiful, responsive interface built with React and Tailwind CSS v4.
- **Notifications:** In-app toast notifications using `react-hot-toast`.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Real-time:** Socket.io-client
- **State/HTTP:** Axios

### Backend (Server)
- **Framework:** Node.js & Express.js 5
- **Database:** MongoDB & Mongoose
- **Real-time:** Socket.io
- **Media Storage:** Cloudinary & Multer
- **AI Integration:** Groq API / Google GenAI
- **Security:** JWT, bcryptjs, CORS

## 🏃‍♂️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/QuickChat-Full-Stack.git
   cd QuickChat-Full-Stack
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

You need to set up environment variables for both the client and the server.

1. **Client Environment Variables:**
   Rename `client/.env.example` to `client/.env` and ensure the backend URL is correct:
   ```env
   VITE_BACKEND_URL='http://localhost:5000'
   ```

2. **Server Environment Variables:**
   Rename `server/.env.example` to `server/.env` and fill in your actual credentials:
   ```env
   PORT=5000
   JWT_SECRET="your_jwt_secret"
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.../dbname"
   CLOUDINARY_CLOUD_NAME='your_cloud_name'
   CLOUDINARY_API_KEY='your_api_key'
   CLOUDINARY_API_SECRET='your_api_secret'
   GROQ_API_KEY="your_groq_api_key"
   ```

### Running the App Locally

Open two separate terminal windows.

**Terminal 1 (Backend):**
```bash
cd server
npm run server
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Your app should now be running! Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## ☁️ Deployment
This app is ready to be deployed.
- **Frontend:** Can be deployed easily on [Vercel](https://vercel.com/) (a `vercel.json` is included).
- **Backend:** Can be deployed on Render, Heroku, or Vercel. 
*(Note: If deploying the server to Vercel, don't forget to configure the environment variables in your Vercel Dashboard!)*
