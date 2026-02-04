import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Send, Loader } from "lucide-react";
import { SwipeCardStack } from "./SwipeCard";
import "./SwipeCard.css";
import "./CompanyDeepDive.css";

// Note: In a production environment, you should NEVER include API keys directly in your frontend code
// This is only for demonstration purposes - use environment variables in real applications
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

// Helper function for Groq API calls
const callGroqAPI = async (prompt, model = "llama3-70b-8192") => {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const JobPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("job");
  const [searchResults] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello! I can help analyze your resume. Upload your resume file or paste its content to get started.",
      isBot: true,
      formatted: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [pastedContent, setPastedContent] = useState("");
  const [, setSelectedJob] = useState(null);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [showReferralProfile, setShowReferralProfile] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showMentorDetails, setShowMentorDetails] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  // State for jobs selected/rejected
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [referralStatuses, setReferralStatuses] = useState({});
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showAppStatusPopup, setShowAppStatusPopup] = useState(false);
  const [trackerJob, setTrackerJob] = useState(null);
  const [showTrackerPopup, setShowTrackerPopup] = useState(false);

  // Toast notification helper
  const showToast = (type, message) => {
    setToastMessage({ type, message });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Original data arrays
  const jobs = [
    {
      id: 1,
      company: "MCDONALDS",
      title: "System Design",
      salary: "$2,530 Per Month",
      applications: "868 Applications",
      timeLeft: "about 2 months left",
      onlineStatus: "Offline",
      requirements: ["Coding Skill", "Communication", "Data structure"],
      imgSrc: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    },
  ];

  const easyApplyJobs = [
    { id: 1, company: "GOOGLE", title: "Senior Software Engineer", salary: "$18,500 Per Month", applications: "2341 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["Python", "Machine Learning", "TensorFlow"], jobType: "Full-time, Remote", experience: "5+ years" },
    { id: 2, company: "META", title: "Frontend Developer", salary: "$12,530 Per Month", applications: "1268 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["React", "JavaScript", "UI/UX"], jobType: "Full-time, Remote", experience: "3-5 years" },
    { id: 3, company: "AMAZON", title: "Software Engineer", salary: "$14,250 Per Month", applications: "1495 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Java", "AWS", "Algorithms"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 4, company: "APPLE", title: "iOS Developer", salary: "$16,000 Per Month", applications: "987 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Swift", "SwiftUI", "Xcode"], jobType: "Full-time, On-site", experience: "4+ years" },
    { id: 5, company: "MICROSOFT", title: "Cloud Architect", salary: "$19,000 Per Month", applications: "756 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["Azure", "Kubernetes", "Terraform"], jobType: "Full-time, Remote", experience: "6+ years" },
    { id: 6, company: "NETFLIX", title: "Backend Engineer", salary: "$17,500 Per Month", applications: "1123 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Java", "Microservices", "Spring Boot"], jobType: "Full-time, Remote", experience: "5+ years" },
    { id: 7, company: "SPOTIFY", title: "Data Engineer", salary: "$14,000 Per Month", applications: "892 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Python", "Spark", "SQL"], jobType: "Full-time, Hybrid", experience: "3-5 years" },
    { id: 8, company: "UBER", title: "Mobile Developer", salary: "$13,500 Per Month", applications: "1056 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["React Native", "TypeScript", "Redux"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 9, company: "AIRBNB", title: "Full Stack Developer", salary: "$15,000 Per Month", applications: "1234 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["React", "Node.js", "PostgreSQL"], jobType: "Full-time, Remote", experience: "4+ years" },
    { id: 10, company: "TESLA", title: "Embedded Systems Engineer", salary: "$16,500 Per Month", applications: "678 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["C++", "RTOS", "Linux"], jobType: "Full-time, On-site", experience: "5+ years" },
    { id: 11, company: "NVIDIA", title: "GPU Software Engineer", salary: "$20,000 Per Month", applications: "543 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["CUDA", "C++", "Deep Learning"], jobType: "Full-time, Hybrid", experience: "5+ years" },
    { id: 12, company: "TWITTER", title: "Platform Engineer", salary: "$14,500 Per Month", applications: "876 Applications", timeLeft: "3 weeks left", onlineStatus: "Offline", requirements: ["Scala", "Kafka", "Distributed Systems"], jobType: "Full-time, Remote", experience: "4+ years" },
    { id: 13, company: "LINKEDIN", title: "ML Engineer", salary: "$17,000 Per Month", applications: "1098 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Python", "PyTorch", "NLP"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 14, company: "STRIPE", title: "Backend Developer", salary: "$16,000 Per Month", applications: "765 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["Ruby", "Go", "APIs"], jobType: "Full-time, Remote", experience: "3-5 years" },
    { id: 15, company: "SHOPIFY", title: "Rails Developer", salary: "$13,000 Per Month", applications: "934 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Ruby on Rails", "GraphQL", "React"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 16, company: "DROPBOX", title: "Infrastructure Engineer", salary: "$15,500 Per Month", applications: "654 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Python", "AWS", "Docker"], jobType: "Full-time, Remote", experience: "4+ years" },
    { id: 17, company: "SLACK", title: "Frontend Engineer", salary: "$14,000 Per Month", applications: "823 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["TypeScript", "React", "WebSockets"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 18, company: "ZOOM", title: "Video Engineer", salary: "$15,000 Per Month", applications: "567 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["C++", "WebRTC", "Multimedia"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 19, company: "SALESFORCE", title: "Platform Developer", salary: "$13,500 Per Month", applications: "1123 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Apex", "Lightning", "Salesforce"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 20, company: "ORACLE", title: "Database Engineer", salary: "$14,500 Per Month", applications: "789 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["SQL", "PL/SQL", "Oracle DB"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 21, company: "IBM", title: "AI Research Scientist", salary: "$18,000 Per Month", applications: "456 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Python", "Deep Learning", "Research"], jobType: "Full-time, Remote", experience: "5+ years" },
    { id: 22, company: "INTEL", title: "Chip Design Engineer", salary: "$17,500 Per Month", applications: "345 Applications", timeLeft: "1 month left", onlineStatus: "Offline", requirements: ["Verilog", "VLSI", "RTL"], jobType: "Full-time, On-site", experience: "5+ years" },
    { id: 23, company: "AMD", title: "Performance Engineer", salary: "$16,000 Per Month", applications: "432 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["C++", "Assembly", "Profiling"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 24, company: "PAYPAL", title: "Security Engineer", salary: "$15,500 Per Month", applications: "678 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Security", "Python", "Cryptography"], jobType: "Full-time, Remote", experience: "4+ years" },
    { id: 25, company: "SQUARE", title: "Android Developer", salary: "$14,000 Per Month", applications: "867 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Kotlin", "Android", "Jetpack"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 26, company: "COINBASE", title: "Blockchain Developer", salary: "$19,000 Per Month", applications: "543 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["Solidity", "Web3", "Ethereum"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 27, company: "ROBINHOOD", title: "Trading Systems Engineer", salary: "$17,000 Per Month", applications: "654 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Python", "Finance", "Low Latency"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 28, company: "DOORDASH", title: "Backend Engineer", salary: "$14,500 Per Month", applications: "987 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Kotlin", "Microservices", "gRPC"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 29, company: "LYFT", title: "Mobile Engineer", salary: "$14,000 Per Month", applications: "876 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["iOS", "Swift", "RxSwift"], jobType: "Full-time, Hybrid", experience: "3+ years" },
    { id: 30, company: "INSTACART", title: "ML Platform Engineer", salary: "$16,500 Per Month", applications: "567 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Python", "MLOps", "Kubernetes"], jobType: "Full-time, Remote", experience: "4+ years" },
    { id: 31, company: "REDDIT", title: "Site Reliability Engineer", salary: "$15,000 Per Month", applications: "765 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Go", "Prometheus", "Terraform"], jobType: "Full-time, Remote", experience: "4+ years" },
    { id: 32, company: "DISCORD", title: "Rust Developer", salary: "$16,000 Per Month", applications: "432 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["Rust", "WebSockets", "Distributed"], jobType: "Full-time, Remote", experience: "3+ years" },
    { id: 33, company: "TWITCH", title: "Video Platform Engineer", salary: "$15,500 Per Month", applications: "678 Applications", timeLeft: "3 weeks left", onlineStatus: "Online", requirements: ["Go", "Video Streaming", "CDN"], jobType: "Full-time, Hybrid", experience: "4+ years" },
    { id: 34, company: "SNAP", title: "AR/VR Developer", salary: "$17,000 Per Month", applications: "543 Applications", timeLeft: "1 month left", onlineStatus: "Online", requirements: ["Unity", "ARKit", "Computer Vision"], jobType: "Full-time, On-site", experience: "3+ years" },
    { id: 35, company: "PINTEREST", title: "Growth Engineer", salary: "$14,500 Per Month", applications: "876 Applications", timeLeft: "2 weeks left", onlineStatus: "Online", requirements: ["Python", "A/B Testing", "Analytics"], jobType: "Full-time, Remote", experience: "3+ years" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Life at Google as a Developer",
      author: "Sarah Chen",
      role: "Senior Developer @ Google",
      summary:
        "My journey through the corridors of Google, building impactful products... 🚀",
      emoji: "💻",
    },
  ];

  const projects = [
    {
      id: 1,
      company: "Apple",
      issue: "Heavy Database Usage Optimization",
      workingOn: "Sesha Reddy",
      description:
        "Implementing efficient caching strategy to reduce database load",
      difficulty: "Advanced",
      points: 750,
      team: ["Sesha Reddy", "Alex Johnson", "Maria Garcia"],
      technologies: ["Redis", "PostgreSQL", "Node.js"],
      timeEstimate: "4 weeks",
      status: "In Progress",
      completionPercentage: 45,
    },
    {
      id: 2,
      company: "Google",
      issue: "User Authentication Flow Redesign",
      workingOn: "Emily Chang",
      description:
        "Improving the user authentication experience with OAuth and biometric options",
      difficulty: "Intermediate",
      points: 500,
      team: ["Emily Chang", "David Wilson"],
      technologies: ["OAuth2.0", "React", "Firebase Auth"],
      timeEstimate: "3 weeks",
      status: "Planning",
      completionPercentage: 15,
    },
  ];

  const projectData = [
    {
      id: 1,
      name: "Education Platform",
      team: [
        {
          username: "sarah_dev",
          role: "Lead Developer",
          hours: 80,
          contributions: "Architecture, Backend API",
        },
        {
          username: "mike_ui",
          role: "UI Designer",
          hours: 65,
          contributions: "Interface Design, User Flow",
        },
      ],
      progress: 75,
      status: "In Development",
      location: "Remote",
      openRoles: [
        "Frontend Developer",
        "Backend Developer",
        "UI/UX Designer",
        "QA Engineer",
      ],
      projectDescription:
        "Building an interactive education platform with personalized learning paths and real-time collaboration tools.",
      requiredSkills: {
        "Frontend Developer": ["React", "TypeScript", "Responsive Design"],
        "Backend Developer": ["Node.js", "Express", "MongoDB"],
        "UI/UX Designer": ["Figma", "User Research", "Wireframing"],
        "QA Engineer": ["Test Automation", "Manual Testing", "Bug Tracking"],
      },
    },
    {
      id: 2,
      name: "Healthcare Management System",
      team: [
        {
          username: "jay_fullstack",
          role: "Full Stack Developer",
          hours: 110,
          contributions: "Patient Portal, Admin Dashboard",
        },
        {
          username: "priya_backend",
          role: "Backend Developer",
          hours: 95,
          contributions: "API Development, Database Design",
        },
      ],
      progress: 60,
      status: "In Development",
      location: "Hybrid",
      openRoles: [
        "Frontend Developer",
        "DevOps Engineer",
        "Security Specialist",
      ],
      projectDescription:
        "Creating a comprehensive healthcare management system with patient records, appointment scheduling, and billing features.",
      requiredSkills: {
        "Frontend Developer": ["Angular", "RxJS", "SCSS"],
        "DevOps Engineer": ["Docker", "Kubernetes", "CI/CD"],
        "Security Specialist": [
          "OWASP",
          "Penetration Testing",
          "Authentication Systems",
        ],
      },
    },
  ];

  const contributionData = [
    {
      name: "John Doe",
      company: "TechCorp",
      role: "Frontend Developer",
      hours: 120,
      projects: 5,
      medals: "🏆🥇🥇",
    },
    {
      name: "Sarah Johnson",
      company: "Google",
      role: "UX Designer",
      hours: 145,
      projects: 8,
      medals: "🏆🏆🥇🥈",
    },
    {
      name: "Michael Wong",
      company: "Microsoft",
      role: "Backend Developer",
      hours: 160,
      projects: 6,
      medals: "🏆🥇🥇🥈",
    },
    {
      name: "Emily Chen",
      company: "Apple",
      role: "Full Stack Developer",
      hours: 190,
      projects: 9,
      medals: "🏆🏆🥇🥇🥇",
    },
    {
      name: "David Rodriguez",
      company: "TechCorp",
      role: "DevOps Engineer",
      hours: 110,
      projects: 4,
      medals: "🥇🥈",
    },
  ];

  const referralData = [
    {
      name: "Alice Smith",
      company: "TechCorp",
      role: "Senior Developer",
      available: true,
      profile: {
        education: "MIT - Computer Science",
        experience: "8 years",
        skills: ["React", "Node.js", "Python", "AWS"],
        bio: "Senior developer with expertise in full-stack development and cloud architecture. Passionate about mentoring junior developers.",
        successfulReferrals: 12,
        openToReferrals: true,
      },
    },
    {
      name: "Robert Johnson",
      company: "Google",
      role: "Product Manager",
      available: true,
      profile: {
        education: "Stanford - MBA",
        experience: "10 years",
        skills: ["Product Strategy", "Agile", "Data Analysis", "User Research"],
        bio: "Experienced product manager with a track record of launching successful products. Strong background in user-centered design.",
        successfulReferrals: 8,
        openToReferrals: true,
      },
    },
    {
      name: "Jennifer Wu",
      company: "Microsoft",
      role: "UX/UI Designer",
      available: true,
      profile: {
        education: "Rhode Island School of Design",
        experience: "6 years",
        skills: [
          "Figma",
          "User Research",
          "Interaction Design",
          "Visual Design",
        ],
        bio: "Creative designer focused on creating intuitive and accessible user experiences across platforms.",
        successfulReferrals: 5,
        openToReferrals: true,
      },
    },
    {
      name: "Michael Patel",
      company: "Apple",
      role: "iOS Developer",
      available: false,
      profile: {
        education: "UC Berkeley - Computer Science",
        experience: "7 years",
        skills: ["Swift", "Objective-C", "UIKit", "SwiftUI"],
        bio: "iOS developer specializing in creating polished, performant mobile applications with a focus on UX.",
        successfulReferrals: 9,
        openToReferrals: false,
      },
    },
  ];

  const mentors = [
    {
      id: 1,
      name: "Emily Chen",
      role: "Senior Developer",
      experience: "8 years",
      rating: "4.9 ⭐",
      hourlyRate: 75,
      expertise: ["Interview Prep", "System Design", "Algorithm Training"],
      availability: true,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
      specialties: [
        {
          topic: "Data Structures & Algorithms",
          description:
            "Covering arrays, linked lists, trees, graphs, dynamic programming, and more",
          sessions: 4,
          duration: "1 hour each",
        },
        {
          topic: "System Design Interviews",
          description:
            "Learn how to design scalable systems including database design, API design, and architecture",
          sessions: 3,
          duration: "1.5 hours each",
        },
        {
          topic: "Behavioral Interviews",
          description:
            "Practice responses to common behavioral questions and develop your personal story",
          sessions: 2,
          duration: "1 hour each",
        },
      ],
      companies: ["Google", "Meta", "Amazon"],
      timeSlots: [
        { day: "Monday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
        { day: "Wednesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
        { day: "Friday", slots: ["10:00 AM", "2:00 PM", "5:00 PM"] },
      ],
      testimonials: [
        {
          name: "Alex",
          company: "Google",
          text: "Emily's guidance was instrumental in helping me ace my Google interview!",
        },
        {
          name: "Priya",
          company: "Amazon",
          text: "The system design sessions were extremely practical and helpful.",
        },
      ],
    },
    {
      id: 2,
      name: "Jason Wang",
      role: "Technical Lead",
      experience: "12 years",
      rating: "4.8 ⭐",
      hourlyRate: 90,
      expertise: [
        "System Architecture",
        "Leadership Skills",
        "Backend Development",
      ],
      availability: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      specialties: [
        {
          topic: "Technical Leadership",
          description:
            "Learn how to lead technical teams, manage projects, and make architectural decisions",
          sessions: 5,
          duration: "1 hour each",
        },
        {
          topic: "Backend Engineering",
          description:
            "Deep dive into backend technologies, APIs, databases, and scaling challenges",
          sessions: 4,
          duration: "1.5 hours each",
        },
      ],
      companies: ["Microsoft", "Netflix", "Dropbox"],
      timeSlots: [
        { day: "Tuesday", slots: ["11:00 AM", "2:00 PM", "6:00 PM"] },
        { day: "Thursday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
        { day: "Saturday", slots: ["9:00 AM", "12:00 PM"] },
      ],
      testimonials: [
        {
          name: "Sarah",
          company: "Microsoft",
          text: "Jason's insights into technical leadership have transformed my approach to team management.",
        },
        {
          name: "Michael",
          company: "Startup",
          text: "The architecture guidance helped us scale our product to millions of users.",
        },
      ],
    },
  ];

  const formatAIResponse = (text) => {
    const sections = text.split(/(?=\d\.|📌|💡|🔍|📝|🎯|📚|✨|➡️|•)/g);

    return sections.map((section, index) => (
      <div key={index} className="mb-2">
        {section.split("\n").map((line, i) => (
          <p key={i} className="mb-1">
            {line.trim().startsWith("•") ? (
              <span className="ml-4">{line}</span>
            ) : (
              line
            )}
          </p>
        ))}
      </div>
    ));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setFileName(file.name);

    try {
      const text = await readFileAsText(file);
      if (text.trim()) {
        setResumeContent(text);
        await analyzeResume(text);
        setShowTextArea(false);
      } else {
        setShowTextArea(true);
        setMessages((prev) => [
          ...prev,
          {
            text: "📝 Unable to automatically extract PDF content. Please copy and paste your resume content in the text area below.",
            isBot: true,
            formatted: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setShowTextArea(true);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Unable to process the file automatically. Please paste your resume content in the text area below.",
          isBot: true,
          formatted: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePastedContent = async () => {
    if (!pastedContent.trim()) return;

    setIsLoading(true);
    try {
      setResumeContent(pastedContent);
      await analyzeResume(pastedContent);
      setShowTextArea(false);
    } catch (error) {
      console.error("Error analyzing pasted content:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Error analyzing the pasted content. Please try again.",
          isBot: true,
          formatted: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);

      if (file.type === "application/pdf") {
        resolve("");
      } else {
        reader.readAsText(file);
      }
    });
  };

  const analyzeResume = async (content) => {
    setIsLoading(true);
    try {
      const prompt = `
        Analyze this resume content and provide detailed feedback:
        ${content}

        Please structure your analysis in the following format:
        1. Overall Score (out of 100) ⭐
        2. Key Skills Identified 🎯
        3. Experience Summary 📚
        4. Notable Achievements 🏆
        5. Areas for Improvement 📈
        6. Recommended Job Roles 💼
        7. Suggested Enhancements ✨

        For each section, use emoji bullets and provide specific, actionable feedback.
      `;

      const text = await callGroqAPI(prompt);

      setMessages((prev) => [
        ...prev,
        {
          text,
          isBot: true,
          formatted: true,
        },
      ]);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ I encountered an error while analyzing your resume. Please try again or upload a different file.",
          isBot: true,
          formatted: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !resumeContent) return;

    const userMessage = { text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const prompt = `
        Resume Content: ${resumeContent}
        User Question: ${inputValue}
        
        Please provide a specific, detailed response to the user's question about their resume.
        Use bullet points (•) for lists and structure your response clearly.
        Focus on actionable advice and specific examples from the resume when relevant.
      `;

      const text = await callGroqAPI(prompt);

      setMessages((prev) => [
        ...prev,
        {
          text,
          isBot: true,
          formatted: true,
        },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ I couldn't process your question. Please try asking in a different way.",
          isBot: true,
          formatted: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle job selection from swipe - AUTO SUBMIT
  const handleJobSelect = async (job) => {
    setSelectedJob(job);
    setSelectedJobs(prev => [...prev, job]);
    // Auto-submit application without showing review modal
    showToast("success", `✅ Applied to ${job.title} at ${job.company}!`);
  };

  // Handle job rejection from swipe
  const handleJobReject = (job) => {
    setRejectedJobs(prev => [...prev, job]);
    showToast("info", `⏭️ Skipped ${job.title} at ${job.company}`);
  };

  // Handle sending referral request
  const handleSendReferral = (referralId) => {
    setReferralStatuses(prev => ({
      ...prev,
      [referralId]: {
        sent: true,
        sentDate: new Date().toISOString(),
        status: "pending"
      }
    }));
    showToast("success", "Referral request sent successfully!");
  };

  // Handle viewing project details
  const handleViewProjectDetails = (project) => {
    setSelectedProjectDetails(project);
    setShowProjectDetails(true);
  };

  // Handler for Team Join
  const handleJoinTeam = (project, role) => {
    setSelectedProject(project);
    setSelectedRole(role);
    setShowRolePopup(true);
  };

  // Handler for Referral Profile View
  const handleViewReferralProfile = (referral) => {
    setSelectedReferral(referral);
    setShowReferralProfile(true);
  };

  // Navigation handlers
  const handleCompanyClick = (company) => {
    if (company === "MCDONALDS") {
      navigate("/Japple");
    }
  };

  const handleSidebarClick = (item) => {
    switch (item) {
      case "HOME":
        navigate("/");
        break;
      case "SEARCH":
        navigate("/search");
        break;
      case "HACKATHON":
        navigate("/hackathon");
        break;
      case "FORUM":
        navigate("/forum");
        break;
      case "EDUCATION":
        navigate("/education");
        break;
      case "CONNECT":
        navigate("/connect");
        break;
      case "JOBS":
        navigate("/jobs");
        break;
      case "PROFILE":
        navigate("/profile");
        break;
      case "LOG OUT":
        navigate("/logout");
        break;
      case "BACK":
        navigate(-1);
        break;
      default:
        break;
    }
  };

  const renderResume = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "64rem",
          padding: "2rem",
          marginTop: "2rem",
          marginLeft: "220px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "2rem",
          }}
        >
          {/* Title Section */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🎯</span>
              Resume Analysis Assistant
              <span style={{ fontSize: "1.5rem" }}>✨</span>
            </h2>
            <p
              style={{
                color: "#6B7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <span>📄</span>
              Upload your resume or paste its content to get started
            </p>
          </div>

          {/* Upload Section */}
          <div style={{ gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="resumeUpload"
              />
              <label
                htmlFor="resumeUpload"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#3B82F6",
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2563EB")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3B82F6")
                }
              >
                <FileText
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    marginRight: "0.5rem",
                  }}
                />
                Upload Resume 📎
              </label>
            </div>

            {fileName && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "#6B7280",
                }}
              >
                📋 Current file: {fileName}
              </p>
            )}

            {showTextArea && (
              <div style={{ gap: "1rem" }}>
                <textarea
                  value={pastedContent}
                  onChange={(e) => setPastedContent(e.target.value)}
                  placeholder="✍️ Paste your resume content here..."
                  style={{
                    width: "100%",
                    height: "10rem",
                    padding: "1rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.5rem",
                    resize: "none",
                    backgroundColor: "white",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={handlePastedContent}
                    disabled={!pastedContent.trim() || isLoading}
                    style={{
                      padding: "0.5rem 1.5rem",
                      backgroundColor: isLoading ? "#9CA3AF" : "#3B82F6",
                      color: "white",
                      borderRadius: "0.5rem",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      !isLoading && (e.target.style.backgroundColor = "#2563EB")
                    }
                    onMouseLeave={(e) =>
                      !isLoading && (e.target.style.backgroundColor = "#3B82F6")
                    }
                  >
                    {isLoading ? "🔄 Processing..." : "🚀 Analyze Content"}
                  </button>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div style={{ marginTop: "2rem", gap: "1rem" }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: message.isBot ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      backgroundColor: message.isBot ? "#F3F4F6" : "#3B82F6",
                      color: message.isBot ? "#1F2937" : "white",
                      maxWidth: "85%",
                    }}
                  >
                    {message.isBot ? "🤖 " : "👤 "}
                    {message.formatted
                      ? formatAIResponse(message.text)
                      : message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1rem",
                  }}
                >
                  <Loader
                    style={{
                      animation: "spin 1s linear infinite",
                      height: "1.5rem",
                      width: "1.5rem",
                      color: "#3B82F6",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="💭 Ask questions about your resume..."
                style={{
                  flex: "1",
                  padding: "0.5rem 1rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.5rem",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
                disabled={isLoading || !resumeContent}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim() || !resumeContent}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  backgroundColor: isLoading ? "#9CA3AF" : "#3B82F6",
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  !isLoading && (e.target.style.backgroundColor = "#2563EB")
                }
                onMouseLeave={(e) =>
                  !isLoading && (e.target.style.backgroundColor = "#3B82F6")
                }
              >
                <Send
                  style={{
                    width: "1rem",
                    height: "1rem",
                    marginRight: "0.5rem",
                  }}
                />
                Send ✨
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamHunt = () => (
    <div style={styles.container}>
      <h2>Team Hunt</h2>
      {projectData.map((project) => (
        <div key={project.id} style={styles.projectCard}>
          <h3>{project.name}</h3>
          <p>{project.projectDescription}</p>
          <div style={styles.progressBar}>
            <div
              style={{ ...styles.progress, width: `${project.progress}%` }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Location:</strong> {project.location}
            </p>
          </div>

          <h4>Current Team Members</h4>
          {project.team.map((member, index) => (
            <div key={index} style={styles.teamMember}>
              <h5>{member.username}</h5>
              <p>Role: {member.role}</p>
              <p>Hours Contributed: {member.hours}</p>
              <p>Contributions: {member.contributions}</p>
            </div>
          ))}

          <h4>Open Roles</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {project.openRoles.map((role, index) => (
              <button
                key={index}
                style={{
                  ...styles.tag,
                  padding: "8px 16px",
                  backgroundColor: "#00c49a",
                  color: "white",
                  border: "none",
                }}
                onClick={() => handleJoinTeam(project, role)}
              >
                Join as {role}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Role Application Popup */}
      {showRolePopup && selectedProject && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Join {selectedProject.name}</h2>
            <h3>Role: {selectedRole}</h3>

            <div style={styles.skillsSection}>
              <h4>Required Skills:</h4>
              <ul>
                {selectedProject.requiredSkills[selectedRole]?.map(
                  (skill, idx) => (
                    <li key={idx}>{skill}</li>
                  )
                )}
              </ul>
            </div>

            <div style={styles.applicationForm}>
              <h4>Why do you want to join this team?</h4>
              <textarea
                style={styles.textArea}
                placeholder="Describe your interest in this project and relevant experience..."
                rows={4}
              />

              <h4>Relevant experience with the required skills:</h4>
              <textarea
                style={styles.textArea}
                placeholder="Describe your experience with the required skills..."
                rows={4}
              />

              <div style={styles.buttonContainer}>
                <button
                  style={styles.applyButton}
                  onClick={() => {
                    alert(
                      `Application submitted for ${selectedRole} role on ${selectedProject.name}!`
                    );
                    setShowRolePopup(false);
                  }}
                >
                  Submit Application
                </button>
                <button
                  style={styles.closeButton}
                  onClick={() => setShowRolePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPointTable = () => (
    <div style={styles.container}>
      <div style={styles.filters}>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Companies</option>
          <option value="TechCorp">TechCorp</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Apple">Apple</option>
        </select>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Roles</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="UX Designer">UX Designer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
        </select>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Role</th>
            <th>Hours</th>
            <th>Projects</th>
            <th>Achievements</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contributionData
            .filter(
              (contributor) =>
                (selectedCompany === "all" ||
                  contributor.company === selectedCompany) &&
                (selectedRole === "all" || contributor.role === selectedRole)
            )
            .map((contributor, index) => (
              <tr key={index}>
                <td>{contributor.name}</td>
                <td>{contributor.company}</td>
                <td>{contributor.role}</td>
                <td>{contributor.hours}</td>
                <td>{contributor.projects}</td>
                <td>{contributor.medals}</td>
                <td>
                  <button style={styles.contactButton}>Contact</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  const renderReferral = () => (
    <div style={styles.container}>
      <div style={styles.filters}>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Companies</option>
          <option value="TechCorp">TechCorp</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Apple">Apple</option>
        </select>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Roles</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="UX/UI Designer">UX/UI Designer</option>
          <option value="iOS Developer">iOS Developer</option>
        </select>
      </div>
      <div style={styles.referralGrid}>
        {referralData
          .filter(
            (person) =>
              (selectedCompany === "all" ||
                person.company === selectedCompany) &&
              (selectedRole === "all" || person.role === selectedRole)
          )
          .map((person, index) => (
            <div
              key={index}
              style={{
                ...styles.referralCard,
                borderLeft: person.available
                  ? "5px solid #00c49a"
                  : "5px solid #9CA3AF",
              }}
            >
              <h3>{person.name}</h3>
              <p>
                <strong>Company:</strong> {person.company}
              </p>
              <p>
                <strong>Role:</strong> {person.role}
              </p>
              <p
                style={{
                  color: person.available ? "#00c49a" : "#9CA3AF",
                  fontWeight: "bold",
                }}
              >
                {person.available
                  ? "✓ Available for Referrals"
                  : "✗ Not Available"}
              </p>
              <button
                style={{
                  ...styles.referralButton,
                  backgroundColor: person.available ? "#00c49a" : "#9CA3AF",
                  cursor: person.available ? "pointer" : "not-allowed",
                }}
                onClick={() => handleViewReferralProfile(person)}
                disabled={!person.available}
              >
                View Profile
              </button>
            </div>
          ))}
      </div>

      {/* Referral Profile Popup */}
      {showReferralProfile && selectedReferral && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>{selectedReferral.name}</h2>
            <p>
              <strong>
                {selectedReferral.role} at {selectedReferral.company}
              </strong>
            </p>

            <div style={styles.profileSection}>
              <h3>Background</h3>
              <p>
                <strong>Education:</strong> {selectedReferral.profile.education}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {selectedReferral.profile.experience}
              </p>
              <p>
                <strong>Bio:</strong> {selectedReferral.profile.bio}
              </p>

              <h3>Skills</h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "15px",
                }}
              >
                {selectedReferral.profile.skills.map((skill, idx) => (
                  <span key={idx} style={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>

              <h3>Referral Information</h3>
              <p>
                <strong>Successful Referrals:</strong>{" "}
                {selectedReferral.profile.successfulReferrals}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedReferral.profile.openToReferrals
                  ? "Open to Referrals"
                  : "Not Available"}
              </p>

              <div style={styles.requestForm}>
                <h3>Request a Referral</h3>

                {/* Referral Status Display */}
                {referralStatuses[selectedReferral.name] ? (
                  <div style={{
                    padding: "16px",
                    background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    border: "1px solid #10b981"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "20px" }}>✅</span>
                      <span style={{ fontWeight: "600", color: "#065f46" }}>Referral Request Sent!</span>
                    </div>
                    <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#047857" }}>
                      Sent on {new Date(referralStatuses[selectedReferral.name].sentDate).toLocaleDateString()}
                    </p>
                    <div style={{
                      marginTop: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <span style={{
                        padding: "4px 12px",
                        background: referralStatuses[selectedReferral.name].status === "pending" ? "#fef3c7" :
                          referralStatuses[selectedReferral.name].status === "viewed" ? "#dbeafe" : "#d1fae5",
                        color: referralStatuses[selectedReferral.name].status === "pending" ? "#92400e" :
                          referralStatuses[selectedReferral.name].status === "viewed" ? "#1e40af" : "#065f46",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        Status: {referralStatuses[selectedReferral.name].status === "pending" ? "⏳ Pending Review" :
                          referralStatuses[selectedReferral.name].status === "viewed" ? "👁️ Viewed" : "✓ Accepted"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <textarea
                      style={styles.textArea}
                      placeholder="Explain why you're interested in working at this company and why you'd be a good fit..."
                      rows={4}
                    />

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <input type="checkbox" id="resumeAttach" />
                      <label htmlFor="resumeAttach" style={{ marginLeft: "8px" }}>
                        Attach my resume to this request
                      </label>
                    </div>
                  </>
                )}

                <div style={styles.buttonContainer}>
                  {!referralStatuses[selectedReferral.name] ? (
                    <button
                      style={{ ...styles.applyButton, background: "linear-gradient(135deg, #10b981, #059669)" }}
                      onClick={() => {
                        handleSendReferral(selectedReferral.name);
                        setShowReferralProfile(false);
                      }}
                    >
                      📨 Send Referral Request
                    </button>
                  ) : (
                    <button
                      style={{ ...styles.applyButton, background: "#6b7280", cursor: "default" }}
                      disabled
                    >
                      ✓ Request Already Sent
                    </button>
                  )}
                  <button
                    style={styles.closeButton}
                    onClick={() => setShowReferralProfile(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderJobHacker = () => (
    <div style={styles.container}>
      <div style={styles.filters}>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Roles</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Technical Lead">Technical Lead</option>
        </select>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Companies</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Amazon">Amazon</option>
          <option value="Meta">Meta</option>
        </select>
      </div>
      <div style={styles.mentorGrid}>
        {mentors
          .filter(
            (mentor) => selectedRole === "all" || mentor.role === selectedRole
          )
          .map((mentor) => (
            <div
              key={mentor.id}
              style={{
                ...styles.mentorCard,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  style={styles.mentorImage}
                />
                <div>
                  <h3 style={{ margin: "0 0 5px 0" }}>{mentor.name}</h3>
                  <p style={{ margin: "0 0 5px 0" }}>
                    <strong>{mentor.role}</strong>
                  </p>
                  <p style={{ margin: "0 0 5px 0" }}>
                    Experience: {mentor.experience}
                  </p>
                  <p style={{ margin: "0" }}>Rating: {mentor.rating}</p>
                </div>
              </div>

              <p style={{ marginTop: "15px" }}>
                <strong>Rate:</strong> ${mentor.hourlyRate}/hour
              </p>

              <div style={{ marginTop: "10px" }}>
                <h4 style={{ marginBottom: "8px" }}>
                  Companies Specialized In:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {mentor.companies.map((company, idx) => (
                    <span
                      key={idx}
                      style={{
                        ...styles.tag,
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <h4 style={{ marginTop: "15px", marginBottom: "8px" }}>
                Expertise:
              </h4>
              <ul style={{ paddingLeft: "20px", margin: "0 0 15px 0" }}>
                {mentor.expertise.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  style={styles.availabilityButton}
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setShowMentorDetails(true);
                  }}
                >
                  View Programs
                </button>
                <button
                  style={{
                    ...styles.availabilityButton,
                    backgroundColor: "#4285f4",
                  }}
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setShowCalendar(true);
                  }}
                >
                  Check Availability
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Mentor Details Modal */}
      {showMentorDetails && selectedMentor && (
        <div style={styles.modalOverlay}>
          <div
            style={{
              ...styles.modalContent,
              maxWidth: "700px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h2>{selectedMentor.name} - Mentorship Programs</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={selectedMentor.image}
                alt={selectedMentor.name}
                style={{ ...styles.mentorImage, marginRight: "15px" }}
              />
              <div>
                <p>
                  <strong>{selectedMentor.role}</strong> with{" "}
                  {selectedMentor.experience} experience
                </p>
                <p>Rating: {selectedMentor.rating}</p>
                <p>Rate: ${selectedMentor.hourlyRate}/hour</p>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3>Specialties and Programs</h3>
              {selectedMentor.specialties.map((specialty, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <h4>{specialty.topic}</h4>
                  <p>{specialty.description}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <p>
                      <strong>{specialty.sessions} sessions</strong> •{" "}
                      {specialty.duration}
                    </p>
                    <button
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#00c49a",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setShowBookingDetails(true);
                        setShowMentorDetails(false);
                      }}
                    >
                      Book This Program
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3>Testimonials</h3>
              {selectedMentor.testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ fontStyle: "italic" }}>"{testimonial.text}"</p>
                  <p style={{ textAlign: "right", marginBottom: "0" }}>
                    - {testimonial.name}, {testimonial.company}
                  </p>
                </div>
              ))}
            </div>

            <button
              style={styles.closeButton}
              onClick={() => setShowMentorDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal with enhanced UI */}
      {showCalendar && selectedMentor && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Book a Session with {selectedMentor.name}</h3>

            <div style={{ marginBottom: "20px" }}>
              <h4>Select a Day:</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedMentor.timeSlots.map((daySlot, idx) => (
                  <button
                    key={idx}
                    style={{
                      padding: "10px 15px",
                      backgroundColor:
                        selectedDay === daySlot.day ? "#00c49a" : "#f0f0f0",
                      color: selectedDay === daySlot.day ? "white" : "black",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedDay(daySlot.day)}
                  >
                    {daySlot.day}
                  </button>
                ))}
              </div>
            </div>

            {selectedDay && (
              <div style={{ marginBottom: "20px" }}>
                <h4>Available Time Slots for {selectedDay}:</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedMentor.timeSlots
                    .find((slot) => slot.day === selectedDay)
                    ?.slots.map((time, idx) => (
                      <button
                        key={idx}
                        style={{
                          padding: "10px 15px",
                          backgroundColor:
                            selectedTimeSlot === time ? "#00c49a" : "#f0f0f0",
                          color: selectedTimeSlot === time ? "white" : "black",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedTimeSlot(time)}
                      >
                        {time}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {selectedDay && selectedTimeSlot && (
              <div style={{ marginTop: "20px" }}>
                <button
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#00c49a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => {
                    alert(
                      `Session booked with ${selectedMentor.name} on ${selectedDay} at ${selectedTimeSlot}!`
                    );
                    setShowCalendar(false);
                    setSelectedDay(null);
                    setSelectedTimeSlot(null);
                  }}
                >
                  Confirm Booking
                </button>
              </div>
            )}

            <button
              style={styles.closeButton}
              onClick={() => {
                setShowCalendar(false);
                setSelectedDay(null);
                setSelectedTimeSlot(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Booking Program Details */}
      {showBookingDetails && selectedMentor && selectedSpecialty && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>
              Book {selectedSpecialty.topic} with {selectedMentor.name}
            </h3>

            <div style={{ margin: "20px 0" }}>
              <p>
                <strong>Program:</strong> {selectedSpecialty.topic}
              </p>
              <p>
                <strong>Description:</strong> {selectedSpecialty.description}
              </p>
              <p>
                <strong>Format:</strong> {selectedSpecialty.sessions} sessions,{" "}
                {selectedSpecialty.duration}
              </p>
              <p>
                <strong>Total Investment:</strong> $
                {selectedMentor.hourlyRate *
                  parseInt(selectedSpecialty.sessions)}
              </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4>What you'll get:</h4>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Personalized {selectedSpecialty.topic} preparation</li>
                <li>Mock interviews with feedback</li>
                <li>Specific guidance for your target companies</li>
                <li>Direct access to an experienced mentor</li>
                <li>Resume and portfolio review</li>
                <li>Potential referral opportunities</li>
              </ul>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#00c49a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                onClick={() => {
                  setShowCalendar(true);
                  setShowBookingDetails(false);
                }}
              >
                Select Time Slots
              </button>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowBookingDetails(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "job":
        return (
          <div style={styles.container}>
            {(searchResults.length > 0 ? searchResults : jobs).map((job) => (
              <div
                key={job.id}
                style={styles.jobItem}
                onClick={() => handleCompanyClick(job.company)}
              >
                <div>
                  <img
                    src={job.imgSrc}
                    alt={job.company}
                    style={styles.jobImage}
                  />
                </div>
                <div style={styles.jobDetails}>
                  <h2 style={styles.jobTitle}>{job.company}</h2>
                  <h3>{job.title}</h3>
                  <span style={styles.timeLeft}>{job.timeLeft}</span>
                  <span>{job.onlineStatus}</span>
                  <p>{job.salary}</p>
                  <p>{job.applications}</p>
                </div>
                <div style={styles.extraInfo}>
                  <button style={styles.tag}>{job.company}</button>
                  <p>May 25 - Oct 31, 2024</p>
                  <div>
                    <h3>Requirements</h3>
                    {job.requirements.map((req, idx) => (
                      <button key={idx} style={styles.tag}>
                        {req}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "easyApply":
        return (
          <div style={{ ...styles.container, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            {/* Toast Notification */}
            {toastMessage && (
              <div style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                padding: "18px 28px",
                borderRadius: "16px",
                background: toastMessage.type === "success" ? "linear-gradient(135deg, #00ff88, #00c49a)" :
                  toastMessage.type === "error" ? "linear-gradient(135deg, #ff4757, #ff6b81)" :
                    toastMessage.type === "warning" ? "linear-gradient(135deg, #ffa502, #ff7f50)" :
                      "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: toastMessage.type === "success" ? "#0a0a0a" : "white",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                zIndex: 9999,
                fontWeight: "700",
                fontSize: "16px",
                letterSpacing: "0.5px"
              }}>
                {toastMessage.type === "success" ? "✓ " : toastMessage.type === "error" ? "✕ " : ""}
                {toastMessage.message}
              </div>
            )}

            {/* Title Section */}
            <div style={{
              textAlign: "center",
              marginBottom: "20px"
            }}>
              <h1 style={{
                fontSize: "36px",
                fontWeight: "800",
                background: "linear-gradient(90deg, #00ff88, #00c49a, #00ff88)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: "0 0 10px 0"
              }}>
                ⚡ Quick Apply
              </h1>
              <p style={{
                color: "#888",
                fontSize: "16px",
                margin: 0
              }}>
                Swipe right to apply, left to skip
              </p>
            </div>

            {/* Direct Swipe Cards */}
            <SwipeCardStack
              jobs={easyApplyJobs}
              onSelect={handleJobSelect}
              onReject={handleJobReject}
              onEmpty={(selected, rejected) => {
                showToast("success", `All done! Applied to ${selected.length} jobs`);
              }}
            />
          </div>
        );

      case "blog":
        return (
          <div style={styles.container}>
            <div style={{ marginBottom: "20px" }}>
              <button style={styles.tag}>Filter Posts</button>
            </div>
            {blogPosts.map((post) => (
              <div key={post.id} style={styles.blogPost}>
                <div style={styles.blogAuthor}>
                  {post.author} • {post.role}
                </div>
                <h2>
                  {post.emoji} {post.title}
                </h2>
                <p>{post.summary}</p>
                <button style={styles.readMoreBtn}>Read More</button>
              </div>
            ))}
          </div>
        );

      case "resume":
        return renderResume();

      case "projects":
        return (
          <div style={styles.container}>
            {projects.map((project) => (
              <div key={project.id} style={styles.projectCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <h3>{project.company} Project</h3>
                  <div
                    style={{
                      backgroundColor:
                        project.difficulty === "Advanced"
                          ? "#ff7070"
                          : project.difficulty === "Intermediate"
                            ? "#ffb347"
                            : "#90ee90",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {project.difficulty} • {project.points} pts
                  </div>
                </div>

                <p>
                  <strong>Issue:</strong> {project.issue}
                </p>

                <div
                  style={{ display: "flex", gap: "15px", marginTop: "10px" }}
                >
                  <div style={{ flex: 1 }}>
                    <p>
                      <strong>Team Lead:</strong> {project.workingOn}
                    </p>
                    <p>
                      <strong>Team Members:</strong>
                    </p>
                    <ul style={{ paddingLeft: "20px" }}>
                      {project.team.map((member, idx) => (
                        <li key={idx}>{member}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p>
                      <strong>Technologies:</strong>
                    </p>
                    <div style={styles.tagsContainer}>
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} style={styles.tag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p>
                      <strong>Time Estimate:</strong> {project.timeEstimate}
                    </p>
                    <p>
                      <strong>Status:</strong> {project.status}
                    </p>

                    <div style={styles.progressContainer}>
                      <div
                        style={{
                          ...styles.progressBar,
                          width: "100%",
                          height: "10px",
                        }}
                      >
                        <div
                          style={{
                            ...styles.progress,
                            width: `${project.completionPercentage}%`,
                            backgroundColor: "#00c49a",
                          }}
                        ></div>
                      </div>
                      <span>{project.completionPercentage}% complete</span>
                    </div>
                  </div>
                </div>

                <p style={{ marginTop: "15px", color: "#666" }}>
                  {project.description}
                </p>

                <div
                  style={{ marginTop: "15px", display: "flex", gap: "10px" }}
                >
                  <button
                    style={styles.readMoreBtn}
                    onClick={() => handleViewProjectDetails(project)}
                  >
                    View Details
                  </button>
                  <button
                    style={{
                      ...styles.readMoreBtn,
                      backgroundColor: "#4285f4",
                    }}
                  >
                    Contribute to Project
                  </button>
                </div>
              </div>
            ))}

            {/* Project Details Popup */}
            {showProjectDetails && selectedProjectDetails && (
              <div style={styles.modalOverlay}>
                <div style={{ ...styles.modalContent, maxWidth: "700px", maxHeight: "90vh", overflow: "auto" }}>
                  <h2>📊 {selectedProjectDetails.issue}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <span style={{ ...styles.tag, background: "#3b82f6", color: "white" }}>{selectedProjectDetails.company}</span>
                    <span style={{ ...styles.tag, background: selectedProjectDetails.status === "In Progress" ? "#f59e0b" : "#10b981", color: "white" }}>
                      {selectedProjectDetails.status}
                    </span>
                    <span style={styles.tag}>{selectedProjectDetails.difficulty}</span>
                    <span style={{ ...styles.tag, background: "#8b5cf6", color: "white" }}>🏆 {selectedProjectDetails.points} pts</span>
                  </div>

                  <p style={{ color: "#666", marginBottom: "20px" }}>{selectedProjectDetails.description}</p>

                  {/* Contributors Section */}
                  <div style={{ marginBottom: "24px" }}>
                    <h4 style={{ marginBottom: "12px" }}>👥 Contributors</h4>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      {selectedProjectDetails.team.map((member, idx) => (
                        <div key={idx} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 16px",
                          background: "#f8fafc",
                          borderRadius: "8px",
                          border: idx === 0 ? "2px solid #10b981" : "1px solid #e5e7eb"
                        }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"][idx % 4]}, ${["#2563eb", "#7c3aed", "#db2777", "#d97706"][idx % 4]})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}>
                            {member.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <span style={{ fontWeight: "600" }}>{member}</span>
                            {idx === 0 && <span style={{ fontSize: "11px", color: "#10b981", display: "block" }}>Lead</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Section */}
                  <div style={{ marginBottom: "24px" }}>
                    <h4 style={{ marginBottom: "12px" }}>🛠️ Technologies</h4>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {selectedProjectDetails.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: "8px 16px",
                            background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                            border: "1px solid #93c5fd",
                            borderRadius: "20px",
                            color: "#1e40af",
                            fontWeight: "500",
                            fontSize: "13px"
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div style={{ marginBottom: "24px" }}>
                    <h4 style={{ marginBottom: "12px" }}>📈 Progress</h4>
                    <div style={{
                      height: "24px",
                      background: "#e5e7eb",
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "8px"
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${selectedProjectDetails.completionPercentage}%`,
                        background: "linear-gradient(90deg, #10b981, #059669)",
                        borderRadius: "12px",
                        transition: "width 0.5s ease"
                      }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666" }}>
                      <span>{selectedProjectDetails.completionPercentage}% Complete</span>
                      <span>Est. {selectedProjectDetails.timeEstimate}</span>
                    </div>
                  </div>

                  {/* Changelog Section */}
                  <div style={{ marginBottom: "24px" }}>
                    <h4 style={{ marginBottom: "12px" }}>📝 Recent Changes</h4>
                    <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "16px" }}>
                      {[
                        { date: "2 days ago", author: selectedProjectDetails.team[0], change: "Implemented core caching layer", type: "feature" },
                        { date: "5 days ago", author: selectedProjectDetails.team[1] || selectedProjectDetails.team[0], change: "Fixed memory leak in connection pool", type: "fix" },
                        { date: "1 week ago", author: selectedProjectDetails.team[0], change: "Initial project setup and architecture", type: "setup" },
                      ].map((log, idx) => (
                        <div key={idx} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "10px 0",
                          borderBottom: idx < 2 ? "1px solid #e5e7eb" : "none"
                        }}>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: "600",
                            background: log.type === "feature" ? "#d1fae5" : log.type === "fix" ? "#fee2e2" : "#fef3c7",
                            color: log.type === "feature" ? "#065f46" : log.type === "fix" ? "#991b1b" : "#92400e"
                          }}>
                            {log.type}
                          </span>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontWeight: "500" }}>{log.change}</p>
                            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}>
                              {log.author} • {log.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.buttonContainer}>
                    <button
                      style={{ ...styles.applyButton, background: "linear-gradient(135deg, #10b981, #059669)" }}
                      onClick={() => {
                        showToast("success", `Joined project: ${selectedProjectDetails.issue}`);
                        setShowProjectDetails(false);
                      }}
                    >
                      🚀 Join This Project
                    </button>
                    <button
                      style={styles.closeButton}
                      onClick={() => setShowProjectDetails(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "teamHunt":
        return renderTeamHunt();

      case "pointTable":
        return renderPointTable();

      case "referral":
        return renderReferral();

      case "jobHacker":
        return renderJobHacker();

      default:
        return null;
    }
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
    },
    sidebar1: {
      position: "fixed",
      width: "200px",
      height: "100%",
      gap: "5px",
      fontFamily: "cursive",
      backgroundColor: "#333",
      display: "flex",
      flexDirection: "column",
      paddingTop: "15px",
      paddingBottom: "20px",
      color: "#f4f4f4",
      textAlign: "center",
      margin: 0,
      padding: 0,
      left: 0,
      top: 0,
    },
    sidebarItem: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "5px",
      alignItems: "center",
    },
    sidebarBox: {
      backgroundColor: "#444",
      color: "#fff",
      padding: "20px 10px",
      width: "70%",
      textAlign: "center",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      margin: 0,
    },
    heading: {
      padding: "5px",
      fontWeight: "900",
      fontSize: "400%",
      fontFamily: "Trebuchet MS, Lucida Sans, Arial, sans-serif",
      textAlign: "center",
      color: "#ffffff",
    },
    container: {
      marginLeft: "250px",
      padding: "20px",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      marginTop: "40px",
      width: "calc(100% - 290px)",
      maxWidth: "none",
      boxSizing: "border-box",
      overflowX: "auto",
      display: "block",
    },
    jobItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      padding: "20px 0",
      cursor: "pointer",
    },
    jobImage: {
      width: "100px",
      height: "100px",
      backgroundColor: "#eee",
      border: "1px solid #ccc",
      objectFit: "cover",
    },
    jobDetails: {
      flex: 1,
      marginLeft: "20px",
    },
    jobTitle: {
      margin: "0 0 10px",
      fontSize: "20px",
      color: "#ffffff",
    },
    timeLeft: {
      display: "inline-block",
      backgroundColor: "#00c49a",
      color: "white",
      padding: "2px 10px",
      borderRadius: "15px",
      marginRight: "10px",
    },
    extraInfo: {
      textAlign: "right",
    },
    tag: {
      display: "inline-block",
      padding: "5px 10px",
      border: "1px solid #00c49a",
      borderRadius: "15px",
      color: "#00c49a",
      backgroundColor: "white",
      marginBottom: "5px",
      cursor: "pointer",
      marginRight: "5px",
      transition: "all 0.3s ease",
    },
    tabContainer: {
      display: "flex",
      justifyContent: "flex-start",
      gap: "10px",
      marginTop: "20px",
      marginBottom: "20px",
      marginLeft: "250px",
      width: "calc(100% - 290px)",
      padding: "0 30px",
      boxSizing: "border-box",
      flexWrap: "wrap",
      minHeight: "80px",
      alignItems: "flex-start",
      overflowX: "visible",
    },
    tabButton: {
      padding: "20px 16px",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      transition: "all 0.3s",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "8px",
      whiteSpace: "nowrap",
      backgroundColor: "violet",
      color: "#333",
    },
    activeTab: {
      backgroundColor: "#00c49a",
      color: "white",
    },
    blogPost: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    blogAuthor: {
      color: "#666",
      fontSize: "0.9em",
      marginBottom: "10px",
      fontStyle: "italic",
    },
    readMoreBtn: {
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "10px",
      fontSize: "14px",
    },
    resumeUpload: {
      border: "2px dashed #ccc",
      padding: "40px",
      textAlign: "center",
      borderRadius: "10px",
      marginBottom: "20px",
      backgroundColor: "#fafafa",
      transition: "border-color 0.3s ease",
    },
    chatContainer: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    projectCard: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease",
    },
    chatInput: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginTop: "10px",
      fontSize: "14px",
    },
    chatMessage: {
      backgroundColor: "#e9ecef",
      padding: "10px 15px",
      borderRadius: "10px",
      marginBottom: "10px",
      maxWidth: "80%",
    },
    uploadButton: {
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background-color 0.3s ease",
    },
    select: {
      padding: "8px",
      marginRight: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    progressBar: {
      width: "100%",
      height: "20px",
      backgroundColor: "#eee",
      borderRadius: "10px",
      overflow: "hidden",
    },
    progress: {
      height: "100%",
      backgroundColor: "#00c49a",
      transition: "width 0.3s ease",
    },
    teamMember: {
      padding: "10px",
      borderLeft: "3px solid #00c49a",
      marginBottom: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    contactButton: {
      padding: "5px 10px",
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    referralGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    referralCard: {
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    },
    referralButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    mentorGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    mentorCard: {
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    },
    mentorImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    availabilityButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    calendarModal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    calendarContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "90%",
    },
    timeSlot: {
      padding: "10px",
      margin: "5px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ddd",
      borderRadius: "4px",
      cursor: "pointer",
    },
    closeButton: {
      padding: "10px",
      backgroundColor: "#ff4444",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    backButton: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      zIndex: 1000,
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    jobPopupDetails: {
      margin: "20px 0",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    applyButton: {
      padding: "10px 20px",
      backgroundColor: "#00c49a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    tagsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "15px",
    },
    progressContainer: {
      marginTop: "10px",
    },
    skillsSection: {
      margin: "15px 0",
    },
    applicationForm: {
      margin: "20px 0",
    },
    textArea: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      marginBottom: "15px",
      resize: "vertical",
    },
    profileSection: {
      margin: "20px 0",
    },
    requestForm: {
      margin: "20px 0",
      padding: "15px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.sidebar1}>
        <h1>educate</h1>
        {[
          "HOME",
          "SEARCH",
          "HACKATHON",
          "FORUM",
          "EDUCATION",
          "CONNECT",
          "JOBS",
          "PROFILE",
          "LOG OUT",
        ].map((item, index) => (
          <div key={index} style={styles.sidebarItem}>
            <div
              style={styles.sidebarBox}
              onClick={() => handleSidebarClick(item)}
            >
              {item}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h1 style={styles.heading}>JOB</h1>
      </div>

      <div style={styles.tabContainer}>
        {[
          "job",
          "easyApply",
          "blog",
          "resume",
          "projects",
          "teamHunt",
          "pointTable",
          "referral",
          "jobHacker",
        ].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tabButton,
              ...(activeTab === tab ? styles.activeTab : {}),
              display: "block",
              whiteSpace: "nowrap",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        {/* App Status Button - Uses shared tabButton styles */}
        <button
          style={{
            ...styles.tabButton,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
          onClick={() => setShowAppStatusPopup(true)}
        >
          📊 App Status ({selectedJobs.length})
        </button>
      </div>

      {/* Application Status Popup */}
      {showAppStatusPopup && (
        <div style={styles.modalOverlay}>
          <div style={{
            backgroundColor: "#1a1a2e",
            padding: "30px",
            borderRadius: "24px",
            maxWidth: "700px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>📊 Application Status</h2>
              <button
                onClick={() => setShowAppStatusPopup(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Stats Summary */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                flex: 1,
                padding: "20px",
                background: "linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 196, 154, 0.1))",
                borderRadius: "16px",
                border: "1px solid rgba(0, 255, 136, 0.3)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "36px", fontWeight: "800", color: "#00ff88" }}>{selectedJobs.length}</div>
                <div style={{ fontSize: "14px", color: "#888" }}>Applied</div>
              </div>
              <div style={{
                flex: 1,
                padding: "20px",
                background: "linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(239, 68, 68, 0.1))",
                borderRadius: "16px",
                border: "1px solid rgba(255, 107, 107, 0.3)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "36px", fontWeight: "800", color: "#ff6b6b" }}>{rejectedJobs.length}</div>
                <div style={{ fontSize: "14px", color: "#888" }}>Skipped</div>
              </div>
            </div>

            {/* Applied Jobs List */}
            {selectedJobs.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ color: "#00ff88", fontSize: "18px", marginBottom: "12px" }}>✅ Applied Jobs</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedJobs.map((job, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      background: "rgba(0, 255, 136, 0.08)",
                      borderRadius: "12px",
                      border: "1px solid rgba(0, 255, 136, 0.2)",
                    }}>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "16px", color: "#ffffff" }}>{job.title}</div>
                        <div style={{ color: "#888", fontSize: "14px" }}>{job.company} • {job.jobType}</div>
                        <div style={{ color: "#00c49a", fontSize: "13px", marginTop: "4px" }}>{job.salary}</div>
                      </div>
                      <button
                        onClick={() => { setTrackerJob(job); setShowTrackerPopup(true); setShowAppStatusPopup(false); }}
                        style={{
                          ...styles.tabButton,
                          padding: "6px 14px",
                          fontSize: "12px",
                          background: "#00ff88",
                          color: "#0a0a0a",
                        }}
                      >
                        📋 Track Status
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skipped Jobs List */}
            {rejectedJobs.length > 0 && (
              <div>
                <h3 style={{ color: "#ff6b6b", fontSize: "18px", marginBottom: "12px" }}>⏭️ Skipped Jobs</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {rejectedJobs.map((job, idx) => (
                    <div key={idx} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      background: "rgba(255, 107, 107, 0.08)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 107, 107, 0.2)",
                    }}>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "16px" }}>{job.title}</div>
                        <div style={{ color: "#888", fontSize: "14px" }}>{job.company} • {job.jobType}</div>
                        <div style={{ color: "#888", fontSize: "13px", marginTop: "4px" }}>{job.salary}</div>
                      </div>
                      <span style={{
                        padding: "6px 14px",
                        background: "rgba(255, 107, 107, 0.3)",
                        color: "#ff6b6b",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}>
                        SKIPPED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedJobs.length === 0 && rejectedJobs.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
                <p>No applications yet. Start swiping in Quick Apply!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Application Tracker Popup */}
      {showTrackerPopup && trackerJob && (
        <div style={styles.modalOverlay}>
          <div style={{
            backgroundColor: "#1a1a2e",
            padding: "30px",
            borderRadius: "24px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#ffffff" }}>📋 Application Tracker</h2>
              <button
                onClick={() => { setShowTrackerPopup(false); setTrackerJob(null); }}
                style={{
                  ...styles.tabButton,
                  padding: "8px 16px",
                  fontSize: "16px",
                }}
              >
                ✕ Close
              </button>
            </div>

            {/* Job Details */}
            <div style={{
              padding: "20px",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
              borderRadius: "16px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              marginBottom: "24px",
            }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", color: "#ffffff" }}>{trackerJob.title}</h3>
              <p style={{ margin: "0 0 4px 0", color: "#a0a0a0" }}>{trackerJob.company} • {trackerJob.jobType}</p>
              <p style={{ margin: 0, color: "#10b981", fontWeight: "600" }}>{trackerJob.salary}</p>
            </div>

            {/* Application Timeline */}
            <h4 style={{ color: "#ffffff", fontSize: "16px", marginBottom: "16px" }}>Application Timeline</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Applied Step */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #10b981, #00ff88)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  color: "#0a0a0a",
                  flexShrink: 0,
                }}>✓</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#10b981" }}>Application Submitted</div>
                  <div style={{ color: "#888", fontSize: "14px" }}>Your resume has been sent to {trackerJob.company}</div>
                </div>
              </div>

              {/* Under Review Step */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "pulse 2s infinite",
                  flexShrink: 0,
                }}>⏳</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#f59e0b" }}>Under Review</div>
                  <div style={{ color: "#888", fontSize: "14px" }}>Hiring team is reviewing your application</div>
                </div>
              </div>

              {/* Interview Step */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(100, 100, 100, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  flexShrink: 0,
                }}>3</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#666" }}>Interview</div>
                  <div style={{ color: "#555", fontSize: "14px" }}>Pending review completion</div>
                </div>
              </div>

              {/* Decision Step */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(100, 100, 100, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  flexShrink: 0,
                }}>4</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#666" }}>Decision</div>
                  <div style={{ color: "#555", fontSize: "14px" }}>Final hiring decision</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                style={{
                  ...styles.tabButton,
                  flex: 1,
                }}
                onClick={() => { setShowTrackerPopup(false); setTrackerJob(null); }}
              >
                Close Tracker
              </button>
            </div>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default JobPortal;
