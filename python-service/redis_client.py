import redis
import json
from dotenv import load_dotenv
import os
load_dotenv()

redis_url = os.getenv("REDIS_URL")
r = redis.Redis.from_url(redis_url, decode_responses=True)

def save_session(session_id: str, data: dict, ttl: int = 3600):
    r.set(session_id, json.dumps(data), ex=ttl)

def get_session(session_id: str):
    session_data = r.get(session_id)
    return json.loads(session_data) if session_data else None

def delete_session(session_id: str):
    r.delete(session_id)
