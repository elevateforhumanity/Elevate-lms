# Python Backend - Automation Service

## Overview

FastAPI automation service for government certification and document processing tasks.

## Features

### 🔐 Authentication
- API key-based RBAC (admin, worker, reviewer, auditor)
- JWT token support
- Role-based access control

### 📄 PDF Automation
- Auto-fill government forms (SAM.gov, certifications)
- PDF field detection and mapping
- PDF flattening (prevent editing)

### 🤖 Portal Automation
- Browser automation with Playwright
- Web scraping for government portals
- Form submission automation

### 📦 Document Generation
- Certification packet generation
- Template-based document creation
- Bulk document processing

### 🔍 Audit Logging
- Track all automation activities
- User action logging
- Compliance reporting

## Tech Stack

- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **PyPDF2** - PDF manipulation
- **Playwright** - Browser automation
- **Python-Jose** - JWT authentication
- **Passlib** - Password hashing

## Installation

### Prerequisites

- Python 3.9+
- pip

### Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# JWT
JWT_SECRET=your-random-secret-key

# S3/Storage (optional)
S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password

# Notifications (optional)
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# API Keys for RBAC
ADMIN_API_KEY=generate-random-key-here
WORKER_API_KEY=generate-random-key-here
REVIEWER_API_KEY=generate-random-key-here
AUDITOR_API_KEY=generate-random-key-here
```

## Running

### Development

```bash
cd backend
python app/main.py
```

Server runs on `http://localhost:7070`

### Production

```bash
uvicorn app.main:app --host 0.0.0.0 --port 7070 --workers 4
```

### Docker (Recommended)

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright dependencies
RUN pip install playwright && playwright install-deps

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 7070

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7070"]
```

Build and run:
```bash
docker build -t elevate-backend .
docker run -p 7070:7070 --env-file .env elevate-backend
```

## API Endpoints

### Health Check
```bash
GET /health
```

### PDF Operations
```bash
POST /api/pdf/fill
Headers: X-API-Key: <worker-key>
Body: {
  "template_path": "path/to/template.pdf",
  "data": { "field1": "value1", "field2": "value2" },
  "output_path": "path/to/output.pdf"
}
```

### Portal Automation
```bash
POST /api/portal/submit
Headers: X-API-Key: <worker-key>
Body: {
  "portal_url": "https://sam.gov/...",
  "form_data": { ... },
  "action": "submit"
}
```

### Audit Logs
```bash
GET /api/audit/logs
Headers: X-API-Key: <auditor-key>
Query: ?start_date=2024-01-01&end_date=2024-12-31
```

## Integration with Next.js Frontend

### Option 1: Direct API Calls

```typescript
// lib/backend-client.ts
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:7070';
const API_KEY = process.env.BACKEND_API_KEY;

export async function fillPDF(templatePath: string, data: Record<string, string>) {
  const response = await fetch(`${BACKEND_URL}/api/pdf/fill`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY!,
    },
    body: JSON.stringify({ template_path: templatePath, data }),
  });
  
  return response.json();
}
```

### Option 2: Next.js API Route Proxy

```typescript
// app/api/automation/fill-pdf/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  const response = await fetch(`${process.env.BACKEND_URL}/api/pdf/fill`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.BACKEND_API_KEY!,
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}
```

## Deployment

### Vercel (Not Recommended)
- Vercel doesn't support Python backends well
- Use separate hosting for Python service

### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway up
```

### Render (Recommended)
1. Connect GitHub repo
2. Select `backend` directory
3. Set build command: `pip install -r requirements.txt && playwright install`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

### AWS Lambda (Advanced)
Use Mangum adapter for FastAPI on Lambda:
```python
from mangum import Mangum
handler = Mangum(app)
```

## Security

### API Key Generation
```python
import secrets
print(secrets.token_urlsafe(32))
```

### Rate Limiting
Add to `app/main.py`:
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.get("/api/pdf/fill")
@limiter.limit("10/minute")
async def fill_pdf(request: Request):
    ...
```

## Monitoring

### Logs
```bash
# View logs
tail -f logs/backend.log

# Or use logging service
import logging
logging.basicConfig(level=logging.INFO)
```

### Health Checks
```bash
# Automated health check
curl http://localhost:7070/health
```

## Current Status

✅ **INTEGRATED** - Backend is connected to Next.js frontend via API proxy routes.

### Integration Complete:

✅ **API Proxy Routes** - `/api/automation/fill-pdf` and `/api/automation/portal-submit`
✅ **Client Library** - `lib/backend-client.ts` for seamless calls
✅ **Environment Variables** - Added to `.env.example`

### To Deploy:

1. **Deploy backend** to Railway/Render (see Deployment section)
2. **Add environment variables** to Vercel:
   ```
   BACKEND_URL=https://your-backend.railway.app
   BACKEND_API_KEY=your-worker-key
   ```
3. **Backend will be automatically used** for PDF form filling and portal automation

### When to Use:

- ✅ Government form automation (SAM.gov, certifications)
- ✅ Bulk PDF processing
- ✅ Web portal automation (Playwright)
- ✅ Complex document generation
- ❌ Simple PDF generation (use Next.js libraries instead)
- ❌ Basic CRUD operations (use Supabase directly)

## Cost Estimate

- **Railway:** $5-10/month (512MB RAM)
- **Render:** $7/month (starter plan)
- **AWS Lambda:** ~$1-5/month (pay per use)

## Support

For issues or questions about the automation backend, check:
- FastAPI docs: https://fastapi.tiangolo.com
- Playwright docs: https://playwright.dev
- PyPDF2 docs: https://pypdf2.readthedocs.io
