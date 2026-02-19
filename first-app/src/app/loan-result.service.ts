import { Injectable } from '@angular/core';

export interface LoanDecisionResult {
  decision: string;
  score: number;
  totalIncome: number;
  ltv: number;
  reasons: string;
}

@Injectable({ providedIn: 'root' })
export class LoanResultService {
  private _result: LoanDecisionResult | null = null;

  setResult(r: LoanDecisionResult) {
    this._result = r;
  }

  getResult(): LoanDecisionResult | null {
    return this._result;
  }

  clear() {
    this._result = null;
  }
}
