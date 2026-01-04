#!/bin/bash
cd backend && source .venv/bin/activate 2>/dev/null || (python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt)
uvicorn main:app --host 0.0.0.0 --port 7070 &
echo "✅ Autopilot: http://localhost:7070"
