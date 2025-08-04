# Cv Ranker

Cv Ranker is a full-stack application that allows recruiters to upload, analyze, and search resumes using AI-powered semantic ranking. The system leverages modern NLP models to match resumes to job descriptions and enables keyword-based search for fine-grained candidate discovery.

---

## Features

- **Resume Upload:** Upload multiple PDF or DOCX resumes at once.
- **AI Ranking:** Uses Sentence Transformers and FAISS to rank resumes by similarity to a provided job description.
- **Session Storage:** Stores ranked results in Redis for fast retrieval and search.
- **Keyword Search:** Recruiters can search for specific skills or keywords (e.g., "Kafka", "React") to further refine candidate ranking.
- **Frontend & Backend Separation:** Modular architecture with separate folders for frontend, backend (Node.js/Express), and Python AI service.
- **RESTful API:** Clean endpoints for uploading, ranking, and searching resumes.

---

## Project Structure

```
resume-ranker/
│
├── backend/        # Node.js/Express API server
│   ├── src/
│   ├── .env
│   └── .gitignore
│
├── frontend/       # React.js  
│   ├── src/
│   ├── .env
│   └── .gitignore
│
├── python-service/ # FastAPI AI microservice
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
# Set up env variables
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
REDIS_HOST=localhost
REDIS_PORT=6379
ALPHA_JD=0.7
ALPHA_QUERY=0.3
```

---

## Tech Stack

- **Frontend:** React.js, Tailwind
- **Backend:** Node.js, Express, Multer, Axios
- **AI Service:** Python, FastAPI, Sentence Transformers, FAISS
- **Database:** Redis (for session storage)

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