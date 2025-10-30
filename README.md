
## 💼 AI-Powered Job Portal | MERN + Python FastAPI

A full-stack **Job Portal Web Application** built using **MERN Stack** and **Python FastAPI**.  
The platform connects students with recruiters and delivers **AI-powered job recommendations** based on skills, viewing history, and user behavior.

---

## 🚀 Features

- 🧠 **AI-Powered Job Recommendations** — Personalized job suggestions using **TF-IDF** & **Cosine Similarity** (Python + scikit-learn).  
- 👨‍🎓 **Student Dashboard** — Search, apply, and receive skill-based job recommendations.  
- 👨‍💼 **Recruiter Dashboard** — Post new jobs, view applications, and manage candidates.  
- 🔍 **Recently Viewed Jobs** — Automatically tracks recently visited job posts.  
- 🤝 **Similar Job Suggestions** — Recommends jobs similar to the last viewed posting.  
- 🔐 **Secure Authentication** — Role-based access with **JWT Authentication**.  
- 💾 **File Uploads** — Resume and profile image management using **Cloudinary**.  
- 📱 **Modern UI** — Responsive and accessible interface built with **React + Tailwind CSS**.  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- **React.js**  
- **Redux Toolkit**  
- **Tailwind CSS**  
- **Axios**

### ⚙️ Backend (Node.js)
- **Node.js** + **Express.js**  
- **MongoDB** + **Mongoose**  
- **JWT Authentication**  
- **Cloudinary** (for resume uploads)

### 🤖 AI / ML Microservice
- **Python** + **FastAPI**  
- **scikit-learn**, **NumPy**  
- **TF-IDF Vectorizer** + **Cosine Similarity**

---

## 🧠 Architecture Overview

```

React (Frontend)
↓
Node.js + Express (Backend API)
↓
MongoDB (Database)
↳ Stores Users, Jobs, Applications
↓
Python FastAPI (AI Microservice)
↳ Generates job recommendations

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/ai-job-portal.git
cd ai-job-portal
````

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Python ML Service

```bash
cd recommender
pip install -r requirements.txt
uvicorn tfidf_recommender:app --reload --port 8000
```

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧩 Key AI Logic

```python
# TF-IDF based Job Recommendation (FastAPI)
vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform([user_skills] + job_requirements)
similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
```

---

## 📊 Core Modules

| Module              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| **Authentication**  | JWT-based secure login/signup for students and recruiters |
| **Job Management**  | Post, update, and view job listings                       |
| **AI Recommender**  | Suggests jobs based on skill and history similarity       |
| **Recently Viewed** | Tracks and displays last viewed jobs                      |
| **Similar Jobs**    | Uses ML model to suggest related job posts                |

---

## 🧮 Example Use Case

1. A student adds skills: `React`, `Node`, `MongoDB`.
2. Python service matches these against all job requirements.
3. The backend returns **ranked job recommendations**.
4. Student views a job → it appears in **Recently Viewed** and triggers **Similar Jobs** suggestions.

---

## 🧭 Development Timeline

| Week | Milestone                              |
| ---- | -------------------------------------- |
| 1–2  | MERN setup + authentication            |
| 3–4  | Recruiter & student dashboards         |
| 5    | Job posting and application            |
| 6    | Python ML service (TF-IDF recommender) |
| 7    | Integration (Node ↔ FastAPI)           |
| 8    | Testing & deployment                   |

---

## 🧠 Learning Outcomes

* Integrated **AI/ML with full-stack web development** via microservices.
* Applied **Natural Language Processing (NLP)** for skill matching.
* Learned cross-service communication between **Node.js and FastAPI**.
* Built a **scalable, production-ready MERN application** with modular architecture.

---

## 🛠️ Tools & Libraries

**Languages:** JavaScript, Python
**Frameworks:** React, Express, FastAPI
**Libraries:** scikit-learn, Redux, Axios, TailwindCSS
**Database:** MongoDB
**Hosting:** Render / Netlify / Vercel

---

## 🌟 Future Enhancements

* Resume parsing using NLP for auto skill extraction.
* Job matching using **BERT embeddings** for semantic similarity.
* Real-time recruiter–student chat system.
* Analytics dashboard for recruiters.

---

## 🔑 Keywords 

`MERN Stack` · `React` · `Node.js` · `Express.js` · `MongoDB` · `Python` · `FastAPI` · `Machine Learning` · `NLP` · `TF-IDF` · `Cosine Similarity` · `JWT` · `TailwindCSS` · `Redux` · `Axios` · `Full Stack Development` · `AI Recommender System`

---

## 👨‍💻 Author

**Ashutosh Maurya**
💻 Developer | Full-Stack Engineer | AI Enthusiast

