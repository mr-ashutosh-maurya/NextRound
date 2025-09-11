from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os
from dotenv import load_dotenv
import uvicorn

# ------------ Load environment variables ------------
load_dotenv()

HOST = os.getenv("HOST", "0.0.0.0")  # default for deployment
PORT = int(os.getenv("PORT", 8000))  # default fallback

# ------------ FastAPI App ------------
app = FastAPI(title="Job Recommendation Service")

# ----------- Request & Response Models -----------
class Job(BaseModel):
    id: str
    requirement: List[str]

class RecommendRequest(BaseModel):
    skills: List[str]
    jobs: List[Job]

class Recommendation(BaseModel):
    id: str
    score: float

class RecommendResponse(BaseModel):
    recommendations: List[Recommendation]

# ----------- Recommendation Endpoint -----------
@app.post("/recommend", response_model=RecommendResponse)
def recommend_jobs(request: RecommendRequest):
    # Convert skills & requirements into text
    user_profile = " ".join(request.skills).lower()
    job_texts = [" ".join(job.requirement).lower() for job in request.jobs]

    if not job_texts:
        return {"recommendations": []}

    # TF-IDF vectorization
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([user_profile] + job_texts)

    # First vector = user, rest = jobs
    user_vec = vectors[0]
    job_vecs = vectors[1:]

    # Cosine similarity
    similarities = cosine_similarity(user_vec, job_vecs).flatten()

    # Rank jobs
    ranked_indices = np.argsort(similarities)[::-1]  # descending order
    recommendations = [
        {"id": request.jobs[i].id, "score": float(similarities[i])}
        for i in ranked_indices if similarities[i] > 0
    ]

    return {"recommendations": recommendations}

# ----------- Run Server -----------
if __name__ == "__main__":
    uvicorn.run("ml_service:app", host=HOST, port=PORT, reload=True)
