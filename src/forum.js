import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProjectTracker from "./TeamTracker";
import TeamAlignmentSystem from "./AISCH";
import Community from "./Community";
import Connects from "./Connect";
import TeamChat from "./Chatroom";
import Search from "./search";
import Hackathon from "./hackathon";

import EducationDashboard from "./Education";
import JobPortal from "./job";
import Profile from "./Profile";
import App from "./App";

export default function CompleteForum() {
    const [activeSection, setActiveSection] = useState("forum");
    const [activeGroup, setActiveGroup] = useState(null);

    // Original forum state
    const [posts, setPosts] = useState([
        {
            userid: "@RITHIK",
            message: "Exhausted.",
            img: null,
            likes: false,
            comments: [],
        },
        {
            userid: "@Hari",
            message: "Chatgpt got a new update!",
            img: null,
            likes: false,
            comments: [],
        },
        {
            userid: "@Vimal",
            message: "The Wukong graphics are dope!",
            img: "wu_kong.jpg",
            likes: false,
            comments: [],
        },
        {
            userid: "@Jaga",
            message: "The NVIDIA PIC IS COLD.",
            img: "download (11).jpg",
            likes: false,
            comments: [],
        },
    ]);

    const [newPost, setNewPost] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [commentingOnPost, setCommentingOnPost] = useState(null);

    // New sections data
    const collegeGroups = [
        { id: 1, name: "MIT Computer Science", members: 1200 },
        { id: 2, name: "Stanford Engineering", members: 980 },
        { id: 3, name: "Harvard Business School", members: 1500 },
        { id: 4, name: "Berkeley AI Research", members: 750 },
    ];

    const groupChats = {
        1: [
            {
                username: "@david",
                message: "Anyone up for the hackathon this weekend?",
            },
            { username: "@sarah", message: "Count me in! Working on ML project." },
            { username: "@mike", message: "The new CS curriculum looks promising!" },
        ],
    };

    const experiences = [
        {
            id: 1,
            company: "Google",
            type: "work",
            author: "@jenny",
            content:
                "Incredible learning experience as an SDE intern. The mentorship program is outstanding.",
            likes: 45,
        },
        {
            id: 2,
            college: "MIT",
            type: "college",
            author: "@alex",
            content:
                "The research opportunities here are unmatched. Loved working in the AI lab.",
            likes: 32,
        },
    ];

    const trends = [
        { topic: "#TechInternships", posts: "12.5K" },
        { topic: "#CollegeLife", posts: "8.2K" },
        { topic: "#CampusHacks", posts: "6.7K" },
        { topic: "#StudyAbroad", posts: "5.9K" },
        { topic: "#GradSchool", posts: "4.3K" },
    ];

    // Original forum functions
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const allData = [
            "STUDIES",
            "PROJECT",
            "HACKATHON",
            "JOB",
            "LEARNING",
            "DEVELOPMENT",
            "COLLABORATION",
            "MEETING",
            "DESIGN",
        ];

        const results = allData.filter((item) =>
            item.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchResults(results);
    };

    const handlePost = () => {
        if (newPost.trim() === "") return;
        const newPostData = {
            userid: "@seshashayanan",
            message: newPost,
            img: null,
            likes: false,
            comments: [],
        };
        setPosts([newPostData, ...posts]);
        setNewPost("");
    };

    const toggleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes = !updatedPosts[index].likes;
        setPosts(updatedPosts);
    };

    const handleComment = (postIndex) => {
        const updatedPosts = [...posts];
        updatedPosts[postIndex].comments.push(commentInput);
        setPosts(updatedPosts);
        setCommentingOnPost(null);
        setCommentInput("");
    };

    // Render functions for different sections
    const renderForum = () => (
        <div className="forum-container">
            <div className="post-input">
                <textarea
                    rows="2"
                    placeholder="What's happening?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="post-textarea"
                ></textarea>
                <button className="post-button" onClick={handlePost}>
                    Post
                </button>
            </div>

            {posts.map((post, index) => (
                <div key={index} className="post">
                    <div className="post-header">{post.userid}</div>
                    <div className="post-content">
                        {post.img && (
                            <img src={post.img} alt="post media" className="post-image" />
                        )}
                        <p>{post.message}</p>
                    </div>
                    <div className="post-actions">
                        <span className="heart-icon" onClick={() => toggleLike(index)}>
                            {post.likes ? "❤️" : "🤍"}
                        </span>
                        <button
                            className="comment-button"
                            onClick={() => setCommentingOnPost(index)}
                        >
                            Comment
                        </button>
                    </div>

                    {commentingOnPost === index && (
                        <div className="comment-section">
                            <textarea
                                rows="1"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                placeholder="Write a comment..."
                                className="comment-input"
                            ></textarea>
                            <button
                                className="comment-button"
                                onClick={() => handleComment(index)}
                            >
                                Post Comment
                            </button>
                        </div>
                    )}

                    {post.comments.length > 0 && (
                        <div className="comment-section">
                            {post.comments.map((comment, idx) => (
                                <p key={idx} className="comment">
                                    {comment}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderGroups = () =>
        activeGroup ? (
            <div className="group-chat-container">
                <div className="back-button" onClick={() => setActiveGroup(null)}>
                    <span>← Back to Groups</span>
                </div>
                <div>
                    {groupChats[activeGroup]?.map((chat, index) => (
                        <div key={index} className="group-chat-card">
                            <strong>{chat.username}</strong>
                            <p>{chat.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div>
                {collegeGroups.map((group) => (
                    <div
                        key={group.id}
                        className="group-card"
                        onClick={() => setActiveGroup(group.id)}
                    >
                        <h3>{group.name}</h3>
                        <p>{group.members} members</p>
                    </div>
                ))}
            </div>
        );

    const renderExperiences = () => (
        <div>
            {experiences.map((exp) => (
                <div key={exp.id} className="experience-card">
                    <strong>{exp.author}</strong>
                    <p>
                        {exp.type === "work"
                            ? `Company: ${exp.company}`
                            : `College: ${exp.college}`}
                    </p>
                    <p>{exp.content}</p>
                    <div>❤️ {exp.likes}</div>
                </div>
            ))}
        </div>
    );

    const renderAnonymous = () => (
        <div>
            <div className="anonymous-post">
                <p>Anonymous #1234</p>
                <p>
                    The pressure during finals week is real. Anyone else feeling
                    overwhelmed?
                </p>
            </div>
            <div className="anonymous-post">
                <p>Anonymous #5678</p>
                <p>Need advice on choosing between multiple internship offers...</p>
            </div>
        </div>
    );
    // ... all other existing state declarations remain the same

    const MainContent = () => {
        const navigate = useNavigate();

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

        return (
            <div className="body">
                {/* Sidebar */}
                <div className="sidebar1">
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
                            className="sidebar-item"
                            onClick={() => handleSidebarClick(item)}
                        >
                            <div className="sidebar-box">{item}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="main-container">
                    <div className="search-section">
                        {/* Navigation buttons */}
                        <div className="navigation">
                            {["forum", "groups", "experiences", "anonymous"].map(
                                (section) => (
                                    <button
                                        key={section}
                                        className={`nav-button ${activeSection === section ? "active" : ""
                                            }`}
                                        onClick={() => setActiveSection(section)}
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </button>
                                )
                            )}
                        </div>

                        <div className="header">
                            <h1>FORUM</h1>
                        </div>

                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        <div className="search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <div key={index} className="search-result-item">
                                        {result}
                                    </div>
                                ))
                            ) : (
                                <div>No results found</div>
                            )}
                        </div>
                    </div>

                    {/* Content based on active section */}
                    <div className="section-content">
                        {activeSection === "forum" && renderForum()}
                        {activeSection === "groups" && renderGroups()}
                        {activeSection === "experiences" && renderExperiences()}
                        {activeSection === "anonymous" && renderAnonymous()}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="right-sidebar">
                    <div className="trending-card">
                        <h2>Trending Topics</h2>
                        {trends.map((trend, index) => (
                            <div key={index} className="trend-item">
                                <strong>{trend.topic}</strong>
                                <p>{trend.posts} posts</p>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
          /* Keyframe Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          @keyframes gradientFlow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes heartBeat {
            0% { transform: scale(1); }
            15% { transform: scale(1.3); }
            30% { transform: scale(1); }
            45% { transform: scale(1.15); }
            60% { transform: scale(1); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          .body {
            margin: 0;
            font-family: 'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            background-size: 200% 200%;
            animation: gradientFlow 15s ease infinite;
            display: flex;
            min-height: 100vh;
          }

          /* SIDEBAR - UNCHANGED */
          .sidebar1 {
            position: fixed;
            width: 200px;
            height: 100%;
            font-family: cursive;
            background-color: #333;
            display: flex;
            flex-direction: column;
            padding-top: 15px;
            padding-bottom: 20px;
            color: #f4f4f4;
            gap: 10px;
            text-align: center;
            margin: 0;
            padding: 0;
            left: 0;
            top: 0;
          }

          .sidebar-item {
            width: auto;
            display: flex;
            justify-content: center;
            margin-bottom: 5px;
            align-items: center;
          }

          .sidebar-box {
            background-color: #444;
            color: #fff;
            padding: 5px 10px;
            width: 80%;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin: 0 auto;
          }

          /* MAIN CONTAINER */
          .main-container {
            flex: 1;
            margin-left: 200px;
            margin-right: 300px;
            padding: 30px 40px;
            animation: fadeInUp 0.6s ease-out;
          }

          /* NAVIGATION TABS */
          .navigation {
            display: flex;
            gap: 12px;
            margin-bottom: 25px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-button {
            padding: 12px 28px;
            border-radius: 25px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }

          .nav-button:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
          }

          .nav-button.active {
            background: linear-gradient(135deg, #00d9ff 0%, #00b4d8 50%, #0077b6 100%);
            color: #fff;
            box-shadow: 0 6px 20px rgba(0, 217, 255, 0.4);
            animation: float 2s ease-in-out infinite;
          }

          /* HEADER */
          .header {
            background: linear-gradient(135deg, #1a1a4e 0%, #2d2d7a 100%);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 25px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .header h1 {
            font-size: 42px;
            font-weight: 800;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #fff 0%, #a8edea 50%, #fed6e3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: 4px;
            margin: 0;
            text-shadow: 0 0 30px rgba(168, 237, 234, 0.3);
          }

          /* SEARCH SECTION */
          .search-section {
            text-align: center;
            padding: 20px 0;
          }

          .search-input {
            padding: 16px 25px;
            width: 350px;
            border-radius: 30px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            font-size: 16px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            color: #fff;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }

          .search-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          .search-input:focus {
            outline: none;
            border-color: #00d9ff;
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
            transform: scale(1.02);
          }

          .search-results {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            color: rgba(255, 255, 255, 0.6);
          }

          .search-result-item {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
            color: #fff;
            padding: 15px 20px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: slideInFromLeft 0.4s ease-out forwards;
            transition: all 0.3s ease;
          }

          .search-result-item:hover {
            transform: translateX(10px);
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5));
          }

          /* FORUM CONTAINER - SOCIAL FEED */
          .forum-container {
            margin-top: 25px;
          }

          .post-input {
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            padding: 25px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }

          .post-textarea {
            width: 100%;
            padding: 18px 20px;
            border-radius: 15px;
            margin-bottom: 15px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            font-size: 16px;
            resize: none;
            transition: all 0.3s ease;
          }

          .post-textarea::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          .post-textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
          }

          .post-button {
            padding: 14px 35px;
            border-radius: 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 15px;
            letter-spacing: 1px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }

          .post-button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 35px rgba(102, 126, 234, 0.5);
          }

          .post-button:active {
            transform: translateY(0) scale(0.98);
          }

          /* POSTS - SOCIAL MEDIA CARDS */
          .post {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            padding: 25px;
            margin-bottom: 25px;
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: fadeInUp 0.5s ease-out forwards;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .post:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            border-color: rgba(102, 126, 234, 0.3);
            background: rgba(255, 255, 255, 0.12);
          }

          .post:nth-child(1) { animation-delay: 0.1s; }
          .post:nth-child(2) { animation-delay: 0.2s; }
          .post:nth-child(3) { animation-delay: 0.3s; }
          .post:nth-child(4) { animation-delay: 0.4s; }

          .post-header {
            font-weight: 700;
            font-size: 18px;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 15px;
          }

          .post-header::before {
            content: '';
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: inline-block;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }

          .post-content {
            margin-top: 15px;
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            line-height: 1.7;
          }

          .post-content p {
            margin: 0;
          }

          .post-image {
            max-width: 100%;
            border-radius: 16px;
            margin-bottom: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            transition: transform 0.4s ease;
          }

          .post-image:hover {
            transform: scale(1.02);
          }

          .post-actions {
            margin-top: 20px;
            display: flex;
            gap: 20px;
            align-items: center;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .heart-icon {
            cursor: pointer;
            font-size: 24px;
            transition: all 0.3s ease;
            padding: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
          }

          .heart-icon:hover {
            transform: scale(1.2);
            animation: heartBeat 0.8s ease-in-out;
            background: rgba(255, 100, 100, 0.2);
          }

          .comment-button {
            padding: 10px 25px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(0, 180, 216, 0.2));
            border: 1px solid rgba(0, 217, 255, 0.3);
            color: #00d9ff;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .comment-button:hover {
            background: linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(0, 180, 216, 0.3));
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 217, 255, 0.3);
          }

          .comment-section {
            margin-top: 20px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            animation: fadeInUp 0.3s ease-out;
          }

          .comment-input {
            width: 90%;
            padding: 14px 18px;
            border-radius: 15px;
            margin-top: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .comment-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.2);
          }

          .comment {
            margin-bottom: 10px;
            padding: 12px 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            animation: slideInFromLeft 0.3s ease-out;
          }

          /* RIGHT SIDEBAR */
          .right-sidebar {
            position: fixed;
            right: 0;
            top: 0;
            width: 300px;
            height: 100vh;
            background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
            padding: 25px;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            overflow-y: auto;
          }

          .trending-card {
            padding: 25px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 20px;
          }

          .trending-card h2 {
            color: #fff;
            font-size: 20px;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .trend-item {
            padding: 15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .trend-item:hover {
            padding-left: 10px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 10px;
          }

          .trend-item strong {
            color: #00d9ff;
            font-size: 15px;
          }

          .trend-item p {
            color: rgba(255, 255, 255, 0.5);
            font-size: 13px;
            margin: 5px 0 0 0;
          }

          /* GROUP CARDS */
          .group-card {
            padding: 22px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border-radius: 18px;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: fadeInUp 0.5s ease-out forwards;
          }

          .group-card:nth-child(1) { animation-delay: 0.1s; }
          .group-card:nth-child(2) { animation-delay: 0.2s; }
          .group-card:nth-child(3) { animation-delay: 0.3s; }
          .group-card:nth-child(4) { animation-delay: 0.4s; }

          .group-card:hover {
            transform: translateY(-8px) scale(1.02);
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(102, 126, 234, 0.4);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
          }

          .group-card h3 {
            color: #fff;
            margin: 0 0 8px 0;
            font-size: 18px;
          }

          .group-card p {
            color: rgba(255, 255, 255, 0.6);
            margin: 0;
            font-size: 14px;
          }

          .back-button {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px 20px;
            cursor: pointer;
            margin-bottom: 25px;
            color: #00d9ff;
            background: rgba(0, 217, 255, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(0, 217, 255, 0.2);
            transition: all 0.3s ease;
            font-weight: 600;
          }

          .back-button:hover {
            background: rgba(0, 217, 255, 0.2);
            transform: translateX(-5px);
          }

          .group-chat-card {
            padding: 20px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border-radius: 18px;
            margin-bottom: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            animation: slideInFromLeft 0.4s ease-out forwards;
            transition: all 0.3s ease;
          }

          .group-chat-card:hover {
            transform: translateX(5px);
            background: rgba(255, 255, 255, 0.1);
          }

          .group-chat-card strong {
            color: #667eea;
            font-size: 15px;
          }

          .group-chat-card p {
            color: rgba(255, 255, 255, 0.8);
            margin: 8px 0 0 0;
            font-size: 14px;
            line-height: 1.5;
          }

          /* EXPERIENCE CARDS */
          .experience-card {
            padding: 25px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            animation: fadeInUp 0.5s ease-out forwards;
            transition: all 0.4s ease;
          }

          .experience-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
            border-color: rgba(102, 126, 234, 0.3);
          }

          .experience-card strong {
            color: #00d9ff;
            font-size: 16px;
          }

          .experience-card p {
            color: rgba(255, 255, 255, 0.8);
            margin: 10px 0;
            line-height: 1.6;
          }

          .experience-card div {
            color: #ff6b6b;
            font-size: 16px;
            margin-top: 15px;
          }

          /* ANONYMOUS POSTS */
          .anonymous-post {
            background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(45, 45, 60, 0.9));
            backdrop-filter: blur(20px);
            color: #fff;
            padding: 25px;
            border-radius: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 0.5s ease-out forwards;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
          }

          .anonymous-post::before {
            content: '🎭';
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 24px;
            opacity: 0.5;
          }

          .anonymous-post:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 0.2);
          }

          .anonymous-post p:first-child {
            color: #667eea;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 12px;
          }

          .anonymous-post p:last-child {
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.7;
          }

          /* Section content wrapper */
          .section-content {
            min-height: 400px;
          }

          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2, #667eea);
          }
        `}</style>
            </div>
        );
    };

    return (
        <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/project-tracker" element={<ProjectTracker />} />
            <Route path="/schedule" element={<TeamAlignmentSystem />} />
            <Route path="/community" element={<Community />} />
            <Route path="/chat" element={<TeamChat />} />
            <Route path="/search" element={<Search />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/forum" element={<MainContent />} />
            <Route path="/education" element={<EducationDashboard />} />
            <Route path="/connect" element={<Connects />} />
            <Route path="/jobs" element={<JobPortal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<App />} />
            <Route path="/logout" element={<div>Logging out...</div>} />
        </Routes>
    );
}