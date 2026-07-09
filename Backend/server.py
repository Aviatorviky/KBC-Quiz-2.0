from fastapi import FastAPI, APIRouter, HTTPException 
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="KBC Cyber Quiz API")

api_router = APIRouter(prefix="/api")


# ============ MODELS ============
class ScoreEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_name: str
    prize: int
    questions_answered: int
    outcome: str  # 'won' | 'walked_away' | 'wrong' | 'timeout'
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ScoreCreate(BaseModel):
    player_name: str
    prize: int
    questions_answered: int
    outcome: str


# ============ ROUTES ============
@api_router.get("/")
async def root():
    return {"message": "KBC Cyber Quiz API online"}


@api_router.post("/leaderboard", response_model=ScoreEntry)
async def submit_score(payload: ScoreCreate):
    if not payload.player_name or not payload.player_name.strip():
        raise HTTPException(status_code=400, detail="player_name required")
    if payload.outcome not in {"won", "walked_away", "wrong", "timeout"}:
        raise HTTPException(status_code=400, detail="invalid outcome")

    entry = ScoreEntry(
        player_name=payload.player_name.strip()[:32],
        prize=max(0, int(payload.prize)),
        questions_answered=max(0, int(payload.questions_answered)),
        outcome=payload.outcome,
    )
    doc = entry.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.leaderboard.insert_one(doc)
    return entry


@api_router.get("/leaderboard", response_model=List[ScoreEntry])
async def get_leaderboard(limit: int = 20):
    cursor = db.leaderboard.find({}, {"_id": 0}).sort([("prize", -1), ("timestamp", 1)]).limit(limit)
    rows = await cursor.to_list(length=limit)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            try:
                r['timestamp'] = datetime.fromisoformat(r['timestamp'])
            except Exception:
                r['timestamp'] = datetime.now(timezone.utc)
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
