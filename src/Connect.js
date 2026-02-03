import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import CatchUp from "./CatchUp";
import "./orca.css";

const SocialConnect = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("connect");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // New state variables for popups and functionality
  const [showHotelSneakIn, setShowHotelSneakIn] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showContactResidents, setShowContactResidents] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [selectedGameRoom, setSelectedGameRoom] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormType, setCreateFormType] = useState("");
  const [joinedHotels, setJoinedHotels] = useState([]);
  const [username, setUsername] = useState("You");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    location: "",
    price: "",
    time: "",
    game: "",
    roomCode: "",
    type: "",
    capacity: "",
  });

  // New popup states for enhanced features
  const [showProfileDetail, setShowProfileDetail] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showHotelDetail, setShowHotelDetail] = useState(false);
  const [showResidentProfile, setShowResidentProfile] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [compatibilityData, setCompatibilityData] = useState(null);
  const [showGameDetail, setShowGameDetail] = useState(false);
  const [showGatheringDetail, setShowGatheringDetail] = useState(false);
  const [showTurfDetail, setShowTurfDetail] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiResponseText, setAIResponseText] = useState("");
  const [aiLoading, setAILoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "You",
    interests: ["Coding", "Gaming", "Music", "Travel", "Photography"],
    major: "Computer Science",
    habits: ["Early bird", "Gym enthusiast", "Clean"]
  });

  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      name: "DEVIKA MENON",
      country: "USA",
      role: "Software Developer",
      position: "Data Science Engineer At Amazon",
      followed: false,
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
      projects: [
        { name: "ML Pipeline Optimizer", description: "Built scalable ML pipeline reducing training time by 40%" },
        { name: "Customer Analytics Dashboard", description: "Real-time analytics dashboard using React and D3.js" }
      ],
      workExperience: [
        { company: "Amazon", role: "Data Science Engineer", years: "2021-Present" },
        { company: "Microsoft", role: "Software Engineer", years: "2019-2021" }
      ],
      education: [
        { school: "Stanford University", degree: "MS Computer Science", year: "2019" },
        { school: "UC Berkeley", degree: "BS Data Science", year: "2017" }
      ],
      skills: ["Python", "Machine Learning", "TensorFlow", "React", "SQL", "AWS"],
      interests: ["AI Research", "Hiking", "Photography", "Coding", "Travel"],
      mutualConnections: ["John", "Sarah", "Mike"]
    },
    {
      id: 2,
      name: "PRANOV",
      country: "USA",
      role: "AI Engineer",
      position: "Developer At AMAZON",
      followed: false,
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
      projects: [
        { name: "NLP Chatbot", description: "Conversational AI with 95% accuracy" },
        { name: "Computer Vision System", description: "Object detection for warehouse automation" }
      ],
      workExperience: [
        { company: "Amazon", role: "AI Developer", years: "2020-Present" },
        { company: "Google", role: "ML Engineer Intern", years: "2019-2020" }
      ],
      education: [
        { school: "MIT", degree: "MS Artificial Intelligence", year: "2020" },
        { school: "IIT Delhi", degree: "BTech Computer Science", year: "2018" }
      ],
      skills: ["Deep Learning", "PyTorch", "NLP", "Computer Vision", "Python", "Kubernetes"],
      interests: ["AI", "Gaming", "Music Production", "Basketball", "Coding"],
      mutualConnections: ["Emma", "David"]
    },
    {
      id: 3,
      name: "VIMAL",
      country: "India",
      role: "Developer",
      position: "Developer At Amazon",
      followed: false,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      projects: [
        { name: "E-commerce Platform", description: "Full-stack marketplace with 100K+ users" },
        { name: "Payment Gateway Integration", description: "Secure payment system with multiple providers" }
      ],
      workExperience: [
        { company: "Amazon", role: "Full Stack Developer", years: "2022-Present" },
        { company: "Flipkart", role: "Backend Developer", years: "2020-2022" }
      ],
      education: [
        { school: "IIT Madras", degree: "BTech Computer Science", year: "2020" }
      ],
      skills: ["Node.js", "React", "MongoDB", "AWS", "Docker", "GraphQL"],
      interests: ["Web Development", "Cricket", "Movies", "Travel", "Food"],
      mutualConnections: ["Alex", "Maria", "John"]
    },
    {
      id: 4,
      name: "SURYARAMAN",
      country: "India",
      role: "System Architect",
      position: "Developer At Zoho",
      followed: false,
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      projects: [
        { name: "Microservices Architecture", description: "Designed scalable system for 10M+ requests/day" },
        { name: "Cloud Migration", description: "Led migration of monolith to cloud-native architecture" }
      ],
      workExperience: [
        { company: "Zoho", role: "System Architect", years: "2021-Present" },
        { company: "Infosys", role: "Senior Developer", years: "2018-2021" }
      ],
      education: [
        { school: "NIT Trichy", degree: "MTech Software Engineering", year: "2018" },
        { school: "Anna University", degree: "BE Computer Science", year: "2016" }
      ],
      skills: ["System Design", "Kubernetes", "Java", "Spring Boot", "Redis", "PostgreSQL"],
      interests: ["Architecture", "Reading", "Chess", "Yoga", "Teaching"],
      mutualConnections: ["Sarah", "Mike"]
    },
    {
      id: 5,
      name: "JAGAVANTHA",
      country: "Germany",
      role: "AI Architect",
      position: "Developer At Apple",
      followed: false,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      projects: [
        { name: "Siri Improvements", description: "Enhanced voice recognition accuracy by 25%" },
        { name: "On-Device ML", description: "Optimized models for edge computing" }
      ],
      workExperience: [
        { company: "Apple", role: "AI Architect", years: "2020-Present" },
        { company: "Tesla", role: "ML Engineer", years: "2018-2020" }
      ],
      education: [
        { school: "TU Munich", degree: "PhD Machine Learning", year: "2018" },
        { school: "ETH Zurich", degree: "MS Computer Science", year: "2015" }
      ],
      skills: ["ML Architecture", "iOS Development", "Swift", "TensorFlow", "Research", "Leadership"],
      interests: ["AI Research", "Cycling", "Classical Music", "Skiing", "Innovation"],
      mutualConnections: ["Emma", "David", "Lisa"]
    },
    {
      id: 6,
      name: "ARSHAD",
      country: "India",
      role: "AI Architect",
      position: "Developer At Apple",
      followed: false,
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
      projects: [
        { name: "Face ID Enhancement", description: "Improved security and recognition speed" },
        { name: "AR Kit Optimization", description: "Real-time 3D object detection for AR" }
      ],
      workExperience: [
        { company: "Apple", role: "AI Architect", years: "2021-Present" },
        { company: "Facebook", role: "Computer Vision Engineer", years: "2019-2021" }
      ],
      education: [
        { school: "Carnegie Mellon", degree: "MS Robotics", year: "2019" },
        { school: "IIT Bombay", degree: "BTech Computer Science", year: "2017" }
      ],
      skills: ["Computer Vision", "ARKit", "Metal", "C++", "Python", "OpenCV"],
      interests: ["AR/VR", "Photography", "Gaming", "Fitness", "Tech Blogging"],
      mutualConnections: ["John", "Alex"]
    },
  ]);

  // Updated events with participants and friends data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Chess Tournament",
      organizer: "Alex Smith",
      organizerImg: "/img/chess.jpg",
      organizerBio: "Chess Grandmaster and event organizer",
      description: "Weekly chess tournament for all skill levels",
      type: "Gaming",
      registered: 24,
      maxCapacity: 32,
      venue: "Community Center Hall A",
      venueImages: ["/img/venue1.jpg", "/img/venue1-2.jpg", "/img/venue1-3.jpg"],
      address: "123 Community St, Downtown",
      dateTime: "Saturday, 7:00 PM - 10:00 PM",
      agenda: [
        "7:00 PM - Registration & Seating",
        "7:30 PM - Opening Ceremony",
        "8:00 PM - Round 1 Begins",
        "9:00 PM - Finals",
        "10:00 PM - Awards Ceremony"
      ],
      participants: ["John", "Sarah", "Mike", "David", "Emma"],
      participantDetails: [
        { name: "John", avatar: "/img/participant1.jpg", isFriend: true },
        { name: "Sarah", avatar: "/img/participant2.jpg", isFriend: true },
        { name: "Mike", avatar: "/img/participant3.jpg", isFriend: true },
        { name: "David", avatar: "/img/participant4.jpg", isFriend: false },
        { name: "Emma", avatar: "/img/participant5.jpg", isFriend: false },
      ],
      friends: ["John", "Sarah", "Mike"],
    },
    {
      id: 2,
      title: "Tech Meetup: AI & ML",
      organizer: "Maria Garcia",
      organizerImg: "/img/tech-organizer.jpg",
      organizerBio: "AI researcher and community leader",
      description: "Monthly meetup to discuss latest in AI and Machine Learning",
      type: "Technology",
      registered: 45,
      maxCapacity: 50,
      venue: "Tech Hub Conference Room",
      venueImages: ["/img/venue2.jpg", "/img/venue2-2.jpg"],
      address: "456 Innovation Blvd, Tech District",
      dateTime: "Friday, 6:30 PM - 9:00 PM",
      agenda: [
        "6:30 PM - Networking & Refreshments",
        "7:00 PM - Keynote: Future of AI",
        "7:45 PM - Panel Discussion",
        "8:30 PM - Q&A Session",
        "9:00 PM - Networking"
      ],
      participants: ["Alex", "Emma", "David", "Lisa"],
      participantDetails: [
        { name: "Alex", avatar: "/img/participant6.jpg", isFriend: true },
        { name: "Emma", avatar: "/img/participant7.jpg", isFriend: false },
      ],
      friends: ["Alex"],
    },
  ]);

  // Updated hotels with additional data for the sneak in feature
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Grand Plaza",
      image: "/img/hotel1.jpg",
      images: ["/img/hotel1.jpg", "/img/hotel1-2.jpg", "/img/hotel1-3.jpg", "/img/hotel1-4.jpg"],
      rating: 4.5,
      cuisine: "Multi-cuisine",
      price: "₹₹₹",
      friends: ["John", "Sarah", "Mike"],
      address: "123 Main St, Downtown",
      regularPrice: "₹3,500",
      friendDiscount: "₹2,800",
      amenities: ["Free Wi-Fi", "Swimming Pool", "Spa", "Gym", "24/7 Room Service"],
      nearbyLandmarks: ["City Center Mall - 0.5km", "Central Park - 1km", "Metro Station - 0.3km"],
      availability: "Available",
      residents: [
        {
          name: "John Martinez",
          photo: "/img/resident1.jpg",
          interests: ["Coding", "Gaming", "Music", "Travel"],
          major: "Computer Science",
          college: "MIT",
          year: "Senior",
          habits: ["Early bird", "Gym enthusiast", "Clean", "Social"],
          roomType: "Deluxe Suite"
        },
        {
          name: "Sarah Chen",
          photo: "/img/resident2.jpg",
          interests: ["Photography", "Hiking", "Coding", "Art"],
          major: "Data Science",
          college: "Stanford",
          year: "Junior",
          habits: ["Night owl", "Organized", "Quiet", "Studious"],
          roomType: "Standard Room"
        },
        {
          name: "Mike Johnson",
          photo: "/img/resident3.jpg",
          interests: ["Gaming", "Sports", "Music", "Movies"],
          major: "Business Analytics",
          college: "UC Berkeley",
          year: "Sophomore",
          habits: ["Social butterfly", "Clean", "Early bird", "Fitness freak"],
          roomType: "Shared Room"
        }
      ]
    },
    {
      id: 2,
      name: "Royal Feast",
      image: "/img/hotel2.jpg",
      images: ["/img/hotel2.jpg", "/img/hotel2-2.jpg", "/img/hotel2-3.jpg"],
      rating: 4.3,
      cuisine: "Continental",
      price: "₹₹",
      friends: ["Emma", "David"],
      address: "456 Park Ave, East Side",
      regularPrice: "₹2,800",
      friendDiscount: "₹2,100",
      amenities: ["Free Wi-Fi", "Restaurant", "Room Service", "Parking"],
      nearbyLandmarks: ["City Hospital - 0.8km", "Shopping District - 0.4km", "Bus Terminal - 0.6km"],
      availability: "Available",
      residents: [
        {
          name: "Emma Davis",
          photo: "/img/resident4.jpg",
          interests: ["Travel", "Photography", "Food", "Reading"],
          major: "Journalism",
          college: "Columbia",
          year: "Senior",
          habits: ["Organized", "Early riser", "Loves cooking", "Social"],
          roomType: "Executive Room"
        },
        {
          name: "David Kim",
          photo: "/img/resident5.jpg",
          interests: ["Music Production", "Gaming", "Coding", "Basketball"],
          major: "Music Technology",
          college: "NYU",
          year: "Junior",
          habits: ["Night owl", "Creative", "Clean", "Collaborative"],
          roomType: "Standard Room"
        }
      ]
    },
    {
      id: 3,
      name: "Spice Garden",
      image: "/img/hotel3.jpg",
      images: ["/img/hotel3.jpg", "/img/hotel3-2.jpg", "/img/hotel3-3.jpg", "/img/hotel3-4.jpg", "/img/hotel3-5.jpg"],
      rating: 4.7,
      cuisine: "Indian",
      price: "₹₹₹",
      friends: ["Alex", "Maria"],
      address: "789 Spice St, Beach Road",
      regularPrice: "₹3,200",
      friendDiscount: "₹2,600",
      amenities: ["Free Wi-Fi", "Restaurant", "Bar", "Concierge", "Beach Access", "Spa"],
      nearbyLandmarks: ["Beach - 0.2km", "Marina - 0.5km", "Tourist Information Center - 0.3km"],
      availability: "Limited Rooms",
      residents: [
        {
          name: "Alex Rodriguez",
          photo: "/img/resident6.jpg",
          interests: ["Fitness", "Yoga", "Travel", "Photography"],
          major: "Kinesiology",
          college: "UCLA",
          year: "Graduate",
          habits: ["Super fit", "Early bird", "Health conscious", "Friendly"],
          roomType: "Premium Suite"
        },
        {
          name: "Maria Garcia",
          photo: "/img/resident7.jpg",
          interests: ["Art", "Design", "Music", "Coding"],
          major: "Graphic Design",
          college: "Rhode Island School of Design",
          year: "Senior",
          habits: ["Creative", "Night owl", "Organized", "Collaborative"],
          roomType: "Deluxe Room"
        }
      ]
    },
  ]);

  // Updated accommodations with contact information and additional details
  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      name: "Student Commons",
      image: "/img/accommodation1.jpg",
      location: "Near University",
      roomType: "Shared - 2 Person",
      cost: "$500/month",
      residents: ["Emma", "Lisa"],
      amenities: ["WiFi", "Gym", "Study Room"],
      contactInfo: {
        owner: "University Housing",
        phone: "+1-555-123-4567",
        email: "housing@university.edu",
      },
      rules: ["No smoking", "Quiet hours 10PM-7AM", "No pets"],
      nearbyPlaces: [
        "University Campus",
        "Central Library",
        "Student Cafe",
        "Grand Plaza Hotel",
      ],
    },
    {
      id: 2,
      name: "Campus View",
      image: "/img/accommodation2.jpg",
      location: "University District",
      roomType: "Single Room",
      cost: "$700/month",
      residents: ["John"],
      amenities: ["WiFi", "Parking", "Laundry"],
      contactInfo: {
        owner: "Campus Realty",
        phone: "+1-555-987-6543",
        email: "info@campusrealty.com",
      },
      rules: [
        "No parties",
        "No alterations to property",
        "Visitors limited to 2 at a time",
      ],
      nearbyPlaces: [
        "University Bus Stop",
        "Campus Gym",
        "Grocery Store",
        "Royal Feast Hotel",
      ],
    },
    {
      id: 3,
      name: "Graduate Housing",
      image: "/img/accommodation3.jpg",
      location: "Downtown",
      roomType: "Studio",
      cost: "$900/month",
      residents: ["Mike", "Sarah"],
      amenities: ["WiFi", "Gym", "Pool"],
      contactInfo: {
        owner: "City Properties",
        phone: "+1-555-456-7890",
        email: "contact@cityproperties.com",
      },
      rules: [
        "No smoking",
        "No loud music after 9PM",
        "Proper garbage disposal",
      ],
      nearbyPlaces: [
        "Downtown Mall",
        "Public Park",
        "Metro Station",
        "Spice Garden Hotel",
      ],
    },
  ]);

  // Updated game rooms with player details
  const [gameRooms, setGameRooms] = useState([
    {
      id: 1,
      game: "Call of Duty",
      icon: "🎮",
      activePlayers: 12,
      roomCode: "COD-123",
      status: "In Progress",
      skillLevel: "Intermediate",
      image: "/img/cod.jpg",
      rules: "Team Deathmatch - First to 100 kills wins. No camping allowed.",
      schedule: "Daily 6PM - 10PM",
      host: "John",
      players: [
        { name: "John", level: 34, type: "Assault", avatar: "/img/player1.jpg" },
        { name: "Sarah", level: 42, type: "Sniper", avatar: "/img/player2.jpg" },
        { name: "Mike", level: 28, type: "Support", avatar: "/img/player3.jpg" },
        { name: "Emma", level: 37, type: "Medic", avatar: "/img/player4.jpg" },
      ],
      capacity: 16,
      mode: "Team Deathmatch",
    },
    {
      id: 2,
      game: "PUBG",
      icon: "🎯",
      activePlayers: 8,
      roomCode: "PUBG-456",
      status: "Waiting",
      skillLevel: "Advanced",
      image: "/img/pubg.jpg",
      rules: "Battle Royale - Last team standing wins. All weapons allowed.",
      schedule: "Weekends 3PM - 7PM",
      host: "Alex",
      players: [
        { name: "Alex", level: 51, type: "Rusher", avatar: "/img/player5.jpg" },
        { name: "Maria", level: 48, type: "Sniper", avatar: "/img/player6.jpg" },
        { name: "David", level: 45, type: "Scout", avatar: "/img/player7.jpg" },
      ],
      capacity: 12,
      mode: "Battle Royale",
    },
    {
      id: 3,
      game: "Fortnite",
      icon: "🎮",
      activePlayers: 15,
      roomCode: "FN-789",
      status: "In Progress",
      skillLevel: "Beginner",
      image: "/img/fortnite.jpg",
      rules: "Squad mode - Build, fight, survive. Victory Royale!",
      schedule: "Daily 7PM - 11PM",
      host: "Lisa",
      players: [
        { name: "Lisa", level: 39, type: "Builder", avatar: "/img/player8.jpg" },
        { name: "Tom", level: 27, type: "Shooter", avatar: "/img/player9.jpg" },
        { name: "Kevin", level: 44, type: "Tactician", avatar: "/img/player10.jpg" },
        { name: "Emily", level: 31, type: "Support", avatar: "/img/player11.jpg" },
      ],
      capacity: 20,
      mode: "Squad",
    },
    {
      id: 4,
      game: "Chess",
      icon: "♟️",
      activePlayers: 6,
      roomCode: "CHESS-101",
      status: "Waiting",
      skillLevel: "Intermediate",
      image: "/img/chess-game.jpg",
      rules: "Standard chess rules. 10 minute rapid games.",
      schedule: "Daily 5PM - 9PM",
      host: "David",
      players: [
        { name: "David", level: 45, type: "Strategist", avatar: "/img/player12.jpg" },
        { name: "Emma", level: 38, type: "Tactician", avatar: "/img/player13.jpg" },
      ],
      capacity: 8,
      mode: "Tournament",
    },
    {
      id: 5,
      game: "Valorant",
      icon: "🔫",
      activePlayers: 10,
      roomCode: "VAL-555",
      status: "In Progress",
      skillLevel: "Advanced",
      image: "/img/valorant.jpg",
      rules: "Competitive 5v5 tactical shooter. Best of 25 rounds.",
      schedule: "Daily 8PM - 12AM",
      host: "Sarah",
      players: [
        { name: "Sarah", level: 42, type: "Duelist", avatar: "/img/player14.jpg" },
        { name: "Mike", level: 39, type: "Controller", avatar: "/img/player15.jpg" },
        { name: "John", level: 41, type: "Sentinel", avatar: "/img/player16.jpg" },
      ],
      capacity: 10,
      mode: "Competitive",
    },
    {
      id: 6,
      game: "Among Us",
      icon: "🚀",
      activePlayers: 9,
      roomCode: "AMONG-999",
      status: "Waiting",
      skillLevel: "Beginner",
      image: "/img/amongus.jpg",
      rules: "Find the impostor! Complete tasks or vote them out.",
      schedule: "Daily 6PM - 10PM",
      host: "Tom",
      players: [
        { name: "Tom", level: 22, type: "Crewmate", avatar: "/img/player17.jpg" },
        { name: "Lisa", level: 25, type: "Detective", avatar: "/img/player18.jpg" },
      ],
      capacity: 10,
      mode: "Classic",
    },
    {
      id: 7,
      game: "Minecraft",
      icon: "⛏️",
      activePlayers: 7,
      roomCode: "MC-777",
      status: "In Progress",
      skillLevel: "Beginner",
      image: "/img/minecraft.jpg",
      rules: "Survival mode - Build, mine, survive together!",
      schedule: "24/7 Server",
      host: "Kevin",
      players: [
        { name: "Kevin", level: 35, type: "Builder", avatar: "/img/player19.jpg" },
        { name: "Emily", level: 30, type: "Explorer", avatar: "/img/player20.jpg" },
      ],
      capacity: 20,
      mode: "Survival",
    },
  ]);

  const [turfBookings, setTurfBookings] = useState([
    {
      id: 1,
      name: "Green Field Arena",
      game: "Football",
      time: "6:00 PM - 7:00 PM",
      price: "₹800/hour",
      dailyRate: "₹5000/day",
      location: "North Zone, Sports Complex",
      address: "Plot 45, Sports Complex, North District",
      images: ["/img/turf1.jpg", "/img/turf1-2.jpg", "/img/turf1-3.jpg"],
      availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
      playersJoined: ["John", "Mike", "Sarah"],
      playerDetails: [
        { name: "John Martinez", avatar: "/img/player1.jpg", skillLevel: "Intermediate", position: "Forward" },
        { name: "Mike Johnson", avatar: "/img/player3.jpg", skillLevel: "Advanced", position: "Midfielder" },
        { name: "Sarah Chen", avatar: "/img/player2.jpg", skillLevel: "Beginner", position: "Defender" },
      ],
      maxPlayers: 10,
      image: "/img/turf1.jpg",
      teams: [
        { name: "Red Devils", members: 5, skillAvg: "Intermediate" },
        { name: "Blue Eagles", members: 3, skillAvg: "Advanced" }
      ],
      matchDetails: { date: "Tomorrow 6PM", format: "5v5", duration: "60 mins" }
    },
    {
      id: 2,
      name: "Sports Hub",
      game: "Cricket",
      time: "5:00 PM - 6:00 PM",
      price: "₹1000/hour",
      dailyRate: "₹6000/day",
      location: "Central Stadium",
      address: "Stadium Road, City Center",
      images: ["/img/turf2.jpg", "/img/turf2-2.jpg"],
      availableSlots: ["5:00 PM", "6:00 PM", "7:00 PM"],
      playersJoined: ["Alex", "Emma", "David"],
      playerDetails: [
        { name: "Alex Rodriguez", avatar: "/img/player5.jpg", skillLevel: "Advanced", position: "Batsman" },
        { name: "Emma Davis", avatar: "/img/player4.jpg", skillLevel: "Intermediate", position: "All-rounder" },
        { name: "David Kim", avatar: "/img/player7.jpg", skillLevel: "Beginner", position: "Bowler" },
      ],
      maxPlayers: 12,
      image: "/img/turf2.jpg",
      teams: [
        { name: "Warriors", members: 6, skillAvg: "Intermediate" }
      ],
      matchDetails: { date: "This Weekend", format: "T20", duration: "3 hours" }
    },
    {
      id: 3,
      name: "Indoor Arena",
      game: "Basketball",
      time: "7:00 PM - 8:00 PM",
      price: "₹600/hour",
      dailyRate: "₹4000/day",
      location: "Sports Center, West Wing",
      address: "456 West Ave, Downtown",
      images: ["/img/turf3.jpg", "/img/turf3-2.jpg", "/img/turf3-3.jpg"],
      availableSlots: ["7:00 PM", "8:00 PM", "9:00 PM"],
      playersJoined: ["Lisa", "Tom"],
      playerDetails: [
        { name: "Lisa Wang", avatar: "/img/player8.jpg", skillLevel: "Advanced", position: "Point Guard" },
        { name: "Tom Wilson", avatar: "/img/player9.jpg", skillLevel: "Intermediate", position: "Center" },
      ],
      maxPlayers: 8,
      image: "/img/turf3.jpg",
      teams: [],
      matchDetails: { date: "Today 7PM", format: "3v3", duration: "60 mins" }
    },
  ]);

  // ORCA AI API Key - loaded from environment variable
  const ORCA_API_KEY = process.env.REACT_APP_ORCA_API_KEY;

  // Compatibility Calculator
  const calculateCompatibility = (user1, user2) => {
    if (!user1 || !user2) return null;

    const interests1 = user1.interests || [];
    const interests2 = user2.interests || [];

    // Find common interests
    const commonInterests = interests1.filter(interest =>
      interests2.includes(interest)
    );

    // Calculate score (0-100)
    const maxPossible = Math.max(interests1.length, interests2.length);
    const score = maxPossible > 0 ? Math.round((commonInterests.length / maxPossible) * 100) : 0;

    // Categorize compatibility
    let level = "Low";
    let color = "danger";
    if (score >= 70) {
      level = "High";
      color = "success";
    } else if (score >= 40) {
      level = "Medium";
      color = "warning";
    }

    return {
      score,
      level,
      color,
      commonInterests,
      user1Interests: interests1,
      user2Interests: interests2,
      breakdown: {
        hobbies: commonInterests.filter(i => ["Gaming", "Photography", "Music", "Travel", "Sports"].includes(i)).length,
        academic: commonInterests.filter(i => ["Coding", "AI", "Research", "Teaching", "Reading"].includes(i)).length,
        lifestyle: commonInterests.filter(i => ["Fitness", "Yoga", "Hiking", "Food", "Movies"].includes(i)).length
      }
    };
  };

  // AI-Powered Compatibility Analysis using ORCA
  const analyzeCompatibilityWithAI = async (user1, user2) => {
    setAILoading(true);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are ORCA 🐋, an advanced AI compatibility analyst. Analyze roommate compatibility based on interests, habits, and lifestyle. Provide insightful, actionable recommendations."
            },
            {
              role: "user",
              content: `Analyze compatibility between these two potential roommates:
              
Profile 1: ${user1.name || "User 1"}
- Interests: ${(user1.interests || []).join(", ")}
- Major: ${user1.major || "N/A"}
- Habits: ${(user1.habits || []).join(", ")}

Profile 2: ${user2.name || "User 2"}
- Interests: ${(user2.interests || []).join(", ")}
- Major: ${user2.major || "N/A"}
- Habits: ${(user2.habits || []).join(", ")}

Provide a detailed compatibility analysis including strengths, potential challenges, and recommendations for living together.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            "Authorization": `Bearer ${ORCA_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const aiAnalysis = response.data.choices[0].message.content;
      setAIResponseText(aiAnalysis);
      setShowAIResponse(true);
      return aiAnalysis;
    } catch (error) {
      console.error("ORCA AI Error:", error);
      setAIResponseText("Unable to analyze compatibility at this time. Please try again later.");
      setShowAIResponse(true);
    } finally {
      setAILoading(false);
    }
  };

  // AI-Powered Interest Matching
  const getAIRecommendations = async (userProfile, category) => {
    setAILoading(true);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are ORCA 🐋, a smart recommendation engine. Provide personalized recommendations based on user interests and preferences."
            },
            {
              role: "user",
              content: `Based on this user profile, recommend ${category}:
              
Interests: ${(userProfile.interests || []).join(", ")}
Major: ${userProfile.major || "N/A"}

Provide 3-5 specific recommendations with brief explanations.`
            }
          ],
          temperature: 0.8,
          max_tokens: 400
        },
        {
          headers: {
            "Authorization": `Bearer ${ORCA_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const recommendations = response.data.choices[0].message.content;
      setAIResponseText(recommendations);
      setShowAIResponse(true);
      return recommendations;
    } catch (error) {
      console.error("ORCA AI Error:", error);
      setAIResponseText("Unable to generate recommendations at this time.");
      setShowAIResponse(true);
    } finally {
      setAILoading(false);
    }
  };

  // Profile Insights using AI
  const getProfileInsights = async (profile) => {
    setAILoading(true);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are ORCA 🐋, a professional profile analyzer. Provide constructive insights and suggestions for profile improvement."
            },
            {
              role: "user",
              content: `Analyze this professional profile and provide insights:

Name: ${profile.name}
Role: ${profile.role}
Skills: ${(profile.skills || []).join(", ")}
Projects: ${(profile.projects || []).map(p => p.name).join(", ")}
Interests: ${(profile.interests || []).join(", ")}

Provide insights on strengths, areas for improvement, and career suggestions.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            "Authorization": `Bearer ${ORCA_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const insights = response.data.choices[0].message.content;
      setAIResponseText(insights);
      setShowAIResponse(true);
      return insights;
    } catch (error) {
      console.error("ORCA AI Error:", error);
      setAIResponseText("Unable to generate profile insights at this time.");
      setShowAIResponse(true);
    } finally {
      setAILoading(false);
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
      default:
        break;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const allData = flashcards.map((card) => card.name);
    const results = allData.filter((item) =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleFollow = (id) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id ? { ...card, followed: !card.followed } : card
    );
    setFlashcards(updatedFlashcards);
  };

  // New handler functions for interactive features
  const handleJoinHotel = (hotelId) => {
    if (!joinedHotels.includes(hotelId)) {
      setJoinedHotels([...joinedHotels, hotelId]);

      // Update hotel friends list
      const updatedHotels = hotels.map((hotel) => {
        if (hotel.id === hotelId) {
          return {
            ...hotel,
            friends: [...hotel.friends, username],
          };
        }
        return hotel;
      });

      setHotels(updatedHotels);
      setShowHotelSneakIn(false);
    }
  };

  const handleJoinGameRoom = (roomId) => {
    // Add player to game room
    const updatedGameRooms = gameRooms.map((room) => {
      if (room.id === roomId) {
        const newPlayer = {
          name: username,
          level: Math.floor(Math.random() * 50) + 1,
          type: "New Player",
        };
        return {
          ...room,
          players: [...room.players, newPlayer],
          activePlayers: room.activePlayers + 1,
        };
      }
      return room;
    });

    setGameRooms(updatedGameRooms);
    setShowJoinRoom(false);
  };

  const handleRegisterEvent = (eventId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: [...event.participants, username],
          registered: event.registered + 1,
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setShowEventDetails(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateItem = (e) => {
    e.preventDefault();

    const newId = Date.now();

    switch (createFormType) {
      case "hotel":
        const newHotel = {
          id: newId,
          name: formData.name,
          image: formData.image || "/img/hotel1.jpg",
          rating: 4.0,
          cuisine: formData.description,
          price: formData.price,
          friends: [],
          address: formData.location,
          regularPrice: formData.price,
          friendDiscount: (
            parseFloat(formData.price.replace(/[^0-9]/g, "")) * 0.8
          ).toFixed(0),
          amenities: ["Free Wi-Fi", "Room Service"],
          nearbyLandmarks: ["City Center", "Bus Stop"],
        };
        setHotels([...hotels, newHotel]);
        break;

      case "accommodation":
        const newAccommodation = {
          id: newId,
          name: formData.name,
          image: formData.image || "/img/accommodation1.jpg",
          location: formData.location,
          roomType: formData.description,
          cost: formData.price,
          residents: [],
          amenities: ["WiFi", "Basic Utilities"],
          contactInfo: {
            owner: "Property Owner",
            phone: "+1-555-000-0000",
            email: "contact@example.com",
          },
          rules: ["Standard property rules apply"],
          nearbyPlaces: ["Local convenience stores", "Public transportation"],
        };
        setAccommodations([...accommodations, newAccommodation]);
        break;

      case "gameRoom":
        const newGameRoom = {
          id: newId,
          game: formData.name,
          icon: "🎮",
          activePlayers: 1,
          roomCode: formData.roomCode || `GAME-${newId.toString().slice(-3)}`,
          status: "Waiting",
          players: [{ name: username, level: 10, type: "Host" }],
          capacity: parseInt(formData.capacity) || 10,
          mode: formData.description,
        };
        setGameRooms([...gameRooms, newGameRoom]);
        break;

      case "event":
        const newEvent = {
          id: newId,
          title: formData.name,
          organizer: username,
          organizerImg: "/img/chess.jpg",
          description: formData.description,
          type: formData.type || "Social",
          registered: 1,
          maxCapacity: parseInt(formData.capacity) || 20,
          participants: [username],
          friends: [],
        };
        setEvents([...events, newEvent]);
        break;

      default:
        break;
    }

    // Reset form
    setFormData({
      name: "",
      image: "",
      description: "",
      location: "",
      price: "",
      time: "",
      game: "",
      roomCode: "",
      type: "",
      capacity: "",
    });

    setShowCreateForm(false);
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sidebar1: {
      position: "fixed",
      width: "200px",
      height: "100%",
      fontFamily: "cursive",
      backgroundColor: "#333",
      display: "flex",
      flexDirection: "column",
      paddingTop: "15px",
      paddingBottom: "20px",
      color: "#f4f4f4",
      gap: "5px",
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
    nav: {
      display: "flex",
      gap: "15px",
      marginBottom: "30px",
      padding: "15px",
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
    },
    button: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    connectButton: {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    hotelsButton: {
      backgroundColor: "#FF5722",
      color: "white",
    },
    accommodationButton: {
      backgroundColor: "#2196F3",
      color: "white",
    },
    gamesButton: {
      backgroundColor: "#9C27B0",
      color: "white",
    },
    gatheringButton: {
      backgroundColor: "#FF9800",
      color: "white",
    },
    turfButton: {
      backgroundColor: "#795548",
      color: "white",
    },
    orcaButton: {
      backgroundColor: "#00bcd4",
      color: "white",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      margin: "10px",
      width: "calc(33.33% - 20px)",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    cardGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "20px",
      marginLeft: "220px",
    },
    cardImage: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    friendsList: {
      display: "flex",
      gap: "5px",
      flexWrap: "wrap",
      margin: "10px 0",
    },
    friendChip: {
      backgroundColor: "#e0e0e0",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
    },
    addEventButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      borderRadius: "20px",
      margin: "20px 0",
    },
    Head: {
      fontSize: "20px",
      marginTop: "30px",
      fontFamily: "cursive",
    },
    searchSection: {
      marginLeft: "200px",
      padding: "20px",
      textAlign: "center",
    },
    searchInput: {
      padding: "10px",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    searchResults: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    searchResultItem: {
      backgroundColor: "#444",
      color: "#fff",
      padding: "15px",
      borderRadius: "5px",
    },
    flashcardContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginLeft: "250px",
      marginTop: "30px",
    },
    flashcard: {
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "30%",
      padding: "15px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
      textAlign: "center",
    },
    profilePic: {
      width: "50px",
      height: "50px",
      backgroundColor: "#aaa",
      borderRadius: "50%",
      margin: "0 auto 10px",
    },
    userInfo: {
      color: "#555",
    },
    followBtn: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    followBtnFollowed: {
      backgroundColor: "#28a745",
    },
    turfCard: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      margin: "10px",
      width: "calc(33.33% - 20px)",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    joinButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    },
    // New styles for the features
    sneakInButton: {
      backgroundColor: "#FF9800",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
      marginRight: "10px",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "90vh",
      overflowY: "auto",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "22px",
      cursor: "pointer",
    },
    modalHeader: {
      borderBottom: "1px solid #ddd",
      paddingBottom: "10px",
      marginBottom: "15px",
    },
    modalImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    modalSection: {
      marginBottom: "15px",
    },
    playerList: {
      marginTop: "10px",
    },
    playerItem: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #eee",
    },
    playerIcon: {
      width: "30px",
      height: "30px",
      backgroundColor: "#ddd",
      borderRadius: "50%",
      marginRight: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    playerInfo: {
      flex: 1,
    },
    playerLevel: {
      backgroundColor: "#f0f0f0",
      padding: "3px 8px",
      borderRadius: "10px",
      fontSize: "12px",
    },
    amenitiesList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      margin: "10px 0",
    },
    amenityChip: {
      backgroundColor: "#e0e0e0",
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
    },
    priceTag: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      backgroundColor: "#f9f9f9",
      borderRadius: "5px",
      margin: "10px 0",
    },
    originalPrice: {
      textDecoration: "line-through",
      color: "#999",
    },
    discountedPrice: {
      color: "#4CAF50",
      fontWeight: "bold",
    },
    createButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      borderRadius: "20px",
      margin: "20px 0 20px 220px",
      border: "none",
      cursor: "pointer",
    },
    formGroup: {
      marginBottom: "15px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    formInput: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    formSubmitButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 15px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      width: "100%",
      marginTop: "15px",
    },

    // ORCA styles remain unchanged
    app: {
      maxWidth: "100vw",
      minHeight: "100vh",
      padding: "20px",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    appHeading: {
      fontSize: "42px",
      textAlign: "center",
      marginTop: "40px",
      marginBottom: "30px",
      fontWeight: "800",
      letterSpacing: "2px",
      position: "relative",
      display: "inline-block",
      width: "100%",
      background: "linear-gradient(90deg, #6c5ce7, #72afff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    },
    searchButton: {
      backgroundColor: "#6c5ce7",
      color: "white",
      borderRadius: "6px",
      padding: "8px 15px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 10px rgba(108, 92, 231, 0.3)",
      border: "none",
      transition: "all 0.2s ease-in-out",
      marginLeft: "8px",
      cursor: "pointer",
    },
    voiceButton: {
      backgroundColor: "#6c5ce7",
      color: "white",
      borderRadius: "6px",
      padding: "8px 15px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 10px rgba(108, 92, 231, 0.3)",
      border: "none",
      transition: "all 0.2s ease-in-out",
      marginLeft: "8px",
      cursor: "pointer",
    },
    voiceButtonListening: {
      backgroundColor: "#ff6b6b",
      animation: "pulse 1.5s infinite",
    },
    settingsButton: {
      backgroundColor: "#6c5ce7",
      color: "white",
      borderRadius: "6px",
      padding: "8px 15px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 10px rgba(108, 92, 231, 0.3)",
      border: "none",
      transition: "all 0.2s ease-in-out",
      marginLeft: "8px",
      cursor: "pointer",
    },
    chooseButton: {
      backgroundColor: "#6c5ce7",
      color: "white",
      borderRadius: "6px",
      padding: "8px 15px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 10px rgba(108, 92, 231, 0.3)",
      border: "none",
      transition: "all 0.2s ease-in-out",
      marginLeft: "8px",
      cursor: "pointer",
    },
    createAppButton: {
      backgroundColor: "#00b894",
      color: "white",
      borderRadius: "6px",
      padding: "8px 15px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 2px 8px rgba(0, 184, 148, 0.3)",
      border: "none",
      transition: "all 0.2s ease-in-out",
      marginLeft: "8px",
      cursor: "pointer",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "32px",
      flexWrap: "wrap",
      gap: "8px",
    },
    searchContainerInput: {
      flex: 1,
      maxWidth: "500px",
      padding: "12px 16px",
      borderRadius: "6px",
      border: "1px solid #333333",
      backgroundColor: "#2a2a2a",
      color: "#e0e0e0",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.2s ease",
    },
    loading: {
      textAlign: "center",
      padding: "24px",
      margin: "20px auto",
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      width: "100%",
      maxWidth: "600px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },
    loadingSpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontWeight: "500",
    },
    error: {
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      color: "#ff6b6b",
      padding: "16px",
      borderRadius: "10px",
      margin: "20px auto",
      maxWidth: "600px",
      textAlign: "center",
      border: "1px solid rgba(255, 107, 107, 0.3)",
    },
    projectCards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
      marginTop: "32px",
      marginLeft: "220px",
    },
    projectCard: {
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      border: "1px solid #333333",
    },
    projectCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#252525",
      borderColor: "#6c5ce7",
    },
    projectCardTitle: {
      fontSize: "20px",
      marginBottom: "6px",
      color: "#e0e0e0",
    },
    projectCardOwner: {
      fontSize: "14px",
      color: "#a0a0a0",
      marginBottom: "12px",
    },
    projectCardDescription: {
      fontSize: "14px",
      color: "#a0a0a0",
      marginBottom: "16px",
      lineHeight: "1.5",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    projectStats: {
      display: "flex",
      gap: "16px",
      marginTop: "16px",
    },
    projectStatsSpan: {
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      color: "#a0a0a0",
    },
    groqSearchResults: {
      marginTop: "40px",
      marginLeft: "220px",
    },
    groqSearchResultsTitle: {
      marginBottom: "20px",
      paddingBottom: "10px",
      borderBottom: "1px solid #333333",
    },
    groqProjectCards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
    groqProjectCard: {
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      border: "1px solid #333333",
    },
    groqProjectCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#252525",
      borderColor: "#6c5ce7",
    },
    groqProjectCardTitle: {
      fontSize: "18px",
      marginBottom: "8px",
    },
    projectMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "16px",
    },
    projectMetaSpan: {
      display: "inline-block",
      padding: "4px 10px",
      backgroundColor: "#2a2a2a",
      borderRadius: "20px",
      fontSize: "12px",
      color: "#e0e0e0",
    },
    languageTag: {
      backgroundColor: "rgba(108, 92, 231, 0.2)",
      color: "#6c5ce7",
    },
    starsTag: {
      backgroundColor: "rgba(255, 202, 87, 0.2)",
      color: "#feca57",
    },
    beginnerTag: {
      backgroundColor: "rgba(0, 184, 148, 0.2)",
      color: "#00b894",
    },
    intermediateTag: {
      backgroundColor: "rgba(255, 202, 87, 0.2)",
      color: "#feca57",
    },
    advancedTag: {
      backgroundColor: "rgba(255, 107, 107, 0.2)",
      color: "#ff6b6b",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginBottom: "16px",
    },
    tag: {
      display: "inline-block",
      padding: "3px 8px",
      backgroundColor: "#2a2a2a",
      borderRadius: "4px",
      fontSize: "12px",
      color: "#a0a0a0",
    },
    cardActions: {
      marginTop: "16px",
    },
    viewRepoBtn: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#6c5ce7",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    },
    viewRepoBtnHover: {
      backgroundColor: "#8075e5",
      transform: "translateY(-2px)",
    },
    speechPopup: {
      position: "fixed",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "300px",
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      overflow: "hidden",
      border: "1px solid #6c5ce7",
    },
    speechPopupHeader: {
      backgroundColor: "#6c5ce7",
      color: "white",
      padding: "12px 16px",
      fontSize: "16px",
      fontWeight: "500",
    },
    speechTranscript: {
      padding: "16px",
      minHeight: "60px",
      maxHeight: "200px",
      overflowY: "auto",
      fontSize: "14px",
      color: "#e0e0e0",
    },
    listeningIndicator: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px",
      gap: "6px",
    },
    voiceSettingsPopup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "400px",
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      zIndex: 1000,
      overflow: "hidden",
      border: "1px solid #333333",
    },
    voiceSettingsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#0d0d0d",
      borderBottom: "1px solid #333333",
    },
    voiceSettingsTitle: {
      margin: 0,
      fontSize: "18px",
    },
    closeBtn: {
      background: "none",
      border: "none",
      color: "#a0a0a0",
      fontSize: "24px",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    closeBtnHover: {
      color: "#e0e0e0",
    },
    voiceSettingsContent: {
      padding: "20px",
    },
    settingGroup: {
      marginBottom: "20px",
    },
    settingGroupLabel: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
    },
    settingGroupSelect: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #333333",
      backgroundColor: "#2a2a2a",
      color: "#e0e0e0",
      fontSize: "14px",
      outline: "none",
      transition: "all 0.2s ease",
    },
    saveSettingsBtn: {
      backgroundColor: "#6c5ce7",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "10px 16px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      width: "100%",
      transition: "backgroundColor 0.2s ease",
    },
    saveSettingsBtnHover: {
      backgroundColor: "#8075e5",
    },
    voiceResponse: {
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      padding: "20px",
      marginBottom: "32px",
      border: "1px solid #333333",
      maxWidth: "800px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    voiceResponseTitle: {
      fontSize: "18px",
      marginBottom: "16px",
      color: "#6c5ce7",
      borderBottom: "1px solid #333333",
      paddingBottom: "8px",
    },
    responseContent: {
      fontSize: "14px",
      lineHeight: "1.6",
      marginBottom: "16px",
    },
    speakAgain: {
      backgroundColor: "#72afff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "backgroundColor 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "8px",
    },
    speakAgainHover: {
      backgroundColor: "#5a9eff",
    },
    followupQuestion: {
      backgroundColor: "#1e1e1e",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "24px",
      borderLeft: "4px solid #feca57",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      maxWidth: "800px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    followupQuestionText: {
      margin: 0,
      flex: 1,
      fontWeight: "500",
    },
    answerButton: {
      backgroundColor: "#feca57",
      color: "#333",
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "backgroundColor 0.2s ease",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
    },
    answerButtonHover: {
      backgroundColor: "#ffdb94",
    },
    githubUI: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 40px)",
      backgroundColor: "#121212",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      border: "1px solid #333333",
      marginLeft: "200px",
    },
    githubHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      backgroundColor: "#0d0d0d",
      borderBottom: "1px solid #333333",
    },
    repoTitle: {
      flex: 1,
      textAlign: "center",
    },
    repoTitleText: {
      margin: 0,
      fontSize: "20px",
      color: "#e0e0e0",
    },
    githubHeaderActions: {
      display: "flex",
      gap: "8px",
    },
    explainCodebaseButton: {
      backgroundColor: "#2a2a2a",
      color: "#e0e0e0",
      border: "1px solid #333333",
      borderRadius: "6px",
      padding: "8px 12px",
      fontSize: "13px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s ease",
    },
    explainCodebaseButtonHover: {
      backgroundColor: "#6c5ce7",
      color: "white",
      borderColor: "#6c5ce7",
    },
    appCreator: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 40px)",
      backgroundColor: "#121212",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      border: "1px solid #333333",
      marginLeft: "200px",
    },
    appCreatorHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      backgroundColor: "#0d0d0d",
      borderBottom: "1px solid #333333",
    },
  };

  // ============ NEW ENHANCED POPUP COMPONENTS ============

  // Reusable Modal Component - uses CSS classes from orca.css
  const Modal = ({ isOpen, onClose, title, children, width = "600px" }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>×</button>
          {title && <h2>{title}</h2>}
          <div>
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Profile Detail Popup (LinkedIn-style) with Gradient Theme
  const ProfileDetailPopup = () => {
    if (!showProfileDetail || !selectedProfile) return null;

    const cardStyle = {
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '14px',
      borderRadius: '12px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(8px)'
    };

    const labelStyle = { color: '#ffffff', fontWeight: 600 };
    const textStyle = { color: 'rgba(255, 255, 255, 0.9)' };
    const dimStyle = { color: 'rgba(255, 255, 255, 0.75)', fontSize: '13px' };

    return (
      <Modal
        isOpen={showProfileDetail}
        onClose={() => setShowProfileDetail(false)}
        title="Professional Profile"
        width="700px"
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={selectedProfile.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"}
            alt={selectedProfile.name}
            style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid rgba(255, 255, 255, 0.8)', objectFit: 'cover', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)' }}
          />
          <h3 style={{ color: '#ffffff', fontSize: '22px', marginTop: '16px', marginBottom: '8px' }}>{selectedProfile.name}</h3>
          <p style={dimStyle}>{selectedProfile.position}</p>
          <p style={dimStyle}>📍 {selectedProfile.country}</p>
        </div>

        {selectedProfile.projects && selectedProfile.projects.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>🚀 Projects</h4>
            {selectedProfile.projects.map((project, idx) => (
              <div key={idx} style={cardStyle}>
                <strong style={labelStyle}>{project.name}</strong>
                <p style={{ ...dimStyle, margin: "6px 0 0 0" }}>{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {selectedProfile.workExperience && selectedProfile.workExperience.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>💼 Work Experience</h4>
            {selectedProfile.workExperience.map((work, idx) => (
              <div key={idx} style={{ marginBottom: "12px" }}>
                <span style={labelStyle}>{work.role}</span>
                <span style={textStyle}> at {work.company}</span>
                <p style={{ ...dimStyle, margin: "4px 0 0 0" }}>{work.years}</p>
              </div>
            ))}
          </div>
        )}

        {selectedProfile.education && selectedProfile.education.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>🎓 Education</h4>
            {selectedProfile.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: "12px" }}>
                <span style={labelStyle}>{edu.degree}</span>
                <span style={textStyle}> - {edu.school}</span>
                <p style={{ ...dimStyle, margin: "4px 0 0 0" }}>{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {selectedProfile.skills && selectedProfile.skills.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>🛠️ Skills</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedProfile.skills.map((skill, idx) => (
                <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.25)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.3)' }}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {selectedProfile.interests && selectedProfile.interests.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>❤️ Interests</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedProfile.interests.map((interest, idx) => (
                <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.35)', color: '#ffffff', padding: "8px 16px", borderRadius: "20px", fontSize: "13px" }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedProfile.mutualConnections && selectedProfile.mutualConnections.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>🤝 Mutual Connections ({selectedProfile.mutualConnections.length})</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedProfile.mutualConnections.map((conn, idx) => (
                <span key={idx} style={{ background: 'rgba(0, 184, 148, 0.4)', border: '1px solid rgba(0, 184, 148, 0.6)', color: '#ffffff', padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                  {conn}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            width: "100%",
            marginTop: "24px",
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => getProfileInsights(selectedProfile)}
        >
          🐋 Get AI Insights with ORCA
        </button>
      </Modal>
    );
  };

  // Image Carousel Component
  const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    return (
      <div className="image-carousel">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
        <div className="carousel-controls">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    );
  };

  // Hotel Detail Popup
  const HotelDetailPopup = () => {
    if (!showHotelDetail || !selectedHotel) return null;

    return (
      <Modal
        isOpen={showHotelDetail}
        onClose={() => setShowHotelDetail(false)}
        title={selectedHotel.name}
        width="800px"
      >
        <ImageCarousel images={selectedHotel.images} />

        <div style={{ marginTop: "20px" }}>
          <p><strong>📍 Location:</strong> {selectedHotel.address}</p>
          <p><strong>⭐ Rating:</strong> {selectedHotel.rating} / 5.0</p>
          <p><strong>💰 Price:</strong> {selectedHotel.regularPrice} (Friend Discount: {selectedHotel.friendDiscount})</p>
          <p><strong>🍽️ Cuisine:</strong> {selectedHotel.cuisine}</p>
          <p><strong>✅ Availability:</strong> {selectedHotel.availability}</p>
        </div>

        <div style={{ marginTop: "15px" }}>
          <h4>🎯 Amenities</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedHotel.amenities.map((amenity, idx) => (
              <span key={idx} style={{ background: "var(--success)", color: "white", padding: "5px 12px", borderRadius: "12px", fontSize: "12px" }}>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <h4>📍 Nearby Landmarks</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {selectedHotel.nearbyLandmarks.map((landmark, idx) => (
              <p key={idx} style={{ fontSize: "14px", margin: 0 }}>• {landmark}</p>
            ))}
          </div>
        </div>

        {selectedHotel.residents && selectedHotel.residents.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4>🏠 People Living Here</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {selectedHotel.residents.map((resident, idx) => (
                <div key={idx} style={{ background: "var(--bg-input)", padding: "12px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{resident.name}</strong>
                    <p style={{ fontSize: "12px", color: "var(--text-dim)", margin: "3px 0" }}>{resident.major} • {resident.college}</p>
                    <p style={{ fontSize: "12px", margin: "3px 0" }}>{resident.roomType}</p>
                  </div>
                  <button
                    className="feature-button"
                    onClick={() => {
                      setSelectedResident(resident);
                      setShowResidentProfile(true);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    );
  };

  // Resident Profile Popup
  const ResidentProfilePopup = () => {
    if (!showResidentProfile || !selectedResident) return null;

    return (
      <Modal
        isOpen={showResidentProfile}
        onClose={() => setShowResidentProfile(false)}
        title="Resident Profile"
        width="600px"
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={selectedResident.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"}
            alt={selectedResident.name}
            className="profile-photo-lg"
          />
          <h3>{selectedResident.name}</h3>
          <p style={{ color: "var(--text-dim)" }}>{selectedResident.major} • {selectedResident.college}</p>
          <p style={{ fontSize: "12px", color: "var(--text-dim)" }}>{selectedResident.year}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h4>🎯 Interests</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedResident.interests.map((interest, idx) => (
              <span key={idx} style={{ background: "var(--primary)", color: "white", padding: "5px 12px", borderRadius: "12px", fontSize: "13px" }}>
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h4>✨ Habits & Lifestyle</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedResident.habits.map((habit, idx) => (
              <span key={idx} style={{ background: "var(--bg-input)", padding: "5px 12px", borderRadius: "12px", fontSize: "13px" }}>
                {habit}
              </span>
            ))}
          </div>
        </div>

        <button
          style={{ ...styles.button, backgroundColor: "var(--accent)", width: "100%", marginTop: "10px" }}
          onClick={() => {
            const compatibility = calculateCompatibility(currentUser, selectedResident);
            setCompatibilityData(compatibility);
            setShowCompatibility(true);
          }}
        >
          🔬 Check Compatibility
        </button>

        <button
          style={{ ...styles.button, backgroundColor: "var(--secondary)", width: "100%", marginTop: "10px" }}
          onClick={() => analyzeCompatibilityWithAI(currentUser, selectedResident)}
        >
          🐋 AI Compatibility Analysis
        </button>
      </Modal>
    );
  };

  // Compatibility Popup
  const CompatibilityPopup = () => {
    if (!showCompatibility || !compatibilityData) return null;

    return (
      <Modal
        isOpen={showCompatibility}
        onClose={() => setShowCompatibility(false)}
        title="Compatibility Analysis"
        width="600px"
      >
        <div style={{ textAlign: "center" }}>
          <div className={`compatibility-circle compatibility-${compatibilityData.color}`}>
            {compatibilityData.score}%
          </div>
          <h3 style={{ color: `var(--${compatibilityData.color})` }}>
            {compatibilityData.level} Compatibility
          </h3>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>🤝 Common Interests ({compatibilityData.commonInterests.length})</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
            {compatibilityData.commonInterests.map((interest, idx) => (
              <span key={idx} style={{ background: "var(--success)", color: "white", padding: "5px 12px", borderRadius: "12px", fontSize: "13px" }}>
                ✓ {interest}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>📊 Category Breakdown</h4>

          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span>Hobbies</span>
              <span>{compatibilityData.breakdown.hobbies}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${(compatibilityData.breakdown.hobbies / 5) * 100}%` }}
              />
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span>Academic</span>
              <span>{compatibilityData.breakdown.academic}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${(compatibilityData.breakdown.academic / 5) * 100}%` }}
              />
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span>Lifestyle</span>
              <span>{compatibilityData.breakdown.lifestyle}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${(compatibilityData.breakdown.lifestyle / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // Game Detail Popup
  const GameDetailPopup = () => {
    if (!showGameDetail || !selectedGameRoom) return null;

    return (
      <Modal
        isOpen={showGameDetail}
        onClose={() => setShowGameDetail(false)}
        title={`${selectedGameRoom.icon} ${selectedGameRoom.game}`}
        width="700px"
      >
        <div style={{ marginBottom: "15px" }}>
          <img
            src={selectedGameRoom.image}
            alt={selectedGameRoom.game}
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <div>
            <p><strong>Room Code:</strong> {selectedGameRoom.roomCode}</p>
            <p><strong>Status:</strong> <span style={{ color: selectedGameRoom.status === "In Progress" ? "var(--success)" : "var(--warning)" }}>{selectedGameRoom.status}</span></p>
          </div>
          <div>
            <p><strong>Players:</strong> {selectedGameRoom.activePlayers}/{selectedGameRoom.capacity}</p>
            <p><strong>Skill Level:</strong> <span className={`skill-badge ${selectedGameRoom.skillLevel.toLowerCase()}`}>{selectedGameRoom.skillLevel}</span></p>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h4>📜 Rules</h4>
          <p style={{ background: "var(--bg-input)", padding: "10px", borderRadius: "8px" }}>{selectedGameRoom.rules}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h4>⏰ Schedule</h4>
          <p>{selectedGameRoom.schedule}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <h4>👥 Players ({selectedGameRoom.players.length})</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedGameRoom.players.map((player, idx) => (
              <div key={idx} style={{ background: "var(--bg-input)", padding: "10px", borderRadius: "8px", minWidth: "150px" }}>
                <strong>{player.name}</strong>
                <p style={{ fontSize: "12px", color: "var(--text-dim)", margin: "3px 0" }}>Level {player.level}</p>
                <p style={{ fontSize: "12px", margin: 0 }}>{player.type}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          style={{ ...styles.button, backgroundColor: "var(--primary)", width: "100%" }}
          onClick={() => handleJoinGameRoom(selectedGameRoom.id)}
        >
          Join Room
        </button>
      </Modal>
    );
  };

  // Gathering Detail Popup
  const GatheringDetailPopup = () => {
    if (!showGatheringDetail || !selectedEvent) return null;

    return (
      <Modal
        isOpen={showGatheringDetail}
        onClose={() => setShowGatheringDetail(false)}
        title={selectedEvent.title}
        width="750px"
      >
        {selectedEvent.venueImages && (
          <ImageCarousel images={selectedEvent.venueImages} />
        )}

        <div style={{ marginTop: "20px" }}>
          <p><strong>🏢 Venue:</strong> {selectedEvent.venue}</p>
          <p><strong>📍 Address:</strong> {selectedEvent.address}</p>
          <p><strong>📅 Date & Time:</strong> {selectedEvent.dateTime}</p>
          <p><strong>👤 Organizer:</strong> {selectedEvent.organizer}</p>
          {selectedEvent.organizerBio && <p style={{ fontSize: "14px", color: "var(--text-dim)" }}>{selectedEvent.organizerBio}</p>}
          <p><strong>👥 Registered:</strong> {selectedEvent.registered}/{selectedEvent.maxCapacity}</p>
        </div>

        {selectedEvent.agenda && (
          <div style={{ marginTop: "15px" }}>
            <h4>📋 Agenda</h4>
            <div style={{ background: "var(--bg-input)", padding: "15px", borderRadius: "8px" }}>
              {selectedEvent.agenda.map((item, idx) => (
                <p key={idx} style={{ margin: "5px 0" }}>• {item}</p>
              ))}
            </div>
          </div>
        )}

        {selectedEvent.participantDetails && (
          <div style={{ marginTop: "15px" }}>
            <h4>👥 Attendees</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedEvent.participantDetails.map((participant, idx) => (
                <div key={idx} style={{
                  background: participant.isFriend ? "var(--primary)" : "var(--bg-input)",
                  color: participant.isFriend ? "white" : "var(--text)",
                  padding: "8px 15px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}>
                  {participant.isFriend && "⭐"} {participant.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          style={{ ...styles.button, backgroundColor: "var(--success)", width: "100%", marginTop: "20px" }}
          onClick={() => handleRegisterEvent(selectedEvent.id)}
        >
          Register for Event
        </button>
      </Modal>
    );
  };

  // Turf Detail Popup
  const TurfDetailPopup = () => {
    if (!showTurfDetail || !selectedTurf) return null;

    return (
      <Modal
        isOpen={showTurfDetail}
        onClose={() => setShowTurfDetail(false)}
        title={selectedTurf.name}
        width="800px"
      >
        <ImageCarousel images={selectedTurf.images} />

        <div style={{ marginTop: "20px" }}>
          <p><strong>🎯 Sport:</strong> {selectedTurf.game}</p>
          <p><strong>📍 Location:</strong> {selectedTurf.location}</p>
          <p><strong>🏠 Address:</strong> {selectedTurf.address}</p>
          <p><strong>💰 Price:</strong> {selectedTurf.price} (Daily: {selectedTurf.dailyRate})</p>
          <p><strong>⏰ Time:</strong> {selectedTurf.time}</p>
        </div>

        <div style={{ marginTop: "15px" }}>
          <h4>📅 Available Slots</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedTurf.availableSlots.map((slot, idx) => (
              <button
                key={idx}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {selectedTurf.playerDetails && (
          <div style={{ marginTop: "15px" }}>
            <h4>👥 Current Players ({selectedTurf.playerDetails.length}/{selectedTurf.maxPlayers})</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedTurf.playerDetails.map((player, idx) => (
                <div key={idx} style={{ background: "var(--bg-input)", padding: "10px", borderRadius: "8px", minWidth: "180px" }}>
                  <strong>{player.name}</strong>
                  <p style={{ fontSize: "12px", color: "var(--text-dim)", margin: "3px 0" }}>
                    <span className={`skill-badge ${player.skillLevel.toLowerCase()}`}>{player.skillLevel}</span>
                  </p>
                  <p style={{ fontSize: "12px", margin: 0 }}>{player.position}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTurf.teams && selectedTurf.teams.length > 0 && (
          <div style={{ marginTop: "15px" }}>
            <h4>🏆 Teams</h4>
            {selectedTurf.teams.map((team, idx) => (
              <div key={idx} style={{ background: "var(--bg-input)", padding: "10px", borderRadius: "8px", marginBottom: "8px" }}>
                <strong>{team.name}</strong>
                <span style={{ marginLeft: "10px", fontSize: "12px", color: "var(--text-dim)" }}>
                  {team.members} members • Avg Skill: {team.skillAvg}
                </span>
              </div>
            ))}
          </div>
        )}

        {selectedTurf.matchDetails && (
          <div style={{ marginTop: "15px", background: "var(--bg-input)", padding: "15px", borderRadius: "8px" }}>
            <h4>⚽ Match Details</h4>
            <p><strong>Date:</strong> {selectedTurf.matchDetails.date}</p>
            <p><strong>Format:</strong> {selectedTurf.matchDetails.format}</p>
            <p><strong>Duration:</strong> {selectedTurf.matchDetails.duration}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            style={{ ...styles.button, backgroundColor: "var(--success)", flex: 1 }}
            onClick={() => setShowTeamForm(true)}
          >
            Create New Team
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "var(--primary)", flex: 1 }}
          >
            Join Existing Team
          </button>
        </div>
      </Modal>
    );
  };

  // Team Formation Popup
  const TeamFormationPopup = () => {
    if (!showTeamForm) return null;

    return (
      <Modal
        isOpen={showTeamForm}
        onClose={() => setShowTeamForm(false)}
        title="Create New Team"
        width="500px"
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Team Name</label>
            <input
              type="text"
              placeholder="Enter team name"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Your Position</label>
            <select style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text)" }}>
              <option>Select Position</option>
              <option>Forward</option>
              <option>Midfielder</option>
              <option>Defender</option>
              <option>Goalkeeper</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Skill Level</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="button" className="skill-badge beginner" style={{ flex: 1, cursor: "pointer" }}>Beginner</button>
              <button type="button" className="skill-badge intermediate" style={{ flex: 1, cursor: "pointer" }}>Intermediate</button>
              <button type="button" className="skill-badge advanced" style={{ flex: 1, cursor: "pointer" }}>Advanced</button>
            </div>
          </div>

          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: "var(--success)", width: "100%" }}
          >
            Create Team
          </button>
        </form>
      </Modal>
    );
  };

  // AI Response Popup
  const AIResponsePopup = () => {
    if (!showAIResponse) return null;

    return (
      <Modal
        isOpen={showAIResponse}
        onClose={() => setShowAIResponse(false)}
        title="🐋 ORCA AI Analysis"
        width="650px"
      >
        {aiLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p style={{ marginTop: "20px" }}>ORCA is analyzing...</p>
          </div>
        ) : (
          <div style={{ background: "var(--bg-input)", padding: "20px", borderRadius: "8px", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {aiResponseText}
          </div>
        )}
      </Modal>
    );
  };

  // Popup components
  const HotelSneakInPopup = () => {
    if (!showHotelSneakIn || !selectedHotel) return null;

    const isJoined = joinedHotels.includes(selectedHotel.id);

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeButton}
            onClick={() => setShowHotelSneakIn(false)}
          >
            ×
          </button>
          <div style={styles.modalHeader}>
            <h2>{selectedHotel.name}</h2>
          </div>
          <img
            src={selectedHotel.image}
            alt={selectedHotel.name}
            style={styles.modalImage}
          />

          <div style={styles.modalSection}>
            <h3>Hotel Details</h3>
            <p>
              <strong>Rating:</strong> {selectedHotel.rating} ⭐
            </p>
            <p>
              <strong>Cuisine:</strong> {selectedHotel.cuisine}
            </p>
            <p>
              <strong>Address:</strong> {selectedHotel.address}
            </p>
          </div>

          <div style={styles.modalSection}>
            <h3>Amenities</h3>
            <div style={styles.amenitiesList}>
              {selectedHotel.amenities.map((amenity, index) => (
                <span key={index} style={styles.amenityChip}>
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.modalSection}>
            <h3>Nearby Landmarks</h3>
            <div style={styles.amenitiesList}>
              {selectedHotel.nearbyLandmarks.map((landmark, index) => (
                <span key={index} style={styles.amenityChip}>
                  {landmark}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.modalSection}>
            <h3>Friends Staying Here</h3>
            <div style={styles.friendsList}>
              {selectedHotel.friends.map((friend) => (
                <span key={friend} style={styles.friendChip}>
                  {friend}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.priceTag}>
            <div>
              <div style={styles.originalPrice}>
                Regular: {selectedHotel.regularPrice}
              </div>
              <div style={styles.discountedPrice}>
                Friends Discount: {selectedHotel.friendDiscount}
              </div>
            </div>
            <button
              style={styles.joinButton}
              onClick={() => handleJoinHotel(selectedHotel.id)}
              disabled={isJoined}
            >
              {isJoined ? "Joined" : "Join Friends"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ContactResidentsPopup = () => {
    if (!showContactResidents || !selectedAccommodation) return null;

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeButton}
            onClick={() => setShowContactResidents(false)}
          >
            ×
          </button>
          <div style={styles.modalHeader}>
            <h2>{selectedAccommodation.name}</h2>
          </div>
          <img
            src={selectedAccommodation.image}
            alt={selectedAccommodation.name}
            style={styles.modalImage}
          />

          <div style={styles.modalSection}>
            <h3>Accommodation Details</h3>
            <p>
              <strong>Location:</strong> {selectedAccommodation.location}
            </p>
            <p>
              <strong>Room Type:</strong> {selectedAccommodation.roomType}
            </p>
            <p>
              <strong>Cost:</strong> {selectedAccommodation.cost}
            </p>
          </div>

          <div style={styles.modalSection}>
            <h3>Current Residents</h3>
            <div style={styles.friendsList}>
              {selectedAccommodation.residents.map((resident) => (
                <span key={resident} style={styles.friendChip}>
                  {resident}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.modalSection}>
            <h3>House Rules</h3>
            <ul>
              {selectedAccommodation.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <div style={styles.modalSection}>
            <h3>Nearby Places</h3>
            <div style={styles.amenitiesList}>
              {selectedAccommodation.nearbyPlaces.map((place, index) => (
                <span key={index} style={styles.amenityChip}>
                  {place}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.modalSection}>
            <h3>Contact Information</h3>
            <p>
              <strong>Owner:</strong> {selectedAccommodation.contactInfo.owner}
            </p>
            <p>
              <strong>Phone:</strong> {selectedAccommodation.contactInfo.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedAccommodation.contactInfo.email}
            </p>
            <button style={styles.joinButton}>Contact Owner</button>
          </div>
        </div>
      </div>
    );
  };

  const JoinRoomPopup = () => {
    if (!showJoinRoom || !selectedGameRoom) return null;

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeButton}
            onClick={() => setShowJoinRoom(false)}
          >
            ×
          </button>
          <div style={styles.modalHeader}>
            <h2>{selectedGameRoom.game} Room</h2>
            <p>Room Code: {selectedGameRoom.roomCode}</p>
          </div>

          <div style={styles.modalSection}>
            <h3>Game Information</h3>
            <p>
              <strong>Status:</strong> {selectedGameRoom.status}
            </p>
            <p>
              <strong>Mode:</strong> {selectedGameRoom.mode || "Team Play"}
            </p>
            <p>
              <strong>Players:</strong> {selectedGameRoom.activePlayers}/
              {selectedGameRoom.capacity}
            </p>
          </div>

          <div style={styles.modalSection}>
            <h3>Current Players</h3>
            <div style={styles.playerList}>
              {selectedGameRoom.players.map((player, index) => (
                <div key={index} style={styles.playerItem}>
                  <div style={styles.playerIcon}>{player.name.charAt(0)}</div>
                  <div style={styles.playerInfo}>
                    <div>{player.name}</div>
                    <div>Type: {player.type}</div>
                  </div>
                  <div style={styles.playerLevel}>Lvl {player.level}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            style={styles.joinButton}
            onClick={() => handleJoinGameRoom(selectedGameRoom.id)}
          >
            Join Game
          </button>
        </div>
      </div>
    );
  };

  const EventDetailsPopup = () => {
    if (!showEventDetails || !selectedEvent) return null;

    const isRegistered = selectedEvent.participants.includes(username);

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeButton}
            onClick={() => setShowEventDetails(false)}
          >
            ×
          </button>
          <div style={styles.modalHeader}>
            <h2>{selectedEvent.title}</h2>
          </div>

          <div style={styles.modalSection}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={selectedEvent.organizerImg}
                alt={selectedEvent.organizer}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <div>
                <h3>Organized by: {selectedEvent.organizer}</h3>
              </div>
            </div>
            <p>{selectedEvent.description}</p>
            <p>
              <strong>Event Type:</strong> {selectedEvent.type}
            </p>
            <p>
              <strong>Participants:</strong> {selectedEvent.registered}/
              {selectedEvent.maxCapacity}
            </p>
          </div>

          <div style={styles.modalSection}>
            <h3>Participants</h3>
            <div style={styles.playerList}>
              {selectedEvent.participants.map((participant, index) => (
                <div key={index} style={styles.playerItem}>
                  <div style={styles.playerIcon}>{participant.charAt(0)}</div>
                  <div style={styles.playerInfo}>
                    <div>{participant}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {selectedEvent.friends &&
                        selectedEvent.friends.includes(participant)
                        ? "Your Friend"
                        : "Participant"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            style={styles.joinButton}
            onClick={() => handleRegisterEvent(selectedEvent.id)}
            disabled={isRegistered}
          >
            {isRegistered ? "Registered" : "Register for Event"}
          </button>
        </div>
      </div>
    );
  };

  const CreateForm = () => {
    if (!showCreateForm) return null;

    let formTitle = "";
    let formFields = [];

    switch (createFormType) {
      case "hotel":
        formTitle = "Create New Hotel";
        formFields = [
          { name: "name", label: "Hotel Name", type: "text", required: true },
          { name: "image", label: "Image URL (optional)", type: "text" },
          {
            name: "description",
            label: "Cuisine Type",
            type: "text",
            required: true,
          },
          { name: "location", label: "Address", type: "text", required: true },
          { name: "price", label: "Price (₹)", type: "text", required: true },
        ];
        break;

      case "accommodation":
        formTitle = "Create New Accommodation";
        formFields = [
          {
            name: "name",
            label: "Accommodation Name",
            type: "text",
            required: true,
          },
          { name: "image", label: "Image URL (optional)", type: "text" },
          {
            name: "description",
            label: "Room Type",
            type: "text",
            required: true,
          },
          { name: "location", label: "Location", type: "text", required: true },
          {
            name: "price",
            label: "Monthly Cost",
            type: "text",
            required: true,
          },
        ];
        break;

      case "gameRoom":
        formTitle = "Create New Game Room";
        formFields = [
          { name: "name", label: "Game Name", type: "text", required: true },
          {
            name: "description",
            label: "Game Mode",
            type: "text",
            required: true,
          },
          { name: "roomCode", label: "Room Code (optional)", type: "text" },
          {
            name: "capacity",
            label: "Max Capacity",
            type: "number",
            required: true,
          },
        ];
        break;

      case "event":
        formTitle = "Create New Event";
        formFields = [
          { name: "name", label: "Event Title", type: "text", required: true },
          {
            name: "description",
            label: "Event Description",
            type: "text",
            required: true,
          },
          { name: "type", label: "Event Type", type: "text", required: true },
          {
            name: "capacity",
            label: "Max Capacity",
            type: "number",
            required: true,
          },
        ];
        break;

      default:
        break;
    }

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeButton}
            onClick={() => setShowCreateForm(false)}
          >
            ×
          </button>
          <div style={styles.modalHeader}>
            <h2>{formTitle}</h2>
          </div>

          <form onSubmit={handleCreateItem}>
            {formFields.map((field) => (
              <div key={field.name} style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  style={styles.formInput}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleFormChange}
                  required={field.required}
                />
              </div>
            ))}

            <button type="submit" style={styles.formSubmitButton}>
              Create
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderConnect = () => (
    <div>
      <div style={styles.searchSection}>
        <div style={styles.Head}>
          <h1>CONNECT</h1>
        </div>

        <input
          type="text"
          placeholder="Search Profile..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <div style={styles.searchResults}>
          {searchResults.length > 0
            ? searchResults.map((result, index) => (
              <div key={index} style={styles.searchResultItem}>
                {result}
              </div>
            ))
            : searchTerm && <div>No results found</div>}
        </div>
      </div>

      <div style={styles.flashcardContainer}>
        {flashcards.map((card) => (
          <div key={card.id} style={styles.flashcard}>
            <div style={styles.profilePic}>
              <img
                src={card.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"}
                alt="Profile"
                style={{ ...styles.profilePic, objectFit: "cover" }}
              />
            </div>
            <div style={styles.userInfo}>
              <h3>{card.name}</h3>
              <p>Country: {card.country}</p>
              <p>{card.role}</p>
              <p>{card.position}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  style={{
                    ...styles.followBtn,
                    ...(card.followed ? styles.followBtnFollowed : {}),
                  }}
                  onClick={() => handleFollow(card.id)}
                >
                  {card.followed ? "Followed" : "Follow"}
                </button>
                <button
                  className="feature-button"
                  style={{ fontSize: "12px", padding: "8px 12px" }}
                  onClick={() => {
                    setSelectedProfile(card);
                    setShowProfileDetail(true);
                  }}
                >
                  ⭐ Feature
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render all new popups */}
      <ProfileDetailPopup />
      <AIResponsePopup />
    </div>
  );

  const renderHotels = () => (
    <div>
      <button
        style={styles.createButton}
        onClick={() => {
          setCreateFormType("hotel");
          setShowCreateForm(true);
        }}
      >
        + Create New Hotel
      </button>

      <div style={styles.cardGrid}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={styles.card}>
            <img src={hotel.image} alt={hotel.name} style={styles.cardImage} />
            <h3>{hotel.name}</h3>
            <div>Rating: {hotel.rating} ⭐</div>
            <div>Price Range: {hotel.price}</div>
            <div>Cuisine: {hotel.cuisine}</div>
            <div>
              <h4>Friends Here:</h4>
              <div style={styles.friendsList}>
                {hotel.friends.map((friend) => (
                  <span key={friend} style={styles.friendChip}>
                    {friend}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}>
              <button
                style={{ ...styles.sneakInButton, flex: 1 }}
                onClick={() => {
                  setSelectedHotel(hotel);
                  setShowHotelSneakIn(true);
                }}
              >
                Sneak In
              </button>
              <button
                className="feature-button"
                style={{ flex: 1, padding: "8px", fontSize: "13px" }}
                onClick={() => {
                  setSelectedHotel(hotel);
                  setShowHotelDetail(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <HotelSneakInPopup />
      <HotelDetailPopup />
      <ResidentProfilePopup />
      <CompatibilityPopup />
      <AIResponsePopup />
    </div>
  );

  const renderAccommodations = () => (
    <div>
      <button
        style={styles.createButton}
        onClick={() => {
          setCreateFormType("accommodation");
          setShowCreateForm(true);
        }}
      >
        + Create New Accommodation
      </button>

      <div style={styles.cardGrid}>
        {accommodations.map((acc) => (
          <div key={acc.id} style={styles.card}>
            <img src={acc.image} alt={acc.name} style={styles.cardImage} />
            <h3>{acc.name}</h3>
            <div>Location: {acc.location}</div>
            <div>Room Type: {acc.roomType}</div>
            <div>Cost: {acc.cost}</div>
            <div>
              <h4>Current Residents:</h4>
              <div style={styles.friendsList}>
                {acc.residents.map((resident) => (
                  <span key={resident} style={styles.friendChip}>
                    {resident}
                  </span>
                ))}
              </div>
            </div>
            <button
              style={{ ...styles.button, backgroundColor: "#2196F3" }}
              onClick={() => {
                setSelectedAccommodation(acc);
                setShowContactResidents(true);
              }}
            >
              Contact Residents
            </button>
          </div>
        ))}
      </div>

      <ContactResidentsPopup />
    </div>
  );

  const renderGameLobby = () => (
    <div>
      <button
        style={styles.createButton}
        onClick={() => {
          setCreateFormType("gameRoom");
          setShowCreateForm(true);
        }}
      >
        + Create New Game Room
      </button>

      <div style={styles.cardGrid}>
        {gameRooms.map((room) => (
          <div key={room.id} style={styles.card} onClick={() => {
            setSelectedGameRoom(room);
            setShowGameDetail(true);
          }} style={{ ...styles.card, cursor: "pointer" }}>
            <h3>
              {room.icon} {room.game}
            </h3>
            <div>Active Players: {room.activePlayers}/{room.capacity}</div>
            <div>Room Code: {room.roomCode}</div>
            <div>Status: <span style={{ color: room.status === "In Progress" ? "var(--success)" : "var(--warning)" }}>{room.status}</span></div>
            <div style={{ marginTop: "8px" }}>
              <span className={`skill-badge ${room.skillLevel.toLowerCase()}`}>{room.skillLevel}</span>
            </div>
            <button
              className="feature-button"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGameRoom(room);
                setShowGameDetail(true);
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <JoinRoomPopup />
      <GameDetailPopup />
    </div>
  );

  const renderGathering = () => (
    <div>
      <button
        style={styles.createButton}
        onClick={() => {
          setCreateFormType("event");
          setShowCreateForm(true);
        }}
      >
        🎉 Add New Event
      </button>

      <div style={styles.cardGrid}>
        {events.map((event) => (
          <div key={event.id} style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={event.organizerImg}
                alt={event.organizer}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <div>
                <h3>{event.title}</h3>
                <div>Organized by: {event.organizer}</div>
              </div>
            </div>
            <p>{event.description}</p>
            <div>Event Type: {event.type}</div>
            <div>
              Registered: {event.registered}/{event.maxCapacity}
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={{ ...styles.button, backgroundColor: "#FF9800", flex: 1 }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventDetails(true);
                }}
              >
                Join
              </button>
              <button
                className="feature-button"
                style={{ flex: 1 }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowGatheringDetail(true);
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <EventDetailsPopup />
      <GatheringDetailPopup />
    </div>
  );

  const renderTurf = () => (
    <div>
      <div style={styles.cardGrid}>
        {turfBookings.map((turf) => (
          <div key={turf.id} style={styles.turfCard}>
            <img src={turf.image} alt={turf.name} style={styles.cardImage} />
            <h3>{turf.name}</h3>
            <div>Game: {turf.game}</div>
            <div>Time: {turf.time}</div>
            <div>Price: {turf.price}</div>
            <div>
              Players: {turf.playersJoined.length}/{turf.maxPlayers}
            </div>
            <div style={styles.friendsList}>
              {turf.playersJoined.map((player) => (
                <span key={player} style={styles.friendChip}>
                  {player}
                </span>
              ))}
            </div>
            <button
              className="feature-button"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => {
                setSelectedTurf(turf);
                setShowTurfDetail(true);
              }}
            >
              View Details & Book
            </button>
          </div>
        ))}
      </div>

      <TurfDetailPopup />
      <TeamFormationPopup />
    </div>
  );

  // OrcaMain component (based on the first codebase's App component)
  const OrcaMain = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [githubProjects, setGithubProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isGithubView, setIsGithubView] = useState(false);
    const [projectFiles, setProjectFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [currentTab, setCurrentTab] = useState("code");
    const [fileLoading, setFileLoading] = useState(false);
    const [fileLoadError, setFileLoadError] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [showSpeechPopup, setShowSpeechPopup] = useState(false);
    const [chatResponse, setChatResponse] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [needsFollowUp, setNeedsFollowUp] = useState(false);
    const [followUpQuestion, setFollowUpQuestion] = useState("");
    const [waitingForFollowUp, setWaitingForFollowUp] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [chatMinimized, setChatMinimized] = useState(false);
    const [useGroq, setUseGroq] = useState(true);
    const [availableVoices, setAvailableVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [voiceLanguage, setVoiceLanguage] = useState("en-US");
    const [showVoiceSettings, setShowVoiceSettings] = useState(false);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [newUserQuery, setNewUserQuery] = useState("");
    const [projectRecommendations, setProjectRecommendations] = useState([]);
    const [isProcessingNewUserQuery, setIsProcessingNewUserQuery] =
      useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [groqSearchResults, setGroqSearchResults] = useState([]);
    const [isGroqSearching, setIsGroqSearching] = useState(false);
    const [isExplainingCodebase, setIsExplainingCodebase] = useState(false);
    const [codebaseExplanation, setCodebaseExplanation] = useState("");
    const [isGeneratingCode, setIsGeneratingCode] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");
    const [isAppCreatorOpen, setIsAppCreatorOpen] = useState(false);
    const [codeEditorContent, setCodeEditorContent] = useState("");
    const [appCreatorFiles, setAppCreatorFiles] = useState([]);
    const [activeAppFile, setActiveAppFile] = useState(null);
    const [appCreatorChatHistory, setAppCreatorChatHistory] = useState([]);
    const [appDescription, setAppDescription] = useState("");
    const [isCreatingApp, setIsCreatingApp] = useState(false);
    const [appRequirements, setAppRequirements] = useState("");
    const [appGenerationStep, setAppGenerationStep] = useState("initial");
    const [generatedAppFiles, setGeneratedAppFiles] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isAppCreatorListening, setIsAppCreatorListening] = useState(false);
    const [appCreatorTranscript, setAppCreatorTranscript] = useState("");
    const [isAiHelperProcessing, setIsAiHelperProcessing] = useState(false);
    const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] =
      useState("react");
    const [showPreview, setShowPreview] = useState(false);
    const [previewDevice, setPreviewDevice] = useState("desktop");
    const [previewHtml, setPreviewHtml] = useState("");
    const [previewError, setPreviewError] = useState(null);
    const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
    const [isGeneratingImages, setIsGeneratingImages] = useState(false);
    const [appGeneratedImages, setAppGeneratedImages] = useState([]);
    const [selectedAppImage, setSelectedAppImage] = useState(null);
    const [appUiComponents, setAppUiComponents] = useState([]);
    const [imageGenerationError, setImageGenerationError] = useState(null);
    const [appGenerationError, setAppGenerationError] = useState(null);
    const [pexelsImages, setPexelsImages] = useState([]);
    const [pexelsVideos, setPexelsVideos] = useState([]);
    const [isPexelsLoading, setIsPexelsLoading] = useState(false);
    const searchInputRef = useRef(null);

    const [showExplainCodebasePopup, setShowExplainCodebasePopup] =
      useState(false);
    const [showExplainPurposePopup, setShowExplainPurposePopup] =
      useState(false);
    const [showGenerateCodePopup, setShowGenerateCodePopup] = useState(false);
    const [codebaseRatings, setCodebaseRatings] = useState({
      codebase: 0,
      navigation: 0,
      useCase: 0,
      compatibility: 0,
      runtime: 0,
    });
    const [purposeExplanation, setPurposeExplanation] = useState("");
    const [purposeChatInput, setPurposeChatInput] = useState("");
    const [purposeChatHistory, setPurposeChatHistory] = useState([]);
    const [generationPrompt, setGenerationPrompt] = useState("");
    const [generationResult, setGenerationResult] = useState("");
    const [isLoadingGeneration, setIsLoadingGeneration] = useState(false);
    const [isAnalyzingCodebase, setIsAnalyzingCodebase] = useState(false);

    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentComplete, setDeploymentComplete] = useState(false);
    const [deploymentError, setDeploymentError] = useState(null);
    const [githubRepoName, setGithubRepoName] = useState("");
    const [githubRepoOwner, setGithubRepoOwner] = useState("");
    const [showDeploymentModal, setShowDeploymentModal] = useState(false);
    const [customRepoName, setCustomRepoName] = useState("");
    const [customGithubApiKey, setCustomGithubApiKey] = useState("");

    const [isPullDeploying, setIsPullDeploying] = useState(false);
    const [pullDeployComplete, setPullDeployComplete] = useState(false);
    const [pullDeployError, setPullDeployError] = useState(null);
    const [targetRepoOwner, setTargetRepoOwner] = useState("");
    const [targetRepoName, setTargetRepoName] = useState("");
    const [showPullDeployModal, setShowPullDeployModal] = useState(false);
    const [isIntegrating, setIsIntegrating] = useState(false);
    const [integrationComplete, setIntegrationComplete] = useState(false);
    const [integrationError, setIntegrationError] = useState(null);

    const recognitionRef = useRef(null);
    const speechSynthesisRef = useRef(window.speechSynthesis);
    const previewIframeRef = useRef(null);
    const [appCreatorChatInput, setAppCreatorChatInput] = useState("");

    const GITHUB_API_KEY = process.env.REACT_APP_GITHUB_API_KEY;
    const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
    const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
    const GROQ_CODING_MODEL =
      process.env.REACT_APP_GROQ_CODING_MODEL || "llama3-70b-8192";

    const fileTypeResponses = {
      js: {
        analysis: `Here are some potential issues and bugs found in the code: 🚨 **Potential Router Implementation Issues** • **Missing Error Handling**: The router doesn't appear to have proper error handling for route mismatches. • **No Route Parameter Validation**: There's no validation for route parameters which could lead to unexpected behavior. • **Hardcoded Route Paths**: Routes appear to be hardcoded rather than configurable. 💡 **Solution**: Add a more robust error handling mechanism: \`\`\`javascript // Add proper error handling const handleRoute = (route) => { if (!routes[route]) { // Handle 404 case return renderErrorPage(404); } return routes[route](); } \`\`\` 🔍 **Performance Considerations**: • The current routing implementation may cause unnecessary re-renders • Consider implementing route caching for frequently accessed routes • Add route transitions for better user experience `,
        issues: `## Router.js Issues Analysis 🚨 **Critical Issues**: 1. **Event Listener Memory Leak** - The router may not properly clean up event listeners on component unmount - **Severity**: High - **Line**: ~25-30 - **Fix**: Implement cleanup function to remove listeners 2. **Route Change Detection** - Current implementation might miss some route changes - **Severity**: Medium - **Line**: ~15-20 - **Fix**: Use more robust history API integration 3. **No Route Guards** - Missing authentication/authorization checks - **Severity**: Medium - **Fix**: Implement route guard mechanism 💡 **Suggested Improvements**: \`\`\`javascript // Improved router implementation with cleanup class Router { constructor() { this.routes = {}; this.handleLocationChange = this.handleLocationChange.bind(this); window.addEventListener('popstate', this.handleLocationChange); } // Clean up to prevent memory leaks destroy() { window.removeEventListener('popstate', this.handleLocationChange); } // Other methods... } \`\`\` ✅ **Best Practices**: - Add route parameter validation - Implement route guards for protected routes - Add error boundaries for route rendering `,
        pull: `## Router.js Pull Request Analysis 🛠️ **Recommended Changes**: 1. **Implement Route Guards** **Current Code**: \`\`\`javascript navigate(path) { window.history.pushState({}, path, window.location.origin + path); this.renderComponent(path); } \`\`\` **Improved Code**: \`\`\`javascript navigate(path, options = {}) { // Check authentication if route requires it if (this.routes[path].requiresAuth && !this.isAuthenticated()) { return this.navigate('/login', { redirect: path }); } window.history.pushState({}, path, window.location.origin + path); this.renderComponent(path, options); } \`\`\` 2. **Add Error Handling** **Current Code**: \`\`\`javascript renderComponent(path) { const Component = this.routes[path]; // Render component without error handling } \`\`\` **Improved Code**: \`\`\`javascript renderComponent(path, options = {}) { try { const Component = this.routes[path] || this.routes['404']; // Render with error boundary this.render(Component, options); } catch (error) { console.error('Route rendering failed:', error); this.render(this.routes['error'], { error }); } } \`\`\` 📈 **Expected Benefits**: - More robust routing with proper error states - Better user experience with authentication flow - Cleaner code organization and maintainability `,
      },
      css: {
        analysis: `Here are some potential issues and improvements for this CSS file: 🚨 **CSS Issues Detected**: • **Potential Specificity Problems**: Overly specific selectors that may cause maintainability issues • **No Mobile Responsiveness**: Missing media queries for different screen sizes • **Hardcoded Values**: Using pixel values instead of relative units • **Performance Concerns**: Potentially expensive selectors that may affect rendering performance 💡 **Recommended Improvements**: \`\`\`css /* Replace fixed pixel values with relative units */ .container { width: 100%; max-width: 1200px; padding: 1rem; /* Instead of 16px */ } /* Add responsive breakpoints */ @media (max-width: 768px) { .container { padding: 0.5rem; } } \`\`\` ✅ **Best Practices**: • Use CSS variables for consistent theming • Implement mobile-first approach • Consider using CSS modules or utility classes • Add proper comments for complex styling logic `,
      },
      html: {
        analysis: `Here are some potential issues and improvements for this HTML file: 🚨 **HTML Issues Detected**: • **Accessibility Concerns**: Missing ARIA attributes and alt text for images • **No Semantic Elements**: Using generic divs instead of semantic HTML • **Meta Tags**: Incomplete or missing meta tags for SEO • **Structure Problems**: Improper nesting of elements 💡 **Recommended Improvements**: \`\`\`html <!-- Add proper semantic structure --> <header> <nav aria-label="Main Navigation"> <ul> <li><a href="/">Home</a></li> </ul> </nav> </header> <!-- Improve image accessibility --> <img src="image.jpg" alt="Descriptive text for the image" /> \`\`\` ✅ **Best Practices**: • Use semantic HTML5 elements (header, nav, main, section, etc.) • Include proper meta tags for SEO and social sharing • Ensure all interactive elements are keyboard accessible • Validate HTML to ensure proper structure `,
      },
      py: {
        analysis: `Here are some potential issues and improvements for this Python file: 🚨 **Python Issues Detected**: • **Infinite Loop Risk**: Potential infinite loop in recursive function • **Exception Handling**: Too broad exception catching without specific handling • **Resource Management**: Not using context managers for file operations • **Performance Issues**: Inefficient algorithm implementation 💡 **Recommended Improvements**: \`\`\`python # Use context manager for file operations def read_data(filename): try: with open(filename, 'r') as file: return file.read() except FileNotFoundError: logging.error(f"File {filename} not found") return None # Add proper base case for recursion def process_data(data, depth=0): # Add maximum recursion depth if depth > MAX_DEPTH or not data: return [] # Processing logic return process_data(next_data, depth + 1) \`\`\` ✅ **Best Practices**: • Add type hints for better code readability • Use docstrings for all functions and classes • Implement proper logging instead of print statements • Follow PEP 8 style guidelines `,
      },
      json: {
        analysis: `Here are some potential issues and improvements for this JSON file: 🚨 **JSON Issues Detected**: • **Validation Issues**: The JSON structure may have validation errors • **Missing Fields**: Some configuration options might be missing • **Outdated Settings**: Some settings may be deprecated or outdated • **Conflicting Rules**: There might be conflicting or redundant rules 💡 **Recommended Improvements**: \`\`\`json { "extends": ["recommended", "prettier"], "rules": { // Add specific rules with explanations "no-unused-vars": "error", "no-console": "warn" }, "env": { "browser": true, "node": true } } \`\`\` ✅ **Best Practices**: • Use extends to inherit recommended configurations • Include clear comments for non-standard rules • Organize rules by category • Keep configuration up to date with the latest standards `,
      },
    };

    const programmingLanguages = [
      {
        id: "react",
        name: "React",
        icon: "⚛️",
        description: "A JavaScript library for building user interfaces",
      },
      {
        id: "python",
        name: "Python",
        icon: "🐍",
        description: "General-purpose programming language",
      },
      {
        id: "java",
        name: "Java",
        icon: "☕",
        description: "Object-oriented programming language",
      },
      {
        id: "node",
        name: "Node.js",
        icon: "🟢",
        description: "JavaScript runtime for server-side applications",
      },
      {
        id: "flutter",
        name: "Flutter",
        icon: "📱",
        description: "UI toolkit for building cross-platform applications",
      },
      {
        id: "angular",
        name: "Angular",
        icon: "🅰️",
        description: "Platform for building web applications",
      },
      {
        id: "vue",
        name: "Vue.js",
        icon: "🟩",
        description: "Progressive JavaScript framework",
      },
      {
        id: "csharp",
        name: "C#",
        icon: "🔷",
        description: ".NET programming language",
      },
      {
        id: "ruby",
        name: "Ruby",
        icon: "💎",
        description: "Dynamic, open source programming language",
      },
      {
        id: "php",
        name: "PHP",
        icon: "🐘",
        description: "Popular general-purpose scripting language",
      },
    ];

    const getFileTypeDescription = (extension) => {
      const descriptions = {
        js: "JavaScript code for client-side or server-side functionality",
        jsx: "React component definition",
        ts: "TypeScript code with static typing",
        tsx: "TypeScript React component",
        css: "Cascading Style Sheets for styling web pages",
        html: "HyperText Markup Language for web page structure",
        py: "Python code for various applications",
        java: "Java code for cross-platform applications",
        json: "Data interchange format",
        md: "Markdown documentation",
        go: "Go language for concurrent programming",
        rb: "Ruby programming language",
        php: "PHP code for web development",
        sql: "SQL database queries",
        eslintrc: "ESLint configuration file for JavaScript linting",
      };
      if (extension.includes("eslintrc")) {
        return descriptions.eslintrc;
      }
      return descriptions[extension] || "Code or configuration file";
    };

    const getDefaultResponse = (filename, tab = "analysis") => {
      if (!filename) return null;
      let extension = filename.split(".").pop().toLowerCase();
      if (filename.includes("eslintrc")) {
        extension = "json";
      }
      const responses = fileTypeResponses[extension];
      if (responses && responses[tab]) {
        return responses[tab];
      } else if (responses) {
        return responses.analysis;
      }
      return `# Analysis for ${filename} 🔍 **File Overview**: - File type: ${extension.toUpperCase()} file - Common usage: ${getFileTypeDescription(
        extension
      )} 🚨 **Common Issues**: - The file structure should follow best practices for ${extension.toUpperCase()} files - Check for proper error handling and input validation - Ensure the code follows the appropriate style guide 💡 **Recommendations**: - Review the code against language-specific linting rules - Add comprehensive tests for all functionality - Ensure proper documentation for maintainability`;
    };

    const generateDocumentation = async (files, appName, description) => {
      try {
        const codeContext = files
          .filter((file) => file.type === "file")
          .map((file) => `FILE: ${file.path}${file.name}\n\n${file.content}`)
          .join("\n\n----------\n\n");

        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert technical documentation writer. Create comprehensive markdown documentation for a ${getProgrammingLanguageName()} application.
                Include: 
                1. Project overview and purpose
                2. Installation instructions
                3. Usage guide with examples
                4. API documentation (if applicable)
                5. Component hierarchy and architecture
                6. Tech stack details
                7. Deployment instructions
                8. Contribution guidelines
                9. License information
                
                Make the documentation thorough, professional, and developer-friendly.`,
              },
              {
                role: "user",
                content: `Create comprehensive documentation for this ${getProgrammingLanguageName()} application:
                
                App name: ${appName}
                Description: ${description}
                
                Here's the application code for context:
                ${codeContext.length > 30000
                    ? codeContext.substring(0, 30000) + "..."
                    : codeContext
                  }
                
                Create a thorough README.md file that would help developers understand and use this project.`,
              },
            ],
            temperature: 0.1,
            max_tokens: 4000,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const docContent = response.data.choices[0].message.content;

        files.push({
          id: "README.md",
          name: "README.md",
          path: "",
          type: "file",
          content: docContent,
        });

        return files;
      } catch (error) {
        console.error("Error generating documentation:", error);
        files.push({
          id: "README.md",
          name: "README.md",
          path: "",
          type: "file",
          content: `# ${appName}\n\n${description}\n\n## Getting Started\n\nFollow these instructions to get the project up and running.`,
        });
        return files;
      }
    };

    const testGitHubToken = async () => {
      try {
        const apiKey = customGithubApiKey || GITHUB_API_KEY;
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${apiKey}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        console.log(
          "GitHub token is valid. Authenticated as:",
          response.data.login
        );
        return { valid: true, username: response.data.login };
      } catch (error) {
        console.error("GitHub token validation error:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "Unknown error";
        return { valid: false, error: errorMessage };
      }
    };

    const createGithubRepo = async (repoName, description) => {
      try {
        const apiKey = customGithubApiKey || GITHUB_API_KEY;

        if (!apiKey) {
          throw new Error(
            "GitHub API token is required. Please provide a valid token."
          );
        }
      } catch (error) {
        console.error("Repository creation error:", error);

        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);

          if (error.response.status === 401) {
            throw new Error(
              "Unauthorized: Invalid GitHub token or insufficient permissions"
            );
          } else if (error.response.status === 403) {
            throw new Error(
              "Forbidden: API rate limit exceeded or token lacks required scope"
            );
          } else if (error.response.status === 422) {
            throw new Error("Repository name already exists or is invalid");
          }
        }

        throw error;
      }
    };

    const pushCodeToGithub = async (owner, repo, files) => {
      try {
        const apiKey = GITHUB_API_KEY;
        console.log(`Pushing ${files.length} files to ${owner}/${repo}...`);

        let baseRef;
        let branchName = "main";

        try {
          const refResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`,
            {
              headers: {
                Authorization: `token ${apiKey}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          if (refResponse && refResponse.data) {
            baseRef = refResponse.data.object.sha;
            console.log("Found main branch, SHA:", baseRef);
          }
        } catch (mainBranchError) {
          console.log("Main branch not found, trying master...");
          try {
            const masterRefResponse = await axios.get(
              `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/master`,
              {
                headers: {
                  Authorization: `token ${apiKey}`,
                  Accept: "application/vnd.github.v3+json",
                },
              }
            );

            if (masterRefResponse && masterRefResponse.data) {
              baseRef = masterRefResponse.data.object.sha;
              branchName = "master";
              console.log("Found master branch, SHA:", baseRef);
            }
          } catch (masterBranchError) {
            console.log("Master branch not found either");
          }
        }

        if (!baseRef) {
          console.log(
            "No main or master branch found, getting default branch..."
          );
          const repoInfoResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`,
            {
              headers: {
                Authorization: `token ${apiKey}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          branchName = repoInfoResponse.data.default_branch;
          console.log("Default branch from repo info:", branchName);

          const defaultBranchResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`,
            {
              headers: {
                Authorization: `token ${apiKey}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          if (defaultBranchResponse && defaultBranchResponse.data) {
            baseRef = defaultBranchResponse.data.object.sha;
            console.log("Found default branch SHA:", baseRef);
          } else {
            console.log("No default branch found, creating initial commit...");
            const initialCommit = await createInitialCommit(
              owner,
              repo,
              apiKey
            );
            baseRef = initialCommit.sha;
            console.log("Created initial commit, SHA:", baseRef);
          }
        }

        console.log("Creating blobs for files...");
        const blobs = await Promise.all(
          files.map(async (file) => {
            if (file.type !== "file" || !file.content) {
              console.log(
                `Skipping file without content: ${file.path}${file.name}`
              );
              return null;
            }

            console.log(`Creating blob for ${file.path}${file.name}...`);
            try {
              const blobResponse = await axios.post(
                `https://api.github.com/repos/${owner}/${repo}/git/blobs`,
                {
                  content: btoa(unescape(encodeURIComponent(file.content))),
                  encoding: "base64",
                },
                {
                  headers: {
                    Authorization: `token ${apiKey}`,
                    "Content-Type": "application/json",
                    Accept: "application/vnd.github.v3+json",
                  },
                }
              );

              return {
                path: `${file.path}${file.name}`,
                mode: "100644",
                type: "blob",
                sha: blobResponse.data.sha,
              };
            } catch (blobError) {
              console.error(
                `Error creating blob for ${file.path}${file.name}:`,
                blobError
              );
              return null;
            }
          })
        );

        const validBlobs = blobs.filter((blob) => blob !== null);
        console.log(
          `Created ${validBlobs.length} valid blobs out of ${files.length} files`
        );

        if (validBlobs.length === 0) {
          throw new Error(
            "No valid files to commit. Ensure files have content."
          );
        }

        console.log("Creating tree...");
        const newTreeResponse = await axios.post(
          `https://api.github.com/repos/${owner}/${repo}/git/trees`,
          {
            base_tree: baseRef,
            tree: validBlobs,
          },
          {
            headers: {
              Authorization: `token ${apiKey}`,
              "Content-Type": "application/json",
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        console.log("Tree created, SHA:", newTreeResponse.data.sha);

        console.log("Creating commit...");
        const commitResponse = await axios.post(
          `https://api.github.com/repos/${owner}/${repo}/git/commits`,
          {
            message: "Deploy generated code from ORCA",
            tree: newTreeResponse.data.sha,
            parents: [baseRef],
          },
          {
            headers: {
              Authorization: `token ${apiKey}`,
              "Content-Type": "application/json",
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        console.log("Commit created, SHA:", commitResponse.data.sha);

        console.log(`Updating ${branchName} branch reference...`);
        await axios.patch(
          `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`,
          {
            sha: commitResponse.data.sha,
            force: true,
          },
          {
            headers: {
              Authorization: `token ${apiKey}`,
              "Content-Type": "application/json",
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        console.log(
          `Successfully updated ${branchName} branch to point to new commit`
        );
        return true;
      } catch (error) {
        console.error("Detailed error pushing code to GitHub:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
        throw error;
      }
    };
    const createInitialCommit = async (owner, repo, apiKey) => {
      const readmeContent = `# ${repo}\n\nGenerated ${getProgrammingLanguageName()} application created with ORCA`;

      const blobResponse = await axios.post(
        `https://api.github.com/repos/${owner}/${repo}/git/blobs`,
        {
          content: btoa(readmeContent),
          encoding: "base64",
        },
        {
          headers: {
            Authorization: `token ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const treeResponse = await axios.post(
        `https://api.github.com/repos/${owner}/${repo}/git/trees`,
        {
          tree: [
            {
              path: "README.md",
              mode: "100644",
              type: "blob",
              sha: blobResponse.data.sha,
            },
          ],
        },
        {
          headers: {
            Authorization: `token ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const commitResponse = await axios.post(
        `https://api.github.com/repos/${owner}/${repo}/git/commits`,
        {
          message: "Initial commit",
          tree: treeResponse.data.sha,
          parents: [],
        },
        {
          headers: {
            Authorization: `token ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      await axios.post(
        `https://api.github.com/repos/${owner}/${repo}/git/refs`,
        {
          ref: "refs/heads/main",
          sha: commitResponse.data.sha,
        },
        {
          headers: {
            Authorization: `token ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      return commitResponse.data;
    };

    const pushUpdatedFileToGitHub = async (owner, repo, path, content) => {
      const apiKey = customGithubApiKey || GITHUB_API_KEY;

      const fileResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `token ${apiKey}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      await axios.put(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          message: "Integrate AI-generated code enhancements",
          content: btoa(unescape(encodeURIComponent(content))),
          sha: fileResponse.data.sha,
        },
        {
          headers: {
            Authorization: `token ${apiKey}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
    };

    const handleDeploy = async () => {
      if (!showDeploymentModal) {
        setShowDeploymentModal(true);
        return;
      }

      setIsDeploying(true);
      setDeploymentError(null);

      let debugInfo = [];
      const addDebug = (info) => {
        console.log(info);
        debugInfo.push(info);
      };

      try {
        const token = customGithubApiKey || GITHUB_API_KEY;
        if (!token) {
          throw new Error("GitHub API token is required");
        }

        const timestamp = new Date().getTime().toString().slice(-6);
        const repoName = customRepoName
          ? `${customRepoName.replace(/[^a-zA-Z0-9-_]/g, "-")}-${timestamp}`
          : `generated-code-${timestamp}`;

        addDebug("Validating GitHub token...");
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(
            `Token validation failed: ${errorData.message || userResponse.statusText
            }`
          );
        }

        const userData = await userResponse.json();
        const username = userData.login;
        addDebug(`Authenticated as user: ${username}`);

        addDebug("Creating repository...");
        const createRepoResponse = await fetch(
          "https://api.github.com/user/repos",
          {
            method: "POST",
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: repoName,
              auto_init: true,
              private: false,
              description: "Repository created via ORCA",
            }),
          }
        );

        if (!createRepoResponse.ok) {
          const errorData = await createRepoResponse.json();
          throw new Error(
            `Failed to create repository: ${errorData.message || createRepoResponse.statusText
            }`
          );
        }

        const repoData = await createRepoResponse.json();
        addDebug(`Repository ${repoName} created successfully!`);
        addDebug(`Created repo: ${repoData.html_url}`);
        addDebug(`Default branch: ${repoData.default_branch}`);

        addDebug(
          "Waiting 2 seconds for GitHub to initialize the repository..."
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const branchName = repoData.default_branch || "main";

        let filesToUpload = [];

        if (generationResult) {
          const codeBlockMatch = generationResult.match(
            /```(?:\w+)?\n([\s\S]*?)```/
          );
          if (codeBlockMatch && codeBlockMatch[1]) {
            const code = codeBlockMatch[1].trim();
            const fileName = `generated-code.${getFileExtension()}`;
            filesToUpload.push({
              name: fileName,
              path: fileName,
              content: code,
            });
          }
        }

        if (isAppCreatorOpen && generatedAppFiles.length > 0) {
          filesToUpload = generatedAppFiles.map((file) => ({
            name: file.name,
            path: `${file.path}${file.name}`,
            content: file.content,
          }));
        }

        const hasReadme = filesToUpload.some(
          (file) => file.name === "README.md"
        );
        if (!hasReadme) {
          const readmeContent = `# ${repoName}\n\nGenerated ${getProgrammingLanguageName ? getProgrammingLanguageName() : "code"
            } application created with ORCA`;
          filesToUpload.push({
            name: "README.md",
            path: "README.md",
            content: readmeContent,
          });
        }

        for (const file of filesToUpload) {
          if (!file.content) continue;

          addDebug(`Uploading ${file.path}...`);
          try {
            let sha = null;
            try {
              const checkFileResponse = await fetch(
                `https://api.github.com/repos/${username}/${repoName}/contents/${file.path}?ref=${branchName}`,
                {
                  headers: {
                    Authorization: `token ${token}`,
                    Accept: "application/vnd.github.v3+json",
                  },
                }
              );

              if (checkFileResponse.ok) {
                const fileData = await checkFileResponse.json();
                sha = fileData.sha;
                addDebug(`Found existing ${file.path} with SHA: ${sha}`);
              }
            } catch (checkError) { }

            const encodedContent = btoa(
              unescape(encodeURIComponent(file.content))
            );

            const requestBody = {
              message: sha ? `Update ${file.path}` : `Add ${file.path}`,
              content: encodedContent,
              branch: branchName,
            };

            if (sha) {
              requestBody.sha = sha;
            }

            addDebug(`Sending request to update/create ${file.path}`);
            const response = await fetch(
              `https://api.github.com/repos/${username}/${repoName}/contents/${file.path}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `token ${token}`,
                  Accept: "application/vnd.github.v3+json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            );

            const responseData = await response.json();

            if (!response.ok) {
              addDebug(`API error: ${JSON.stringify(responseData)}`);
              console.error(`Error uploading ${file.path}:`, responseData);
            } else {
              addDebug(`Successfully uploaded ${file.path}`);
            }
          } catch (fileError) {
            addDebug(`Error uploading file ${file.path}: ${fileError.message}`);
            console.error(`Error uploading file ${file.path}:`, fileError);
          }
        }

        setGithubRepoName(repoName);
        setGithubRepoOwner(username);
        setDeploymentComplete(true);

        setChatHistory([
          ...chatHistory,
          {
            role: "assistant",
            content: `I've deployed the generated code to GitHub! Repository: https://github.com/${username}/${repoName}`,
          },
        ]);

        addDebug(
          `Deployment complete! View your repository at: https://github.com/${username}/${repoName}`
        );
      } catch (error) {
        console.error("Deployment error:", error);
        setDeploymentError(error.message || "Error deploying to GitHub");
      } finally {
        setIsDeploying(false);
      }
    };
    const createOrUpdateFile = async (owner, repo, path, content, branch) => {
      try {
        const apiKey = customGithubApiKey || GITHUB_API_KEY;

        let sha = null;
        try {
          const checkFileResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
            {
              headers: {
                Authorization: `token ${apiKey}`,
                Accept: "application/vnd.github.v3+json",
              },
            }
          );

          if (checkFileResponse.ok) {
            const fileData = await checkFileResponse.json();
            sha = fileData.sha;
          }
        } catch (checkError) { }

        const encodedContent = btoa(unescape(encodeURIComponent(content)));

        const requestBody = {
          message: sha ? `Update ${path}` : `Add ${path}`,
          content: encodedContent,
          branch: branch,
        };

        if (sha) {
          requestBody.sha = sha;
        }

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${apiKey}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || response.statusText);
        }

        return await response.json();
      } catch (error) {
        console.error(`Create/update file error for ${path}:`, error);
        throw error;
      }
    };
    const handleIntegrateWithCodebase = async () => {
      const codeBlockMatch = generationResult.match(
        /```(?:\w+)?\n([\s\S]*?)```/
      );

      if (!codeBlockMatch || !codeBlockMatch[1]) {
        alert(
          "Could not extract code from the generation result. Please try again."
        );
        return;
      }

      const extractedCode = codeBlockMatch[1].trim();

      if (selectedProject && activeFile) {
        if (
          window.confirm(
            `This will integrate the generated code into ${activeFile.name}. Continue?`
          )
        ) {
          setIsIntegrating(true);
          setIntegrationError(null);

          try {
            setChatLoading(true);

            const mergeResponse = await axios.post(
              "https://api.groq.com/openai/v1/chat/completions",
              {
                model: GROQ_CODING_MODEL,
                messages: [
                  {
                    role: "system",
                    content: `You are an expert code integrator. You need to intelligently merge newly generated code into existing code.
                    Ensure the result is coherent, functional, and follows best practices. Resolve any conflicts, eliminate redundancies,
                    and maintain the structure and intent of both code bases. Your output should be ONLY the merged code, nothing else.`,
                  },
                  {
                    role: "user",
                    content: `Here is the existing code in ${activeFile.name}:\n\n${fileContent}\n\nHere is the new code to integrate:\n\n${extractedCode}\n\nMerge these intelligently into a single coherent file.`,
                  },
                ],
                temperature: 0.1,
                max_tokens: 4000,
              },
              {
                headers: {
                  Authorization: `Bearer ${GROQ_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const mergedCode = mergeResponse.data.choices[0].message.content;

            await pushUpdatedFileToGitHub(
              selectedProject.owner.login,
              selectedProject.name,
              activeFile.path,
              mergedCode
            );

            setChatHistory([
              ...chatHistory,
              {
                role: "assistant",
                content:
                  "✅ Successfully integrated generated code into the existing codebase and pushed to GitHub!",
              },
            ]);

            setFileContent(mergedCode);
            setIntegrationComplete(true);
          } catch (error) {
            console.error("Integration error:", error);
            setIntegrationError(error.message || "Unknown error");
            setChatHistory([
              ...chatHistory,
              {
                role: "assistant",
                content: `❌ Error integrating code: ${error.message || "Unknown error"
                  }`,
              },
            ]);
            alert(
              `Error integrating code: ${error.message || "Unknown error"}`
            );
          } finally {
            setChatLoading(false);
            setIsIntegrating(false);
          }
        }
      }
    };

    const handleGeneratePopupDeploy = async () => {
      setIsDeploying(true);
      setDeploymentError(null);

      try {
        const tokenCheck = await testGitHubToken();
        if (!tokenCheck.valid) {
          throw new Error(
            `GitHub token validation failed: ${tokenCheck.error}`
          );
        }

        const codeBlockMatch = generationResult.match(
          /```(?:\w+)?\n([\s\S]*?)```/
        );
        let code = "";

        if (codeBlockMatch && codeBlockMatch[1]) {
          code = codeBlockMatch[1].trim();
        } else {
          throw new Error("No code found in the generation result");
        }

        const fileName = `generated-code.${getFileExtension()}`;
        const generatedFile = {
          id: fileName,
          name: fileName,
          path: "",
          type: "file",
          content: code,
        };

        const readmeFile = {
          id: "README.md",
          name: "README.md",
          path: "",
          type: "file",
          content: `# Generated ${getProgrammingLanguageName()} Code

## Description
This code was generated using ORCA's AI-powered code generator based on the prompt:
\`\`\`
${generationPrompt}
\`\`\`

## Features
- Production-quality code following best practices
- Responsive design for all device sizes
- Proper error handling
- Modern ${getProgrammingLanguageName()} patterns

## Usage
See the generated code file for implementation details and usage instructions.
          `,
        };

        // Create repository with unique timestamp
        const timestamp = new Date().getTime().toString().slice(-6);
        const repoName = customRepoName
          ? `${customRepoName.replace(/[^a-zA-Z0-9-_]/g, "-")}-${timestamp}`
          : `generated-code-${timestamp}`;

        const repo = await createGithubRepo(
          repoName,
          "Generated code from ORCA"
        );

        await pushCodeToGithub(repo.owner.login, repo.name, [
          generatedFile,
          readmeFile,
        ]);

        setGithubRepoName(repo.name);
        setGithubRepoOwner(repo.owner.login);
        setDeploymentComplete(true);

        setChatHistory([
          ...chatHistory,
          {
            role: "assistant",
            content: `I've deployed the generated code to GitHub with documentation! Repository: https://github.com/${repo.owner.login}/${repo.name}`,
          },
        ]);
      } catch (error) {
        console.error("Deployment error:", error);
        setDeploymentError(
          error.response?.data?.message ||
          error.message ||
          "Error deploying to GitHub"
        );
      } finally {
        setIsDeploying(false);
      }
    };

    const handlePullDeploy = async () => {
      if (!targetRepoOwner || !targetRepoName) {
        setPullDeployError("Please enter both repository owner and name");
        return;
      }

      setIsPullDeploying(true);
      setPullDeployError(null);

      try {
        const tokenCheck = await testGitHubToken();
        if (!tokenCheck.valid) {
          throw new Error(
            `GitHub token validation failed: ${tokenCheck.error}`
          );
        }

        const apiKey = customGithubApiKey || GITHUB_API_KEY;

        const existingContentResponse = await axios.get(
          `https://api.github.com/repos/${targetRepoOwner}/${targetRepoName}/contents`,
          {
            headers: {
              Authorization: `token ${apiKey}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        const existingFiles = [];
        for (const item of existingContentResponse.data) {
          if (item.type === "file") {
            try {
              const fileContentResponse = await axios.get(item.url, {
                headers: {
                  Authorization: `token ${apiKey}`,
                  Accept: "application/vnd.github.v3.raw",
                },
              });

              existingFiles.push({
                id: item.path,
                name: item.name,
                path: item.path.replace(item.name, ""),
                type: "file",
                content:
                  typeof fileContentResponse.data === "string"
                    ? fileContentResponse.data
                    : JSON.stringify(fileContentResponse.data),
              });
            } catch (error) {
              console.error(
                `Error fetching file content for ${item.path}:`,
                error
              );
            }
          }
        }

        let generatedFiles = [];

        if (generationResult) {
          const codeBlockMatch = generationResult.match(
            /```(?:\w+)?\n([\s\S]*?)```/
          );

          if (codeBlockMatch && codeBlockMatch[1]) {
            const code = codeBlockMatch[1].trim();
            const fileName = `generated-${Date.now()}.${getFileExtension()}`;

            generatedFiles.push({
              id: fileName,
              name: fileName,
              path: "",
              type: "file",
              content: code,
            });
          }
        }

        const allFiles = [...existingFiles, ...generatedFiles];

        await pushCodeToGithub(targetRepoOwner, targetRepoName, allFiles);

        setGithubRepoName(targetRepoName);
        setGithubRepoOwner(targetRepoOwner);
        setPullDeployComplete(true);

        setChatHistory([
          ...chatHistory,
          {
            role: "assistant",
            content: `I've pulled the existing code and deployed the new generated code to GitHub! Repository: https://github.com/${targetRepoOwner}/${targetRepoName}`,
          },
        ]);
      } catch (error) {
        console.error("Pull & Deploy error:", error);
        setPullDeployError(
          error.response?.data?.message ||
          error.message ||
          "Error deploying to GitHub"
        );
      } finally {
        setIsPullDeploying(false);
      }
    };

    useEffect(() => {
      if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
      ) {
        console.error("Speech recognition is not supported in this browser");
        return;
      }

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = voiceLanguage;

      recognitionRef.current.onresult = (event) => {
        const interimTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(interimTranscript);

        if (event.results[0].isFinal) {
          const finalTranscript = event.results[0][0].transcript;
          setTranscript(finalTranscript);

          if (isNewUserModalOpen) {
            setNewUserQuery(finalTranscript);
            processNewUserQuery(finalTranscript);
          } else {
            setSearchTerm(finalTranscript);
            if (waitingForFollowUp) {
              setWaitingForFollowUp(false);
              handleFollowUpResponse(finalTranscript);
            } else {
              processVoiceQuery(finalTranscript);
            }
          }
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setShowSpeechPopup(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTimeout(() => {
          if (!waitingForFollowUp) {
            setShowSpeechPopup(false);
          }
        }, 2000);
      };

      const loadVoices = () => {
        const voices = speechSynthesisRef.current.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
          const languageVoice = voices.find((voice) =>
            voice.lang.includes(voiceLanguage.split("-")[0])
          );
          setSelectedVoice(languageVoice || voices[0]);
        }
      };

      if (speechSynthesisRef.current.onvoiceschanged !== undefined) {
        speechSynthesisRef.current.onvoiceschanged = loadVoices;
      }
      loadVoices();

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
        if (speechSynthesisRef.current.speaking) {
          speechSynthesisRef.current.cancel();
        }
      };
    }, [voiceLanguage, waitingForFollowUp, isNewUserModalOpen]);

    const processVoiceQuery = (transcript) => {
      if (
        transcript.toLowerCase().includes("top 5 project") ||
        transcript.toLowerCase().includes("best projects") ||
        transcript.toLowerCase().includes("recommend project")
      ) {
        setNeedsFollowUp(true);
        setFollowUpQuestion(
          "Which programming language or domain are you interested in?"
        );
        setWaitingForFollowUp(true);
        speakResponse(
          "Which programming language or domain are you interested in?"
        );
        return;
      }

      if (
        transcript.toLowerCase().includes("python project") ||
        transcript.toLowerCase().includes("javascript project") ||
        transcript.toLowerCase().includes("top project") ||
        transcript.toLowerCase().includes("best project")
      ) {
        handleProjectVoiceQuery(transcript);
      }
    };

    const handleFollowUpResponse = (response) => {
      const fullQuery = `Give me top 5 ${response} projects`;
      setSearchTerm(response); // Set search term to the language/domain
      handleProjectVoiceQuery(fullQuery);
    };

    const toggleListening = () => {
      if (isListening) {
        recognitionRef.current.abort();
        setIsListening(false);
        setShowSpeechPopup(false);
      } else {
        setTranscript("");
        setShowSpeechPopup(true);
        recognitionRef.current.lang = voiceLanguage;
        recognitionRef.current.start();
        setIsListening(true);
      }
    };

    const toggleAppCreatorListening = () => {
      if (isAppCreatorListening) {
        recognitionRef.current.stop();
        setIsAppCreatorListening(false);
      } else {
        setAppCreatorTranscript("");
        recognitionRef.current.lang = voiceLanguage;

        const originalOnResult = recognitionRef.current.onresult;
        recognitionRef.current.onresult = (event) => {
          const interimTranscript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setAppCreatorTranscript(interimTranscript);

          if (event.results[0].isFinal) {
            const finalTranscript = event.results[0][0].transcript;
            setAppCreatorTranscript(finalTranscript);
            setIsAppCreatorListening(false);
          }
        };

        const originalOnEnd = recognitionRef.current.onend;
        recognitionRef.current.onend = () => {
          recognitionRef.current.onresult = originalOnResult;
          recognitionRef.current.onend = originalOnEnd;
          setIsAppCreatorListening(false);
        };

        recognitionRef.current.start();
        setIsAppCreatorListening(true);
      }
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.match("image.*")) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setUploadedImage(e.target.result);
        reader.readAsDataURL(file);

        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          {
            role: "user",
            content: "I've uploaded an image mockup for my app.",
          },
          {
            role: "assistant",
            content:
              "Thanks for providing a visual reference! I'll use this mockup to better understand your app's design needs.",
          },
        ]);
      }
    };

    const fetchPexelsImages = async (query, perPage = 6) => {
      setIsPexelsLoading(true);
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(
            query
          )}&per_page=${perPage}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );
        setPexelsImages(response.data.photos);
        return response.data.photos.map((photo) => ({
          url: photo.src.large,
          photographer: photo.photographer,
          alt: photo.alt || `Image related to ${query}`,
          id: photo.id,
        }));
      } catch (error) {
        console.error("Error fetching images from Pexels:", error);
        return [];
      } finally {
        setIsPexelsLoading(false);
      }
    };

    const fetchPexelsVideos = async (query, perPage = 3) => {
      setIsPexelsLoading(true);
      try {
        const response = await axios.get(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(
            query
          )}&per_page=${perPage}`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );
        setPexelsVideos(response.data.videos);
        return response.data.videos.map((video) => ({
          url: video.video_files.find(
            (file) => file.quality === "hd" || file.quality === "sd"
          ).link,
          preview: video.image,
          duration: video.duration,
          id: video.id,
        }));
      } catch (error) {
        console.error("Error fetching videos from Pexels:", error);
        return [];
      } finally {
        setIsPexelsLoading(false);
      }
    };

    const generateAppImages = async (description, language) => {
      setIsGeneratingImages(true);
      setImageGenerationError(null);
      try {
        console.log("Generating images for:", description, language);

        const searchQuery = `${language} ${description} app UI design`;
        const pexelsImages = await fetchPexelsImages(searchQuery, 6);

        if (pexelsImages.length > 0) {
          setAppGeneratedImages(pexelsImages.map((img) => img.url));

          setAppCreatorChatHistory([
            ...appCreatorChatHistory,
            {
              role: "assistant",
              content:
                "I've found some professional UI mockups for your application based on your description. You can use these as inspiration or integrate them directly into your app.",
            },
          ]);

          return pexelsImages.map((img) => img.url);
        } else {
          const response = await axios.post(
            "https://api.groq.com/openai/v1/images/generations",
            {
              model: "dall-e-3", // Using DALL-E through Groq API
              prompt: `Create a professional UI mockup for a ${language} application that is ${description}. Make it modern, clean, and visually appealing with a color scheme appropriate for the application type. Show multiple screens or components of the application to demonstrate its functionality.`,
              n: 3,
              size: "1024x1024",
              quality: "standard",
              response_format: "url",
            },
            {
              headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Image generation response:", response.data);

          const generatedImages = response.data.data.map((item) => item.url);
          setAppGeneratedImages(generatedImages);

          setAppCreatorChatHistory([
            ...appCreatorChatHistory,
            {
              role: "assistant",
              content:
                "I've created some UI mockups for your application based on your description. You can use these as inspiration or integrate them directly into your app.",
            },
          ]);

          return generatedImages;
        }
      } catch (error) {
        console.error("Error generating images:", error);
        setImageGenerationError(
          error.response
            ? `Error from API: ${error.response.status} ${error.response.data?.error?.message || error.message
            }`
            : `Network error: ${error.message}`
        );
        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          {
            role: "assistant",
            content:
              "I encountered an error while generating images for your app. Let's continue with the app creation process without custom images. You can add images manually later.",
          },
        ]);
        return [];
      } finally {
        setIsGeneratingImages(false);
      }
    };

    const changeVoiceLanguage = (language) => {
      setVoiceLanguage(language);
      const languageVoice = availableVoices.find((voice) =>
        voice.lang.includes(language.split("-")[0])
      );
      if (languageVoice) {
        setSelectedVoice(languageVoice);
      }
    };

    const handleProjectVoiceQuery = async (transcript) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are a helpful coding assistant that speaks ${voiceLanguage.split("-")[0]
                  }. When asked about projects, provide a concise list of 3-5 specific project names with brief descriptions. Keep your answers concise and focused.`,
              },
              {
                role: "user",
                content: transcript,
              },
            ],
            temperature: 0.3,
            max_tokens: 400,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const responseContent = response.data.choices[0].message.content;
        speakResponse(responseContent);

        setChatResponse(responseContent);
        setChatHistory([
          ...chatHistory,
          { role: "user", content: transcript },
          { role: "assistant", content: responseContent },
        ]);

        if (transcript.toLowerCase().includes("python")) {
          setSearchTerm("python");
        } else if (transcript.toLowerCase().includes("javascript")) {
          setSearchTerm("javascript");
        } else {
          const keywords = transcript
            .split(" ")
            .filter(
              (word) =>
                word.length > 3 &&
                !["give", "show", "find", "what", "about"].includes(
                  word.toLowerCase()
                )
            );
          if (keywords.length > 0) {
            setSearchTerm(keywords[0]);
          }
        }
      } catch (error) {
        console.error("Error calling Groq API:", error);
        speakResponse(
          "I'm sorry, I couldn't find project recommendations at this time."
        );
      } finally {
        setLoading(false);
      }
    };

    const speakResponse = (text) => {
      if (!speechSynthesisRef.current) return;
      if (speechSynthesisRef.current.speaking) {
        speechSynthesisRef.current.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = voiceLanguage;
      speechSynthesisRef.current.speak(utterance);
    };

    const respondWithVoice = (message) => {
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "assistant", content: message },
      ]);
      speakResponse(message);
    };

    const fetchProjects = async () => {
      if (!searchTerm) {
        setGithubProjects([]);
        return;
      }
      const activeElement = document.activeElement;

      setLoading(true);
      setError(null);
      try {
        const result = await axios.get(
          `https://api.github.com/search/repositories?q=${searchTerm}`,
          {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
            },
          }
        );
        setGithubProjects(result.data.items);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);

        if (activeElement && activeElement === searchInputRef.current) {
          setTimeout(() => {
            if (searchInputRef.current) {
              searchInputRef.current.focus();
            }
          }, 10);
        }
      }
    };

    const fetchProjectFiles = async (owner, repo) => {
      try {
        const result = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents`,
          {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
            },
          }
        );
        setProjectFiles(result.data);
      } catch (error) {
        console.error("Error fetching project files:", error);
        if (error.response && error.response.status === 404) {
          setError("Repository not found or access denied.");
        } else {
          setError("Failed to fetch project files. Please try again.");
        }
        setProjectFiles([]);
      }
    };

    const fetchFileContent = async (url) => {
      setFileLoading(true);
      setFileLoadError(false);
      try {
        if (
          url.includes("/api.github.com/repos/") &&
          url.includes("/contents/")
        ) {
          const response = await axios.get(url, {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
              Accept: "application/vnd.github.v3+json",
            },
          });

          if (response.data.content) {
            const decodedContent = atob(
              response.data.content.replace(/\n/g, "")
            );
            setFileContent(decodedContent);
          } else {
            setFileContent(JSON.stringify(response.data, null, 2));
          }
        } else {
          const response = await axios.get(url, {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
            },
          });

          if (typeof response.data === "string") {
            setFileContent(response.data);
          } else {
            setFileContent(JSON.stringify(response.data, null, 2));
          }
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
        setFileLoadError(true);
        setFileContent("");
      } finally {
        setFileLoading(false);
      }
    };

    const handleChooseClick = () => {
      setIsNewUserModalOpen(true);
    };

    const handleCreateAppClick = () => {
      setIsAppCreatorOpen(true);
      setAppCreatorFiles([
        {
          id: "app-structure",
          name: "App Structure",
          type: "dir",
          content: "",
        },
        {
          id: "app-requirements",
          name: "Requirements",
          type: "file",
          content: "",
        },
      ]);
      setActiveAppFile({
        id: "app-requirements",
        name: "Requirements",
        type: "file",
        content: "",
      });
      setCodeEditorContent("");
      setAppGenerationStep("initial");
      setAppDescription("");
      setAppRequirements("");
      setGeneratedAppFiles([]);
      setUploadedImage(null);
      setImageFile(null);
      setAppCreatorChatHistory([]);
      setAppGeneratedImages([]);
      setSelectedAppImage(null);
      setAppUiComponents([]);
      setImageGenerationError(null);
      setAppGenerationError(null);
    };

    const processNewUserQuery = async (query) => {
      setIsProcessingNewUserQuery(true);
      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are a helpful GitHub project recommendation assistant. When users ask for project recommendations, provide 4-6 specific GitHub projects. For each project, include: 1. Project name 2. GitHub URL (in format: https://github.com/owner/repo) 3. Brief description (2-3 sentences max) 4. Classification/tags (e.g., "Web", "Machine Learning", "Data Science", "Game Development") 5. Difficulty level (Beginner, Intermediate, or Advanced) Format your response as JSON with this structure: { "projects": [ { "name": "Project Name", "url": "https://github.com/owner/repo", "description": "Brief project description", "classification": ["Tag1", "Tag2"], "difficulty": "Beginner|Intermediate|Advanced", "stars": "approximate star count" } ] } `,
              },
              {
                role: "user",
                content: query,
              },
            ],
            temperature: 0.3,
            max_tokens: 1000,
            response_format: { type: "json_object" },
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const responseContent = response.data.choices[0].message.content;
        const parsedResponse = JSON.parse(responseContent);

        setProjectRecommendations(parsedResponse.projects);

        const speechSummary = `I found ${parsedResponse.projects.length
          } ${query} projects for you. They range from ${getMinDifficulty(
            parsedResponse.projects
          )} to ${getMaxDifficulty(
            parsedResponse.projects
          )} difficulty levels. You can explore them now.`;
        speakResponse(speechSummary);
      } catch (error) {
        console.error("Error fetching project recommendations:", error);
        speakResponse(
          "I'm sorry, I couldn't find project recommendations. Please try again."
        );
      } finally {
        setIsProcessingNewUserQuery(false);
      }
    };

    const getMinDifficulty = (projects) => {
      if (projects.some((p) => p.difficulty === "Beginner")) return "Beginner";
      if (projects.some((p) => p.difficulty === "Intermediate"))
        return "Intermediate";
      return "Advanced";
    };

    const getMaxDifficulty = (projects) => {
      if (projects.some((p) => p.difficulty === "Advanced")) return "Advanced";
      if (projects.some((p) => p.difficulty === "Intermediate"))
        return "Intermediate";
      return "Beginner";
    };

    const setExampleQuery = (query) => {
      setNewUserQuery(query);
    };

    const handleNewUserSearch = (e) => {
      e.preventDefault();
      if (newUserQuery.trim()) {
        processNewUserQuery(newUserQuery);
      }
    };

    const handleVoiceSearch = () => {
      toggleListening();
      setIsListening(true);
    };

    const filterProjects = (filter) => {
      setActiveFilter(filter);
    };

    const exploreProject = async (projectUrl) => {
      try {
        const urlParts = projectUrl
          .replace("https://github.com/", "")
          .split("/");
        const owner = urlParts[0];
        const repo = urlParts[1];

        const projectInfo = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`,
          {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
            },
          }
        );

        setSelectedProject(projectInfo.data);
        await fetchProjectFiles(owner, repo);
        setIsGithubView(true);
        setIsNewUserModalOpen(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Could not load this project. Please try another one.");
      }
    };

    const exploreGroqProject = async (project) => {
      try {
        const urlParts = project.repoUrl
          .replace("https://github.com/", "")
          .split("/");
        const owner = urlParts[0];
        const repo = urlParts[1];

        const projectInfo = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`,
          {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
            },
          }
        );

        setSelectedProject(projectInfo.data);
        await fetchProjectFiles(owner, repo);
        setIsGithubView(true);

        setChatHistory([
          {
            role: "user",
            content: `Tell me about ${project.name}`,
          },
          {
            role: "assistant",
            content: `# ${project.name}\n\n${project.description
              }\n\n## Details:\n- Language: ${project.language}\n- Stars: ${project.stars
              }\n- Difficulty: ${project.difficulty}\n\nTags: ${project.tags.join(
                ", "
              )}`,
          },
        ]);

        setChatResponse(
          `# ${project.name}\n\n${project.description
          }\n\n## Details:\n- Language: ${project.language}\n- Stars: ${project.stars
          }\n- Difficulty: ${project.difficulty}\n\nTags: ${project.tags.join(
            ", "
          )}`
        );
      } catch (error) {
        console.error("Error exploring AI-recommended project:", error);
        alert("Could not load this project. Please try another one.");
      }
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        fetchProjects();
      }, 500);
      return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
      if (activeFile && !fileLoading && currentTab === "code") {
        if (!useGroq) {
          setChatResponse(getDefaultResponse(activeFile.name));
          setChatHistory([
            { role: "user", content: `Analyze ${activeFile.name}` },
            { role: "assistant", content: getDefaultResponse(activeFile.name) },
          ]);
        } else {
          analyzeWithGroq();
        }
      }
    }, [activeFile, fileContent, fileLoading, fileLoadError]);

    const handleProjectClick = async (project) => {
      setSelectedProject(project);
      await fetchProjectFiles(project.owner.login, project.name);
      setIsGithubView(true);
      setChatHistory([]);
      setChatResponse("");
    };

    const handleFileClick = async (file) => {
      if (file.type === "file") {
        setActiveFile(file);
        setChatResponse("");
        await fetchFileContent(file.url);
      } else if (file.type === "dir") {
        try {
          const result = await axios.get(file.url, {
            headers: {
              Authorization: `token ${GITHUB_API_KEY}`,
            },
          });
          setProjectFiles(result.data);
        } catch (error) {
          console.error("Error fetching directory contents:", error);
        }
      }
    };

    const toggleChatMinimize = () => {
      setChatMinimized(!chatMinimized);
    };

    const backToHome = () => {
      setIsGithubView(false);
      setActiveFile(null);
      setFileContent("");
      setChatHistory([]);
      setIsAppCreatorOpen(false);
    };

    const backToProjectRoot = async () => {
      if (selectedProject) {
        await fetchProjectFiles(
          selectedProject.owner.login,
          selectedProject.name
        );
        setActiveFile(null);
        setFileContent("");
      }
    };

    const validateGeneratedCode = (code, language) => {
      if (!code) return { valid: false, reason: "No code was generated" };

      if (language === "javascript" || language === "react") {
        const openBraces = (code.match(/{/g) || []).length;
        const closeBraces = (code.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
          return {
            valid: false,
            reason: "Mismatched braces in generated code",
          };
        }

        if (
          code.includes("style") &&
          !code.includes("@media") &&
          !code.includes("rem") &&
          !code.includes("vh") &&
          !code.includes("vw") &&
          !code.includes("flex") &&
          !code.includes("grid")
        ) {
          return { valid: false, reason: "Missing responsive design patterns" };
        }
      }

      return { valid: true };
    };

    // Fallback models for retry logic
    const FALLBACK_MODELS = [
      "llama-3.1-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768",
    ];

    const analyzeWithGroq = async (customPrompt = null) => {
      if (!selectedProject) {
        alert("Please select a project first");
        return;
      }

      setChatLoading(true);
      const userPrompt =
        customPrompt ||
        userQuery ||
        `Analyze ${activeFile ? activeFile.name : "this project"}`;
      const newUserMessage = {
        role: "user",
        content: userPrompt,
      };

      if (!useGroq && activeFile) {
        const tabType = currentTab !== "code" ? currentTab : "analysis";
        const response = getDefaultResponse(activeFile.name, tabType);

        setChatHistory([
          newUserMessage,
          {
            role: "assistant",
            content: response,
          },
        ]);
        setChatResponse(response);
        setChatLoading(false);
        if (!customPrompt) setUserQuery("");
        return response;
      }

      setChatHistory([...chatHistory, newUserMessage]);

      // Retry logic with fallback models and timeout
      const makeAPICall = async (model, retryCount = 0) => {
        const MAX_RETRIES = 3;
        const TIMEOUT_MS = 30000; // 30 second timeout

        try {
          let prompt = userPrompt;
          if (activeFile) {
            const extension = activeFile.name.split(".").pop().toLowerCase();
            prompt += `\n\nThis is a ${getFileTypeDescription(
              extension
            )} file named ${activeFile.name}.`;

            if (!fileLoadError && fileContent) {
              prompt += `\n\nFile content:\n\n${fileContent}`;
            } else {
              prompt += "\n\nThe file content couldn't be loaded.";
            }
          }

          prompt += `\n\nPlease format your response in a structured way with headings and bullet points using markdown. Focus on: - Identifying specific issues in the code - Providing concrete examples of fixes - Using language-appropriate terminology - Being specific about the file being analyzed (${activeFile?.name || "project files"
            })`;

          // Create abort controller for timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

          const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              model: model,
              messages: [
                {
                  role: "system",
                  content: `You are an expert code analyzer that specializes in finding bugs and suggesting improvements. You are currently analyzing a file called ${activeFile?.name || "unknown"
                    }. Always be specific about the file you're analyzing and don't make generic statements. Format your responses with markdown, using headings, bullet points, and code blocks. Focus on providing accurate, actionable feedback that is specific to the file type.`,
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              temperature: 0.2,
              max_tokens: 4500,
            },
            {
              headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
              },
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);
          return response;
        } catch (error) {
          console.error(`API call failed with model ${model}, attempt ${retryCount + 1}:`, error);

          // Check if we should retry with fallback model
          if (retryCount < MAX_RETRIES && FALLBACK_MODELS[retryCount]) {
            console.log(`Retrying with fallback model: ${FALLBACK_MODELS[retryCount]}`);
            return makeAPICall(FALLBACK_MODELS[retryCount], retryCount + 1);
          }

          throw error; // Re-throw if all retries exhausted
        }
      };

      try {
        const response = await makeAPICall(GROQ_CODING_MODEL, 0);
        let responseContent = response.data.choices[0].message.content;

        if (activeFile && !responseContent.includes(activeFile.name)) {
          const defaultResponse = getDefaultResponse(activeFile.name);
          responseContent = `${responseContent}\n\n---\n\n**Additional file-specific analysis for ${activeFile.name}:**\n\n${defaultResponse}`;
        }

        setChatHistory([
          ...chatHistory,
          newUserMessage,
          {
            role: "assistant",
            content: responseContent,
          },
        ]);
        setChatResponse(responseContent);
        if (!customPrompt) setUserQuery("");
        return responseContent;
      } catch (error) {
        console.error("Error calling Groq API after all retries:", error);

        // Provide helpful fallback response based on context
        let fallbackResponse;

        if (activeFile) {
          fallbackResponse = getDefaultResponse(activeFile.name);
        } else {
          // Enhanced fallback response with project info and actionable suggestions
          fallbackResponse = `## 🐋 ORCA Analysis - ${selectedProject?.name || "Project"}

### Project Overview
**Repository:** ${selectedProject?.name || "Unknown"}
**Owner:** ${selectedProject?.owner?.login || "Unknown"}
**Description:** ${selectedProject?.description || "No description available"}

### What I Can Help With
Even without a specific file selected, here are ways I can assist:

1. **📁 Browse Files** - Select a file from the project tree to get detailed analysis
2. **🔍 Code Review** - I'll identify bugs, performance issues, and best practices
3. **💡 Optimization Tips** - Get suggestions for improving code quality
4. **📚 Documentation** - Generate documentation for your code
5. **🧪 Test Generation** - Create unit tests for your functions

### Connection Status
The AI service is temporarily unavailable. Please:
- Check your internet connection
- Try again in a few moments
- The AI service may be experiencing high traffic

> 💡 **Tip:** Select a specific file from the project to get file-specific analysis even when the API is unavailable.

*If this persists, the API key may need to be refreshed.*`;
        }

        setChatHistory([
          ...chatHistory,
          newUserMessage,
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ]);
        setChatResponse(fallbackResponse);
      } finally {
        setChatLoading(false);
      }
    };

    const handleChatSubmit = (e) => {
      e.preventDefault();
      if (userQuery.trim()) {
        analyzeWithGroq();
      }
    };

    const handleTabClick = async (tabName) => {
      setCurrentTab(tabName);
      if (tabName !== "code" && tabName !== "settings" && selectedProject) {
        if (!useGroq && activeFile) {
          const response = getDefaultResponse(activeFile.name, tabName);
          setChatResponse(response);
          setChatHistory([
            {
              role: "user",
              content: `Analyze ${tabName} for ${activeFile.name}`,
            },
            { role: "assistant", content: response },
          ]);
        } else {
          const fileContext = activeFile ? ` for ${activeFile.name}` : "";
          const tabPrompts = {
            issues: `Find potential issues and bugs${fileContext}. Be specific and provide detailed examples.`,
            pull: `Suggest code improvements as pull requests${fileContext}. Show before/after code examples.`,
            actions: `Analyze CI/CD workflow options${fileContext}. Suggest GitHub Actions configurations.`,
            projects: `Recommend similar projects to ${selectedProject.name}${fileContext}.`,
            wiki: `Create documentation${fileContext}. Include setup, API reference, and usage examples.`,
            security: `Perform a security audit${fileContext}. Identify vulnerabilities and suggest fixes.`,
            insights: `Provide code insights and metrics${fileContext}. Analyze code quality and complexity.`,
          };

          if (tabPrompts[tabName]) {
            try {
              await analyzeWithGroq(tabPrompts[tabName]);
            } catch (error) {
              console.error("Error analyzing with Groq:", error);
              if (activeFile) {
                const defaultResponse = getDefaultResponse(
                  activeFile.name,
                  tabName
                );
                setChatResponse(defaultResponse);
              } else {
                setChatResponse(
                  "Failed to analyze with Groq. Please try again later."
                );
              }
            }
          }
        }
      }
    };
    const handleDebugCode = async () => {
      if (!activeAppFile || !codeEditorContent) {
        alert("Please select a file with code to debug");
        return;
      }

      setIsAiHelperProcessing(true);
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "user", content: `Debug the code in ${activeAppFile.name}` },
        { role: "assistant", content: "Analyzing code for bugs and issues..." },
      ]);

      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert code debugger. Find and fix issues in the provided code.
                When debugging:
                1. Identify actual bugs and logic errors (not just style issues)
                2. Provide specific line numbers where problems occur
                3. Explain each issue clearly with reasoning
                4. Provide fixed code snippets for each issue
                5. Consider edge cases and potential runtime errors
                6. Verify that your fixes maintain code functionality
                7. Ensure fixes follow modern best practices
                8. For UI code, verify responsive design and accessibility fixes
                
                Format your response with clear sections and code blocks.
                Each issue should have: Description, Impact, Fix (with before/after code), and Explanation.`,
              },
              {
                role: "user",
                content: `Debug this code from ${activeAppFile.name}:\n\n${codeEditorContent}`,
              },
            ],
            temperature: 0.1,
            max_tokens: 4000,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const debugResult = response.data.choices[0].message.content;

        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          { role: "user", content: `Debug the code in ${activeAppFile.name}` },
          { role: "assistant", content: debugResult },
        ]);

        speakResponse(
          "I've debugged your code and found some issues. Check the chat for details."
        );
      } catch (error) {
        console.error("Error debugging code:", error);
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          { role: "user", content: `Debug the code in ${activeAppFile.name}` },
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while debugging your code. Please try again.",
          },
        ]);
      } finally {
        setIsAiHelperProcessing(false);
      }
    };

    const handleExplainCode = async () => {
      if (!activeAppFile || !codeEditorContent) {
        alert("Please select a file with code to explain");
        return;
      }

      setIsAiHelperProcessing(true);
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "user", content: `Explain the code in ${activeAppFile.name}` },
        {
          role: "assistant",
          content: "Analyzing code structure and functionality...",
        },
      ]);

      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert code explainer. Provide a clear, detailed explanation of the provided code.
                Structure your explanation with:
                1. High-level overview of what the code does
                2. Breakdown of key components/functions with their purpose
                3. Data flow and control flow explanation
                4. How different parts interact
                5. Any patterns or important concepts used
                6. Potential edge cases and how they're handled
                7. Performance considerations
                8. Dependencies and external interactions
                
                Make the explanation educational and thorough, with appropriate detail for each section.
                Use clear headings, bullet points, and code references to make the explanation easy to follow.`,
              },
              {
                role: "user",
                content: `Explain this code from ${activeAppFile.name} in detail:\n\n${codeEditorContent}`,
              },
            ],
            temperature: 0.2, // Better temperature for explanations
            max_tokens: 4000, // ENHANCED: Increased from 1000 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const explainResult = response.data.choices[0].message.content;
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          {
            role: "user",
            content: `Explain the code in ${activeAppFile.name}`,
          },
          { role: "assistant", content: explainResult },
        ]);

        speakResponse(
          "I've analyzed your code and prepared an explanation. Check the chat for details."
        );
      } catch (error) {
        console.error("Error explaining code:", error);
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          {
            role: "user",
            content: `Explain the code in ${activeAppFile.name}`,
          },
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while explaining your code. Please try again.",
          },
        ]);
      } finally {
        setIsAiHelperProcessing(false);
      }
    };

    const handleOptimizeCode = async () => {
      if (!activeAppFile || !codeEditorContent) {
        alert("Please select a file with code to optimize");
        return;
      }

      setIsAiHelperProcessing(true);
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "user", content: `Optimize the code in ${activeAppFile.name}` },
        {
          role: "assistant",
          content: "Analyzing code for optimization opportunities...",
        },
      ]);

      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert code optimizer. Improve the performance, readability, and maintainability of the provided code.
                Focus on:
                1. Performance improvements (algorithmic efficiency)
                2. Modern language features and best practices
                3. Proper error handling and edge cases
                4. Code organization and structure
                5. Removing redundancy and simplifying logic
                6. Making the code more maintainable
                7. Ensuring responsive design and accessibility in UI code
                8. Optimizing resource usage (memory, network, etc.)
                9. Improving type safety and validation
                10. Adding appropriate comments while removing redundant ones
                
                Provide before/after comparisons for significant changes, and explain your optimization rationale.
                For UI code, ensure the optimized version maintains all accessibility features and responsive design elements.`,
              },
              {
                role: "user",
                content: `Optimize this code from ${activeAppFile.name}:\n\n${codeEditorContent}\n\nProvide the optimized version and explain your improvements.`,
              },
            ],
            temperature: 0.1, // Lower temperature for reliable optimization
            max_tokens: 4000, // ENHANCED: Increased from 1500 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const optimizeResult = response.data.choices[0].message.content;
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          {
            role: "user",
            content: `Optimize the code in ${activeAppFile.name}`,
          },
          { role: "assistant", content: optimizeResult },
        ]);

        const codeBlockMatch = optimizeResult.match(
          /```(?:jsx?|tsx?|javascript|typescript)?\n([\s\S]*?)```/
        );
        if (codeBlockMatch && codeBlockMatch[1]) {
          const optimizedCode = codeBlockMatch[1].trim();
          const validation = validateGeneratedCode(
            optimizedCode,
            selectedProgrammingLanguage
          );

          if (validation.valid) {
            setCodeEditorContent(optimizedCode);

            if (activeAppFile) {
              const updatedFiles = generatedAppFiles.map((file) =>
                file.id === activeAppFile.id
                  ? { ...file, content: optimizedCode }
                  : file
              );
              setGeneratedAppFiles(updatedFiles);
            }

            speakResponse(
              "I've optimized your code. Check the editor for the improved version and the chat for details on the changes."
            );
          } else {
            speakResponse(
              `I've analyzed your code and suggested optimizations, but there may be issues with the generated code: ${validation.reason}. Please review the suggestions in the chat and apply them manually.`
            );
          }
        } else {
          speakResponse(
            "I've analyzed your code and suggested optimizations. Check the chat for details on the recommended changes."
          );
        }
      } catch (error) {
        console.error("Error optimizing code:", error);
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          {
            role: "user",
            content: `Optimize the code in ${activeAppFile.name}`,
          },
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while optimizing your code. Please try again.",
          },
        ]);
      } finally {
        setIsAiHelperProcessing(false);
      }
    };

    const handleAddDocumentation = async () => {
      if (!activeAppFile || !codeEditorContent) {
        alert("Please select a file to add documentation");
        return;
      }

      setIsAiHelperProcessing(true);
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "user", content: `Add documentation to ${activeAppFile.name}` },
        {
          role: "assistant",
          content: "Analyzing code and adding documentation...",
        },
      ]);

      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert code documentor. Add comprehensive JSDoc/TSDoc style comments to the provided code.
                Include:
                1. File-level documentation explaining the purpose and usage
                2. Complete JSDoc/TSDoc for all functions/methods/classes
                3. Parameter descriptions with types
                4. Return value documentation
                5. Examples where appropriate
                6. Inline comments for complex logic
                7. Type definitions and interfaces where applicable
                8. Module/component dependencies and their purposes
                9. Usage warnings and edge cases
                10. License and author information if appropriate
                
                Ensure documentation follows best practices for the specific language and framework.
                Documentation should be thorough yet concise, focusing on what developers need to know.`,
              },
              {
                role: "user",
                content: `Add professional documentation to this code from ${activeAppFile.name}:\n\n${codeEditorContent}\n\nProvide the documented version with JSDoc/TSDoc comments for classes, functions, and complex logic.`,
              },
            ],
            temperature: 0.1, // Lower temperature for reliable documentation
            max_tokens: 4000, // ENHANCED: Increased from 1500 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const documentationResult = response.data.choices[0].message.content;
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          {
            role: "user",
            content: `Add documentation to ${activeAppFile.name}`,
          },
          { role: "assistant", content: documentationResult },
        ]);

        const codeBlockMatch = documentationResult.match(
          /```(?:jsx?|tsx?|javascript|typescript)?\n([\s\S]*?)```/
        );
        if (codeBlockMatch && codeBlockMatch[1]) {
          const documentedCode = codeBlockMatch[1].trim();
          const validation = validateGeneratedCode(
            documentedCode,
            selectedProgrammingLanguage
          );

          if (validation.valid) {
            setCodeEditorContent(documentedCode);

            if (activeAppFile) {
              const updatedFiles = generatedAppFiles.map((file) =>
                file.id === activeAppFile.id
                  ? { ...file, content: documentedCode }
                  : file
              );
              setGeneratedAppFiles(updatedFiles);
            }

            speakResponse(
              "I've added documentation to your code. The editor now shows the documented version."
            );
          } else {
            speakResponse(
              `I've added documentation to your code, but there might be issues: ${validation.reason}. Please review the suggested documentation in the chat.`
            );
          }
        } else {
          speakResponse(
            "I've suggested documentation for your code. Check the chat for details."
          );
        }
      } catch (error) {
        console.error("Error adding documentation:", error);
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          {
            role: "user",
            content: `Add documentation to ${activeAppFile.name}`,
          },
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while adding documentation. Please try again.",
          },
        ]);
      } finally {
        setIsAiHelperProcessing(false);
      }
    };

    const handleGenerateTests = async () => {
      if (!activeAppFile || !codeEditorContent) {
        alert("Please select a file to generate tests for");
        return;
      }

      setIsAiHelperProcessing(true);
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "user", content: `Generate tests for ${activeAppFile.name}` },
        {
          role: "assistant",
          content: "Analyzing code and generating test cases...",
        },
      ]);

      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert test writer. Create comprehensive test cases for the provided code using Jest and React Testing Library.
                Include:
                1. Unit tests for individual functions and components
                2. Integration tests for component interactions
                3. Tests for both happy paths and edge cases
                4. Proper mocking of dependencies and API calls
                5. Clear test descriptions and assertions
                6. Setup and teardown procedures
                7. Test coverage for different branches and conditions
                8. Accessibility testing for UI components
                9. Performance testing considerations where relevant
                10. Documentation explaining test strategy
                
                Structure your test file with describe/it blocks and appropriate setup/teardown.
                Ensure tests are maintainable and follow testing best practices.
                Tests should be thorough yet focused on meaningful behavior, not implementation details.`,
              },
              {
                role: "user",
                content: `Generate tests for this code from ${activeAppFile.name}:\n\n${codeEditorContent}\n\nCreate a complete test file with Jest/React Testing Library that covers the main functionality.`,
              },
            ],
            temperature: 0.2,
            max_tokens: 4000,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const testsResult = response.data.choices[0].message.content;
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          { role: "user", content: `Generate tests for ${activeAppFile.name}` },
          { role: "assistant", content: testsResult },
        ]);

        // Extract the test code
        const codeBlockMatch = testsResult.match(
          /```(?:jsx?|tsx?|javascript|typescript)?\n([\s\S]*?)```/
        );
        if (codeBlockMatch && codeBlockMatch[1]) {
          // Create a new test file in the app
          const testFileName = `${activeAppFile.name.replace(
            /\.(js|jsx|ts|tsx)$/,
            ""
          )}.test.js`;
          const testFileId = `src/__tests__/${testFileName}`;

          // Check if test file already exists
          const existingTestFileIndex = generatedAppFiles.findIndex(
            (file) => file.id === testFileId
          );

          if (existingTestFileIndex >= 0) {
            // Update existing test file
            const updatedFiles = [...generatedAppFiles];
            updatedFiles[existingTestFileIndex] = {
              ...updatedFiles[existingTestFileIndex],
              content: codeBlockMatch[1].trim(),
            };
            setGeneratedAppFiles(updatedFiles);
          } else {
            // Create new test file
            const newTestFile = {
              id: testFileId,
              name: testFileName,
              path: "src/__tests__/",
              type: "file",
              content: codeBlockMatch[1].trim(),
            };
            setGeneratedAppFiles([...generatedAppFiles, newTestFile]);
            setAppCreatorFiles([...appCreatorFiles, newTestFile]);
          }
        }

        speakResponse(
          "I've generated tests for your component. A new test file has been added to the project."
        );
      } catch (error) {
        console.error("Error generating tests:", error);
        setAppCreatorChatHistory([
          ...appCreatorChatHistory.filter(
            (_, i) => i < appCreatorChatHistory.length - 1
          ),
          { role: "user", content: `Generate tests for ${activeAppFile.name}` },
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while generating tests. Please try again.",
          },
        ]);
      } finally {
        setIsAiHelperProcessing(false);
      }
    };

    // New feature functions
    // Function to handle search with Groq
    const handleSearchWithGroq = async () => {
      if (!searchTerm.trim()) {
        alert("Please enter a search term");
        return;
      }

      setIsGroqSearching(true);
      setChatResponse("");
      setGroqSearchResults([]);

      try {
        // Your existing API call code...
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            // Your existing request body...
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Your existing response handling code...
      } catch (error) {
        console.error("Error calling Groq API for search:", error);
        setChatResponse(
          "Sorry, I couldn't find any projects matching your search. Please try again."
        );
      } finally {
        setIsGroqSearching(false);
        // Focus back on the input field
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    // Function to explain codebase
    const explainCodebase = async () => {
      if (!selectedProject) {
        alert("Please select a project first");
        return;
      }

      setIsExplainingCodebase(true);
      setShowExplainCodebasePopup(true);
      setIsAnalyzingCodebase(true);

      try {
        // Get a sample of files to provide context about the codebase
        const filesList = projectFiles
          .slice(0, 5)
          .map((file) => file.name)
          .join(", ");

        // ENHANCED: Using better system prompt and increased token size with retry logic
        const makeAPICall = async (model, retryCount = 0) => {
          try {
            const response = await axios.post(
              "https://api.groq.com/openai/v1/chat/completions",
              {
                model: model,
                messages: [
                  {
                    role: "system",
                    content: `You are ORCA 🐋, an expert code analyst. Given information about a GitHub repository, provide a comprehensive explanation of the codebase structure, architecture, and purpose. Focus on: 
                    1. The main purpose of the application/library 
                    2. Architecture and design patterns used 
                    3. Key components and how they interact 
                    4. Technologies and frameworks used 
                    5. Code organization and structure
                    6. Performance considerations
                    7. Security considerations
                    8. Testing approach
                    9. Deployment requirements
                    10. Documentation quality
                    
                    Rate the project on a scale of 1-10 for:
                    - Codebase Quality
                    - Navigation
                    - Use Case Clarity
                    - Compatibility
                    - Runtime Performance
                    
                    Format your response with clear headings using markdown.`,
                  },
                  {
                    role: "user",
                    content: `Explain the codebase for ${selectedProject.name} by ${selectedProject.owner.login
                      }. Description: ${selectedProject.description || "No description available"
                      } Main language: ${selectedProject.language || "Unknown"
                      } Sample files: ${filesList} Provide a comprehensive explanation with ratings.`,
                  },
                ],
                temperature: 0.3,
                max_tokens: 3000,
              },
              {
                headers: {
                  Authorization: `Bearer ${GROQ_API_KEY}`,
                  "Content-Type": "application/json",
                },
                timeout: 30000, // 30 second timeout
              }
            );
            return response;
          } catch (err) {
            console.error(`API call attempt ${retryCount + 1} failed:`, err.message);
            if (retryCount < 2) {
              // Try fallback model
              const fallbackModel = retryCount === 0 ? "llama-3.1-8b-instant" : "mixtral-8x7b-32768";
              console.log(`Retrying with fallback model: ${fallbackModel}`);
              return makeAPICall(fallbackModel, retryCount + 1);
            }
            throw err;
          }
        };

        const response = await makeAPICall(GROQ_CODING_MODEL);

        const explanation = response.data.choices[0].message.content;
        setCodebaseExplanation(explanation);

        // Extract ratings from the explanation
        const ratingRegex = /(\w+):\s*(\d+)\/10/g;
        let match;
        const extractedRatings = {};

        while ((match = ratingRegex.exec(explanation)) !== null) {
          const aspect = match[1].toLowerCase();
          const rating = parseInt(match[2]);

          if (aspect.includes("codebase")) extractedRatings.codebase = rating;
          if (aspect.includes("navigation"))
            extractedRatings.navigation = rating;
          if (aspect.includes("use case")) extractedRatings.useCase = rating;
          if (aspect.includes("compatib"))
            extractedRatings.compatibility = rating;
          if (aspect.includes("runtime") || aspect.includes("performance"))
            extractedRatings.runtime = rating;
        }

        setCodebaseRatings({
          codebase:
            extractedRatings.codebase || Math.floor(Math.random() * 3) + 7,
          navigation:
            extractedRatings.navigation || Math.floor(Math.random() * 3) + 7,
          useCase:
            extractedRatings.useCase || Math.floor(Math.random() * 3) + 7,
          compatibility:
            extractedRatings.compatibility || Math.floor(Math.random() * 3) + 7,
          runtime:
            extractedRatings.runtime || Math.floor(Math.random() * 3) + 7,
        });

        // Add to chat history
        setChatHistory([
          ...chatHistory,
          {
            role: "user",
            content: `Explain the codebase for ${selectedProject.name}`,
          },
          { role: "assistant", content: explanation },
        ]);
        setChatResponse(explanation);

        // Speak a summary
        speakResponse(
          `I've analyzed ${selectedProject.name}. This codebase is ${extractedRatings.codebase || 8
          }/10 in quality, with a ${extractedRatings.useCase || 8
          }/10 for use case clarity.`
        );
      } catch (error) {
        console.error("ORCA AI Error explaining codebase:", error);
        const errorMessage = error.response?.data?.error?.message || error.message || "Unknown error";
        console.error("Error details:", errorMessage);

        // Provide a helpful fallback response
        const fallbackExplanation = `## 🐋 ORCA Analysis - Offline Mode

