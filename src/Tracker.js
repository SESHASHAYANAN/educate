import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Tracker.css";

const Tracker = () => {
  const [approved, setApproved] = useState(false);
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("In Progress");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to Code Review Assistant! I can help analyze and debug your code. Ask me anything about the code!",
      sender: "ai",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [openToCommunity, setOpenToCommunity] = useState(false);
  const [coins, setCoins] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sampleCode = `
def greet(name):
    if not name:
        print("Hello, User!")
    else:
        print("Hello, " + name)

greet("John")
  `;

  const handleApprove = () => {
    setApproved(true);
    setStatus("Approved");
  };

  const handleVerify = () => {
    setVerified(true);
  };

  const handleOpenToCommunity = () => {
    setOpenToCommunity(true);
    setCoins(coins + 10);
  };

  const handleApproveContribution = () => {
    setCoins(coins + 5);
    setOpenToCommunity(true);
    setShowPopup(false);
  };

  const handleCancelContribution = () => {
    setShowPopup(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: chatInput,
        sender: "user",
      };
      setChatMessages([...chatMessages, userMessage]);
      setChatInput("");
      setIsLoading(true);

      try {
        const genAI = new GoogleGenerativeAI(
          "AIzaSyAEXITDDzX4yOoHl4tOuFEaxkqtniph1NY"
        );
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const context = `
          Analyze the following code and provide a structured response with emojis:

          📝 Original Code:
          ${sampleCode}
          
          Current Status:
          - Review Status: ${status}
          - Approval: ${approved ? "Approved" : "Pending"}
          - Verification: ${verified ? "Verified" : "Pending"}
          
          Provide a structured analysis with the following sections:
          1. 🔍 Code Review
          2. 🐛 Potential Issues
          3. ✨ Improvements
          4. 📚 Documentation Suggestions
          
          Format the response with clear sections and emojis.
          User's question: ${chatInput}
        `;

        const result = await model.generateContent(context);
        const response = await result.response;
        const text = response.text();

        const formattedText = text.includes("🔍")
          ? text
          : `
          🔍 Code Review:
          ${text}
        `;

        const aiMessage = {
          id: chatMessages.length + 2,
          text: formattedText,
          sender: "ai",
        };
        setChatMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error generating response:", error);
        const errorMessage = {
          id: chatMessages.length + 2,
          text: "❌ Sorry, I couldn't analyze the code. Please try again.",
          sender: "ai",
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="tracker">
      <div className="header">
        <h1>Code Review Tracker</h1>
      </div>

      <div className="user-details">
        <h2>User Information</h2>
        <p>
          <strong>User Name:</strong> John Doe
        </p>
        <p>
          <strong>Position:</strong> Software Engineer
        </p>
        <p>
          <strong>Project Name:</strong> Project Alpha
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>

      <div className="code-review">
        <h3>Sample Python Code:</h3>
        <pre className="code-block">
          <code>{sampleCode}</code>
        </pre>

        <div className="actions">
          <button
            className={`approve-button ${approved ? "approved" : ""}`}
            onClick={handleApprove}
          >
            {approved ? "Approved, Ready to Deploy" : "Approve"}
          </button>

          <div className="verification">
            <span className="tick">
              {verified ? "✔️ Verified" : "❓ Not Verified"}
            </span>
            <button className="verify-button" onClick={handleVerify}>
              Verify
            </button>
          </div>
        </div>
      </div>

      <div className="chat-section">
        <h2>💻 Code Analysis Chat</h2>
        <div className="chat-messages">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.sender}`}
              style={{
                background: message.sender === "ai" ? "#1a1a1a" : "#2d2d2d",
                color: "#fff",
                borderRadius: "12px",
                padding: "15px",
                margin: "10px 0",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div
              className="chat-message ai"
              style={{
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: "12px",
                padding: "15px",
                margin: "10px 0",
              }}
            >
              🔄 Analyzing code...
            </div>
          )}
        </div>
        <form onSubmit={handleChatSubmit} className="chat-input">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about the code..."
            disabled={isLoading}
            style={{
              background: "#2d2d2d",
              color: "#fff",
              border: "1px solid #3d3d3d",
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !chatInput.trim()}
            style={{
              background: "#4CAF50",
              color: "#fff",
            }}
          >
            Send
          </button>
        </form>
      </div>

      <div className="open-community">
        <button
          className={openToCommunity ? "open-sourced" : ""}
          onClick={handleOpenToCommunity}
          disabled={openToCommunity}
        >
          {openToCommunity ? "Open Sourced" : "Open to Community"}
          {coins > 0 && ` +${coins} coins 🪙`}
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Open Source Contribution</h3>
            <p>
              <strong>Username:</strong> John Doe
            </p>
            <p>
              <strong>Role:</strong> Software Engineer
            </p>
            <p>
              <strong>Code:</strong>
              <pre>{sampleCode}</pre>
            </p>
            <p>
              <strong>Documentation:</strong> Added a check for empty names,
              providing a default greeting if no name is passed.
            </p>
            <div className="popup-actions">
              <button onClick={handleApproveContribution}>Approve</button>
              <button onClick={handleCancelContribution}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
