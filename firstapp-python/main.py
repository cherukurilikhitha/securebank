from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class LoanRequest(BaseModel):
    gender: str
    married: str
    dependents: str
    education: str
    selfEmployed: str
    propertyArea: str
    applicantIncome: float = Field(ge=0)
    coapplicantIncome: float = Field(ge=0)
    loanAmount: float = Field(gt=0)
    loanTermMonths: float = Field(gt=0)
    creditHistory: int = Field(ge=0, le=1)
    propertyMarketValue: float = Field(gt=0)

@app.post("/analyze")
def analyze(req: LoanRequest):
    score = 0
    reasons = []
    totalIncome = req.applicantIncome + req.coapplicantIncome
    ltv = req.loanAmount / req.propertyMarketValue

    if req.creditHistory == 1:
        score += 40
    else:
        score -= 60
        reasons.append("Poor credit history")

    if totalIncome >= 6000:
        score += 15
    else:
        score -= 15
        reasons.append("Low total income")

    if ltv <= 0.80:
        score += 25
    elif ltv <= 0.90:
        score += 10
        reasons.append("Moderate LTV (80–90%)")
    else:
        score -= 30
        reasons.append("High LTV (>90%)")

    if req.selfEmployed.lower() == "no":
        score += 5
    else:
        score -= 5
        reasons.append("Self-employed income risk")

    if req.education.lower() == "graduate":
        score += 5

    if req.propertyArea.lower() == "urban":
        score += 5
    elif req.propertyArea.lower() == "rural":
        score -= 5
        reasons.append("Rural area policy risk")

    decision = "YES" if score >= 35 else "NO"

    return {
        "decision": decision,
        "score": score,
        "totalIncome": totalIncome,
        "ltv": ltv,
        "reasons": "; ".join(reasons)
    }
