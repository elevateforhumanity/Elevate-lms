# Elevate LMS

A modern Learning Management System for educational institutions.

## Features

- Course management
- Student enrollment
- Automated code quality checks

## Quality Control

This project implements automated quality checks to ensure only error-free code is merged. See [QUALITY_CONTROL.md](QUALITY_CONTROL.md) for details.

### Key Quality Measures

✅ **Syntax Error Detection** - Automatic detection of Python syntax errors  
✅ **Code Linting** - Style and complexity checks with flake8 and pylint  
✅ **Automated Testing** - Unit tests run on every PR  
✅ **CI/CD Pipeline** - GitHub Actions workflow enforces quality standards

## Getting Started

### Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

### Running Tests

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ -v --cov=elevate_lms
```

### Code Quality Checks

```bash
# Check for syntax errors
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics

# Check code style
flake8 . --count --max-complexity=10 --max-line-length=127 --statistics

# Run static analysis
pylint elevate_lms/
```

## Contributing

All contributions must pass the automated quality checks before being merged. The CI/CD pipeline will automatically run on pull requests.
