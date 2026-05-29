import type { User, UsersStats } from '@/types/user';

const LOAN_THRESHOLD = 50_000;
const SAVINGS_THRESHOLD = 1_000_000;

export function computeStats(users: User[]): UsersStats {
  let active = 0;
  let withLoans = 0;
  let withSavings = 0;

  for (const user of users) {
    if (user.status === 'Active') active += 1;
    if (user.educationAndEmployment.loanRepayment > LOAN_THRESHOLD)
      withLoans += 1;
    if (user.account.balance > SAVINGS_THRESHOLD) withSavings += 1;
  }

  return {
    total: users.length,
    active,
    withLoans,
    withSavings,
  };
}
