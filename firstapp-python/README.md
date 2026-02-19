# Loan analysis service (Python/FastAPI)

This service is required for the **Analyze loan** feature. The Java backend calls it at `http://127.0.0.1:8000/analyze`.

## Setup

```bash
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`. The Angular app talks to the Java backend (port 8080), which forwards loan analysis requests here.
