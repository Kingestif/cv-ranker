# CV Ranker

CV Ranker is a full-stack application that allows recruiters to upload, analyze, and search resumes using AI-powered semantic ranking. The system leverages modern NLP models to match resumes to job descriptions and enables keyword-based search for fine-grained candidate discovery.

---

## 🚀 Live Demo

- **Frontend:** [https://cvisionio.vercel.app](https://cvisionio.vercel.app/) 
- **Backend:** Deployed on Render
- **Python AI Service:** Deployed on Hugging Face Inference Endpoints

---

## Features

- **Resume Upload:** Upload multiple PDF or DOCX resumes at once.
- **AI Ranking:** Uses Sentence Transformers and FAISS to rank resumes by similarity to a provided job description.
- **Session Storage:** Stores ranked results in Redis for fast retrieval and search.
- **Keyword Search:** Recruiters can search for specific skills or keywords (e.g., "Kafka", "React") to further refine candidate ranking.
- **Frontend & Backend Separation:** Modular architecture with React (Vite) frontend, Node.js/Express backend, and Python AI microservice.
- **RESTful API:** Clean endpoints for uploading, ranking, and searching resumes.
- **Production Ready:** Deployed on scalable cloud platforms (Vercel, Render, Hugging Face).

---

## Project Structure

```
resume-ranker/
│
├── backend/        # Node.js/Express API server (deployed on Render)
│   ├── src/
│   ├── .env
│   └── .gitignore
│
├── frontend/       # React.js (Vite) frontend (deployed on Vercel)
│   ├── src/
│   ├── .env
│   └── .gitignore
│
├── python-service/ # FastAPI AI microservice (deployed on Hugging Face)
│   ├── main.py
│   ├── search.py
│   ├── redis_client.py
│   ├── .env
│   └── .gitignore
│
└── README.md
```

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Kingestif/cv-ranker.git
cd cv-ranker
```

### 2. Set up the Python AI Service

```bash
cd python-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Set up the Backend

```bash
cd ../backend
npm install
# Set up env variables in .env
npm run dev
```

### 4. Set up the Frontend

```bash
cd ../frontend
npm install
# Set up env variables in .env
npm run dev
```

---

## API Overview

### **Upload Resumes**

`POST /api/v1/upload`

- **Body:** `FormData` with `resumes` (files) and `job_description` (string)
- **Response:** Session ID and ranked resumes

### **Search Resumes**

`POST /api/v1/search`

- **Body:** JSON with `session_id` and `query` (keyword/skill)
- **Response:** Ranked resumes matching the search query

---

## Environment Variables

Each service has its own `.env` file.  
Example for `python-service/.env`:

```
REDIS_URL=your_redis_url
ALPHA_JD=0.7
ALPHA_QUERY=0.3
```

---

## Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Vercel Analytics
- **Backend:** Node.js, Express, Multer, Axios (deployed on Render)
- **AI Service:** Python, FastAPI, Sentence Transformers, FAISS (deployed on Hugging Face for better GPU/CPU/RAM options)
- **Database:** Redis (Upstash, for session storage)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Sentence Transformers](https://www.sbert.net/)
- [FAISS](https://github.com/facebookresearch/faiss)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Hugging Face Inference Endpoints](https://huggingface.co/inference-endpoints)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)