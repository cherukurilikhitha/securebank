import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type ServiceCard = {
  title: string;
  description: string;
  actionText: string;
  actionType?: 'route' | 'alert';
  route?: string;
};

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome {
  bankName = 'SecureBank';
  userName = 'User';

  services: ServiceCard[] = [
    {
      title: 'Loan Services',
      description: 'Home, Personal, and Education loans with flexible terms.',
      actionText: 'Apply Now',
      actionType: 'route',
      route: '/apply-loan'
    },
    {
      title: 'Loan Eligibility',
      description: 'Check approval chance instantly using factors and scoring.',
      actionText: 'Check',
      actionType: 'alert'
    },
    {
      title: 'Savings Accounts',
      description: 'Secure savings with competitive interest rates.',
      actionText: 'View Plans',
      actionType: 'alert'
    },
    {
      title: 'Credit Score',
      description: 'Track credit health and improve eligibility.',
      actionText: 'Check Score',
      actionType: 'alert'
    },
    {
      title: 'Investments',
      description: 'Explore fixed deposits and safe investment options.',
      actionText: 'Explore',
      actionType: 'alert'
    },
    {
      title: 'Customer Support',
      description: '24/7 support for account and loan-related queries.',
      actionText: 'Contact',
      actionType: 'alert'
    }
  ];

  notices: string[] = [
    'Home Loan interest starts at 8.5% (sample).',
    'Personal loan approvals in minutes (sample).',
    'Update your profile details to improve eligibility.'
  ];

  constructor(private router: Router) {}

  // Header logout (demo)
  onLogout() {
    this.router.navigate(['/login']);
  }

  // Hero button navigation
  goToApplyLoan() {
    this.router.navigate(['/apply-loan']);
  }

  goToLoanEligibility() {
    alert('Loan Eligibility page will be added next.');
  }
 


  // Service card action
  onServiceAction(card: ServiceCard) {
    if (card.actionType === 'route' && card.route) {
      this.router.navigate([card.route]);
      return;
    }
    alert(`${card.title}: feature will be connected next.`);
  }

  // Quick actions
  showEmiCalculator() {
    alert('EMI Calculator: connect next');
  }

  showSupport() {
    alert('Support: connect next');
  }
}
