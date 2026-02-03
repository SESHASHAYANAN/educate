import React, { useState } from "react";
import {
  MessageCircle,
  Book,
  Brain,
  Clock,
  ChevronLeft,
  Layout,
  Lightbulb,
  Target,
  RefreshCw,
  Focus,
} from "lucide-react";
import "./ConceptEducation.css";

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
  backButton: {
    position: "absolute",
    top: "20px",
    left: "220px",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

const ConceptEducation = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const formatAIResponse = (text) => {
    const sections = text.split(/(?=\d\.|📌|💡|🔍|📝|🎯|📚|✨|➡️|•)/g);

    return sections.map((section, index) => {
      const formattedSection = section
        .replace(/^(.*?:)/, '<span class="response-header">$1</span>')
        .replace(
          /^(\d\.|📌|💡|🔍|📝|🎯|📚|✨|➡️|•)(.*?)$/gm,
          '<div class="response-point">$1$2</div>'
        )
        .replace(
          /Example:(.*?)\n/g,
          '<div class="response-example">Example:$1</div>'
        )
        .replace(
          /Practice:(.*?)\n/g,
          '<div class="response-practice">Practice:$1</div>'
        )
        .trim();

      return (
        <div
          key={index}
          className="response-section"
          dangerouslySetInnerHTML={{ __html: formattedSection }}
        />
      );
    });
  };

  const learningTechniques = [
    {
      name: "Feynman's Technique",
      icon: <Brain className="technique-icon" />,
      color: "blue",
      greeting:
        "👋 Hi! I'm your Feynman Learning Assistant! Let's break down complex physics concepts into simple explanations. What would you like to understand better? 🤓",
      bgColor: "blue-gradient",
      prompt: `Using the Feynman Technique, explain this concept following these points:
        1. Break down the core concept into simple terms
        2. Use analogies and real-world examples
        3. Identify and clarify potential points of confusion
        4. Connect ideas to familiar concepts
        5. Include practice exercises

        Format your response with:
        • Clear numbered points
        • Emoji bullets (📌, 💡, 🔍)
        • Separate sections for examples and practice
        • Clear headers for each section`,
    },
    {
      name: "Pareto Principle",
      icon: <Target className="technique-icon" />,
      color: "green",
      greeting:
        "🎯 Welcome! I'll help you focus on the vital 20% of physics concepts that give 80% of results. Ready to maximize your learning efficiency? 📊",
      bgColor: "green-gradient",
      prompt: `Using the 80/20 Pareto Principle, structure your response with:
        1. The core 20% concepts that provide 80% understanding
        2. Key principles to focus on
        3. Common applications
        4. Practice exercises focused on essential concepts

        Format using:
        • Clear numbered points
        • Emoji bullets (🎯, 📊, 💡)
        • Distinct sections for core concepts and practice
        • Visual separation between ideas`,
    },
    {
      name: "Spaced Repetition",
      icon: <Clock className="technique-icon" />,
      color: "purple",
      greeting:
        "⏰ Hello! I'm your Spaced Repetition Guide. Let's create an optimal review schedule for your physics learning! 🔄",
      bgColor: "purple-gradient",
      prompt: `Create a spaced repetition learning plan with:
        1. Key concepts broken down for review
        2. Optimal review intervals
        3. Progress checkpoints
        4. Review exercises

        Format your response with:
        • Clear timeline markers (📅)
        • Review points (🔄)
        • Practice sections (✍️)
        • Progress tracking elements (📊)
        • Headers for each review phase`,
    },
    {
      name: "Active Recall",
      icon: <Lightbulb className="technique-icon" />,
      color: "yellow",
      greeting:
        "💡 Ready to strengthen your physics knowledge? Let's practice active recall together! Test your understanding! ✨",
      bgColor: "yellow-gradient",
      prompt: `Structure an active recall session with:
        1. Key concept summary
        2. Practice questions without references
        3. Self-assessment prompts
        4. Challenge questions
        
        Format using:
        • Question sections (❓)
        • Practice prompts (✍️)
        • Challenge markers (🎯)
        • Clear separation between questions
        • Headers for different difficulty levels`,
    },
    {
      name: "Bloom's Taxonomy",
      icon: <Layout className="technique-icon" />,
      color: "red",
      greeting:
        "🎓 Welcome to structured learning! Let's climb the ladder of understanding together, from basic knowledge to advanced evaluation! 📚",
      bgColor: "red-gradient",
      prompt: `Analyze this concept through Bloom's Taxonomy levels:
        1. Remember: Key facts and definitions
        2. Understand: Main concepts and principles
        3. Apply: Real-world applications
        4. Analyze: Break down components
        5. Evaluate: Critical assessment
        6. Create: New connections
        
        Format with:
        • Level headers (📚)
        • Learning objectives (🎯)
        • Practice exercises (✍️)
        • Clear progression markers`,
    },
    {
      name: "Chunking",
      icon: <MessageCircle className="technique-icon" />,
      color: "indigo",
      greeting:
        "🧩 Hi there! Ready to break down complex physics topics into manageable pieces? Let's make learning easier! 🎯",
      bgColor: "indigo-gradient",
      prompt: `Break down this concept using chunking:
        1. Main concept chunks
        2. Related sub-concepts
        3. Connections between chunks
        4. Practice exercises for each chunk
        
        Format using:
        • Chunk headers (🧩)
        • Connection markers (🔗)
        • Practice sections (✍️)
        • Clear visual separation between chunks`,
    },
    {
      name: "Kaizen",
      icon: <RefreshCw className="technique-icon" />,
      color: "teal",
      greeting:
        "🌱 Welcome to continuous improvement! Small steps lead to big results. What would you like to work on today? 🚀",
      bgColor: "teal-gradient",
      prompt: `Apply Kaizen continuous improvement:
        1. Current understanding assessment
        2. Small improvement steps
        3. Practice exercises
        4. Progress tracking
        
        Format with:
        • Progress markers (📈)
        • Step-by-step guides (👣)
        • Practice sections (✍️)
        • Improvement checkpoints (🎯)`,
    },
    {
      name: "Pomodoro",
      icon: <Focus className="technique-icon" />,
      color: "orange",
      greeting:
        "⏱️ Hello! Ready for focused learning sessions? Let's make the most of your study time! 🍅",
      bgColor: "orange-gradient",
      prompt: `Structure a Pomodoro learning session:
        1. 25-minute focus topics
        2. Break activities
        3. Review points
        4. Session goals
        
        Format using:
        • Time blocks (⏱️)
        • Focus points (🎯)
        • Break suggestions (☕)
        • Progress markers (✅)`,
    },
    {
      name: "Dunning-Kruger",
      icon: <Book className="technique-icon" />,
      color: "pink",
      greeting:
        "🤔 Welcome! Let's explore physics concepts while being mindful of our knowledge gaps. Ready to learn? 📈",
      bgColor: "pink-gradient",
      prompt: `Address the concept with Dunning-Kruger awareness:
        1. Knowledge assessment
        2. Common misconceptions
        3. Deep understanding points
        4. Self-evaluation exercises
        
        Format with:
        • Knowledge markers (📚)
        • Warning signs (⚠️)
        • Understanding checks (✅)
        • Practice sections (✍️)`,
    },
  ];

  const handleTechniqueSelect = (technique) => {
    setSelectedTechnique(technique);
    setMessages([{ text: technique.greeting, isBot: true }]);
  };

  const handleBack = () => {
    setSelectedTechnique(null);
    setMessages([]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue("");

    try {
      const API_KEY = process.env.REACT_APP_GROQ_API_KEY;

      const promptWithContext = `
        Learning Technique: ${selectedTechnique.name}
        Technique Context: ${selectedTechnique.prompt}
        
        User's question: ${inputValue}
        
        Structure your response with:
        1. Clear sections with headers
        2. Numbered points or emoji bullets
        3. Examples clearly marked
        4. Practice exercises in separate sections
        5. Visual separation between different parts
        
        Use emoji bullets (📌, 💡, 🔍, 📝, 🎯) to mark important points.
        Format each major section with a clear header.
        Separate examples and practice exercises into distinct sections.
      `;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "user",
                content: promptWithContext,
              },
            ],
            temperature: 0.7,
            max_tokens: 2048,
          }),
        }
      );

      const data = await response.json();
      const text = data.choices[0].message.content;

      const aiMessage = {
        text,
        isBot: true,
        formatted: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process your message. Please try again.",
        isBot: true,
        formatted: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
        ].map((item) => (
          <div key={item} style={styles.sidebarItem}>
            <div style={styles.sidebarBox}>{item}</div>
          </div>
        ))}
      </div>

      <div className="main-content">
        {selectedTechnique && (
          <button
            onClick={handleBack}
            style={styles.backButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#444")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
          >
            <ChevronLeft size={16} style={{ marginRight: "4px" }} /> Back
          </button>
        )}

        {!selectedTechnique ? (
          <div className="technique-grid">
            {learningTechniques.map((technique) => (
              <div
                key={technique.name}
                className={`technique-card ${technique.color}`}
                onClick={() => handleTechniqueSelect(technique)}
              >
                <div className="technique-content">
                  {technique.icon}
                  <h3 className="technique-title">{technique.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`chatbot-container ${selectedTechnique.bgColor}`}>
            <div className="messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isBot ? "bot-message" : "user-message"
                    }`}
                >
                  {message.formatted
                    ? formatAIResponse(message.text)
                    : message.text}
                </div>
              ))}
              {isLoading && (
                <div className="message bot-message">
                  Thinking about your question...
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="input-container">
              <input
                type="text"
                placeholder="Type your message..."
                className="message-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="send-button"
                disabled={isLoading || !inputValue.trim()}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptEducation;
