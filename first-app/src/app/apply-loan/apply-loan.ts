import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoanResultService } from '../loan-result.service';

@Component({
  selector: 'app-apply-loan',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './apply-loan.html',
  styleUrls: ['./apply-loan.css']
})
export class ApplyLoanComponent {

  // Only variables used in python-analysis
  form = {
    gender: 'Male',
    married: 'Yes',
    dependents: '0',
    education: 'Graduate',
    selfEmployed: 'No',
    propertyArea: 'Urban',
    applicantIncome: 6000,
    coapplicantIncome: 0,
    loanAmount: 100000,
    loanTermMonths: 36,
    creditHistory: 1,
    propertyMarketValue: 150000
  };

  // ✅ Document Upload (required)
  selectedFile: File | null = null;
  docError = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loanResultService: LoanResultService
  ) {}

  onFileSelected(event: any) {
    const file: File | undefined = event?.target?.files?.[0];
    this.selectedFile = file ? file : null;
    this.docError = false; // clear error when user selects a file
  }

  onSubmit() {
    // ✅ Block submit if document missing
     if (!this.selectedFile) {
    alert("Please upload a document before submitting the loan application.");
    return;
  }

    // ✅ Same behavior as earlier (call API → save result → redirect)
    this.http.post<any>('http://localhost:8080/api/loan/analyze', this.form).subscribe({
      next: (res) => {
        this.loanResultService.setResult(res);
        this.router.navigate(['/loan-decision']);
      },
      error: (err) => {
        console.error('Analyze API error:', err);
        alert('Error analyzing loan');
      }
    });
  }
}
