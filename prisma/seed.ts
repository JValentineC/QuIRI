import {
  PrismaClient,
  UserRole,
  StudentLevel,
  ResearchField,
  EventType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Hash passwords for demo accounts
  const professorPassword = await bcrypt.hash("professor123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  // Create sample professors
  const professor1 = await prisma.user.create({
    data: {
      email: "dr.chen@quiri.org",
      username: "drchen",
      firstName: "Dr. Sarah",
      lastName: "Chen",
      password: professorPassword,
      role: UserRole.PROFESSOR,
      institution: "MIT",
      department: "Physics",
      bio: "Leading researcher in quantum computing algorithms and error correction with over 15 years of experience in quantum information science. Director of the MIT Quantum Computing Lab.",
      website: "https://sarahchen.mit.edu",
      linkedin: "https://linkedin.com/in/drsarahchen",
      twitter: "https://twitter.com/drsarahchen",
      orcid: "0000-0002-1825-0097",
      profileImage: "/assets/scientist-2141259_1280.jpg",
      professorProfile: {
        create: {
          title: "Dr.",
          researchAreas: JSON.stringify([
            "Quantum Error Correction",
            "Quantum Algorithms",
            "NISQ Computing",
            "Quantum Machine Learning",
            "Topological Quantum Computing",
          ]),
          publications: 127,
          projects: 18,
        },
      },
    },
  });

  const professor2 = await prisma.user.create({
    data: {
      email: "prof.rodriguez@quiri.org",
      username: "profrodriguez",
      firstName: "Prof. Alex",
      lastName: "Rodriguez",
      password: professorPassword,
      role: UserRole.PROFESSOR,
      institution: "Stanford University",
      department: "Materials Science & Engineering",
      bio: "World-renowned expert in topological quantum computing and novel quantum materials. Principal Investigator of the Stanford Quantum Materials Lab with focus on Majorana fermions and superconducting qubits.",
      website: "https://alexrodriguez.stanford.edu",
      linkedin: "https://linkedin.com/in/profalexrodriguez",
      twitter: "https://twitter.com/profalex",
      orcid: "0000-0003-4567-8901",
      profileImage: "/assets/albert-einstein-1165151_1280.jpg",
      professorProfile: {
        create: {
          title: "Prof.",
          researchAreas: JSON.stringify([
            "Topological Quantum Computing",
            "Majorana Fermions",
            "Superconducting Qubits",
            "Quantum Materials",
            "Fault-Tolerant Quantum Computing",
          ]),
          publications: 203,
          projects: 12,
        },
      },
    },
  });

  const professor3 = await prisma.user.create({
    data: {
      email: "dr.patel@quiri.org",
      username: "drpatel",
      firstName: "Dr. Priya",
      lastName: "Patel",
      password: professorPassword,
      role: UserRole.PROFESSOR,
      institution: "Harvard University",
      department: "Applied Physics",
      bio: "Leading quantum cryptography and quantum communication researcher. Pioneer in quantum key distribution and quantum internet protocols.",
      website: "https://priyapatel.harvard.edu",
      linkedin: "https://linkedin.com/in/drpriyapatel",
      twitter: "https://twitter.com/drpriyapatel",
      orcid: "0000-0001-2345-6789",
      profileImage: "/assets/woman-3597095_1280.jpg",
      professorProfile: {
        create: {
          title: "Dr.",
          researchAreas: JSON.stringify([
            "Quantum Cryptography",
            "Quantum Communication",
            "Quantum Networks",
            "Quantum Internet",
            "Post-Quantum Cryptography",
          ]),
          publications: 94,
          projects: 15,
        },
      },
    },
  });

  // Create sample students
  const student1 = await prisma.user.create({
    data: {
      email: "emma.johnson@student.quiri.org",
      username: "emmaj",
      firstName: "Emma",
      lastName: "Johnson",
      password: studentPassword,
      role: UserRole.STUDENT,
      institution: "MIT",
      department: "Physics",
      bio: "PhD student researching quantum error correction algorithms under Dr. Sarah Chen. Passionate about making quantum computing more accessible and practical for real-world applications.",
      linkedin: "https://linkedin.com/in/emmajohnson",
      twitter: "https://twitter.com/emmaj_quantum",
      github: "https://github.com/emmajohnson",
      profileImage: "/assets/scientist-2141259_1280.jpg",
      studentProfile: {
        create: {
          level: StudentLevel.PHD,
          year: "3rd Year PhD",
          researchFocus: "Quantum Error Correction Algorithms for NISQ Devices",
          advisor: "Dr. Sarah Chen",
        },
      },
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: "michael.zhang@student.quiri.org",
      username: "mikezhang",
      firstName: "Michael",
      lastName: "Zhang",
      password: studentPassword,
      role: UserRole.STUDENT,
      institution: "Stanford University",
      department: "Materials Science & Engineering",
      bio: "Masters student working on topological superconductors for quantum computing. Interested in the intersection of materials science and quantum information.",
      linkedin: "https://linkedin.com/in/michaelzhang",
      twitter: "https://twitter.com/mikezhang_quantum",
      github: "https://github.com/michaelzhang",
      studentProfile: {
        create: {
          level: StudentLevel.MASTERS,
          year: "2nd Year MS",
          researchFocus:
            "Topological Superconductors for Fault-Tolerant Quantum Computing",
          advisor: "Prof. Alex Rodriguez",
        },
      },
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: "lisa.kim@student.quiri.org",
      username: "lisakim",
      firstName: "Lisa",
      lastName: "Kim",
      password: studentPassword,
      role: UserRole.STUDENT,
      institution: "Harvard University",
      department: "Applied Physics",
      bio: "Undergraduate researcher exploring quantum cryptography applications. Winner of the 2024 National Science Foundation Undergraduate Research Award.",
      linkedin: "https://linkedin.com/in/lisakim",
      github: "https://github.com/lisakim",
      studentProfile: {
        create: {
          level: StudentLevel.UNDERGRADUATE,
          year: "Senior",
          researchFocus:
            "Quantum Key Distribution and Quantum Internet Protocols",
          advisor: "Dr. Priya Patel",
        },
      },
    },
  });

  // Create sample research papers
  await prisma.researchPaper.create({
    data: {
      title:
        "Fault-Tolerant Quantum Error Correction in NISQ Devices: A Comprehensive Framework",
      abstract:
        "This paper presents a novel comprehensive framework for implementing fault-tolerant quantum error correction in near-term intermediate-scale quantum (NISQ) devices. We demonstrate significant improvements in error rates and quantum state fidelity through innovative surface code implementations and adaptive error correction protocols.",
      authors: JSON.stringify([
        "Dr. Sarah Chen",
        "Emma Johnson",
        "Prof. Maria Gonzalez",
      ]),
      field: ResearchField.QUANTUM_COMPUTING,
      authorId: professor1.id,
      publishedAt: new Date("2024-12-01"),
      doi: "10.1038/s41586-024-07107-9",
      downloads: 1247,
    },
  });

  await prisma.researchPaper.create({
    data: {
      title:
        "Topological Quantum Computing with Majorana Fermions: From Theory to Implementation",
      abstract:
        "A comprehensive study of Majorana fermions for fault-tolerant quantum computing applications. We present breakthrough results in creating and manipulating Majorana states in superconducting nanowires, demonstrating their potential for topologically protected quantum computation.",
      authors: JSON.stringify([
        "Prof. Alex Rodriguez",
        "Michael Zhang",
        "Dr. Yuki Tanaka",
      ]),
      field: ResearchField.QUANTUM_MATERIALS,
      authorId: professor2.id,
      publishedAt: new Date("2024-11-15"),
      doi: "10.1038/s41567-024-02543-8",
      downloads: 892,
    },
  });

  await prisma.researchPaper.create({
    data: {
      title:
        "Quantum Key Distribution Networks: Scalable Protocols for the Quantum Internet",
      abstract:
        "We present scalable quantum key distribution protocols designed for large-scale quantum internet infrastructure. Our work addresses key challenges in quantum communication including network topology optimization, key relay protocols, and security analysis against advanced attacks.",
      authors: JSON.stringify([
        "Dr. Priya Patel",
        "Lisa Kim",
        "Prof. Zhang Wei",
      ]),
      field: ResearchField.QUANTUM_CRYPTOGRAPHY,
      authorId: professor3.id,
      publishedAt: new Date("2024-10-20"),
      doi: "10.1126/science.abf4404",
      downloads: 634,
    },
  });

  await prisma.researchPaper.create({
    data: {
      title: "Machine Learning Enhanced Quantum Algorithm Optimization",
      abstract:
        "This study explores the intersection of quantum computing and machine learning, presenting novel algorithms that use classical ML techniques to optimize quantum circuits for NISQ devices. We achieve up to 40% reduction in circuit depth while maintaining computational accuracy.",
      authors: JSON.stringify([
        "Emma Johnson",
        "Dr. Sarah Chen",
        "Prof. Robert Kim",
      ]),
      field: ResearchField.QUANTUM_COMPUTING,
      authorId: student1.id,
      publishedAt: new Date("2024-09-12"),
      doi: "10.1103/PhysRevLett.132.180401",
      downloads: 523,
    },
  });

  // Create sample events
  await prisma.event.create({
    data: {
      title: "QuIRI Annual Quantum Computing Symposium 2025",
      description:
        "Join leading researchers, industry experts, and students from around the world for three days of cutting-edge presentations, workshops, and networking opportunities in quantum computing. Features keynotes from Nobel laureates and breakthrough research presentations.",
      type: EventType.CONFERENCE,
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-03-17"),
      location: "MIT, Cambridge, MA",
      isVirtual: false,
      maxAttendees: 750,
      registrationOpen: true,
    },
  });

  await prisma.event.create({
    data: {
      title: "Quantum Cryptography Workshop: Building Secure Quantum Networks",
      description:
        "Hands-on workshop covering practical aspects of quantum key distribution, post-quantum cryptography, and quantum internet protocols. Participants will work with real quantum hardware and simulation tools.",
      type: EventType.WORKSHOP,
      startDate: new Date("2025-02-28"),
      endDate: new Date("2025-03-01"),
      location: "Harvard University, Cambridge, MA",
      isVirtual: false,
      maxAttendees: 50,
      registrationOpen: true,
    },
  });

  await prisma.event.create({
    data: {
      title: "Student Research Showcase: Next Generation Quantum Scientists",
      description:
        "Graduate and undergraduate students present their latest quantum research projects. Categories include quantum algorithms, quantum materials, quantum cryptography, and quantum sensing. Awards for best presentations in each category.",
      type: EventType.SEMINAR,
      startDate: new Date("2025-04-10"),
      endDate: new Date("2025-04-10"),
      location: "Virtual Event",
      isVirtual: true,
      maxAttendees: 300,
      registrationOpen: true,
    },
  });

  await prisma.event.create({
    data: {
      title: "Industry-Academia Quantum Partnership Summit",
      description:
        "Bringing together quantum industry leaders and academic researchers to discuss collaboration opportunities, technology transfer, and the future of quantum commercialization.",
      type: EventType.CONFERENCE,
      startDate: new Date("2025-05-22"),
      endDate: new Date("2025-05-23"),
      location: "Stanford University, Palo Alto, CA",
      isVirtual: false,
      maxAttendees: 200,
      registrationOpen: true,
    },
  });

  // Create sample collaborations
  const collaboration1 = await prisma.collaboration.create({
    data: {
      title: "Quantum Error Correction Consortium",
      description:
        "Multi-institutional research consortium focused on developing practical quantum error correction protocols for near-term quantum devices. This collaboration brings together leading researchers from MIT, Stanford, Harvard, and industry partners to advance fault-tolerant quantum computing.",
      leaderId: professor1.id,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2026-12-31"),
    },
  });

  const collaboration2 = await prisma.collaboration.create({
    data: {
      title: "Quantum Internet Infrastructure Development",
      description:
        "International collaboration to design and implement scalable quantum internet infrastructure. Focus areas include quantum repeaters, quantum memory systems, and quantum network protocols.",
      leaderId: professor3.id,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2027-05-31"),
    },
  });

  const collaboration3 = await prisma.collaboration.create({
    data: {
      title: "Topological Quantum Materials Research Initiative",
      description:
        "Collaborative research program exploring novel topological materials for quantum computing applications. Combining theoretical predictions with experimental validation to discover new quantum materials.",
      leaderId: professor2.id,
      startDate: new Date("2024-03-01"),
      endDate: new Date("2026-02-28"),
    },
  });

  // Add collaboration participants
  await prisma.collaborationParticipant.create({
    data: {
      userId: professor2.id,
      collaborationId: collaboration1.id,
      role: "Co-Principal Investigator",
    },
  });

  await prisma.collaborationParticipant.create({
    data: {
      userId: professor3.id,
      collaborationId: collaboration1.id,
      role: "Senior Researcher",
    },
  });

  await prisma.collaborationParticipant.create({
    data: {
      userId: student1.id,
      collaborationId: collaboration1.id,
      role: "Graduate Research Assistant",
    },
  });

  await prisma.collaborationParticipant.create({
    data: {
      userId: student2.id,
      collaborationId: collaboration2.id,
      role: "Research Intern",
    },
  });

  await prisma.collaborationParticipant.create({
    data: {
      userId: student3.id,
      collaborationId: collaboration2.id,
      role: "Undergraduate Research Assistant",
    },
  });

  await prisma.collaborationParticipant.create({
    data: {
      userId: professor1.id,
      collaborationId: collaboration3.id,
      role: "Collaborating Researcher",
    },
  });

  // Create sample folders
  const folder1 = await prisma.folder.create({
    data: {
      name: "Quantum Error Correction Research Archive",
      description:
        "Comprehensive collection of research materials, papers, and datasets on quantum error correction protocols and implementations",
      ownerId: professor1.id,
    },
  });

  const folder2 = await prisma.folder.create({
    data: {
      name: "Student Research Projects 2024-2025",
      description:
        "Collection of current and ongoing student research projects across all quantum research areas",
      ownerId: student1.id,
    },
  });

  const folder3 = await prisma.folder.create({
    data: {
      name: "Quantum Cryptography Resources",
      description:
        "Research papers, protocols, and implementation guides for quantum cryptography and secure communication",
      ownerId: professor3.id,
    },
  });

  const folder4 = await prisma.folder.create({
    data: {
      name: "Topological Quantum Materials Database",
      description:
        "Experimental data, theoretical models, and material specifications for topological quantum computing research",
      ownerId: professor2.id,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`Created ${await prisma.user.count()} users`);
  console.log(`Created ${await prisma.researchPaper.count()} research papers`);
  console.log(`Created ${await prisma.event.count()} events`);
  console.log(`Created ${await prisma.collaboration.count()} collaborations`);
  console.log(
    `Created ${await prisma.collaborationParticipant.count()} collaboration participants`
  );
  console.log(`Created ${await prisma.folder.count()} folders`);
  console.log("");
  console.log("🔑 Demo Login Credentials:");
  console.log("📚 Professor Account:");
  console.log("   Email: dr.chen@quiri.org");
  console.log("   Password: professor123");
  console.log("");
  console.log("🎓 Student Account:");
  console.log("   Email: emma.johnson@student.quiri.org");
  console.log("   Password: student123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
