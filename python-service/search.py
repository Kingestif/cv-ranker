from redis_client import get_session
import numpy as np
from fastapi import FastAPI, APIRouter
import faiss
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel


router = APIRouter()
model = SentenceTransformer('all-MiniLM-L6-v2')

class SearchRequest(BaseModel):
    session_id: str
    query: str

@router.post("/search")
async def search_resumes(req: SearchRequest):
    session_id = req.session_id
    query = req.query

    session = get_session(session_id)
    if not session:
        return {"error": "Session expired or not found"}

    resumes = session["resumes"]
    if not resumes:
        return {"error": "No resumes found in session"}

    # resume embeddings
    resume_embeddings = np.array([r["embedding"] for r in resumes], dtype='float32')

    # query embedding
    query_embedding = model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)

    # Search top matches
    d = resume_embeddings.shape[1]
    index = faiss.IndexFlatIP(d)
    index.add(resume_embeddings)
    k = min(5, len(resumes))
    
    distances, indices = index.search(query_embedding, k)

    top_matches = []
    for i, idx in enumerate(indices[0]):
        r = resumes[idx]
        top_matches.append({
            "filename": r["filename"],
            "applicant_name": r["applicant_name"],
            "similarity": round(float(distances[0][i]), 4),
            "text_preview": r["text_preview"]  
        })

    return {
        "query": query,
        "top_matches": top_matches
    }