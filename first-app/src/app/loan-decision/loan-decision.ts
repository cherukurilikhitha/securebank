import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanResultService } from '../loan-result.service';

@Component({
  selector: 'app-loan-decision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-decision.html',
  styleUrls: ['./loan-decision.css']

})
export class LoanDecisionComponent implements OnInit {

  result: any;

  constructor(private loanResultService: LoanResultService) {}

  ngOnInit() {
    this.result = this.loanResultService.getResult();
  }
}
