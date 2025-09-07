# QuIRI (Quantum Innovation and Research Institute) Database Setup Guide

## Database Schema Created ✅

Your Prisma schema has been successfully created with the following tables:

### Core Tables:

- **users** - Main user accounts (students, professors, admins)
- **professors** - Extended professor profiles
- **students** - Extended student profiles
- **research_papers** - Research publications and papers
- **folders** - File organization system
- **file_uploads** - File management with privacy controls
- **events** - Event management system
- **event_registrations** - Event attendance tracking
- **collaborations** - Research collaboration projects
- **collaboration_participants** - Collaboration membership
- **messages** - Internal messaging system

### Key Features:

✅ **User Role Management** - Students, Professors, Admins
✅ **Privacy Controls** - Public, Private, Institution-only, Collaborators-only
✅ **File Management** - Upload, organize, and share files securely
✅ **Research Tracking** - Papers, projects, and collaboration
✅ **Event System** - Conferences, workshops, seminars
✅ **Messaging** - Internal communication platform

## Current Connection Issue 🔧

The MySQL server "HiddenLeaf" is currently rejecting connections from your IP address.

### To Fix This:

1. **Connect to your MySQL server** (via command line or phpMyAdmin)
2. **Update MySQL user permissions**:

   ```sql
   -- Allow connections from your current IP
   CREATE USER 'root'@'%' IDENTIFIED BY 'takingOff0808!';
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
   FLUSH PRIVILEGES;

   -- Or create the database manually
   CREATE DATABASE IF NOT EXISTS quiri_networking;
   ```

3. **Check MySQL configuration** in `my.cnf` or `my.ini`:
   ```ini
   [mysqld]
   bind-address = 0.0.0.0
   ```

## Next Steps Once Connected:

### 1. Run Database Migration

```bash
npx prisma migrate dev --name init
```

### 2. Launch Prisma Studio

```bash
npx prisma studio
```

### 3. Seed Initial Data (Optional)

```bash
npm run seed  # We can create this script
```

## Prisma Studio Features 🎯

Once connected, Prisma Studio will provide:

- **Visual Database Editor** - See all tables and relationships
- **Data Management** - Add, edit, delete records easily
- **Real-time Updates** - Changes reflect immediately
- **Relationship Visualization** - See how data connects
- **Query Interface** - Test database queries

## Database Schema Overview:

```
Users
├── Professors (1:1)
├── Students (1:1)
├── Research Papers (1:Many)
├── File Uploads (1:Many)
├── Folders (1:Many)
├── Event Registrations (1:Many)
├── Messages (1:Many)
└── Collaboration Participation (1:Many)

Events
└── Event Registrations (1:Many)

Collaborations
├── Leader (User) (1:1)
└── Participants (Many:Many via junction table)

Folders
├── Owner (User) (1:1)
├── Parent Folder (1:1, Self-referencing)
├── Child Folders (1:Many, Self-referencing)
└── Files (1:Many)
```

Your QuIRI (Quantum Innovation and Research Institute) platform is ready for data! 🚀
