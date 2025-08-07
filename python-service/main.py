from fastapi import FastAPI, File, UploadFile, Form
from typing import List
from pdfminer.high_level import extract_text
from sentence_transformers import SentenceTransformer
import io
import docx
import spacy
from torch.nn.functional import cosine_similarity
from uuid import uuid4
from redis_client import save_session
import faiss
from search import router as search_router
from transformers import pipeline

model = SentenceTransformer('all-MiniLM-L6-v2')
nlp = spacy.load("en_core_web_sm")
app = FastAPI()
app.include_router(search_router)
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def extract_pdf_text(file_bytes: bytes) -> str:
    with io.BytesIO(file_bytes) as fh:
        return extract_text(fh)

def extract_docx_text(file_bytes: bytes) -> str:
    with io.BytesIO(file_bytes) as fh:
        document = docx.Document(fh)
        return "\n".join([para.text for para in document.paragraphs])
    
def extract_name_with_pipeline(resume_text: str) -> str:
    question = "What is the full name of the candidate?"
    context = resume_text.strip()[:1000]  # name likely appears in the first 1000 characters

    result = qa_pipeline(question=question, context=context)
    answer = result["answer"].strip()

    if len(answer.split()) > 10 or answer.lower() in ["unknown", "n/a"]:
        return "Unknown"
    
    return answer

@app.post("/upload")
async def upload(
    resumes: List[UploadFile] = File(...),
    job_description: str = Form(...)
):
    # extract text
    resume_texts = []
    for file in resumes:
        contents = await file.read()
        if file.filename.lower().endswith(".pdf"):
            text = extract_pdf_text(contents)
        elif file.filename.lower().endswith(".docx"):
            text = extract_docx_text(contents)
        else:
            return {"error": f"Unsupported file type: {file.filename}"}
        resume_texts.append(text)

    # batch embed the resumes
    resume_embeddings = model.encode(resume_texts, convert_to_numpy=True)
    faiss.normalize_L2(resume_embeddings)

    d = resume_embeddings.shape[1]
    index = faiss.IndexFlatIP(d) 
    index.add(resume_embeddings) 

    # embed job jesc
    job_embedding = model.encode([job_description], convert_to_numpy=True)
    faiss.normalize_L2(job_embedding)

    # get top k similar resumes
    k = len(resumes)
    distances, indices = index.search(job_embedding, k)

    extracted_resumes = []
    for i, idx in enumerate(indices[0]):
        text = resume_texts[idx]
        name = extract_name_with_pipeline(text)
        extracted_resumes.append({
            "filename": resumes[idx].filename,
            "applicant_name": name,
            "similarity": round(float(distances[0][i]), 4),
            "text_preview": text[:300],
            "embedding": resume_embeddings[idx].tolist()
        })

    session_id = str(uuid4())
    save_session(session_id, {
        "job_description": job_description,
        "jd_embedding": job_embedding.tolist(),
        "resumes": extracted_resumes
    })

    return {
        "session_id": session_id,
        "job_description": job_description,
        "ranked_resumes": extracted_resumes
    }