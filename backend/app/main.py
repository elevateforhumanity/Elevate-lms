"""
EFH Autopilot Suite v2 - FastAPI Backend
Role-Based Access Control for Government Certification Automation
"""
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from typing import Optional

# Import routers
from backend.api.routers import auth, audit

app = FastAPI(
    title="EFH Autopilot Suite v2",
    description="Government certification automation with RBAC",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Keys from environment
ADMIN_KEY = os.getenv("ADMIN_KEY", "admin-demo-key")
WORKER_KEY = os.getenv("WORKER_KEY", "worker-demo-key")
REVIEWER_KEY = os.getenv("REVIEWER_KEY", "reviewer-demo-key")
AUDITOR_KEY = os.getenv("AUDITOR_KEY", "auditor-demo-key")

# RBAC Middleware
@app.middleware("http")
async def rbac_middleware(request: Request, call_next):
    """Check X-API-Key header and set role"""
    api_key = request.headers.get("X-API-Key")

    # Public endpoints
    if request.url.path in ["/", "/health", "/docs", "/openapi.json"]:
        request.state.role = "public"
        return await call_next(request)

    # Check API key
    if not api_key:
        return JSONResponse(
            status_code=401,
            content={"error": "Missing X-API-Key header"}
        )

    # Determine role
    if api_key == ADMIN_KEY:
        request.state.role = "admin"
    elif api_key == WORKER_KEY:
        request.state.role = "worker"
    elif api_key == REVIEWER_KEY:
        request.state.role = "reviewer"
    elif api_key == AUDITOR_KEY:
        request.state.role = "auditor"
    else:
        return JSONResponse(
            status_code=403,
            content={"error": "Invalid API key"}
        )

    response = await call_next(request)
    return response

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(audit.router, prefix="/api/audit", tags=["audit"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "EFH Autopilot Suite v2",
        "version": "2.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7070)
