import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Welcome } from './welcome/welcome';
import { ApplyLoanComponent } from './apply-loan/apply-loan';
import { LoanDecisionComponent } from './loan-decision/loan-decision';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'welcome', component: Welcome },
  { path: 'apply-loan', component: ApplyLoanComponent },
  { path: 'loan-decision', component: LoanDecisionComponent }
];