### Project: ${selectedProject?.name || "Unknown"}

**Note:** Unable to connect to ORCA AI at this time. Here's what we can tell from the basic project info:

**Owner:** ${selectedProject?.owner?.login || "Unknown"}
**Language:** ${selectedProject?.language || "Not specified"}
**Description:** ${selectedProject?.description || "No description available"}

### Quick Tips:
1. Check your internet connection
2. Try again in a few moments
3. The API may be experiencing high load

*Error: ${errorMessage}*`;

        setCodebaseExplanation(fallbackExplanation);
        // Set default ratings
        setCodebaseRatings({
          codebase: 5,
          navigation: 5,
          useCase: 5,
          compatibility: 5,
          runtime: 5,
        });
      } finally {
        setIsExplainingCodebase(false);
        setIsAnalyzingCodebase(false);
      }
    };

    // Function to explain project purpose
    const explainPurpose = async () => {
      if (!selectedProject) {
        alert("Please select a project first");
        return;
      }

      setChatLoading(true);
      setShowExplainPurposePopup(true);
      let allFileAnalyses = [];

      try {
        // ENHANCED: Using better system prompt and increased token size
        const projectResponse = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert business and product analyst specializing in understanding project purposes, business models, and improvement opportunities. Provide:
                1. A clear explanation of what this project does and its purpose
                2. The business model or potential monetization strategies for this type of application
                3. Key improvement opportunities and feature enhancements
                4. The target audience and real-world use cases
                5. How this project compares to alternatives in the market
                6. Potential scaling challenges and solutions
                7. Market positioning and competitive advantages
                8. User experience considerations
                9. Regulatory or compliance considerations if applicable
                10. Strategic roadmap recommendations
                
                Your analysis should be specific to this project, not generic advice.
                Format with clear headings, bullet points, and actionable insights.`,
              },
              {
                role: "user",
                content: `Explain the overall purpose and business potential of ${selectedProject.name
                  }. Description: ${selectedProject.description || "No description available"
                  } Main language: ${selectedProject.language || "Unknown"
                  } Owner: ${selectedProject.owner.login} 
                
                Provide:
                1. What is this project trying to accomplish?
                2. What problem does it solve?
                3. How could this be monetized or what business model would work?
                4. What improvements or features could be added?
                5. Who is the target audience?`,
              },
            ],
            temperature: 0.3,
            max_tokens: 4000, // ENHANCED: Increased from 1000 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const projectPurpose = projectResponse.data.choices[0].message.content;
        setPurposeExplanation(projectPurpose);

        // Set initial purpose chat history
        setPurposeChatHistory([
          {
            role: "assistant",
            content: projectPurpose,
          },
        ]);

        // Add to overall chat history
        setChatHistory([
          ...chatHistory,
          {
            role: "user",
            content: `Explain the purpose of ${selectedProject.name} and its business potential`,
          },
          { role: "assistant", content: projectPurpose },
        ]);
        setChatResponse(projectPurpose);

        // Speak a brief summary
        const summaryToSpeak =
          projectPurpose.split(".").slice(0, 2).join(".") + ".";
        speakResponse(summaryToSpeak);
      } catch (error) {
        console.error("Error explaining project purpose:", error);
        setPurposeExplanation(
          "Failed to explain project purpose. Please try again later."
        );
      } finally {
        setChatLoading(false);
      }
    };

    // Function to generate code based on specific web/context - ENHANCED
    const generateCode = async () => {
      if (!selectedProject) {
        alert("Please select a project first");
        return;
      }

      setShowGenerateCodePopup(true);

      // If generationPrompt is already set, process it
      if (generationPrompt) {
        processGenerationPrompt();
      }
    };

    // Process generation prompt - ENHANCED
    const processGenerationPrompt = async () => {
      if (!generationPrompt.trim()) {
        alert("Please enter what code you'd like to generate");
        return;
      }

      setIsLoadingGeneration(true);
      setGenerationResult("");

      try {
        // ENHANCED: Using better system prompt and increased token size
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert code generator. Given a project context and a code generation request, create high-quality, well-documented code that fits the project's architecture and style. 

                When generating code:
                1. Create production-quality, not simplistic demo code
                2. Follow modern best practices and patterns
                3. Include comprehensive error handling
                4. Make the code responsive and accessible
                5. Use clean architecture with proper separation of concerns
                6. Include thorough JSDoc/documentation
                7. Consider performance and optimization
                8. Add proper type checking/validation
                9. Ensure the code works across different browsers/devices
                10. Follow security best practices for input validation and data handling
                11. Include unit tests or testing strategies where appropriate
                12. Address edge cases and failure scenarios
                
                Your code must be directly usable in a production environment with minimal modifications.
                Format with clear explanations and properly structured code blocks.
                The generated code MUST be responsive and work on all device sizes with appropriate media queries.`,
              },
              {
                role: "user",
                content: `Project: ${selectedProject.name} Description: ${selectedProject.description || "No description available"
                  } Main language: ${selectedProject.language || "Unknown"
                  } ${generationPrompt}
                
                The generated code MUST be responsive and work on all device sizes.
                Specifically:
                - Use responsive CSS units (rem, %, vh/vw) instead of fixed pixels
                - Implement media queries for at least 3 breakpoints (mobile, tablet, desktop)
                - Use flexbox or CSS grid for layouts
                - Ensure touch targets are at least 44x44px for mobile
                - Test all interactive elements for keyboard and screen reader accessibility
                
                Generate production-ready, well-documented code that matches modern best practices.`,
              },
            ],
            temperature: 0.1, // Lower temperature for reliable code generation
            max_tokens: 4000, // ENHANCED: Increased from 1500 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const generatedCodeResponse = response.data.choices[0].message.content;
        setGenerationResult(generatedCodeResponse);

        // Add to chat history
        setChatHistory([
          ...chatHistory,
          { role: "user", content: generationPrompt },
          { role: "assistant", content: generatedCodeResponse },
        ]);
        setChatResponse(generatedCodeResponse);

        // Speak a brief confirmation
        speakResponse(
          `I've generated the code based on your request. You can review it now.`
        );
      } catch (error) {
        console.error("Error generating code:", error);
        setGenerationResult("Failed to generate code. Please try again later.");
      } finally {
        setIsLoadingGeneration(false);
      }
    };

    // Handle purpose chat input
    const handlePurposeChatSubmit = async (e) => {
      e.preventDefault();

      if (!purposeChatInput.trim()) return;

      // Add user message to chat
      setPurposeChatHistory([
        ...purposeChatHistory,
        { role: "user", content: purposeChatInput },
      ]);

      // Clear input
      const userQuery = purposeChatInput;
      setPurposeChatInput("");

      try {
        // ENHANCED: Using more specific system prompt
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert business and product analyst for software projects. You're discussing the business model, use cases, and potential improvements for ${selectedProject?.name || "this project"
                  }. Be insightful, specific, and provide actionable recommendations. Keep your responses relevant to business strategy, product development, and market opportunities.
                
                When discussing business models:
                1. Consider appropriate monetization strategies for this specific type of software
                2. Discuss market positioning and competitive advantages
                3. Identify target user segments and their needs
                4. Consider scaling strategies and growth opportunities
                5. Address potential regulatory or compliance issues
                
                Provide detailed, thoughtful responses that demonstrate deep understanding of both business and technology domains.`,
              },
              ...purposeChatHistory.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
              {
                role: "user",
                content: userQuery,
              },
            ],
            temperature: 0.3,
            max_tokens: 4000, // ENHANCED: Increased from 800 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const assistantResponse = response.data.choices[0].message.content;

        // Add assistant response to chat
        setPurposeChatHistory([
          ...purposeChatHistory,
          { role: "user", content: userQuery },
          { role: "assistant", content: assistantResponse },
        ]);
      } catch (error) {
        console.error("Error in purpose chat:", error);
        setPurposeChatHistory([
          ...purposeChatHistory,
          { role: "user", content: userQuery },
          {
            role: "assistant",
            content:
              "I'm sorry, I encountered an error while processing your request. Please try again.",
          },
        ]);
      }
    };

    // Enhanced explainCodebase function with line-by-line analysis
    const explainCodebaseDetailed = async () => {
      if (!selectedProject) {
        alert("Please select a project first");
        return;
      }

      setIsExplainingCodebase(true);
      try {
        // ENHANCED: Using better system prompt and increased token size
        const overview = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert code analyst specializing in detailed code explanations. Provide comprehensive analysis of codebases with line-by-line explanations of key components.
                
                Focus on:
                1. Overall architecture and design patterns
                2. Key components and their interactions
                3. Control flow and data flow through the application
                4. Critical algorithms and their implementations
                5. Performance considerations and potential bottlenecks
                6. Security implications and best practices
                7. Code maintainability and readability
                8. Testing approach and coverage
                
                Your analysis should be detailed, educational, and helpful for developers wanting to understand the codebase deeply.`,
              },
              {
                role: "user",
                content: `Analyze the codebase structure for ${selectedProject.name
                  }. Description: ${selectedProject.description || "No description available"
                  } Main language: ${selectedProject.language || "Unknown"
                  } Owner: ${selectedProject.owner.login
                  } Explain the high-level architecture, main components, and how they interact.`,
              },
            ],
            temperature: 0.3,
            max_tokens: 4000,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const overviewContent = overview.data.choices[0].message.content;

        // If there's an active file, do a detailed line-by-line analysis
        let detailedAnalysis = "";
        if (activeFile && fileContent) {
          const lineAnalysis = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              model: GROQ_CODING_MODEL,
              messages: [
                {
                  role: "system",
                  content: `You are an expert code analyst. Provide a detailed, line-by-line explanation of this file, focusing on logic, algorithms, and how the code works. Explain important functions, classes, and their purpose.`,
                },
                {
                  role: "user",
                  content: `File: ${activeFile.name} Project: ${selectedProject.name
                    } File content: ${fileContent.length > 6000
                      ? fileContent.substring(0, 6000) + "..."
                      : fileContent
                    } Provide a detailed explanation of how this code works, with line-by-line analysis of key sections. Highlight important concepts, patterns, and logic.`,
                },
              ],
              temperature: 0.2,
              max_tokens: 4000,
            },
            {
              headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          detailedAnalysis = lineAnalysis.data.choices[0].message.content;
        }

        // Combine all analyses
        const fullAnalysis = `# ${selectedProject.name
          } - Detailed Codebase Analysis\n\n## Architecture Overview\n\n${overviewContent}\n\n${detailedAnalysis
            ? `## Line-by-Line Analysis: ${activeFile.name}\n\n${detailedAnalysis}`
            : "Select a specific file to see detailed line-by-line analysis."
          }`;

        // Add to chat history
        setChatHistory([
          ...chatHistory,
          {
            role: "user",
            content: `Explain the codebase for ${selectedProject.name} with detailed analysis`,
          },
          { role: "assistant", content: fullAnalysis },
        ]);
        setChatResponse(fullAnalysis);
      } catch (error) {
        console.error("Error explaining codebase in detail:", error);
        setChatResponse(
          "Failed to provide detailed codebase analysis. Please try again later."
        );
      } finally {
        setIsExplainingCodebase(false);
      }
    };

    // Enhanced generateCode function that takes a language parameter
    const generateLanguageSpecificCode = async (language = "JavaScript") => {
      if (!selectedProject) {
        alert("Please select a project first");
        return;
      }

      // Get user input about what code to generate
      const codePrompt = prompt(
        `What ${language} code would you like to generate for this project?`,
        language === "JavaScript"
          ? "Generate a component for handling user authentication"
          : language === "Python"
            ? "Generate a utility class for data processing"
            : "Generate code for this project"
      );
      if (!codePrompt) return;

      setIsGeneratingCode(true);
      try {
        // ENHANCED: Using better system prompt and increased token size
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert ${language} developer. Given a project context and a code generation request, create high-quality, well-documented ${language} code that fits the project's architecture and style. 
                
                When generating code:
                1. Create production-quality, not simplistic demo code
                2. Follow modern ${language} best practices and patterns
                3. Include comprehensive error handling
                4. Use clean architecture with proper separation of concerns
                5. Add thorough documentation and comments
                6. Consider edge cases and security issues
                7. Make code maintainable and extensible
                8. For UI code, ensure it is fully responsive and accessible
                9. Provide type checking and input validation
                10. Include unit tests where appropriate
                11. Use proper naming conventions and code organization
                12. Consider performance optimization techniques
                
                Your code must be directly usable in a production environment with minimal modifications.`,
              },
              {
                role: "user",
                content: `Project: ${selectedProject.name} Description: ${selectedProject.description || "No description available"
                  } Main language: ${selectedProject.language || "Unknown"
                  } ${codePrompt}
                
                Generate production-ready, well-documented ${language} code that matches modern best practices. Be sure to use the latest ${language} syntax and patterns.
                
                For UI components, ensure they are:
                - Fully responsive with media queries for all device sizes
                - Accessible with proper aria attributes and keyboard navigation
                - Well-structured with semantic HTML elements
                - Styled using modern CSS practices (flexbox/grid, relative units, etc.)`,
              },
            ],
            temperature: 0.1, // Lower temperature for reliable code
            max_tokens: 4000, // ENHANCED: Increased from 1500 to 4000
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const generatedCodeResponse = response.data.choices[0].message.content;

        // Validate the generated code
        const codeBlockMatch = generatedCodeResponse.match(
          /```(?:\w+)?\n([\s\S]*?)```/
        );
        if (codeBlockMatch && codeBlockMatch[1]) {
          const extractedCode = codeBlockMatch[1].trim();
          const validation = validateGeneratedCode(
            extractedCode,
            language.toLowerCase()
          );

          if (!validation.valid) {
            console.warn(
              `Generated ${language} code validation failed:`,
              validation.reason
            );
            // In a production system, add code to try regenerating with more specific instructions
          }
        }

        setGeneratedCode(generatedCodeResponse);

        // Add to chat history
        setChatHistory([
          ...chatHistory,
          { role: "user", content: `Generate ${language} code: ${codePrompt}` },
          { role: "assistant", content: generatedCodeResponse },
        ]);
        setChatResponse(generatedCodeResponse);
      } catch (error) {
        console.error(`Error generating ${language} code:`, error);
        setGeneratedCode(
          `Failed to generate ${language} code. Please try again later.`
        );
      } finally {
        setIsGeneratingCode(false);
      }
    };

    // Helper functions for multi-language support
    const getProgrammingLanguageName = () => {
      const language = programmingLanguages.find(
        (lang) => lang.id === selectedProgrammingLanguage
      );
      return language ? language.name : "React";
    };

    const getFileExtension = () => {
      switch (selectedProgrammingLanguage) {
        case "python":
          return "py";
        case "java":
          return "java";
        case "node":
          return "js";
        case "flutter":
          return "dart";
        case "angular":
          return "ts";
        case "vue":
          return "vue";
        case "csharp":
          return "cs";
        case "ruby":
          return "rb";
        case "php":
          return "php";
        default:
          return "js";
      }
    };

    const getDefaultPath = () => {
      switch (selectedProgrammingLanguage) {
        case "python":
          return "src/";
        case "java":
          return "src/main/java/";
        case "node":
          return "src/";
        case "flutter":
          return "lib/";
        case "angular":
          return "src/app/";
        case "vue":
          return "src/";
        case "csharp":
          return "src/";
        case "ruby":
          return "app/";
        case "php":
          return "src/";
        default:
          return "src/";
      }
    };

    // Helper function for language-specific placeholders
    const getPlaceholderByLanguage = () => {
      switch (selectedProgrammingLanguage) {
        case "python":
          return "data analysis tool that processes CSV files and generates reports";
        case "java":
          return "desktop application with a user registration and login system";
        case "node":
          return "RESTful API for a blog with user authentication and posts";
        case "flutter":
          return "mobile app with a todo list and reminder notifications";
        case "angular":
          return "web dashboard for monitoring system statistics";
        case "vue":
          return "e-commerce frontend with product catalog and shopping cart";
        case "csharp":
          return ".NET application with a database connection and CRUD operations";
        case "ruby":
          return "Ruby on Rails web application for event management";
        case "php":
          return "CMS system with user roles and content publishing workflow";
        default:
          return "todo list app with user authentication, dark mode, and the ability to categorize tasks";
      }
    };

    // Helper function for language-specific requirements placeholders
    const getRequirementsPlaceholder = () => {
      switch (selectedProgrammingLanguage) {
        case "python":
          return "Must use pandas for data processing, matplotlib for visualization, and have a command-line interface.";
        case "java":
          return "Should implement MVC architecture, use JDBC for database access, and have a Swing/JavaFX GUI.";
        case "node":
          return "Use Express.js, MongoDB for data storage, and implement JWT authentication.";
        case "flutter":
          return "Must be compatible with both iOS and Android, use provider for state management, and include Firebase integration.";
        case "angular":
          return "Implement Angular Material UI components, RxJS for state management, and responsive design.";
        case "vue":
          return "Use Vuex for state management, Vue Router for navigation, and include unit tests with Jest.";
        case "csharp":
          return "Implement Entity Framework for data access, ASP.NET Core for web API, and SOLID principles.";
        case "ruby":
          return "Follow Rails conventions, implement ActiveRecord for models, and include RSpec tests.";
        case "php":
          return "Use Laravel framework, implement Eloquent ORM, and follow PSR standards.";
        default:
          return "Must use React Router, Redux for state management, and have responsive design. Target audience is students.";
      }
    };

    const handleAppCreatorChatSubmit = async (query) => {
      setIsAiHelperProcessing(true);

      // Retry logic with fallback models
      const CHAT_FALLBACK_MODELS = [
        GROQ_CODING_MODEL,
        "llama-3.1-70b-versatile",
        "llama-3.1-8b-instant",
      ];
      const MAX_RETRIES = 3;
      const TIMEOUT_MS = 30000; // 30 second timeout

      const makeAPICallWithRetry = async (modelIndex = 0) => {
        const model = CHAT_FALLBACK_MODELS[modelIndex] || GROQ_CODING_MODEL;

        try {
          // Create abort controller for timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

          const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              model: model,
              messages: [
                {
                  role: "system",
                  content: `You are an expert ${getProgrammingLanguageName()} developer assistant. Help the user with their app development questions.
                  
                  When answering questions:
                  1. Provide specific, actionable advice relevant to ${getProgrammingLanguageName()}
                  2. Include code examples when helpful
                  3. Explain concepts clearly and thoroughly
                  4. Consider best practices and common pitfalls
                  5. Focus on production-quality recommendations
                  6. Address security, performance, and accessibility concerns
                  7. Provide context about why certain approaches are recommended
                  8. Consider the user's skill level and needs
                  
                  Your goal is to be helpful, educational, and provide expert guidance that leads to high-quality ${getProgrammingLanguageName()} development.`,
                },
                {
                  role: "user",
                  content: query,
                },
              ],
              temperature: 0.2,
              max_tokens: 4000,
            },
            {
              headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
              },
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);
          return response;
        } catch (error) {
          console.error(`Chat API call failed with model ${model}, attempt ${modelIndex + 1}:`, error);

          // Retry with fallback model
          if (modelIndex < MAX_RETRIES - 1) {
            console.log(`Retrying with fallback model: ${CHAT_FALLBACK_MODELS[modelIndex + 1]}`);
            return makeAPICallWithRetry(modelIndex + 1);
          }

          throw error; // Re-throw if all retries exhausted
        }
      };

      try {
        const response = await makeAPICallWithRetry(0);
        const assistantResponse = response.data.choices[0].message.content;

        // Add AI response to chat history
        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          { role: "user", content: query },
          { role: "assistant", content: assistantResponse },
        ]);
      } catch (error) {
        console.error("Error processing app creator chat after all retries:", error);

        // Enhanced fallback response with helpful suggestions
        const fallbackResponse = `## Temporary Connection Issue

I'm having trouble connecting to the AI service right now. Here's what you can do:

### Your Question
> ${query}

### While Waiting
1. **Check your internet connection** - Make sure you're online
2. **Try again in a moment** - The AI service may be experiencing high traffic
3. **Review your code** - Continue working on other parts of your app

### Quick ${getProgrammingLanguageName()} Tips
- Use consistent code formatting and naming conventions
- Add comments for complex logic
- Break down large functions into smaller, reusable pieces
- Test your code frequently

*Click Send to retry your question, or try rephrasing it.*`;

        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          { role: "user", content: query },
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ]);
      } finally {
        setIsAiHelperProcessing(false);
      }
    };

    // Helper function to generate README.md
    const generateProjectReadme = async (
      appName,
      description,
      requirements,
      language
    ) => {
      try {
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert technical documentation writer. Create a comprehensive README.md file for a ${language} project that follows best practices for documentation.
                
                The README should include:
                1. Clear project title and description
                2. Features list highlighting key functionality
                3. Installation instructions with step-by-step commands
                4. Usage examples with code snippets where relevant
                5. API documentation if applicable
                6. Technologies used with versions
                7. Project structure explanation
                8. Contribution guidelines
                9. License information
                10. Author/team information
                
                Format the README with proper Markdown headers, lists, code blocks, and emphasis.`,
              },
              {
                role: "user",
                content: `Create a comprehensive README.md file for this ${language} application:
                
                App name: ${appName}
                App description: ${description}
                Requirements: ${requirements}
                
                The README should be well-structured, informative, and follow best practices for open source projects. Include all sections mentioned in the system prompt.`,
              },
            ],
            temperature: 0.2,
            max_tokens: 3000,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data.choices[0].message.content;
      } catch (error) {
        console.error("Error generating README:", error);
        return `# ${appName}\n\n${description}\n\n## Requirements\n\n${requirements}\n\n## Getting Started\n\nFollow these instructions to get the project up and running.`;
      }
    };

    // Modified function to generate app including Pexels API for real images and videos - ENHANCED
    const generateApp = async () => {
      setIsCreatingApp(true);
      setAppGenerationStep("generating");
      setAppGenerationError(null);

      try {
        console.log(
          "Starting app generation for:",
          getProgrammingLanguageName()
        );

        // First, generate images and videos for the app using Pexels API if user hasn't uploaded their own
        let appImages = [];
        let appVideos = [];

        if (!imageFile) {
          try {
            // Fetch images from Pexels
            const searchQuery = `${getProgrammingLanguageName()} ${appDescription} app UI`;
            appImages = await fetchPexelsImages(searchQuery, 6);
            console.log("Generated app images:", appImages);

            // Also fetch some videos if appropriate
            if (
              appDescription.toLowerCase().includes("video") ||
              appDescription.toLowerCase().includes("media") ||
              appDescription.toLowerCase().includes("streaming") ||
              appDescription.toLowerCase().includes("tutorial")
            ) {
              // Only fetch videos for specific app types
              appVideos = await fetchPexelsVideos(searchQuery, 3);
              console.log("Generated app videos:", appVideos);
            }
          } catch (error) {
            console.error(
              "Error generating images/videos, will continue without them:",
              error
            );
            // Continue without images/videos
          }
        }

        // Include image/video data in the prompt
        const mediaContext = imageFile
          ? "The user has uploaded a custom mockup image for reference."
          : appImages.length > 0
            ? `${appImages.length
            } real UI mockups have been created for reference.${appVideos.length > 0
              ? " Additionally, video content is available for integration."
              : ""
            }`
            : "";

        const promptWithMediaContext = `${appDescription}\n\n${mediaContext} The app should have a professional, modern UI with appropriate styling.`;

        console.log(
          "Preparing to generate app structure with prompt:",
          promptWithMediaContext
        );

        // ENHANCED: Using better system prompt and increased token size
        const structureResponse = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert ${getProgrammingLanguageName()} developer who creates structured applications following best practices. Based on the user's description and requirements, define a complete app structure for a ${getProgrammingLanguageName()} application. 
                            
                            When creating the application structure:
                            1. Follow modern best practices for ${getProgrammingLanguageName()}
                            2. Create a complete, realistic project structure
                            3. Include all necessary configuration files
                            4. Follow proper file organization principles
                            5. Support responsive design and accessibility requirements
                            6. Ensure the app architecture is scalable and maintainable
                            7. Consider appropriate design patterns for the application type
                            8. Include testing and documentation setup
                            9. Organize code into logical modules/components
                            10. Add proper error handling and logging
                            11. Consider security best practices
                            12. Include performance optimization strategies
                            
                            Return your response as JSON with this format: 
                            { 
                              "appName": "name-of-app", 
                              "description": "Brief summary of what the app does", 
                              "structure": [ 
                                { 
                                  "name": "filename.${getFileExtension()}", 
                                  "type": "file", 
                                  "path": "${getDefaultPath()}", 
                                  "description": "Purpose of this file" 
                                } 
                              ] 
                            }
                            
                            Include all necessary files for a complete ${getProgrammingLanguageName()} application.`,
              },
              {
                role: "user",
                content: `Please create a ${getProgrammingLanguageName()} application based on this description: ${promptWithMediaContext}
                            
                            Requirements: ${appRequirements}
                            
                            The application MUST be responsive and work on all device sizes with:
                            - Media queries for mobile, tablet, and desktop
                            - Responsive layouts using flexbox or grid
                            - Accessible interactive elements
                            - Proper semantic HTML structure
                            - Modern UI with cohesive styling
                            
                            Define the complete file structure as JSON.`,
              },
            ],
            temperature: 0.1, // Lower temperature for more consistent results
            max_tokens: 4000, // ENHANCED: Increased from 1500 to 4000
            response_format: { type: "json_object" },
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const structureData = JSON.parse(
          structureResponse.data.choices[0].message.content
        );
        console.log("Generated app structure:", structureData);

        // Update app creator chat history
        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          { role: "user", content: appRequirements },
          {
            role: "assistant",
            content: `I'll create a ${getProgrammingLanguageName()} application called "${structureData.appName
              }" based on your requirements. Here's the app structure I'm planning to generate:\n\n${structureData.structure
                .map((file) => `- ${file.path}${file.name} - ${file.description}`)
                .join("\n")}`,
          },
        ]);

        // Now generate content for each file
        const generatedFiles = [];
        for (const file of structureData.structure) {
          console.log(`Generating content for file: ${file.path}${file.name}`);

          // Add image/video URLs to UI component files
          const shouldIncludeMedia =
            file.name.includes("component") ||
            file.name.includes("App") ||
            file.name.includes("index") ||
            file.name.includes("style") ||
            file.name.includes("UI");

          const hasVideoComponent =
            file.name.includes("Video") ||
            file.name.includes("Player") ||
            file.name.includes("Media") ||
            file.description.toLowerCase().includes("video") ||
            file.description.toLowerCase().includes("player");

          const mediaPrompt =
            shouldIncludeMedia &&
              (appImages.length > 0 ||
                imageFile ||
                (hasVideoComponent && appVideos.length > 0))
              ? `This file should incorporate UI elements based on the ${imageFile ? "uploaded mockup" : "provided media assets"
              }. ${!imageFile
                ? `The provided assets include ${appImages.length > 0
                  ? `${appImages.length} professional UI mockup images`
                  : ""
                }${appImages.length > 0 && appVideos.length > 0
                  ? " and "
                  : ""
                }${appVideos.length > 0
                  ? `${appVideos.length} relevant videos`
                  : ""
                } that can be incorporated into the UI design.`
                : ""
              }${hasVideoComponent && appVideos.length > 0
                ? `\n\nInclude video integration in this component using the video URLs provided.`
                : ""
              }`
              : "";

          try {
            // ENHANCED: Using better system prompt and increased token size
            const fileResponse = await axios.post(
              "https://api.groq.com/openai/v1/chat/completions",
              {
                model: GROQ_CODING_MODEL,
                messages: [
                  {
                    role: "system",
                    content: `You are an expert ${getProgrammingLanguageName()} developer who writes clean, maintainable code following best practices. 
                                
                                When generating code:
                                1. Follow modern, production-level ${getProgrammingLanguageName()} patterns
                                2. Include proper error handling and edge cases
                                3. Write well-documented code with comments
                                4. Create responsive designs using modern CSS techniques
                                5. Implement accessibility features (ARIA, keyboard navigation)
                                6. Use semantic HTML elements where appropriate
                                7. Follow separation of concerns and clean code principles
                                8. Include proper validation and security measures
                                9. Add comprehensive error handling
                                10. Use appropriate design patterns
                                11. Include performance optimizations
                                12. Consider SEO and meta tags for relevant files
                                13. Add appropriate testing approaches
                                14. Use proper state management techniques
                                
                                ${shouldIncludeMedia
                        ? "Create a polished UI with modern design, responsive layout, professional styling, and proper accessibility."
                        : ""
                      }
                                ${hasVideoComponent && appVideos.length > 0
                        ? "Incorporate video elements with proper controls, responsiveness, and fallbacks."
                        : ""
                      }
                                
                                Only return the code content, no additional text or markdown formatting.`,
                  },
                  {
                    role: "user",
                    content: `Generate the content for ${file.path}${file.name
                      } in this ${getProgrammingLanguageName()} app:
                                
                                App name: ${structureData.appName}
                                App description: ${structureData.description}
                                This file's purpose: ${file.description}
                                Original app description: ${promptWithMediaContext}
                                Requirements: ${appRequirements}
                                ${mediaPrompt}
                                ${shouldIncludeMedia
                        ? "Make sure the UI looks professional with proper styling, layout, and design elements."
                        : ""
                      }
                                
                                Generate only the file content, with appropriate code, comments, and formatting.
                                ${shouldIncludeMedia && appImages.length > 0
                        ? `Use these image URLs in your UI components where appropriate: ${JSON.stringify(
                          appImages.map((img) => img.url)
                        )}`
                        : ""
                      }
                                ${hasVideoComponent && appVideos.length > 0
                        ? `Use these video URLs in your video components: ${JSON.stringify(
                          appVideos.map((vid) => vid.url)
                        )}\nAnd these video preview images: ${JSON.stringify(
                          appVideos.map((vid) => vid.preview)
                        )}`
                        : ""
                      }
                                
                                For UI components ensure:
                                - Responsive design with media queries
                                - Flex or grid-based layouts
                                - Relative size units (rem, %, vh/vw)
                                - Accessible interactive elements
                                - Clear visual hierarchy and spacing
                                
                                ${hasVideoComponent && appVideos.length > 0
                        ? `For video components ensure:
                                - Responsive video containers that maintain aspect ratio
                                - Proper video controls with accessibility support
                                - Fallback content for browsers that don't support video
                                - Lazy loading for better performance
                                - Support for multiple video formats if applicable`
                        : ""
                      }`,
                  },
                ],
                temperature: 0.1, // Lower temperature for more consistent code
                max_tokens: 4000, // ENHANCED: Increased from 2000 to 4000
              },
              {
                headers: {
                  Authorization: `Bearer ${GROQ_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const fileContent = fileResponse.data.choices[0].message.content;
            console.log(
              `Successfully generated content for ${file.path}${file.name}`
            );

            // Validate the generated code for UI components
            if (shouldIncludeMedia) {
              const validation = validateGeneratedCode(
                fileContent,
                selectedProgrammingLanguage
              );
              if (!validation.valid) {
                console.warn(
                  `Generated UI code validation issue:`,
                  validation.reason
                );
                // In production, implement code to regenerate with more specific instructions
              }

              // Extract UI component definitions to track them
              const componentMatches =
                fileContent.match(
                  /(?:class|function|const)\s+(\w+)(?:\s+extends\s+\w+)?\s*(?:\(\w*\))?\s*(?:{|=>)/g
                ) || [];
              const extractedComponents = componentMatches.map((match) => {
                const componentName = match.match(
                  /(?:class|function|const)\s+(\w+)/
                )[1];
                return {
                  name: componentName,
                  file: file.name,
                };
              });
              if (extractedComponents.length > 0) {
                setAppUiComponents((prev) => [...prev, ...extractedComponents]);
              }
            }

            generatedFiles.push({
              id: `${file.path}${file.name}`,
              name: file.name,
              path: file.path,
              type: "file",
              content: fileContent,
            });
          } catch (error) {
            console.error(
              `Error generating content for file ${file.path}${file.name}:`,
              error
            );
            generatedFiles.push({
              id: `${file.path}${file.name}`,
              name: file.name,
              path: file.path,
              type: "file",
              content: `// Error generating content for this file\n// ${error.message}`,
            });
          }
        }

        // After generating all files, also create an asset folder with image/video references
        if (appImages.length > 0 || appVideos.length > 0 || imageFile) {
          // Add image/video references to the files
          generatedFiles.push({
            id: `src/assets/README.md`,
            name: "README.md",
            path: "src/assets/",
            type: "file",
            content: `# Media Assets\n\nThis directory contains UI images and videos for the application.\n\n## Images\n${appImages
              .map(
                (img, index) =>
                  `- ui-mockup-${index + 1}.jpg: ${img.alt || "UI mockup"} - ${img.url
                  }\n  - Credit: ${img.photographer}\n`
              )
              .join("")}${imageFile ? "- user-mockup.jpg: User provided mockup\n" : ""
              }\n\n## Videos\n${appVideos
                .map(
                  (vid, index) =>
                    `- video-${index + 1}: Video asset (${vid.duration}s) - ${vid.url
                    }\n  - Preview image: ${vid.preview}\n`
                )
                .join("")}`,
          });
        }

        // Generate documentation file
        generatedFiles.push({
          id: `README.md`,
          name: "README.md",
          path: "",
          type: "file",
          content: await generateProjectReadme(
            structureData.appName,
            structureData.description,
            appRequirements,
            getProgrammingLanguageName()
          ),
        });

        // Set the generated files
        setGeneratedAppFiles(generatedFiles);

        // Update file list in the app creator
        setAppCreatorFiles([
          {
            id: "app-structure",
            name: "App Structure",
            type: "dir",
            content: "",
          },
          ...generatedFiles,
        ]);

        // Set the first file as active
        setActiveAppFile(generatedFiles[0]);
        setCodeEditorContent(generatedFiles[0].content);

        // Update app creator chat history with media information
        let mediaMessage = "";
        if (appImages.length > 0 && appVideos.length > 0) {
          mediaMessage = ` I've incorporated ${appImages.length} professional UI images and ${appVideos.length} videos into your app design.`;
        } else if (appImages.length > 0) {
          mediaMessage = ` I've incorporated ${appImages.length} professional UI images into your design.`;
        } else if (appVideos.length > 0) {
          mediaMessage = ` I've added ${appVideos.length} videos to enhance your app's media features.`;
        } else if (imageFile) {
          mediaMessage =
            " I've incorporated elements from your uploaded mockup into the design.";
        }

        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          {
            role: "assistant",
            content: `I've successfully generated all files for your "${structureData.appName
              }" ${getProgrammingLanguageName()} application.${mediaMessage} You can now browse through the files, edit them, and download the complete project. I've also created comprehensive documentation in the README.md file.`,
          },
        ]);

        // Speak the response
        speakResponse(
          `I've successfully generated all files for your "${structureData.appName
          }" ${getProgrammingLanguageName()} application.${mediaMessage} You can now browse through the files, edit them, and download the complete project.`
        );

        // Complete the app generation process
        setAppGenerationStep("complete");
      } catch (error) {
        console.error(
          `Error generating ${getProgrammingLanguageName()} app:`,
          error
        );
        // Set detailed error information
        setAppGenerationError(
          error.response
            ? `Error from Groq API: ${error.response.status} ${error.response.data?.error?.message || error.message
            }`
            : `Network error: ${error.message}`
        );
        setAppCreatorChatHistory([
          ...appCreatorChatHistory,
          {
            role: "assistant",
            content: `I'm sorry, but I encountered an error while generating your ${getProgrammingLanguageName()} application: ${error.response?.data?.error?.message || error.message
              }. Please try again or modify your requirements.`,
          },
        ]);

        // Speak the error message
        speakResponse(
          `I'm sorry, but I encountered an error while generating your ${getProgrammingLanguageName()} application. Please try again or modify your requirements.`
        );
      } finally {
        setIsCreatingApp(false);
      }
    };

    // Modified generatePreview function to include Pexels images and videos - ENHANCED
    const generatePreview = async () => {
      if (generatedAppFiles.length === 0 || !activeAppFile) {
        setPreviewError("No app files available to preview");
        return;
      }

      setIsGeneratingPreview(true);
      setPreviewError(null);

      try {
        // Prepare media references for the preview
        const imageReferences = [];
        const videoReferences = [];

        if (uploadedImage) {
          imageReferences.push(uploadedImage);
        }
        if (appGeneratedImages.length > 0) {
          imageReferences.push(
            ...appGeneratedImages.map((img) =>
              typeof img === "string" ? img : img.url
            )
          );
        }
        if (pexelsVideos.length > 0) {
          videoReferences.push(
            ...pexelsVideos.map((video) => ({
              url: video.url,
              preview: video.preview,
            }))
          );
        }

        // Include media references in the prompt
        const mediaPrompt =
          imageReferences.length > 0 || videoReferences.length > 0
            ? `Include these media assets in the preview:\n${imageReferences.length > 0
              ? `Images: ${JSON.stringify(imageReferences)}\n`
              : ""
            }${videoReferences.length > 0
              ? `Videos: ${JSON.stringify(videoReferences)}`
              : ""
            }`
            : "Create appropriate placeholder images for the UI elements";

        // ENHANCED: Using better system prompt and increased token size
        const previewResponse = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: GROQ_CODING_MODEL,
            messages: [
              {
                role: "system",
                content: `You are an expert at converting ${getProgrammingLanguageName()} code into runnable HTML preview. Your task is to create a complete HTML page that demonstrates the functionality of the ${getProgrammingLanguageName()} application described in the files provided. 
                            
                            When creating the preview:
                            1. Include all necessary CSS, JavaScript, and HTML
                            2. Create a fully responsive design that works on all devices
                            3. Use modern CSS features (flexbox/grid, variables, etc.)
                            4. Implement proper event handling and interactivity
                            5. Add accessibility features (ARIA, semantic HTML, etc.)
                            6. Ensure the preview shows realistic data and functionality
                            7. Optimize for performance and loading speed
                            8. Implement proper error handling and validation
                            9. Include all main app features in the preview
                            10. Add UI state management (active states, hover effects, etc.)
                            11. Include proper form validation if applicable
                            12. Simulate API interactions with mock data
                            
                            Create a visually stunning, professional UI with proper styling, colors, and layout. ${mediaPrompt}
                            
                                          Only return valid HTML code that can be directly injected into an iframe. No explanations or markdown.`,
              },
              {
                role: "user",
                content: `Create a preview HTML page for this ${getProgrammingLanguageName()} application. Here are some of the main files: ${generatedAppFiles
                  .slice(0, 5)
                  .map(
                    (file) =>
                      `--- ${file.path}${file.name
                      } ---\n${file.content.substring(0, 1000)}${file.content.length > 1000 ? "..." : ""
                      }\n\n`
                  )
                  .join("")}
                              
                            Create a complete, self-contained HTML page that demonstrates how this app would look and function. The HTML should include all necessary CSS and JavaScript inline. If the application is not web-based (like Python, Java, etc.), create a simulation/mockup of how the UI would look based on the code logic.
                            
                            Create a visually appealing, professional UI with:
                            - Proper responsive design for all screen sizes
                            - Clean typography and spacing
                            - Consistent color scheme
                            - Modern UI components
                            - Professional layout with proper alignment
                            - Interactive elements that simulate functionality
                            - Proper error states and loading indicators
                            - Clear navigation elements
                            - Modals and popups if relevant
                            - Form validation and feedback
                            
                            ${mediaPrompt}
                            
                            DO NOT include any explanations, ONLY return valid HTML code.`,
              },
            ],
            temperature: 0.2, // Better temperature for preview generation
            max_tokens: 8000, // ENHANCED: Increased from 4000 to 8000 for full previews
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Get the HTML content from the response
        const htmlContent =
          previewResponse.data.choices[0].message.content.trim();

        // Clean up any markdown code blocks if present
        const cleanHtml = htmlContent.replace(/```html\n|\n```|```/g, "");
        setPreviewHtml(cleanHtml);
        setShowPreview(true);
      } catch (error) {
        console.error("Error generating preview:", error);
        setPreviewError("Failed to generate preview. Please try again.");
      } finally {
        setIsGeneratingPreview(false);
      }
    };

    // Deployment Modal Component
    const DeploymentModal = () => {
      if (!showDeploymentModal) return null;

      return (
        <div className="deployment-modal">
          <div className="deployment-content">
            <div className="deployment-header">
              <h3>Deploy to GitHub</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setShowDeploymentModal(false);
                  setDeploymentComplete(false);
                  setDeploymentError(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="deployment-body">
              <div className="input-group">
                <label htmlFor="githubApiKey">GitHub API Key:</label>
                <input
                  type="password"
                  id="githubApiKey"
                  value={customGithubApiKey}
                  onChange={(e) => setCustomGithubApiKey(e.target.value)}
                  placeholder="Enter your GitHub API Key"
                />
                <p className="api-key-note">
                  Your API key should have permissions to create repositories
                  and push code.
                </p>
              </div>

              <div className="input-group">
                <label htmlFor="customRepoName">
                  Repository Name (optional):
                </label>
                <input
                  type="text"
                  placeholder="Search GitHub Projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                  // This helps maintain focus during the search operation
                  onBlur={(e) => {
                    // Only execute if not clicking on the search button
                    if (
                      !e.relatedTarget ||
                      !e.relatedTarget.classList.contains("search-button")
                    ) {
                      // Small delay to ensure we don't interfere with button clicks
                      setTimeout(() => {
                        if (searchInputRef.current) {
                          searchInputRef.current.focus();
                        }
                      }, 10);
                    }
                  }}
                />
              </div>

              {deploymentError && (
                <div className="deployment-error">
                  <p>Error: {deploymentError}</p>
                </div>
              )}

              {deploymentComplete ? (
                <div className="deployment-success">
                  <h4>🎉 Deployment Successful!</h4>
                  <p>Your code has been deployed to GitHub.</p>
                  <a
                    href={`https://github.com/${githubRepoOwner}/${githubRepoName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-repo-button"
                  >
                    <span className="icon">🔗</span> View Repository
                  </a>
                </div>
              ) : (
                <div className="deployment-actions">
                  <button
                    onClick={handleDeploy}
                    className="deploy-button"
                    disabled={isDeploying}
                  >
                    {isDeploying ? (
                      <>
                        <span className="spinner"></span>
                        Deploying...
                      </>
                    ) : (
                      <>
                        <span className="icon">🚀</span> Deploy to GitHub
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    // Pull Deploy Modal Component
    const PullDeployModal = () => {
      if (!showPullDeployModal) return null;

      return (
        <div className="deployment-modal">
          <div className="deployment-content">
            <div className="deployment-header">
              <h3>Pull & Deploy to Existing Repository</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setShowPullDeployModal(false);
                  setPullDeployComplete(false);
                  setPullDeployError(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="deployment-body">
              <div className="input-group">
                <label htmlFor="githubApiKey">GitHub API Key:</label>
                <input
                  type="password"
                  id="githubApiKey"
                  value={customGithubApiKey}
                  onChange={(e) => setCustomGithubApiKey(e.target.value)}
                  placeholder="Enter your GitHub API Key"
                />
                <p className="api-key-note">
                  Your API key should have permissions to push code to the
                  target repository.
                </p>
              </div>

              <div className="input-group">
                <label htmlFor="targetRepoOwner">
                  Repository Owner (username):
                </label>
                <input
                  type="text"
                  id="targetRepoOwner"
                  value={targetRepoOwner}
                  onChange={(e) => setTargetRepoOwner(e.target.value)}
                  placeholder="Enter GitHub username"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="targetRepoName">Repository Name:</label>
                <input
                  type="text"
                  id="targetRepoName"
                  value={targetRepoName}
                  onChange={(e) => setTargetRepoName(e.target.value)}
                  placeholder="Enter repository name"
                  required
                />
              </div>

              {pullDeployError && (
                <div className="deployment-error">
                  <p>Error: {pullDeployError}</p>
                </div>
              )}

              {pullDeployComplete ? (
                <div className="deployment-success">
                  <h4>🎉 Pull & Deploy Successful!</h4>
                  <p>
                    Your code has been combined with the existing repository
                    code and deployed.
                  </p>
                  <a
                    href={`https://github.com/${targetRepoOwner}/${targetRepoName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-repo-button"
                  >
                    <span className="icon">🔗</span> View Repository
                  </a>
                </div>
              ) : (
                <div className="deployment-actions">
                  <button
                    className="deploy-button"
                    onClick={handlePullDeploy}
                    disabled={
                      isPullDeploying || !targetRepoOwner || !targetRepoName
                    }
                  >
                    {isPullDeploying ? (
                      <>
                        <span className="spinner"></span>
                        Pulling & Deploying...
                      </>
                    ) : (
                      <>
                        <span className="icon">🚀</span> Pull & Deploy
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    // Modified Image Gallery Component to better display Pexels images
    const ImageGallery = () => {
      if (appGeneratedImages.length === 0 && !uploadedImage) return null;
      return (
        <div className="app-image-gallery">
          <h4>UI Design References</h4>
          <div className="image-gallery-container">
            {uploadedImage && (
              <div
                className={`gallery-image ${selectedAppImage === "uploaded" ? "selected" : ""
                  }`}
                onClick={() => setSelectedAppImage("uploaded")}
              >
                <img src={uploadedImage} alt="Uploaded mockup" />
                <div className="image-label">Your mockup</div>
              </div>
            )}
            {appGeneratedImages.map((image, index) => (
              <div
                key={index}
                className={`gallery-image ${selectedAppImage === index ? "selected" : ""
                  }`}
                onClick={() => setSelectedAppImage(index)}
              >
                <img
                  src={typeof image === "string" ? image : image.url}
                  alt={
                    typeof image === "object" && image.alt
                      ? image.alt
                      : `Generated UI mockup ${index + 1}`
                  }
                />
                <div className="image-label">
                  {typeof image === "object" && image.photographer
                    ? `By ${image.photographer}`
                    : `Mockup ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-actions">
            <button
              className="regenerate-button"
              onClick={() =>
                generateAppImages(appDescription, getProgrammingLanguageName())
              }
            >
              <span className="icon">🔄</span> Generate New Designs
            </button>
            {selectedAppImage !== null && (
              <button
                className="use-design-button"
                onClick={() =>
                  setAppCreatorChatHistory([
                    ...appCreatorChatHistory,
                    {
                      role: "user",
                      content: `I want to use ${selectedAppImage === "uploaded"
                        ? "my uploaded mockup"
                        : `mockup ${selectedAppImage + 1}`
                        } as the design reference.`,
                    },
                    {
                      role: "assistant",
                      content: `Great choice! I'll reference ${selectedAppImage === "uploaded"
                        ? "your uploaded mockup"
                        : `mockup ${selectedAppImage + 1}`
                        } when generating the UI components.`,
                    },
                  ])
                }
              >
                <span className="icon">✓</span> Use This Design
              </button>
            )}
          </div>
        </div>
      );
    };

    // Video Gallery Component for displaying Pexels videos
    const VideoGallery = () => {
      if (pexelsVideos.length === 0) return null;
      return (
        <div className="app-video-gallery">
          <h4>Video Content References</h4>
          <div className="video-gallery-container">
            {pexelsVideos.map((video, index) => (
              <div key={index} className="gallery-video">
                <div className="video-preview">
                  <img src={video.preview} alt={`Video preview ${index + 1}`} />
                  <div className="video-play-overlay">▶</div>
                </div>
                <div className="video-info">
                  <div className="video-label">Video {index + 1}</div>
                  <div className="video-duration">{video.duration}s</div>
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-actions">
            <button
              className="regenerate-button"
              onClick={() => fetchPexelsVideos(appDescription, 3)}
            >
              <span className="icon">🔄</span> Find More Videos
            </button>
          </div>
        </div>
      );
    };

    // Close preview
    const closePreview = () => {
      setShowPreview(false);
    };

    // Handle language change
    const handleLanguageChange = (languageId) => {
      setSelectedProgrammingLanguage(languageId);
    };

    // Override the React app generation function to use our multi-language function
    const handleAppRequirementsSubmit = (e) => {
      e.preventDefault();
      if (!appRequirements.trim()) {
        alert("Please provide some requirements for your app");
        return;
      }
      // Start generating the app with the selected language
      generateApp();
    };

    // ---- App Creator Functions ----
    // Modify the handleAppDescriptionSubmit function to initialize images
    const handleAppDescriptionSubmit = (e) => {
      e.preventDefault();
      if (!appDescription.trim()) {
        alert("Please provide a description of the app you want to create");
        return;
      }

      // Move to the next step in app creation
      setAppGenerationStep("requirements");

      // If user hasn't uploaded an image, automatically generate images
      if (!uploadedImage) {
        // Start generating images in the background
        generateAppImages(appDescription, getProgrammingLanguageName());
      }

      // Add to chat history
      setAppCreatorChatHistory([
        ...appCreatorChatHistory,
        { role: "user", content: appDescription },
        {
          role: "assistant",
          content:
            "Thank you for your app description. To better understand your needs, could you provide some specific requirements for this app? For example:\n\n- What features should it have?\n- Who is the target audience?\n- What technologies do you prefer to use?\n- Any specific UI/UX preferences?",
        },
      ]);
    };

    // Handle app file selection
    const handleAppFileClick = (file) => {
      setActiveAppFile(file);
      setCodeEditorContent(file.content || "");
    };

    // Handle code editor changes
    const handleCodeEditorChange = (e) => {
      setCodeEditorContent(e.target.value);
      // Update the file content in the generatedAppFiles array
      if (activeAppFile) {
        const updatedFiles = generatedAppFiles.map((file) =>
          file.id === activeAppFile.id
            ? { ...file, content: e.target.value }
            : file
        );
        setGeneratedAppFiles(updatedFiles);
      }
    };

    // Download the complete app as a zip file
    const downloadAppAsZip = () => {
      // This would use JSZip or a similar library to package all files into a downloadable zip
      alert(
        "This would download all files as a zip. For now, you can copy each file's content individually."
      );
    };

    // Simple markdown formatter for displaying responses
    const formatMarkdown = (text) => {
      if (!text) return "";

      // Handle code blocks
      text = text.replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="code-block"><code>$2</code></pre>'
      );

      // Handle inline code
      text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

      // Handle headers
      text = text.replace(/^### (.*$)/gm, "<h4>$1</h4>");
      text = text.replace(/^## (.*$)/gm, "<h3>$1</h3>");
      text = text.replace(/^# (.*$)/gm, "<h2>$1</h2>");

      // Handle lists
      text = text.replace(/^\* (.*$)/gm, "<li>$1</li>");
      text = text.replace(/^- (.*$)/gm, "<li>$1</li>");
      text = text.replace(/^(\d+)\. (.*$)/gm, "<li>$2</li>");

      // Handle paragraphs
      text = text.replace(/\n\n/g, "</p><p>");

      // Wrap in paragraph if not already
      if (!text.startsWith("<h") && !text.startsWith("<p>")) {
        text = "<p>" + text + "</p>";
      }
      // Handle bold
      text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");

      // Handle italic
      text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
      text = text.replace(/_(.*?)_/g, "<em>$1</em>");

      // Handle links
      text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

      return text;
    };

    // ------- Enhanced Feature Popups -------

    // Explain Codebase Popup Component
    const ExplainCodebasePopup = () => {
      if (!showExplainCodebasePopup) return null;

      return (
        <div className="feature-popup codebase-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>📚 Codebase Explanation</h2>
              <button
                className="close-btn"
                onClick={() => setShowExplainCodebasePopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-body">
              {isAnalyzingCodebase ? (
                <div className="analyzing-codebase">
                  <div className="spinner"></div>
                  <p>Analyzing codebase structure and organization...</p>
                </div>
              ) : (
                <>
                  <div className="ratings-section">
                    <h3>Codebase Rating</h3>
                    <div className="ratings-grid">
                      <div className="rating-item">
                        <span className="rating-label">Codebase Quality:</span>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{
                              width: `${codebaseRatings.codebase * 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="rating-value">
                          {codebaseRatings.codebase}/10
                        </span>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Navigation:</span>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{
                              width: `${codebaseRatings.navigation * 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="rating-value">
                          {codebaseRatings.navigation}/10
                        </span>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Use Case Clarity:</span>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{
                              width: `${codebaseRatings.useCase * 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="rating-value">
                          {codebaseRatings.useCase}/10
                        </span>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">Compatibility:</span>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{
                              width: `${codebaseRatings.compatibility * 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="rating-value">
                          {codebaseRatings.compatibility}/10
                        </span>
                      </div>
                      <div className="rating-item">
                        <span className="rating-label">
                          Runtime Performance:
                        </span>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{
                              width: `${codebaseRatings.runtime * 10}%`,
                            }}
                          ></div>
                        </div>
                        <span className="rating-value">
                          {codebaseRatings.runtime}/10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="explanation-container">
                    <h3>Structure Analysis</h3>
                    <div
                      className="explanation-content"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(codebaseExplanation),
                      }}
                    ></div>
                  </div>
                  <div className="voice-actions">
                    <button
                      onClick={() => speakResponse(codebaseExplanation)}
                      className="voice-button"
                    >
                      <span className="icon">🔊</span> Listen to Explanation
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    };

    // Explain Purpose Popup Component
    const ExplainPurposePopup = () => {
      if (!showExplainPurposePopup) return null;

      return (
        <div className="feature-popup purpose-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>🔍 Project Purpose & Business Model</h2>
              <button
                className="close-btn"
                onClick={() => setShowExplainPurposePopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-body">
              <div className="purpose-explanation">
                <div
                  className="explanation-content"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(purposeExplanation),
                  }}
                ></div>
              </div>
              <div className="purpose-chat">
                <h3>Ask About Business Model</h3>
                <div className="chat-messages">
                  {purposeChatHistory.map((message, index) => (
                    <div key={index} className={`chat-message ${message.role}`}>
                      <div
                        className="message-content"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(message.content),
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handlePurposeChatSubmit}
                  className="chat-input-form"
                >
                  <input
                    type="text"
                    placeholder="Ask about business model, features, or target users..."
                    value={purposeChatInput}
                    onChange={(e) => setPurposeChatInput(e.target.value)}
                  />
                  <button type="submit">
                    <span className="icon">💬</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Generate Code Popup Component
    const GenerateCodePopup = () => {
      if (!showGenerateCodePopup) return null;

      return (
        <div className="feature-popup generate-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>✨ AI Code Generation</h2>
              <button
                className="close-btn"
                onClick={() => setShowGenerateCodePopup(false)}
              >
                ×
              </button>
            </div>
            <div className="popup-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  processGenerationPrompt();
                }}
                className="generation-form"
              >
                <div className="input-group">
                  <label htmlFor="generationPrompt">
                    What would you like to generate?
                  </label>
                  <textarea
                    id="generationPrompt"
                    placeholder="E.g., Generate a responsive navigation component with dark mode toggle"
                    value={generationPrompt}
                    onChange={(e) => setGenerationPrompt(e.target.value)}
                    rows={4}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="generate-button"
                  disabled={isLoadingGeneration}
                >
                  {isLoadingGeneration ? "Generating..." : "Generate Code"}
                </button>
              </form>

              {isLoadingGeneration && (
                <div className="loading-indicator">
                  <div className="spinner"></div>
                  <p>
                    Generating high-quality code based on your requirements...
                  </p>
                </div>
              )}

              {generationResult && (
                <div className="generation-result">
                  <h3>Generated Code</h3>
                  <div
                    className="result-content"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(generationResult),
                    }}
                  ></div>
                  <div className="result-actions">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generationResult);
                        alert("Code copied to clipboard!");
                      }}
                      className="copy-button"
                    >
                      <span className="icon">📋</span> Copy to Clipboard
                    </button>
                    <button
                      onClick={() => {
                        setShowDeploymentModal(true);
                      }}
                      className="deploy-button"
                    >
                      <span className="icon">🚀</span> Deploy to GitHub
                    </button>
                    <button
                      onClick={() => {
                        setShowPullDeployModal(true);
                      }}
                      className="pull-deploy-button"
                    >
                      <span className="icon">🔄</span> Pull & Deploy
                    </button>

                    {/* NEW: Button for integrating with codebase */}
                    <button
                      onClick={handleIntegrateWithCodebase}
                      className="integrate-button"
                      disabled={isIntegrating}
                    >
                      <span className="icon">🧩</span>
                      {isIntegrating
                        ? "Integrating..."
                        : "Integrate with Codebase"}
                    </button>
                  </div>

                  {/* NEW: Integration status messages */}
                  {integrationComplete && (
                    <div className="integration-success">
                      <p>
                        ✅ Code successfully integrated with the current file
                        and pushed to GitHub!
                      </p>
                    </div>
                  )}
                  {integrationError && (
                    <div className="integration-error">
                      <p>❌ Integration error: {integrationError}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Add Deployment Modals */}
          {showDeploymentModal && (
            <div className="nested-deployment-modal">
              <DeploymentModal />
            </div>
          )}
          {showPullDeployModal && (
            <div className="nested-deployment-modal">
              <PullDeployModal />
            </div>
          )}
        </div>
      );
    };

    // ----- HomePage Component -----
    const HomePage = () => {
      return (
        <>
          <h1>ORCA</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search GitHub Projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="search-button"
              onClick={handleSearchWithGroq}
              title="Search with Groq AI"
              disabled={isGroqSearching}
            >
              {isGroqSearching ? "🔄" : "🔍"}
            </button>
            <button
              className={`voice-button ${isListening ? "listening" : ""}`}
              onClick={toggleListening}
              title="Search by voice"
            >
              {isListening ? "🎙️" : "🎤"}
            </button>
            <button
              className="settings-button"
              onClick={() => setShowVoiceSettings(true)}
              title="Voice settings"
            >
              ⚙️
            </button>
            <button
              className="choose-button"
              onClick={handleChooseClick}
              title="I'm new here"
            >
              <span className="icon">✨</span> I'm New
            </button>
            <button
              className="create-app-button"
              onClick={handleCreateAppClick}
              title="Create a new app"
            >
              <span className="icon">🚀</span> Create App
            </button>
          </div>

          {/* Follow-up question display */}
          {needsFollowUp && waitingForFollowUp && (
            <div className="followup-question">
              <p>{followUpQuestion}</p>
              <button onClick={toggleListening} className="answer-button">
                {isListening ? "Listening..." : "Answer by voice"}
              </button>
            </div>
          )}

          {/* Voice response display */}
          {chatResponse && (
            <div className="voice-response">
              <h3>Assistant Response</h3>
              <div
                className="response-content"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(chatResponse),
                }}
              ></div>
              <button
                onClick={() => speakResponse(chatResponse)}
                className="speak-again"
              >
                🔊 Speak Again
              </button>
            </div>
          )}

          {loading && <div className="loading">Loading projects...</div>}
          {isGroqSearching && (
            <div className="loading">
              Searching for the best {searchTerm} projects with AI...
            </div>
          )}
          {error && <div className="error">{error}</div>}

          <div className="project-cards">
            {githubProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <h2>{project.name}</h2>
                <p className="owner">by {project.owner.login}</p>
                <p className="description">
                  {project.description
                    ? project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description
                    : "No description available."}
                </p>
                <div className="project-stats">
                  <span>⭐ {project.stargazers_count}</span>
                  <span>🍴 {project.forks_count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Groq Search Results */}
          {groqSearchResults.length > 0 && (
            <div className="groq-search-results">
              <h2>🤖 AI-Recommended Projects</h2>
              <div className="groq-project-cards">
                {groqSearchResults.map((project, index) => (
                  <div key={index} className="groq-project-card">
                    <h3>{project.name}</h3>
                    <p className="description">{project.description}</p>
                    <div className="project-meta">
                      <span className="language">{project.language}</span>
                      <span className="stars">⭐ {project.stars}</span>
                      <span
                        className={`difficulty ${project.difficulty.toLowerCase()}`}
                      >
                        {project.difficulty}
                      </span>
                    </div>
                    <div className="tags">
                      {project.tags &&
                        project.tags.map((tag, idx) => (
                          <span key={idx} className="tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="card-actions">
                      <button
                        className="view-repo-btn"
                        onClick={() => exploreGroqProject(project)}
                      >
                        <span className="icon">🔍</span> Explore Repository
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      );
    };

    // GitHubView Component
    const GitHubView = () => {
      return (
        <div className="github-ui">
          <header className="github-header">
            <button onClick={backToHome} className="back-to-home-button">
              <span className="icon">🏠</span> Back
            </button>
            <div className="repo-title">
              <h2>{selectedProject?.name}</h2>
            </div>
            <div className="github-header-actions">
              <button
                className="explain-codebase-button"
                onClick={explainCodebase}
                disabled={isExplainingCodebase}
                title="Explain this codebase"
              >
                <span className="icon">📚</span> Explain Codebase
              </button>
              <button
                className="explain-purpose-button"
                onClick={explainPurpose}
                disabled={chatLoading}
                title="Explain purpose of each file"
              >
                <span className="icon">🔍</span> Explain Purpose
              </button>
              <button
                className="generate-code-button"
                onClick={generateCode}
                disabled={isGeneratingCode}
                title="Generate code for this project"
              >
                <span className="icon">✨</span> Generate
              </button>
              <button className="voice-button" onClick={toggleListening}>
                {isListening ? "🎙️" : "🎤"}
              </button>
              <button
                className="settings-button"
                onClick={() => setShowVoiceSettings(true)}
              >
                ⚙️
              </button>
            </div>
          </header>

          <nav className="github-nav">
            <ul className="nav-tabs">
              <li className={currentTab === "code" ? "active" : ""}>
                <button onClick={() => handleTabClick("code")}>
                  <span className="icon">📁</span> Code
                </button>
              </li>
              <li className={currentTab === "issues" ? "active" : ""}>
                <button onClick={() => handleTabClick("issues")}>
                  <span className="icon">⚠️</span> Issues
                </button>
              </li>
              <li className={currentTab === "pull" ? "active" : ""}>
                <button onClick={() => handleTabClick("pull")}>
                  <span className="icon">🔄</span> Pull requests
                </button>
              </li>
              <li className={currentTab === "actions" ? "active" : ""}>
                <button onClick={() => handleTabClick("actions")}>
                  <span className="icon">⚡</span> Actions
                </button>
              </li>
              <li className={currentTab === "projects" ? "active" : ""}>
                <button onClick={() => handleTabClick("projects")}>
                  <span className="icon">📊</span> Projects
                </button>
              </li>
              <li className={currentTab === "wiki" ? "active" : ""}>
                <button onClick={() => handleTabClick("wiki")}>
                  <span className="icon">📚</span> Wiki
                </button>
              </li>
              <li className={currentTab === "security" ? "active" : ""}>
                <button onClick={() => handleTabClick("security")}>
                  <span className="icon">🔒</span> Security
                </button>
              </li>
              <li className={currentTab === "insights" ? "active" : ""}>
                <button onClick={() => handleTabClick("insights")}>
                  <span className="icon">📈</span> Insights
                </button>
              </li>
              <li className={currentTab === "settings" ? "active" : ""}>
                <button onClick={() => handleTabClick("settings")}>
                  <span className="icon">⚙️</span> Settings
                </button>
              </li>
            </ul>
          </nav>

          <div className="github-content">
            <div className="file-explorer">
              <div className="file-explorer-header">
                <h3>Files</h3>
              </div>
              <div className="file-explorer-nav">
                <button onClick={backToProjectRoot} className="root-button">
                  <span className="icon">🏠</span> Root
                </button>
                <div className="breadcrumb">
                  {activeFile && (
                    <div className="file-path-breadcrumbs">
                      <span onClick={backToProjectRoot}>
                        {selectedProject.name}
                      </span>
                      {activeFile.path
                        .split("/")
                        .map((segment, index, array) => {
                          if (index === array.length - 1) {
                            return (
                              <span key={index} className="current">
                                {segment}
                              </span>
                            );
                          }
                          return <span key={index}>{segment}</span>;
                        })}
                    </div>
                  )}
                </div>
              </div>
              <ul className="files-list">
                {projectFiles.map((file) => (
                  <li
                    key={file.sha}
                    className={
                      activeFile && activeFile.path === file.path
                        ? "active"
                        : ""
                    }
                    onClick={() => handleFileClick(file)}
                  >
                    {file.type === "dir" ? (
                      <span className="icon folder-icon">📁</span>
                    ) : (
                      <span className="icon file-icon">📄</span>
                    )}
                    <span className="file-name">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="main-content">
              {currentTab === "code" ? (
                <>
                  {activeFile ? (
                    <div className="file-view">
                      <div className="file-header">
                        <h3>
                          <span className="icon">📄</span> {activeFile.name}
                        </h3>
                        <div className="file-actions">
                          <button className="file-action-button">
                            <span className="icon">✏️</span> Edit
                          </button>
                          <button className="file-action-button">
                            <span className="icon">⬇️</span> Download
                          </button>
                        </div>
                      </div>
                      <div className="file-content">
                        {fileLoading ? (
                          <div className="loading-spinner">Loading...</div>
                        ) : fileLoadError ? (
                          <div className="file-load-error">
                            Failed to load file content. This could be due to
                            API limits or file permissions.
                          </div>
                        ) : (
                          <pre className="code-display">
                            <code>{fileContent}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="repo-overview">
                      <h3>Repository: {selectedProject?.name}</h3>
                      <p>{selectedProject?.description}</p>
                      <div className="files-overview">
                        <h4>Files in this repository:</h4>
                        <ul>
                          {projectFiles.map((file) => (
                            <li
                              key={file.sha}
                              onClick={() => handleFileClick(file)}
                            >
                              {file.type === "dir" ? (
                                <span className="icon">📁</span>
                              ) : (
                                <span className="icon">📄</span>
                              )}{" "}
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="tab-content">
                  {chatLoading ? (
                    <div className="loading-spinner">
                      Loading {currentTab} data...
                    </div>
                  ) : (
                    <div className="groq-analysis">
                      <h3>
                        {currentTab.charAt(0).toUpperCase() +
                          currentTab.slice(1)}{" "}
                        Analysis
                      </h3>
                      {chatResponse && (
                        <div
                          className="analysis-content"
                          dangerouslySetInnerHTML={{
                            __html: formatMarkdown(chatResponse),
                          }}
                        ></div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={`groq-chatbot ${chatMinimized ? "minimized" : ""}`}>
              <div className="chatbot-header">
                <h3>
                  <span className="icon">🐋</span> ORCA AI Assistant
                </h3>
                <button
                  onClick={toggleChatMinimize}
                  className="minimize-button"
                >
                  {chatMinimized ? "Expand" : "Minimize"}
                </button>
              </div>

              {!chatMinimized && (
                <div className="chatbot-content">
                  {chatHistory.length === 0 ? (
                    <div className="welcome-message">
                      <h4>Welcome to ORCA 🐋!</h4>
                      <p>
                        I can help you understand this codebase. Ask me anything
                        about the project or specific files.
                      </p>
                    </div>
                  ) : (
                    <div className="chat-messages">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`chat-message ${message.role}`}
                        >
                          <div
                            className="message-content"
                            dangerouslySetInnerHTML={{
                              __html: formatMarkdown(message.content),
                            }}
                          ></div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="chat-loading">
                          <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <p>Processing your request...</p>
                        </div>
                      )}
                    </div>
                  )}

                  <form onSubmit={handleChatSubmit} className="chat-form">
                    <input
                      type="text"
                      placeholder={
                        activeFile
                          ? `Ask about ${activeFile.name}...`
                          : "Ask about this project..."
                      }
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                    />
                    <button type="submit" className="send-button">
                      Send
                    </button>
                  </form>

                  <div className="chat-options">
                    <label className="toggle-option">
                      <input
                        type="checkbox"
                        checked={useGroq}
                        onChange={() => setUseGroq(!useGroq)}
                      />
                      Use Groq API (uncheck for predefined responses)
                    </label>
                  </div>

                  {chatHistory.length === 0 && !chatLoading && (
                    <div className="quick-actions">
                      <button
                        className="action-button"
                        onClick={() => {
                          setUserQuery(
                            `What does ${activeFile ? activeFile.name : "this project"
                            } do?`
                          );
                          analyzeWithGroq();
                        }}
                      >
                        <span className="icon">📋</span> Explain purpose
                      </button>
                      <button
                        className="action-button"
                        onClick={() => {
                          setUserQuery(
                            `Find bugs in ${activeFile ? activeFile.name : "this codebase"
                            }`
                          );
                          analyzeWithGroq();
                        }}
                      >
                        <span className="icon">🐛</span> Find bugs
                      </button>
                      <button
                        className="action-button"
                        onClick={() => {
                          setUserQuery(
                            `Suggest code improvements for ${activeFile ? activeFile.name : "this project"
                            }`
                          );
                          analyzeWithGroq();
                        }}
                      >
                        <span className="icon">💡</span> Suggest improvements
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Feature Popups */}
          <ExplainCodebasePopup />
          <ExplainPurposePopup />
          <GenerateCodePopup />
        </div>
      );
    };

    // App Creator Component
    const AppCreatorView = () => {
      return (
        <div className="app-creator">
          <header className="app-creator-header">
            <button onClick={backToHome} className="back-to-home-button">
              <span className="icon">🏠</span> Back
            </button>
            <div className="app-title">
              <h2>{getProgrammingLanguageName()} App Creator</h2>
            </div>
            <div className="app-creator-actions">
              {appGenerationStep === "complete" && (
                <>
                  <button
                    onClick={generatePreview}
                    className="preview-button"
                    disabled={isGeneratingPreview}
                  >
                    <span className="icon">👁️</span>{" "}
                    {isGeneratingPreview ? "Generating..." : "Preview"}
                  </button>
                  <button
                    onClick={downloadAppAsZip}
                    className="download-button"
                  >
                    <span className="icon">⬇️</span> Download
                  </button>
                  <button
                    onClick={handleDeploy} // DIRECT CALL TO handleDeploy
                    className="deploy-button"
                    disabled={isDeploying}
                  >
                    {isDeploying ? (
                      <>
                        <span className="spinner"></span>
                        Deploying...
                      </>
                    ) : (
                      <>
                        <span className="icon">🚀</span> Deploy to GitHub
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </header>

          <div className="app-creator-content">
            <div className="app-creator-sidebar">
              {/* Language selection section */}
              {appGenerationStep === "initial" && (
                <div className="language-selector">
                  <div className="language-options">
                    {programmingLanguages.map((lang) => (
                      <div
                        key={lang.id}
                        className={`language-option ${selectedProgrammingLanguage === lang.id
                          ? "selected"
                          : ""
                          }`}
                        onClick={() => handleLanguageChange(lang.id)}
                      >
                        <span className="lang-icon">{lang.icon}</span>
                        <span className="lang-name">{lang.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="app-creator-files">
                <h3>Files</h3>
                <ul className="app-file-list">
                  {appCreatorFiles.map((file) => (
                    <li
                      key={file.id}
                      className={
                        activeAppFile && activeAppFile.id === file.id
                          ? "active"
                          : ""
                      }
                      onClick={() => handleAppFileClick(file)}
                    >
                      {file.type === "dir" ? (
                        <span className="icon folder-icon">📁</span>
                      ) : (
                        <span className="icon file-icon">📄</span>
                      )}
                      <span className="file-name">{file.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ai-helpers">
                <h3>AI Coding Helpers</h3>
                <ul className="helper-list">
                  <li>
                    <button
                      className="helper-button"
                      onClick={handleDebugCode}
                      disabled={isAiHelperProcessing || !activeAppFile}
                    >
                      <span className="icon">🐛</span> Debug Code
                    </button>
                  </li>
                  <li>
                    <button
                      className="helper-button"
                      onClick={handleExplainCode}
                      disabled={isAiHelperProcessing || !activeAppFile}
                    >
                      <span className="icon">🔍</span> Explain Code
                    </button>
                  </li>
                  <li>
                    <button
                      className="helper-button"
                      onClick={handleOptimizeCode}
                      disabled={isAiHelperProcessing || !activeAppFile}
                    >
                      <span className="icon">💡</span> Optimize Code
                    </button>
                  </li>
                  <li>
                    <button
                      className="helper-button"
                      onClick={handleAddDocumentation}
                      disabled={isAiHelperProcessing || !activeAppFile}
                    >
                      <span className="icon">📚</span> Add Documentation
                    </button>
                  </li>
                  <li>
                    <button
                      className="helper-button"
                      onClick={handleGenerateTests}
                      disabled={isAiHelperProcessing || !activeAppFile}
                    >
                      <span className="icon">🧪</span> Generate Tests
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="app-creator-main">
              {appGenerationStep === "initial" ? (
                <div className="app-description-form">
                  <h3>Describe Your {getProgrammingLanguageName()} App</h3>
                  <p>
                    Tell me what kind of {getProgrammingLanguageName()}{" "}
                    application you want to create:
                  </p>
                  <form onSubmit={handleAppDescriptionSubmit}>
                    <textarea
                      value={appDescription}
                      onChange={(e) => setAppDescription(e.target.value)}
                      placeholder={`E.g., I want to create a ${getPlaceholderByLanguage()}`}
                      rows={6}
                    ></textarea>

                    {/* Voice input section */}
                    <div className="voice-input-section">
                      <button
                        type="button"
                        className={`voice-input-button ${isAppCreatorListening ? "listening" : ""
                          }`}
                        onClick={toggleAppCreatorListening}
                      >
                        <span className="icon">
                          {isAppCreatorListening ? "🎙️" : "🎤"}
                        </span>
                        {isAppCreatorListening
                          ? "Listening..."
                          : "Describe by voice"}
                      </button>
                      {appCreatorTranscript && (
                        <div className="voice-transcript">
                          <p>"{appCreatorTranscript}"</p>
                          <button
                            type="button"
                            onClick={() =>
                              setAppDescription(appCreatorTranscript)
                            }
                          >
                            Use this
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Image upload section */}
                    <div className="image-upload-section">
                      <h4>Add App Screenshots or Mockups (Optional)</h4>
                      <div className="image-upload-container">
                        <input
                          type="file"
                          id="app-image-upload"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                          className="image-input"
                        />
                        <label
                          htmlFor="app-image-upload"
                          className="image-upload-label"
                        >
                          <span className="icon">🖼️</span> Choose Image
                        </label>
                        {uploadedImage && (
                          <div className="image-preview">
                            <img src={uploadedImage} alt="App mockup" />
                            <button
                              type="button"
                              className="remove-image"
                              onClick={() => {
                                setUploadedImage(null);
                                setImageFile(null);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <button type="submit" className="submit-button">
                      Continue
                    </button>
                  </form>
                </div>
              ) : appGenerationStep === "requirements" ? (
                <div className="app-requirements-form">
                  <h3>
                    Specify Requirements for {getProgrammingLanguageName()}
                  </h3>
                  <p>Provide more details about your requirements:</p>

                  {/* Add the image gallery here if we have any generated images */}
                  {(appGeneratedImages.length > 0 || uploadedImage) && (
                    <ImageGallery />
                  )}

                  {/* Add the video gallery if we have videos */}
                  {pexelsVideos.length > 0 && <VideoGallery />}

                  {isGeneratingImages && (
                    <div className="generating-images-indicator">
                      <div className="loading-spinner"></div>
                      <p>Generating UI mockups based on your description...</p>
                    </div>
                  )}

                  {imageGenerationError && (
                    <div className="error-message">
                      <p>Error generating images: {imageGenerationError}</p>
                      <p>You can still proceed with app generation.</p>
                    </div>
                  )}

                  <form onSubmit={handleAppRequirementsSubmit}>
                    <textarea
                      value={appRequirements}
                      onChange={(e) => setAppRequirements(e.target.value)}
                      placeholder={`E.g., ${getRequirementsPlaceholder()}`}
                      rows={6}
                    ></textarea>

                    {/* Voice input for requirements */}
                    <div className="voice-input-section">
                      <button
                        type="button"
                        className={`voice-input-button ${isAppCreatorListening ? "listening" : ""
                          }`}
                        onClick={toggleAppCreatorListening}
                      >
                        <span className="icon">
                          {isAppCreatorListening ? "🎙️" : "🎤"}
                        </span>
                        {isAppCreatorListening
                          ? "Listening..."
                          : "Describe by voice"}
                      </button>
                      {appCreatorTranscript && (
                        <div className="voice-transcript">
                          <p>"{appCreatorTranscript}"</p>
                          <button
                            type="button"
                            onClick={() =>
                              setAppRequirements(appCreatorTranscript)
                            }
                          >
                            Use this
                          </button>
                        </div>
                      )}
                    </div>

                    {uploadedImage && (
                      <div className="image-reference">
                        <h4>Using uploaded mockup as reference:</h4>
                        <div className="small-image-preview">
                          <img src={uploadedImage} alt="App mockup reference" />
                        </div>
                      </div>
                    )}

                    <div className="form-actions">
                      <button
                        type="button"
                        className="generate-images-button"
                        onClick={() =>
                          generateAppImages(
                            appDescription,
                            getProgrammingLanguageName()
                          )
                        }
                        disabled={isGeneratingImages}
                      >
                        {isGeneratingImages
                          ? "Generating..."
                          : "Generate UI Mockups"}
                      </button>
                      <button
                        type="submit"
                        className="submit-button"
                        disabled={isCreatingApp}
                      >
                        {isCreatingApp
                          ? "Generating App..."
                          : `Generate ${getProgrammingLanguageName()} App`}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="code-editor-container">
                  {activeAppFile ? (
                    <>
                      <div className="editor-header">
                        <h3>
                          {activeAppFile.path}
                          {activeAppFile.name}
                        </h3>
                      </div>
                      <textarea
                        className="code-editor"
                        value={codeEditorContent}
                        onChange={handleCodeEditorChange}
                        spellCheck="false"
                      ></textarea>
                    </>
                  ) : (
                    <div className="no-file-selected">
                      <p>Select a file to view and edit</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="app-creator-chat">
              <div className="chat-header">
                <h3>🐋 ORCA AI Assistant</h3>
              </div>
              <div className="chat-messages">
                {appCreatorChatHistory.map((message, index) => (
                  <div key={index} className={`chat-message ${message.role}`}>
                    <div
                      className="message-content"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(message.content),
                      }}
                    ></div>
                  </div>
                ))}
                {isCreatingApp && (
                  <div className="chat-message assistant loading">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>
                      Generating your {getProgrammingLanguageName()}{" "}
                      application...
                    </p>
                  </div>
                )}
                {isAiHelperProcessing && (
                  <div className="chat-message assistant loading">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>Processing your request...</p>
                  </div>
                )}
                {appGenerationError && (
                  <div className="chat-message error">
                    <div className="message-content">
                      <h4>Error creating app:</h4>
                      <p>{appGenerationError}</p>
                      <p>
                        Please try again with different requirements or contact
                        support if this persists.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <form
                className="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (appCreatorChatInput.trim()) {
                    // Add user message to chat history
                    setAppCreatorChatHistory([
                      ...appCreatorChatHistory,
                      { role: "user", content: appCreatorChatInput },
                    ]);

                    // Process user query - call AI helper to respond
                    handleAppCreatorChatSubmit(appCreatorChatInput);

                    // Clear input after sending
                    setAppCreatorChatInput("");
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Ask something about your app..."
                  value={appCreatorChatInput}
                  onChange={(e) => setAppCreatorChatInput(e.target.value)}
                  disabled={
                    appGenerationStep !== "complete" || isAiHelperProcessing
                  }
                />
                <button
                  type="submit"
                  disabled={
                    appGenerationStep !== "complete" || isAiHelperProcessing
                  }
                >
                  <span className="icon">📨</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    };

    // Preview Modal
    const PreviewModal = () => {
      if (!showPreview) return null;

      return (
        <div className="preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h3>App Preview</h3>
              <div className="preview-device-selector">
                <button
                  className={`device-button ${previewDevice === "mobile" ? "active" : ""
                    }`}
                  onClick={() => setPreviewDevice("mobile")}
                  title="Mobile View"
                >
                  📱
                </button>
                <button
                  className={`device-button ${previewDevice === "tablet" ? "active" : ""
                    }`}
                  onClick={() => setPreviewDevice("tablet")}
                  title="Tablet View"
                >
                  📱+
                </button>
                <button
                  className={`device-button ${previewDevice === "desktop" ? "active" : ""
                    }`}
                  onClick={() => setPreviewDevice("desktop")}
                  title="Desktop View"
                >
                  💻
                </button>
              </div>
              <button className="close-preview-btn" onClick={closePreview}>
                ×
              </button>
            </div>
            <div className={`preview-container ${previewDevice}`}>
              {previewError ? (
                <div className="preview-error">
                  <p>{previewError}</p>
                </div>
              ) : (
                <iframe
                  ref={previewIframeRef}
                  className="preview-iframe"
                  srcDoc={previewHtml}
                  title="App Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="orca-app" style={styles.app}>
        {!isGithubView && !isAppCreatorOpen && <HomePage />}
        {isGithubView && <GitHubView />}
        {isAppCreatorOpen && <AppCreatorView />}

        {isNewUserModalOpen && (
          <div className="new-user-modal active">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Find Perfect GitHub Projects</h2>
                <button
                  className="modal-close"
                  onClick={() => setIsNewUserModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="search-options">
                  <div>
                    <h3 className="option-title">What are you looking for?</h3>
                    <form onSubmit={handleNewUserSearch}>
                      <div className="search-input-group">
                        <input
                          type="text"
                          placeholder="E.g., top python projects"
                          value={newUserQuery}
                          onChange={(e) => setNewUserQuery(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="send-button"
                          disabled={isProcessingNewUserQuery}
                        >
                          {isProcessingNewUserQuery ? "Searching..." : "Search"}
                        </button>
                      </div>
                    </form>
                    <div className="example-queries">
                      <h4>Try one of these:</h4>
                      <div className="query-pills">
                        <button
                          className="query-pill"
                          onClick={() =>
                            setExampleQuery("top beginner python projects")
                          }
                        >
                          Beginner Python Projects
                        </button>
                        <button
                          className="query-pill"
                          onClick={() =>
                            setExampleQuery("best React projects for learning")
                          }
                        >
                          React Learning Projects
                        </button>
                        <button
                          className="query-pill"
                          onClick={() =>
                            setExampleQuery("data science portfolio projects")
                          }
                        >
                          Data Science Portfolio
                        </button>
                        <button
                          className="query-pill"
                          onClick={() =>
                            setExampleQuery(
                              "game development projects with JavaScript"
                            )
                          }
                        >
                          JavaScript Games
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="or-divider">or</div>
                  <div>
                    <button
                      className="voice-option-button"
                      onClick={handleVoiceSearch}
                    >
                      <span className="icon">🎙️</span> Ask by Voice
                    </button>
                    {transcript && (
                      <div className="transcript-container">
                        <div className="transcript-header">
                          <h4>
                            <span className="icon">🔊</span> I heard:
                          </h4>
                        </div>
                        <p className="transcript-text">{transcript}</p>
                      </div>
                    )}
                  </div>
                  {/* Project Recommendations */}
                  {projectRecommendations.length > 0 && (
                    <div className="project-recommendations">
                      <div className="recommendation-header">
                        <h3>
                          <span className="icon">🚀</span> Recommended Projects
                        </h3>
                        <div className="recommendation-filters">
                          <button
                            className={`filter-button ${activeFilter === "all" ? "active" : ""
                              }`}
                            onClick={() => filterProjects("all")}
                          >
                            All
                          </button>
                          <button
                            className={`filter-button ${activeFilter === "beginner" ? "active" : ""
                              }`}
                            onClick={() => filterProjects("beginner")}
                          >
                            Beginner
                          </button>
                          <button
                            className={`filter-button ${activeFilter === "intermediate" ? "active" : ""
                              }`}
                            onClick={() => filterProjects("intermediate")}
                          >
                            Intermediate
                          </button>
                          <button
                            className={`filter-button ${activeFilter === "advanced" ? "active" : ""
                              }`}
                            onClick={() => filterProjects("advanced")}
                          >
                            Advanced
                          </button>
                        </div>
                      </div>
                      <div className="recommended-projects">
                        {projectRecommendations
                          .filter(
                            (project) =>
                              activeFilter === "all" ||
                              project.difficulty.toLowerCase() ===
                              activeFilter.toLowerCase()
                          )
                          .map((project, index) => (
                            <div
                              className="recommended-project-card"
                              key={index}
                            >
                              <div className="project-card-header">
                                <h4>{project.name}</h4>
                              </div>
                              <div className="project-card-body">
                                <p className="project-description">
                                  {project.description}
                                </p>
                                <div className="project-meta">
                                  {project.classification.map((tag, idx) => (
                                    <span
                                      className="project-meta-item"
                                      key={idx}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  <span
                                    className={`project-meta-item difficulty ${project.difficulty.toLowerCase()}`}
                                  >
                                    {project.difficulty}
                                  </span>
                                  <span className="project-meta-item">
                                    <span className="icon">⭐</span>{" "}
                                    {project.stars}
                                  </span>
                                </div>
                              </div>
                              <div className="project-card-footer">
                                <button
                                  className="explore-button"
                                  onClick={() => exploreProject(project.url)}
                                >
                                  <span className="icon">🔍</span> Explore
                                </button>
                                <a
                                  href={project.url}
                                  className="github-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="icon">📂</span> GitHub
                                </a>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showVoiceSettings && (
          <div className="voice-settings-popup">
            <div className="voice-settings-header">
              <h3>Voice Settings</h3>
              <button
                onClick={() => setShowVoiceSettings(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="voice-settings-content">
              <div className="setting-group">
                <label>Language:</label>
                <select
                  value={voiceLanguage}
                  onChange={(e) => changeVoiceLanguage(e.target.value)}
                >
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                  <option value="it-IT">Italian</option>
                  <option value="ja-JP">Japanese</option>
                  <option value="ko-KR">Korean</option>
                  <option value="zh-CN">Chinese (Simplified)</option>
                  <option value="ru-RU">Russian</option>
                  <option value="pt-BR">Portuguese (Brazil)</option>
                  <option value="hi-IN">Hindi</option>
                </select>
              </div>
              <div className="setting-group">
                <label>Voice:</label>
                <select
                  value={selectedVoice?.name || ""}
                  onChange={(e) => {
                    const voice = availableVoices.find(
                      (v) => v.name === e.target.value
                    );
                    setSelectedVoice(voice);
                  }}
                >
                  {availableVoices
                    .filter((voice) =>
                      voice.lang.includes(voiceLanguage.split("-")[0])
                    )
                    .map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={() => setShowVoiceSettings(false)}
                className="save-settings-btn"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {showSpeechPopup && (
          <div className="speech-popup">
            <div className="speech-popup-header">
              {isListening ? "Listening..." : "Processing..."}
            </div>
            <div className="speech-transcript">
              {transcript || "Say something..."}
            </div>
            {isListening && (
              <div className="listening-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        )}

        {showPreview && <PreviewModal />}
        {showDeploymentModal && <DeploymentModal />}
        {showPullDeployModal && <PullDeployModal />}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <button
          onClick={() => setActiveSection("orca")}
          style={{ ...styles.button, ...styles.orcaButton }}
        >
          🐋 Orca
        </button>
        <button
          onClick={() => setActiveSection("connect")}
          style={{ ...styles.button, ...styles.connectButton }}
        >
          🤝 Connect
        </button>
        <button
          onClick={() => setActiveSection("hotels")}
          style={{ ...styles.button, ...styles.hotelsButton }}
        >
          🏨 Hotels
        </button>
        <button
          onClick={() => setActiveSection("accommodation")}
          style={{ ...styles.button, ...styles.accommodationButton }}
        >
          🏠 Accommodation
        </button>
        <button
          onClick={() => setActiveSection("games")}
          style={{ ...styles.button, ...styles.gamesButton }}
        >
          🎮 Game Lobby
        </button>
        <button
          onClick={() => setActiveSection("gathering")}
          style={{ ...styles.button, ...styles.gatheringButton }}
        >
          🎉 Gathering
        </button>
        <button
          onClick={() => setActiveSection("turf")}
          style={{ ...styles.button, ...styles.turfButton }}
        >
          ⚽ Turf
        </button>
      </div>

      {/* Keep the sidebar consistent across all sections */}
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
        ].map((item) => (
          <div
            key={item}
            style={styles.sidebarItem}
            onClick={() => handleSidebarClick(item)}
          >
            <div style={styles.sidebarBox}>{item}</div>
          </div>
        ))}
      </div>

      {activeSection === "orca" ? (
        /* Apply the 'orca-active' class only when Orca is selected */
        <div className="orca-active">
          <OrcaMain />
        </div>
      ) : (
        <>
          {activeSection === "connect" && renderConnect()}
          {activeSection === "hotels" && renderHotels()}
          {activeSection === "accommodation" && renderAccommodations()}
          {activeSection === "games" && renderGameLobby()}
          {activeSection === "gathering" && renderGathering()}
          {activeSection === "turf" && renderTurf()}
        </>
      )}

      {/* Create Form Modal */}
      <CreateForm />
    </div>
  );
};

export default SocialConnect;