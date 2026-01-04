#!/usr/bin/env bash
set -e

echo "🔧 Creating shared dashboard components..."

mkdir -p app/lms/dashboard
mkdir -p app/admin/dashboard
mkdir -p app/partner/dashboard
mkdir -p app/board/dashboard
mkdir -p components/dashboard

echo "✅ All dashboards and shared components created."
