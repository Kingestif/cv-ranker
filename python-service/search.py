from redis_client import get_session
import numpy as np
from fastapi import APIRouter, HTTPException, status
import faiss
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()
router = APIRouter()
model = SentenceTransformer('all-MiniLM-L6-v2')

class SearchRequest(BaseModel):
    session_id: str
    query: str

@router.post("/search")
async def search_resumes(req: SearchRequest):
    alpha_jd = float(os.getenv("ALPHA_JD", 0.5))
    alpha_query = float(os.getenv("ALPHA_QUERY", 0.5))
    
    session_id = req.session_id
    query = req.query

    session = get_session(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session expired or not found"
        )

    resumes = session["resumes"]
    if not resumes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No resumes found in session"
        )

    # resume embeddings
    resume_embeddings = np.array([r["embedding"] for r in resumes], dtype='float32')
    faiss.normalize_L2(resume_embeddings)

    # query embedding
    query_embedding = model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)

    jd_scores = [r["similarity"] for r in resumes]  # JD-based similarity

    # Search top matches
    d = resume_embeddings.shape[1]
    index = faiss.IndexFlatIP(d)
    index.add(resume_embeddings)
    k = len(resumes)
    query_scores, indices = index.search(query_embedding, k)

    top_matches = []
    for i, idx in enumerate(indices[0]):
        jd_score = jd_scores[idx]
        query_score = float(query_scores[0][i])
        final_score = alpha_jd * jd_score + query_score * alpha_query

        r = resumes[idx]
        
        top_matches.append({
            "filename": r["filename"],
            "applicant_name": r["applicant_name"],
            "text_preview": r["text_preview"],
            "jd_score": round(jd_score, 4),
            "query_score": round(query_score, 4),
            "final_score": round(final_score, 4)
        })

    top_matches.sort(key=lambda x: x["final_score"], reverse=True)

    return {
        "query": query,
        "top_matches": top_matches
    }