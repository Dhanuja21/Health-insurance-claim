from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI()

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

class LoginData(BaseModel):
    email: str
    password: str

class ClaimData(BaseModel):
    patient_name: str
    hospital_name: str
    claim_amount: float

@app.get("/")
def home():
    return {"message": "Health Insurance Claim Portal API is running"}

@app.post("/register")
def register(user: UserRegister):
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (user.name, user.email, user.password)
    )
    conn.commit()
    return {"message": "User registered successfully"}

@app.get("/users")
def get_users():
    cursor.execute("SELECT id, name, email FROM users")
    users = cursor.fetchall()
    return {"users": users}

@app.post("/login")
def login(data: LoginData):
    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (data.email, data.password)
    )
    user = cursor.fetchone()

    if user:
        return {"message": "Login successful"}
    return {"message": "Invalid email or password"}

@app.post("/claims")
def create_claim(claim: ClaimData):
    cursor.execute(
        "INSERT INTO claims (patient_name, hospital_name, claim_amount, status) VALUES (?, ?, ?, ?)",
        (claim.patient_name, claim.hospital_name, claim.claim_amount, "Pending")
    )
    conn.commit()
    return {"message": "Claim submitted successfully"}

@app.get("/claims")
def get_claims():
    cursor.execute("SELECT * FROM claims")
    claims = cursor.fetchall()
    return {"claims": claims}
class StatusUpdate(BaseModel):
    status: str

@app.put("/claims/{claim_id}")
def update_claim_status(claim_id: int, data: StatusUpdate):
    cursor.execute(
        "UPDATE claims SET status=? WHERE id=?",
        (data.status, claim_id)
    )
    conn.commit()
    return {"message": "Claim status updated successfully"}