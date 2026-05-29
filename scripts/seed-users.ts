import { faker } from '@faker-js/faker';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  ORGANIZATIONS,
  type Guarantor,
  type Tier,
  type User,
  type UserStatus,
} from '../src/types/user';

const SEED = 42;
const COUNT = 500;

faker.seed(SEED);

const TIERS: Tier[] = [1, 2, 3];

const RESIDENCE_TYPES = [
  "Parent's Apartment",
  'Own Apartment',
  'Rented Apartment',
  'Family House',
];

const EDUCATION_LEVELS = ['B.Sc', 'M.Sc', 'B.A', 'Ph.D', 'OND', 'HND'];

const EMPLOYMENT_SECTORS = [
  'FinTech',
  'Education',
  'Healthcare',
  'Manufacturing',
  'Agriculture',
  'Construction',
  'Trade',
  'Government',
];

const EMPLOYMENT_STATUSES = [
  'Employed',
  'Unemployed',
  'Self-Employed',
  'Student',
] as const;

const MARITAL_STATUSES = ['Single', 'Married', 'Divorced'] as const;
const GENDERS = ['Male', 'Female'] as const;

const RELATIONSHIPS = [
  'Sister',
  'Brother',
  'Mother',
  'Father',
  'Cousin',
  'Friend',
  'Spouse',
];

const BANKS = [
  'Providus Bank',
  'Access Bank',
  'GTBank',
  'UBA',
  'Zenith Bank',
  'First Bank',
];

const STATUS_WEIGHTS: Array<[UserStatus, number]> = [
  ['Active', 0.5],
  ['Inactive', 0.2],
  ['Pending', 0.2],
  ['Blacklisted', 0.1],
];

function weightedStatus(): UserStatus {
  const r = faker.number.float({ min: 0, max: 1 });
  let cumulative = 0;
  for (const [status, weight] of STATUS_WEIGHTS) {
    cumulative += weight;
    if (r < cumulative) return status;
  }
  return 'Active';
}

function generatePhoneNumber(): string {
  const prefix = faker.helpers.arrayElement(['080', '081', '070', '090']);
  return `${prefix}${faker.string.numeric(8)}`;
}

function generateGuarantor(): Guarantor {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    fullName: `${firstName} ${lastName}`,
    phoneNumber: generatePhoneNumber(),
    emailAddress: faker.internet.email({ firstName, lastName }).toLowerCase(),
    relationship: faker.helpers.arrayElement(RELATIONSHIPS),
  };
}

function generateUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const organization = faker.helpers.arrayElement(ORGANIZATIONS);
  const orgDomain = organization.toLowerCase();
  const email = faker.internet
    .email({ firstName, lastName, provider: `${orgDomain}.com` })
    .toLowerCase();
  const phoneNumber = generatePhoneNumber();
  const incomeFloor = faker.number.int({ min: 50_000, max: 200_000 });
  const incomeCeiling = incomeFloor + faker.number.int({ min: 50_000, max: 400_000 });

  return {
    id: faker.string.uuid(),
    organization,
    username: fullName,
    email,
    phoneNumber,
    dateJoined: faker.date
      .between({ from: '2019-01-01', to: '2024-12-31' })
      .toISOString(),
    status: weightedStatus(),
    account: {
      tier: faker.helpers.arrayElement(TIERS),
      balance: faker.number.int({ min: 0, max: 5_000_000 }),
      accountNumber: faker.string.numeric(10),
      bank: faker.helpers.arrayElement(BANKS),
    },
    personalInformation: {
      fullName,
      phoneNumber,
      emailAddress: email,
      bvn: faker.string.numeric(11),
      gender: faker.helpers.arrayElement(GENDERS),
      maritalStatus: faker.helpers.arrayElement(MARITAL_STATUSES),
      children: faker.helpers.arrayElement(['None', '1', '2', '3', '4']),
      typeOfResidence: faker.helpers.arrayElement(RESIDENCE_TYPES),
    },
    educationAndEmployment: {
      levelOfEducation: faker.helpers.arrayElement(EDUCATION_LEVELS),
      employmentStatus: faker.helpers.arrayElement(EMPLOYMENT_STATUSES),
      sectorOfEmployment: faker.helpers.arrayElement(EMPLOYMENT_SECTORS),
      durationOfEmployment: `${faker.number.int({ min: 1, max: 15 })} years`,
      officeEmail: faker.internet
        .email({ firstName, lastName, provider: `office.${orgDomain}.com` })
        .toLowerCase(),
      monthlyIncome: [incomeFloor, incomeCeiling],
      loanRepayment: faker.number.int({ min: 10_000, max: 100_000 }),
    },
    socials: {
      twitter: `@${faker.internet.username({ firstName, lastName }).toLowerCase()}`,
      facebook: fullName,
      instagram: `@${faker.internet.username({ firstName, lastName }).toLowerCase()}`,
    },
    guarantors: [
      generateGuarantor(),
      ...(faker.datatype.boolean({ probability: 0.3 }) ? [generateGuarantor()] : []),
    ],
  };
}

function main() {
  const users: User[] = [];
  for (let i = 0; i < COUNT; i += 1) {
    users.push(generateUser());
  }

  const outputDir = join(process.cwd(), 'fixtures');
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'users.json');
  writeFileSync(outputPath, JSON.stringify(users, null, 2));
  console.log(`Wrote ${users.length} users -> ${outputPath}`);
}

main();
