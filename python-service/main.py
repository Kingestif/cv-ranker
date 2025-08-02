from fastapi import FastAPI, File, UploadFile, Form
from typing import List
from pdfminer.high_level import extract_text
from sentence_transformers import SentenceTransformer
import io
import docx
import spacy

model = SentenceTransformer('all-MiniLM-L6-v2')

nlp = spacy.load("en_core_web_sm")
app = FastAPI()

def extract_pdf_text(file_bytes: bytes) -> str:
    with io.BytesIO(file_bytes) as fh:
        return extract_text(fh)

def extract_docx_text(file_bytes: bytes) -> str:
    with io.BytesIO(file_bytes) as fh:
        document = docx.Document(fh)
        return "\n".join([para.text for para in document.paragraphs])
    
def extract_name(text: str) -> str:
    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return "Unknown"

def get_embedding(text):
    return model.encode(text)

@app.post("/upload")
async def upload(
    resumes: List[UploadFile] = File(...),
    job_description: str = Form(...)
):
    extracted_resumes = []
    job_embedding = get_embedding(job_description)


    for file in resumes:
        contents = await file.read()

        if file.filename.lower().endswith(".pdf"):
            text = extract_pdf_text(contents)
        elif file.filename.lower().endswith(".docx"):
            text = extract_docx_text(contents)
        else:
            text = "Unsupported file type"

        # Extract name using NER
        name = extract_name(text)

        resume_embedding = get_embedding(text)

        extracted_resumes.append({
            "filename": file.filename,
            "applicant_name": name,
            "size": len(contents),
            "extracted_text": text[:500] 
        })

    return {
        "job_description": job_description,
        "resumes": extracted_resumes
    }