# 🚀 BrandAI – AI Content Studio for Brands & Creators

BrandAI is a full-stack AI-powered content generation platform designed for **brands, creators, startups, small businesses, and marketing teams**.
It helps users create marketing content for multiple platforms using their brand information, products, target audience, campaign goals, and preferred tone.
BrandAI combines a **React frontend**, **Node.js + Express backend**, **MongoDB database**, and **Google Gemini AI** to provide AI-powered content generation, assistance, quality checking, and product image analysis.
---
# 💡 Project Overview

Creating marketing content for different social media and communication platforms can be time-consuming and difficult to keep consistent with a brand's identity.
BrandAI aims to simplify this process by allowing users to store their brand information and generate platform-specific marketing content using AI.
The platform provides:

- Brand information management
- AI-powered campaign generation
- Multi-platform content generation
- AI marketing assistant
- AI content quality checking
- Product image analysis

The application is designed as a full-stack web application with a React frontend and Node.js backend.
---
# ✨ Features
## 🤖 AI Content Generation
Generate marketing content using Google Gemini AI for multiple platforms:
- Instagram
- Facebook
- LinkedIn
- YouTube
- WhatsApp
- Email

Content is generated based on the selected brand, campaign goal, product, target audience, tone, and platforms.
---
## 🧠 Brand Brain
Users can store important brand information such as:
- Brand Name
- Description
- Target Audience
- Brand Tone
- Products
- Offers
- Preferred Style
- Preferred Language
This information can be used as context while generating marketing campaigns.

## 📢 Multi-Platform Campaign Generation
Create content for multiple platforms from a single campaign.
Instead of manually creating content separately for every platform, BrandAI generates platform-specific content based on the campaign information.

## 💬 AI Assistant
BrandAI includes an AI assistant that helps users understand and use the platform.
The assistant can provide guidance related to:
- Campaign creation
- Brand information
- Content generation
- Platform features
- Using BrandAI

## 🔍 Content Quality Checking
Generated campaign content can be analyzed using AI-powered quality checking.
The analysis includes:
- Overall score
- Brand consistency
- Clarity
- Call-to-action
- Audience fit
- Suggestions
  
## 🔐 Secure Environment Configuration
Sensitive information such as:
- MongoDB connection strings
- Gemini API keys
is stored using environment variables and is not included in the repository.
Each person running the project should use their **own MongoDB connection string and Gemini API key**.

# 🛠️ Technologies Used
## Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite
- React Router

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs

## AI
- Google Gemini API
- `@google/genai`

## Other Technologies
- Multer
- CORS
- dotenv
- Nodemon

## Development Tools
- Git
- GitHub
- VS Code
# 📁 Project Structure

The `main` branch contains the merged full-stack project.

```text
ai-marketing-content-studio/
│
├── client/                         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── config/                         # Backend configuration
│   └── db.js                       # MongoDB connection
│
├── controllers/                    # Backend controllers
│   ├── assistantController.js
│   ├── brandController.js
│   ├── campaignController.js
│   ├── qualityController.js
│   └── visionController.js
│
├── models/                         # MongoDB/Mongoose models
│   ├── Brand.js
│   └── Campaign.js
│
├── routes/                         # Express API routes
│   ├── assistantRoutes.js
│   ├── brandRoutes.js
│   ├── campaignRoutes.js
│   ├── qualityRoutes.js
│   └── visionRoutes.js
│
├── services/                       # AI and application services
│   ├── aiService.js
│   ├── assistantService.js
│   ├── qualityService.js
│   └── visionService.js
│
├── uploads/                        # Uploaded product images
│
├── server.js                       # Backend entry point
├── package.json                    # Backend dependencies
├── package-lock.json
├── .gitignore
└── README.md
```

---

# 🌿 GitHub Branches
The repository contains three branches:

```text
main
frontend
backend
```
### `main`
The **main branch contains the merged final full-stack project** and should be used for testing and evaluation.

### `frontend`
Contains frontend development work.

### `backend`
Contains backend development work.

For evaluation, use:

```text
main
```
# ⚙️ Prerequisites
Before running BrandAI, make sure the following are installed:
- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

Check Node.js and npm:
```bash
node -v
npm -v
```
# 🚀 Quick Start
The following steps are enough to run the complete application locally.

