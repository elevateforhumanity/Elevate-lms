# Elevate LMS - Quality Control Setup

This document explains the code quality checks implemented to ensure only error-free code is merged.

## Automated Quality Checks

### GitHub Actions Workflow

A GitHub Actions workflow (`.github/workflows/code-quality.yml`) runs automatically on:
- Pull requests to `main` or `master` branches
- Pushes to `main` or `master` branches

### Quality Checks Performed

1. **Syntax Error Detection** - Uses `flake8` to detect Python syntax errors
2. **Code Style Linting** - Checks code style and complexity
3. **Static Analysis** - Uses `pylint` to catch potential errors
4. **Unit Tests** - Runs all tests in the `tests/` directory

## Local Development

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Linters Locally

```bash
# Check for syntax errors
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics

# Check code style
flake8 . --count --max-complexity=10 --max-line-length=127 --statistics

# Run pylint
pylint elevate_lms/
```

### Run Tests Locally

```bash
pytest tests/ -v
```

## Pre-commit Hook (Optional)

You can set up a pre-commit hook to run checks before committing:

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running code quality checks..."
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
if [ $? -ne 0 ]; then
    echo "❌ Syntax errors detected. Please fix before committing."
    exit 1
fi
echo "✅ Code quality checks passed!"
EOF

chmod +x .git/hooks/pre-commit
```

## Benefits

- **Prevents Errors**: Catches syntax errors and potential bugs before they reach the main branch
- **Maintains Quality**: Ensures consistent code style across the project
- **Automated**: Runs automatically on every PR, no manual intervention needed
- **Fast Feedback**: Developers get immediate feedback on code quality issues
