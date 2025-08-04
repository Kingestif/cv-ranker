import redis
import json

r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

def save_session(session_id: str, data: dict, ttl: int = 3600):
    r.set(session_id, json.dumps(data), ex=ttl)

def get_session(session_id: str):
    session_data = r.get(session_id)
    return json.loads(session_data) if session_data else None

def delete_session(session_id: str):
    r.delete(session_id)
