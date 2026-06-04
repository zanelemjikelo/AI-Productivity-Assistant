
# AI Workplace Productivity Assistant

## Project Overview

**AI Workplace Productivity Assistant** is a modern, responsive web application that helps professionals automate workplace tasks using Artificial Intelligence. The platform provides a clean, SaaS-style dashboard that centralizes productivity tools such as email generation, meeting note summarization, task planning, research assistance, and an AI chatbot interface. It is designed to improve efficiency, streamline workflows, and save time on repetitive tasks.

---

## Features

* **Smart Email Generator:** Create professional emails quickly with customizable tones; outputs are editable.
* **Meeting Notes Summarizer:** Summarize meeting transcripts and highlight key points, decisions, and action items.
* **AI Task Planner:** Generate structured, prioritized task lists and deadlines for projects.
* **AI Research Assistant:** Summarize research topics and provide key insights in an organized format.
* **AI Chatbot Interface:** Interactive assistant for workplace queries and productivity guidance.
* **Dashboard UI:** Modern, SaaS-style interface with sidebar navigation and responsive design.
* **Responsible AI Disclaimer:** Inform users that AI-generated content should be reviewed before use.

---

## Tools Used

**Frontend**

* React.js
* HTML5 & CSS3
* JavaScript (ES6+)
* Tailwind CSS (or Bootstrap)
* React Router

**Backend**

* Node.js
* Express.js

**AI Integration**

* OpenAI API (or compatible LLM API)

**Database**

* MongoDB (or PostgreSQL)

**Development Tools**

* Git & GitHub
* Visual Studio Code
* Postman

**Deployment (optional)**

* Vercel / Netlify for frontend
* Render / Railway / AWS for backend

---

## Setup Instructions

### Prerequisites

* Node.js and npm installed
* Git installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ai-workplace-productivity-assistant.git
```

2. Navigate to the project folder:

```bash
cd ai-workplace-productivity-assistant
```

3. Install dependencies:

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd ../server
npm install
```

4. Create a `.env` file in the backend directory and add:

```env
PORT=5000
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=your_database_connection_string
```

5. Start the development servers:

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
cd ../client
npm start
```

6. Open your browser and visit:

```
http://localhost:3000
```

---

## Responsible AI Disclaimer

AI-generated outputs may contain inaccuracies. Users should review and verify all content before using it for professional, business, or legal decisions.

---

## License

This project is licensed under the MIT License.
