# QuIRI - Quantum Innovation and Research Institute

A comprehensive networking platform for quantum researchers, students, and professionals to collaborate, share research, and connect within the quantum computing community.

## 🚀 Features

- **User Management**: Support for students, professors, and administrators
- **Research Papers**: Upload, share, and discover quantum research publications
- **Event Management**: Create and register for quantum computing conferences, workshops, and seminars
- **Collaboration Tools**: Form research collaborations and manage project teams
- **File Management**: Secure file sharing with privacy controls
- **Messaging System**: Direct communication between researchers
- **Advanced Search**: Find research papers, events, and collaborators by field of study

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT-based authentication with bcrypt
- **Styling**: Tailwind CSS + DaisyUI
- **Testing**: Vitest + Testing Library

## 📦 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JValentineC/QuIRI.git
   cd QuIRI
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DATABASE_URL="mysql://username:password@localhost:3306/quiri_networking"
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=quiri_networking
   DB_USER=your_username
   DB_PASSWORD=your_password

   # Application Configuration
   NODE_ENV=development
   PORT=3001
   VITE_API_URL=http://localhost:3001

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here

   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   UPLOAD_DIR=./uploads

   # Frontend URL
   FRONTEND_URL=http://localhost:5173

   # API Base URL
   API_BASE_URL=http://localhost:3001/api
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init

   # Seed the database with sample data
   npm run db:seed
   ```

## 🚀 Running the Application

1. **Start the development servers**

   ```bash
   # Start both frontend and backend
   npm run start:all

   # Or start individually:
   # Backend only
   npm run server:dev

   # Frontend only (in another terminal)
   npm run dev
   ```

2. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Database Studio: `npx prisma studio`

## 🔑 Demo Accounts

After running the seed script, you can use these demo accounts:

**Professor Account:**

- Email: `dr.chen@quiri.org`
- Password: `professor123`

**Student Account:**

- Email: `emma.johnson@student.quiri.org`
- Password: `student123`

## 📚 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run server:dev` - Start backend development server
- `npm run server:start` - Start backend production server
- `npm run start:all` - Start both frontend and backend concurrently
- `npm run db:seed` - Populate database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## 🗄️ Database Schema

The application uses a comprehensive database schema supporting:

- **Users** (Students, Professors, Admins)
- **Research Papers** with multiple quantum computing fields
- **Events** (Conferences, Workshops, Seminars)
- **Collaborations** with participant management
- **File Management** with privacy controls
- **Messaging** system for direct communication

## 🔬 Research Fields Supported

- Quantum Computing
- Quantum Communications
- Quantum Materials
- Quantum Sensing
- Quantum Simulation
- Quantum Information Theory
- Quantum Optics
- Quantum Cryptography

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Advanced search and filtering
- [ ] Real-time collaboration tools
- [ ] Integration with quantum computing platforms
- [ ] Mobile app development
- [ ] AI-powered research recommendations
- [ ] Advanced analytics and insights
