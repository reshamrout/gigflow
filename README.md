# 🚀 GigFlow – Mini Freelance Marketplace

**GigFlow** is a mini freelance marketplace platform where **clients can post gigs** and **freelancers can bid on them**.  
It demonstrates real-world backend logic such as **secure authentication, transactional hiring, authorization, and real-time notifications**.

This project was built as a **full-stack assignment** using clean architecture and production-style patterns.  

LIVE AT : https://gigflow-lovat.vercel.app/  


## ✨ Features

### 🔐 Authentication
- JWT-based authentication with **HttpOnly cookies**
- Secure login & registration
- Roles are fluid: Any user can post a job (Client) or bid on a job (Freelancer).

### 💼 Gig Management
- Create gigs with title, description, and budget
- Browse all gigs
- Search gigs by title
- Gig status lifecycle:
  - `open` → accepting bids
  - `assigned` → freelancer hired (bidding closed)

### 📝 Bidding System
- Freelancers can place bids with price and proposal
- Only authenticated users can bid
- Users **cannot bid on their own gigs**

### 🧑‍💼 Hiring Logic (Core Feature)
- Gig owner can hire **only one freelancer**
- On hire:
  - Selected bid → `hired`
  - All other bids → `rejected`
  - Gig status → `assigned`
- Fully **transactional & race-condition safe**

### 🔔 Real-Time Notifications (Bonus)
- Powered by **Socket.io**
- Instant notification to freelancer:
  > 🎉 *You have been hired for "Project Name"*
- Works without page refresh

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Context API
- Axios
- Socket.io Client
- react-hot-toast

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.io
- MongoDB Transactions


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/gigflow.git
```

2️⃣ Backend Setup
```
cd backend
npm install
```


Create a .env file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:
```
npm start
```
3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```

📍 Frontend: http://localhost:5173  
📍 Backend: http://localhost:5000

## 🔗 API Architecture  
### 🔐 Auth Routes
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| POST   | `/api/auth/logout`   | Logout user       |

💼 Gig Routes
| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/api/gigs`     | Fetch all gigs (`open` & `assigned`) |
| GET    | `/api/gigs/:id` | Fetch single gig                     |
| POST   | `/api/gigs`     | Create a new gig                     |

📝 Bid Routes
| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| POST   | `/api/bids`             | Submit a bid                    |
| GET    | `/api/bids/:gigId`      | Get bids for a gig              |
| PATCH  | `/api/bids/:bidId/hire` | Hire freelancer (transactional) |

## 🔄 Hiring Flow (How It Works)
- Client clicks Hire on a bid
- Backend transaction starts
- Checks:
  - Gig is still open
  - User is gig owner
- Updates atomically:
  - Selected bid → hired
  - Other bids → rejected
  - Gig → assigned
- Transaction commits
- Socket event emitted to hired freelancer

## 🔐 Security & Authorization
- JWT stored in HttpOnly cookies
- Backend enforces:
  - Only gig owner can hire
  - Gig can be hired once
-  Frontend hides unauthorized actions
-  UI ≠ Security (backend is source of truth)

## 🧠 Design Decisions
- Gigs remain visible after assignment
- Bidding disabled once gig is assigned
- MongoDB transactions prevent race conditions
- Socket.io rooms enable scoped notifications

## 🚀 Possible Improvements
- Persist notifications
- Freelancer dashboard
- Client dashboard
- Notification bell with unread count
- Gig completion & reviews

## 🧑‍💻 Author
GigFlow
Built as a full-stack assignment showcasing real-world backend and frontend engineering concepts.