## 📥 Clone the Repository
The **`main` branch contains the final complete project**.
Please clone the `main` branch only:
```bash
git clone -b main --single-branch https://github.com/jadhavsiddhi349-cloud/ai-marketing-content-studio.git
Enter the project directory:
```bash
cd ai-marketing-content-studio
```
The repository will use the `main` branch by default.
If necessary, explicitly switch to it:
```bash
git checkout main
```
# 🔧 Backend Setup

The backend is located in the **root directory**.
Install backend dependencies:
```bash
npm install
```
# 🔑 Environment Variables
Create a file named:
```text
.env
```
in the project root, at the same level as `server.js`.
Your structure should look like:
```text
ai-marketing-content-studio/
│
├── .env
├── server.js
├── package.json
├── config/
├── controllers/
├── models/
├── routes/
├── services/
└── client/
```

Add:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Example

For local MongoDB:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/brandai

GEMINI_API_KEY=your_gemini_api_key
```
Replace the example values with your own credentials.

# 🗄️ MongoDB Setup
BrandAI uses MongoDB with Mongoose.
You can use:

- Local MongoDB
- MongoDB Atlas

## Local MongoDB
Example:

```text
mongodb://127.0.0.1:27017/brandai
```
Make sure MongoDB is running before starting the backend.

## MongoDB Atlas
If using MongoDB Atlas, use the connection string provided by your cluster.

Example:
```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/brandai
```
Make sure the appropriate network access is configured in MongoDB Atlas.

# 🤖 Google Gemini API Setup
BrandAI uses Google Gemini AI for:
- Campaign generation
- AI assistant
- Content quality checking
- Product image analysis

Create your own Gemini API key through Google's Gemini API/AI Studio service.

Then add it to `.env`:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Important

The evaluator should use **their own Gemini API key**.

Do not:

- Commit your API key to GitHub
- Put the API key directly in source code
- Share private API keys publicly

---

# ▶️ Start the Backend

From the project root:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

For a normal start without Nodemon:

```bash
npm start
```

---

# ❤️ Backend Health Check

After starting the backend, open:

```text
http://localhost:5000/
```

You should receive:

```json
{
  "message": "BrandAI API is running",
  "version": "1.0.0"
}
```

This confirms that the backend is running correctly.

---

# 🎨 Frontend Setup

The React frontend is located inside:

```text
client/
```

Open a **new terminal**.

Run:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# 🔄 Running the Complete Application

Both frontend and backend need to be running.

## Terminal 1 – Backend

From the project root:

```bash
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## Terminal 2 – Frontend

From the project root:

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Then open:

```text
http://localhost:5173
```

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │    User / Browser   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      /client        │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │   MongoDB   │  │  Gemini API │  │ Controllers │
       │   Database  │  │     AI      │  │  /Services  │
       └─────────────┘  └─────────────┘  └─────────────┘
```

---

# 🔌 API Documentation

The backend provides REST APIs for the main BrandAI functionality.

## Base URL

```text
http://localhost:5000
```

---

## ❤️ Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check whether the backend is running |

Example response:

```json
{
  "message": "BrandAI API is running",
  "version": "1.0.0"
}
```

---

## 🏷️ Brand APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/brands` | Create a new brand |
| `GET` | `/api/brands` | Get all brands |
| `GET` | `/api/brands/:id` | Get a specific brand |
| `PUT` | `/api/brands/:id` | Update a brand |
| `DELETE` | `/api/brands/:id` | Delete a brand |

---

## 📢 Campaign APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/campaigns` | Create an AI-generated campaign |
| `GET` | `/api/campaigns` | Get all campaigns |
| `GET` | `/api/campaigns/:id` | Get a specific campaign |
| `PUT` | `/api/campaigns/:id` | Update a campaign |
| `PUT` | `/api/campaigns/:id/approve` | Approve a campaign |

---

## 📊 Content Quality API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/quality/:id` | Analyze campaign content quality |

The analysis includes:

- Overall score
- Brand consistency
- Clarity
- Call-to-action
- Audience fit
- Suggestions

---

## 👁️ Vision API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/vision/analyze` | Analyze an uploaded product image |

The image should be uploaded using the multipart form-data field:

```text
productImage
```

---

## 💬 AI Assistant API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/assistant/chat` | Send a message to the AI assistant |

Example request:

```json
{
  "message": "How can I improve my Instagram campaign?",
  "brandContext": {
    "brandName": "Example Brand",
    "tone": "Professional",
    "targetAudience": "Young adults"
  }
}
```

---

# 🗃️ Database

BrandAI uses **MongoDB with Mongoose**.

## Brand Model

Brand information includes:

- Brand Name
- Description
- Tone
- Target Audience
- Products
- Offers
- Preferred Style
- Preferred Language

## Campaign Model

Campaign information includes:

- Brand
- Campaign Name
- Goal
- Product
- Audience
- Tone
- Platforms
- Generated Content
- Quality Check
- Status

Campaign status can be:

```text
draft
review
approved
```

---

# 🧠 AI Workflow

