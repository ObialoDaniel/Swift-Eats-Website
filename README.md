# SwiftEats - Food Delivery Website

A modern, responsive food delivery platform designed to streamline online ordering and enhance customer experience for SwiftEats.

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Brand-colors](#brand-colors)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About The Project

SwiftEats is transitioning from manual order processing via Instagram and WhatsApp to a centralized web platform. This project serves dual purposes:

**Business Purpose:** Transition SwiftEats from manual, chat-based order processing to a centralized, automated online system that improves efficiency, accuracy, and customer experience.

**Learning Purpose:** Provide the project team hands-on experience in modern full-stack web development, UI/UX design, Agile project management, and cross-functional collaboration.

## ✨ Features

### Customer Features
- 🏠 Browse meals across 7 food categories
- 🛒 Easy cart management and checkout
- 💳 Secure payments via Stripe
- 📦 Real-time order tracking
- 🎯 Personalized meal recommendations
- 🏆 Gamified ordering streaks and loyalty rewards
- 👥 Group ordering with split payments
- 🎉 Seasonal and Sabbath combo specials

### Admin Features
- 📊 Comprehensive dashboard with analytics
- 🍽️ Menu and category management
- 📋 Order processing and tracking
- 👤 User management
- 📈 Sales and performance metrics

## 🛠️ Tech Stack

**Frontend:**
- React.js
- HTML
- Javascript 
- CSS3 (Responsive Design)
- Deployed on Netlify

**Backend:**
- Java
- PostgreSQL (Database)
- Deployed on Render

**Payment Integration:**
- Paystack

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Java JDK 11 or higher
- MySQL
- Maven

### Installation

1. Clone the repository
```bash
git clone https://github.com/ObialoDaniel/Swift-Eats-Website.git
cd swifteats
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Set up backend dependencies
```bash
cd ../server
mvn clean install
```

4. Set up environment variables

Create a `.env` file in the server directory:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=swifteats
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
PORT=8080
```

5. Run database migrations
```bash
# Run SQL scripts in /server/database/migrations
mysql -u your_username -p swifteats < migrations.sql
```

6. Start the development servers
```bash
# Start backend (from server directory)
mvn spring-boot:run

# Start frontend (from client directory)
npm start
```

## 📁 Project Structure

```
swifteats/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React Context
│   │   ├── assets/        # Static assets
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                # Backend Java application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── controllers/    # REST controllers
│   │   │   │   ├── models/         # Entity models
│   │   │   │   ├── repositories/   # Data repositories
│   │   │   │   ├── services/       # Business logic
│   │   │   │   └── security/       # Authentication
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── database/
│       └── migrations/
├── docs/                  # Documentation
└── README.md
```

## 🎨 Brand Colors

- **Primary:** #FF8C00 (Orange)
- **Secondary:** #2D2D2D (Dark Gray)
- **Accent:** #FFFFFF (White)

## 🤝 Contributing

This is an Agile learning-oriented project. Team contributions follow our sprint workflow:

1. Pick a task from ClickUp backlog
2. Create your feature branch (`git checkout -b feature/TaskName`)
3. Commit your changes with clear messages
4. Push to the branch (`git push origin feature/TaskName`)
5. Create a Pull Request for code review
6. Wait for approval from team leads

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Testing additions

## 📄 License

This project is created for educational and business purposes.

**Note:** This project combines business objectives with skill development, providing practical programming experience while delivering a professional solution for SwiftEats.

**Last Updated:** October 26, 2025
