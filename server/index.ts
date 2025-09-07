import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import {
  hashPassword,
  comparePassword,
  generateToken,
  authenticateToken,
  optionalAuth,
  AuthRequest,
} from "./auth";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Error handler
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Authentication routes
app.post(
  "/api/auth/register",
  asyncHandler(async (req: any, res: any) => {
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      role,
      institution,
      department,
    } = req.body;

    // Validation
    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error:
          existingUser.email === email
            ? "Email already registered"
            : "Username already taken",
      });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || "STUDENT",
        institution,
        department,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        institution: true,
        department: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  })
);

app.post(
  "/api/auth/login",
  asyncHandler(async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email, isActive: true },
    });

    if (!user || !(user as any).password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await comparePassword(
      password,
      (user as any).password
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.role);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        institution: user.institution,
        department: user.department,
      },
      token,
    });
  })
);

app.get(
  "/api/auth/me",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: any) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        professorProfile: true,
        studentProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user as any;

    res.json(userWithoutPassword);
  })
);

app.post(
  "/api/auth/logout",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: any) => {
    // For JWT, we just send a success response
    // In a production app, you might want to maintain a blacklist of tokens
    res.json({ message: "Logged out successfully" });
  })
);

// Profile update route
app.put(
  "/api/auth/profile",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: any) => {
    const {
      firstName,
      lastName,
      bio,
      institution,
      department,
      website,
      linkedin,
      twitter,
      github,
      orcid,
      researchGate,
      profileImage,
    } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(bio !== undefined && { bio }),
          ...(institution !== undefined && { institution }),
          ...(department !== undefined && { department }),
          ...(website !== undefined && { website }),
          ...(linkedin !== undefined && { linkedin }),
          ...(twitter !== undefined && { twitter }),
          ...(github !== undefined && { github }),
          ...(orcid !== undefined && { orcid }),
          ...(researchGate !== undefined && { researchGate }),
          ...(profileImage !== undefined && { profileImage }),
        },
        include: {
          professorProfile: true,
          studentProfile: true,
        },
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser as any;

      res.json({
        message: "Profile updated successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  })
);

// User routes
app.get(
  "/api/users",
  asyncHandler(async (req: any, res: any) => {
    const users = await prisma.user.findMany({
      include: {
        professorProfile: true,
        studentProfile: true,
      },
    });
    res.json(users);
  })
);

app.get(
  "/api/users/professors",
  asyncHandler(async (req: any, res: any) => {
    const professors = await prisma.user.findMany({
      where: { role: "PROFESSOR" },
      include: {
        professorProfile: true,
      },
    });
    res.json(professors);
  })
);

app.get(
  "/api/users/students",
  asyncHandler(async (req: any, res: any) => {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        studentProfile: true,
      },
    });
    res.json(students);
  })
);

app.get(
  "/api/users/:id",
  asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        professorProfile: true,
        studentProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  })
);

// Research paper routes
app.get(
  "/api/research",
  asyncHandler(async (req: any, res: any) => {
    const papers = await prisma.researchPaper.findMany({
      include: {
        author: {
          include: {
            professorProfile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(papers);
  })
);

app.get(
  "/api/research/:id",
  asyncHandler(async (req: any, res: any) => {
    const { id } = req.params;
    const paper = await prisma.researchPaper.findUnique({
      where: { id },
      include: {
        author: {
          include: {
            professorProfile: true,
          },
        },
      },
    });

    if (!paper) {
      return res.status(404).json({ error: "Research paper not found" });
    }

    res.json(paper);
  })
);

// Event routes
app.get(
  "/api/events",
  asyncHandler(async (req: any, res: any) => {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });
    res.json(events);
  })
);

app.get(
  "/api/events/upcoming",
  asyncHandler(async (req: any, res: any) => {
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: { startDate: "asc" },
    });
    res.json(events);
  })
);

app.get(
  "/api/events/past",
  asyncHandler(async (req: any, res: any) => {
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          lt: new Date(),
        },
      },
      orderBy: { startDate: "desc" },
    });
    res.json(events);
  })
);

// Collaboration routes
app.get(
  "/api/collaborations",
  asyncHandler(async (req: any, res: any) => {
    const collaborations = await prisma.collaboration.findMany({
      include: {
        leader: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(collaborations);
  })
);

app.get(
  "/api/collaborations/active",
  asyncHandler(async (req: any, res: any) => {
    const collaborations = await prisma.collaboration.findMany({
      where: { status: "ACTIVE" },
      include: {
        leader: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(collaborations);
  })
);

// File routes
app.get(
  "/api/files",
  asyncHandler(async (req: any, res: any) => {
    const files = await prisma.fileUpload.findMany({
      include: {
        uploader: true,
        folder: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(files);
  })
);

app.get(
  "/api/files/public",
  asyncHandler(async (req: any, res: any) => {
    const files = await prisma.fileUpload.findMany({
      where: { privacy: "PUBLIC" },
      include: {
        uploader: true,
        folder: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(files);
  })
);

// Folder routes
app.get(
  "/api/folders",
  asyncHandler(async (req: any, res: any) => {
    const folders = await prisma.folder.findMany({
      include: {
        owner: true,
        files: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(folders);
  })
);

// Health check
app.get("/health", (req: any, res: any) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error("API Error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req: any, res: any) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 QuIRI API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🛑 Shutting down server...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("✅ Server shut down gracefully");
    process.exit(0);
  });
});

export default app;
