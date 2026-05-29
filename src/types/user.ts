export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export type Organization = 'Lendsqr' | 'Irorun' | 'Lendstar';

export type Tier = 1 | 2 | 3;

export const USER_STATUSES: UserStatus[] = [
  'Active',
  'Inactive',
  'Pending',
  'Blacklisted',
];

export const ORGANIZATIONS: Organization[] = ['Lendsqr', 'Irorun', 'Lendstar'];

export interface PersonalInformation {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Divorced';
  children: string;
  typeOfResidence: string;
}

export interface EducationAndEmployment {
  levelOfEducation: string;
  employmentStatus: 'Employed' | 'Unemployed' | 'Self-Employed' | 'Student';
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: [number, number];
  loanRepayment: number;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface Account {
  tier: Tier;
  balance: number;
  accountNumber: string;
  bank: string;
}

export interface User {
  id: string;
  organization: Organization;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  account: Account;
  personalInformation: PersonalInformation;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantors: Guarantor[];
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  perPage: number;
}

export interface UsersStats {
  total: number;
  active: number;
  withLoans: number;
  withSavings: number;
}
