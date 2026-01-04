from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    """User login"""
    return {"access_token": "token", "user": {"email": request.email, "role": "worker"}}

@router.post("/logout")
async def logout():
    """User logout"""
    return {"status": "ok"}

@router.get("/me")
async def get_current_user():
    """Get current user"""
    return {"id": "uuid", "email": "user@example.com", "role": "worker"}
