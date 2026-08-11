from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5176"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = sqlite3.connect("health_insurance.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT,
    hospital_name TEXT,
    claim_amount REAL,
    status TEXT
)
""")

conn.commit()

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class ClaimData(BaseModel):
    patient_name: str
    hospital_name: str
    claim_amount: float

@app.post("/register")
def register(user: UserRegister):
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (user.name, user.email, user.password)
    )
    conn.commit()
    return {"message": "User registered successfully"}

@app.post("/claims")
def create_claim(claim: ClaimData):
    cursor.execute(
        "INSERT INTO claims (patient_name, hospital_name, claim_amount, status) VALUES (?, ?, ?, ?)",
        (claim.patient_name, claim.hospital_name, claim.claim_amount, "Pending")
    )
    conn.commit()
    return {"message": "Claim submitted successfully"}