```text
User enters campaign details
          │
          ▼
React Frontend
          │
          ▼
Express REST API
          │
          ▼
Campaign Controller
          │
          ▼
AI Service
          │
          ▼
Google Gemini API
          │
          ▼
AI-generated content
          │
          ▼
Campaign saved in MongoDB
          │
          ▼
Frontend displays result
```

---

# 📱 Supported Content Platforms

BrandAI can generate content for:

### Instagram

Platform-specific marketing content.

### Facebook

Promotional and marketing content.

### LinkedIn

Professional marketing content.

### YouTube

Video-oriented campaign content.

### WhatsApp

Promotional messaging content.

### Email

Marketing email content.

---

# 🔍 Content Quality Checking

BrandAI can evaluate generated campaign content using AI.

The quality-checking process evaluates:

```text
Overall Score
Brand Consistency
Clarity
Call-to-Action
Audience Fit
Suggestions
```

The quality result is stored with the campaign.

---

# 👁️ Product Image Analysis

The vision functionality allows users to upload a product image.

The process is:

```text
Product Image
     │
     ▼
Frontend
     │
     ▼
Vision API
     │
     ▼
Multer Upload
     │
     ▼
Vision Service
     │
     ▼
Google Gemini
     │
     ▼
Image Analysis
     │
     ▼
Result
```

---

# 🔐 Security

Never commit the following information to GitHub:

- Gemini API keys
- MongoDB passwords
- `.env` files
- Private credentials

The `.gitignore` file should include:

```gitignore
node_modules/

.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

Always use environment variables:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 🧪 Testing the Application

After starting both frontend and backend:

### 1. Open the application

```text
http://localhost:5173
```

### 2. Add Brand Information

Provide the required brand information.

### 3. Create a Campaign

Enter:

- Campaign name
- Goal
- Product
- Audience
- Tone
- Platforms

### 4. Generate Content

Submit the campaign and allow Gemini AI to generate the content.

### 5. Review Generated Content

Review the generated content for the selected platforms.

### 6. Use the AI Assistant

Ask questions related to BrandAI and campaign creation.

### 7. Check Content Quality

Run the quality-checking functionality on generated campaign content.

### 8. Test Image Analysis

Upload a product image and use the vision functionality.

---

# 🛠️ Troubleshooting

## Backend Does Not Start

Run:

```bash
npm install
npm run dev
```

Make sure `.env` exists in the project root.

---

## MongoDB Connection Error

Check:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

If using local MongoDB, make sure MongoDB is running.

If using MongoDB Atlas, verify:

- Username
- Password
- Connection string
- Network access

---

## Gemini API Error

Check:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Make sure the key is valid and available for use.

---

## Frontend Does Not Start

Run:

```bash
cd client
npm install
npm run dev
```

---

## Port 5000 Is Already in Use

Change the port in `.env`:

```env
PORT=5001
```

Then restart the backend.

If the frontend API configuration uses port `5000`, update it accordingly.

---

# 📦 NPM Scripts

## Backend

### Development

```bash
npm run dev
```

Starts the backend using Nodemon.

### Production/Normal Start

```bash
npm start
```

Starts the backend using Node.js.

---

## Frontend

From the `client` directory:

```bash
npm run dev
```

Starts the Vite development server.

---

# 🚀 Quick Start for Judges

If you are evaluating the project, follow these steps.

### 1. Clone

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ai-marketing-content-studio
```

The final merged project is available on:

```text
main
```

If necessary:

```bash
git checkout main
```

---

### 2. Install Backend

```bash
npm install
```

---

### 3. Create `.env`

Create `.env` in the project root:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Use your own MongoDB and Gemini credentials.

---

### 4. Start Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

### 5. Install Frontend

Open another terminal:

```bash
cd client
npm install
```

---

### 6. Start Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

### 7. Open BrandAI

Open:

```text
http://localhost:5173
```

The complete application should now be running.

---

# 🌐 Local URLs

| Component | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:5000` |
| Backend Health Check | `http://localhost:5000/` |

---

# 📌 Important Notes

- The **`main` branch contains the merged final project**.
- The frontend is located inside the `client/` directory.
- The backend is located in the project root.
- MongoDB is required for database operations.
- A Gemini API key is required for AI functionality.
- Evaluators should use their own MongoDB connection string.
- Evaluators should use their own Gemini API key.
- Never commit `.env` or private credentials to GitHub.
- Both frontend and backend must be running to use the complete application.

---

# 🎯 Project Goal

BrandAI aims to simplify digital marketing content creation by combining:

- Brand information
- AI-powered content generation
- Multi-platform campaign creation
- AI assistance
- Content quality checking
- Product image analysis

into a single platform for brands, creators, startups, small businesses, and marketing teams.
# 📄 License

This project is developed for educational and project demonstration purposes.
