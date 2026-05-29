import type { User, UserStatus } from '@/types/user';

export function makeFakeUser(overrides: Partial<User> = {}): User {
  return {
    id: 'user-1',
    organization: 'Lendsqr',
    username: 'Jane Doe',
    email: 'jane@lendsqr.com',
    phoneNumber: '08012345678',
    dateJoined: '2024-05-15T10:00:00.000Z',
    status: 'Active' as UserStatus,
    account: {
      tier: 2,
      balance: 250_000,
      accountNumber: '0123456789',
      bank: 'Providus Bank',
    },
    personalInformation: {
      fullName: 'Jane Doe',
      phoneNumber: '08012345678',
      emailAddress: 'jane@lendsqr.com',
      bvn: '12345678901',
      gender: 'Female',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: 'Rented Apartment',
    },
    educationAndEmployment: {
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '3 years',
      officeEmail: 'jane@office.lendsqr.com',
      monthlyIncome: [150_000, 300_000],
      loanRepayment: 60_000,
    },
    socials: {
      twitter: '@jane',
      facebook: 'Jane Doe',
      instagram: '@jane',
    },
    guarantors: [
      {
        fullName: 'Joe Doe',
        phoneNumber: '08087654321',
        emailAddress: 'joe@example.com',
        relationship: 'Brother',
      },
    ],
    ...overrides,
  };
}
