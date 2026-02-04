import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./TeamAlignmentSystem.css";

const TeamAlignmentSystem = () => {
  // Enhanced Task and Meeting Management Class
  class EnhancedScheduler {
    constructor(tasks, meetings) {
      this.tasks = tasks;
      this.meetings = meetings;
    }

    prioritizeTasks() {
      return this.tasks.sort((a, b) => {
        const getPriorityScore = (task) => {
          let score = 0;
          const daysUntilDeadline = this.calculateDaysUntilDeadline(
            task.deadline
          );
          score += this.calculateDeadlineScore(daysUntilDeadline);

          switch (task.priority) {
            case "Critical":
              score += 70;
              break;
            case "High":
              score += 50;
              break;
            case "Medium":
              score += 30;
              break;
            case "Low":
              score += 10;
              break;
          }

          score += task.complexity * 7;
          score += task.strategicImportance * 10;

          return score;
        };

        return getPriorityScore(b) - getPriorityScore(a);
      });
    }

    calculateDaysUntilDeadline(deadline) {
      const today = new Date();
      const taskDeadline = new Date(deadline);
      const timeDiff = taskDeadline.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    calculateDeadlineScore(daysUntilDeadline) {
      return Math.max(60 - daysUntilDeadline * 2.5, 0);
    }

    allocateTasks(teams) {
      const prioritizedTasks = this.prioritizeTasks();

      return prioritizedTasks.map((task) => {
        const bestTeam = this.findBestTeamForTask(task, teams);
        return {
          ...task,
          assignedTeam: bestTeam ? bestTeam.team : "Unassigned",
          allocationReason: bestTeam
            ? this.generateAllocationReason(task, bestTeam)
            : "No suitable team found",
        };
      });
    }

    findBestTeamForTask(task, teams) {
      return teams.find(
        (team) =>
          team.skills.includes(task.skillRequired) &&
          team.currentWorkload < 0.7 &&
          team.specializations.includes(task.domain)
      );
    }

    generateAllocationReason(task, team) {
      return `Assigned based on ${team.team}'s expertise in ${task.skillRequired} and ${task.domain} domain.`;
    }
  }

  const initialTeamData = [
    {
      id: "team1",
      team: "Engineering Team 💻",
      department: "Product Development",
      members: 15,
      skills: ["Backend", "Frontend", "DevOps", "Cloud Architecture"],
      specializations: ["SaaS", "Enterprise Solutions"],
      currentWorkload: 0.5,
      goals: ["Innovation", "Technical Excellence", "Customer Value"],
      tasks: [
        {
          id: "task1",
          title: "Implement Microservices Architecture",
          priority: "Critical",
          deadline: "2024-03-15",
          complexity: 9,
          strategicImportance: 8,
          skillRequired: "Backend",
          domain: "SaaS",
          description:
            "Redesign system architecture for scalability and resilience",
        },
        {
          id: "task2",
          title: "Advanced Security Audit",
          priority: "High",
          deadline: "2024-02-28",
          complexity: 7,
          strategicImportance: 9,
          skillRequired: "DevOps",
          domain: "Enterprise Solutions",
          description:
            "Comprehensive security assessment and penetration testing",
        },
      ],
    },
    {
      id: "team2",
      team: "Design Team 🎨",
      department: "User Experience",
      members: 8,
      skills: ["UI/UX", "Graphic Design", "User Research"],
      specializations: ["Product Design", "User Interface"],
      currentWorkload: 0.4,
      goals: ["User Satisfaction", "Innovative Design", "Accessibility"],
      tasks: [
        {
          id: "task3",
          title: "Redesign User Dashboard",
          priority: "Medium",
          deadline: "2024-04-01",
          complexity: 6,
          strategicImportance: 7,
          skillRequired: "UI/UX",
          domain: "Product Design",
          description: "Enhance user experience and visual appeal",
        },
      ],
    },
  ];

  const initialMeetings = [
    {
      id: "meet1",
      title: "Sprint Planning 📅",
      date: "2024-02-10",
      time: "10:00 AM",
      duration: "2 hours",
      participants: ["Engineering Team", "Product Management"],
      agenda: ["Sprint Goals", "Task Allocation", "Technical Design"],
    },
    {
      id: "meet2",
      title: "Technical Sync-up 🤝",
      date: "2024-02-12",
      time: "2:00 PM",
      duration: "1 hour",
      participants: ["Backend Team", "Frontend Team"],
      agenda: ["Integration Points", "Performance Optimization"],
    },
    {
      id: "meet3",
      title: "Design Review 🖌️",
      date: "2024-02-15",
      time: "11:00 AM",
      duration: "1.5 hours",
      participants: ["Design Team", "Product Management"],
      agenda: ["Dashboard Redesign", "User Feedback", "Design Systems"],
    },
  ];

  const [teams,] = useState(initialTeamData);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to TeamSync Pro - Your AI Collaboration Assistant!",
      sender: "ai",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const moveTaskUp = (index) => {
    if (index > 0) {
      const newTasks = [...tasks];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index - 1];
      newTasks[index - 1] = temp;
      setTasks(newTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index + 1];
      newTasks[index + 1] = temp;
      setTasks(newTasks);
    }
  };

  const moveMeetingUp = (index) => {
    if (index > 0) {
      const newMeetings = [...meetings];
      const temp = newMeetings[index];
      newMeetings[index] = newMeetings[index - 1];
      newMeetings[index - 1] = temp;
      setMeetings(newMeetings);
    }
  };

  const moveMeetingDown = (index) => {
    if (index < meetings.length - 1) {
      const newMeetings = [...meetings];
      const temp = newMeetings[index];
      newMeetings[index] = newMeetings[index + 1];
      newMeetings[index + 1] = temp;
      setMeetings(newMeetings);
    }
  };

  useEffect(() => {
    const scheduler = new EnhancedScheduler(
      teams.flatMap((team) => team.tasks),
      meetings
    );
    const scheduledTasks = scheduler.allocateTasks(teams);
    setTasks(scheduledTasks);
  }, [teams]);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "TASK") {
      const newTasks = Array.from(tasks);
      const [reorderedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedTask);
      setTasks(newTasks);
    }

    if (type === "MEETING") {
      const newMeetings = Array.from(meetings);
      const [reorderedMeeting] = newMeetings.splice(source.index, 1);
      newMeetings.splice(destination.index, 0, reorderedMeeting);
      setMeetings(newMeetings);
    }
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
          process.env.REACT_APP_GEMINI_API_KEY
        );
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Create context from current tasks and meetings
        const context = `
          Current Tasks:
          ${tasks
            .map(
              (task) =>
                `- ${task.title} (Priority: ${task.priority}, Deadline: ${task.deadline}, Team: ${task.assignedTeam})`
            )
            .join("\n")}
          
          Upcoming Meetings:
          ${meetings
            .map(
              (meeting) =>
                `- ${meeting.title} on ${meeting.date} at ${meeting.time} (Duration: ${meeting.duration})`
            )
            .join("\n")}
        `;

        // Combine user's question with context
        const promptWithContext = `
          Context about current schedule:
          ${context}
          
          User's question: ${chatInput}
          
          Please provide insights and answers based on this schedule information.
        `;

        const result = await model.generateContent(promptWithContext);
        const response = await result.response;
        const text = response.text();

        const aiMessage = {
          id: chatMessages.length + 2,
          text: text,
          sender: "ai",
        };
        setChatMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error generating response:", error);
        const errorMessage = {
          id: chatMessages.length + 2,
          text: "Sorry, I couldn't process your message. Please try again.",
          sender: "ai",
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <header className="project-header">
        <button
          className="back-to-home-button"
          onClick={() => window.history.back()}
        >
          Back to Home
        </button>
      </header>

      <div className="team-alignment-container">
        <header className="project-header">
          <h2>TeamSync Pro</h2>
          <p className="project-description">
            Intelligent team alignment and task management system with advanced
            scheduling, prioritization, and collaboration features.
          </p>
        </header>

        <div className="team-sections">
          <div className="section tasks-section">
            <h2>🚀 Priority Tasks</h2>
            <Droppable droppableId="tasks" type="TASK">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="tasks-list"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card"
                        >
                          <div className="card-header">
                            <h3>{task.title}</h3>
                            <div className="card-actions">
                              <button
                                onClick={() => moveTaskUp(index)}
                                disabled={index === 0}
                                className="move-button up"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => moveTaskDown(index)}
                                disabled={index === tasks.length - 1}
                                className="move-button down"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                          <p>{task.description}</p>
                          <div className="task-details">
                            <span>🏷️ Priority: {task.priority}</span>
                            <span>📅 Deadline: {task.deadline}</span>
                            <span>👥 Team: {task.assignedTeam}</span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="section meetings-section">
            <h2>📆 Upcoming Meetings</h2>
            <Droppable droppableId="meetings" type="MEETING">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="meetings-list"
                >
                  {meetings.map((meeting, index) => (
                    <Draggable
                      key={meeting.id}
                      draggableId={meeting.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="meeting-card"
                        >
                          <div className="card-header">
                            <h3>{meeting.title}</h3>
                            <div className="card-actions">
                              <button
                                onClick={() => moveMeetingUp(index)}
                                disabled={index === 0}
                                className="move-button up"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => moveMeetingDown(index)}
                                disabled={index === meetings.length - 1}
                                className="move-button down"
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                          <p>
                            📅 {meeting.date} at {meeting.time}
                          </p>
                          <p>⏱️ Duration: {meeting.duration}</p>
                          <p>
                            👥 Participants: {meeting.participants.join(", ")}
                          </p>
                          <h4>Agenda:</h4>
                          <ul>
                            {meeting.agenda.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="section chat-section">
            <h2>💬 JARVIS</h2>
            <div className="chat-messages">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender}`}
                >
                  {message.text}
                </div>
              ))}
              {isLoading && <div className="chat-message ai">Thinking...</div>}
            </div>
            <form onSubmit={handleChatSubmit} className="chat-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !chatInput.trim()}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TeamAlignmentSystem;
