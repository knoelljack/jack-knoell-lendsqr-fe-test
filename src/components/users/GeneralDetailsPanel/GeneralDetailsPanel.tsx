import { Fragment } from 'react';
import type { User } from '@/types/user';
import styles from './GeneralDetailsPanel.module.scss';

type GeneralDetailsPanelProps = {
  user: User;
};

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat('en-NG');

export function GeneralDetailsPanel({ user }: GeneralDetailsPanelProps) {
  const [incomeMin, incomeMax] = user.educationAndEmployment.monthlyIncome;
  const incomeRange = `${nairaFormatter.format(incomeMin)} - ${nairaFormatter.format(incomeMax)}`;

  return (
    <div className={styles.root}>
      <Section title="Personal Information">
        <Field label="Full Name" value={user.personalInformation.fullName} />
        <Field label="Phone Number" value={user.personalInformation.phoneNumber} />
        <Field label="Email Address" value={user.personalInformation.emailAddress} />
        <Field label="BVN" value={user.personalInformation.bvn} />
        <Field label="Gender" value={user.personalInformation.gender} />
        <Field label="Marital Status" value={user.personalInformation.maritalStatus} />
        <Field label="Children" value={user.personalInformation.children} />
        <Field label="Type of Residence" value={user.personalInformation.typeOfResidence} />
      </Section>

      <Section title="Education and Employment">
        <Field label="Level of Education" value={user.educationAndEmployment.levelOfEducation} />
        <Field label="Employment Status" value={user.educationAndEmployment.employmentStatus} />
        <Field label="Sector of Employment" value={user.educationAndEmployment.sectorOfEmployment} />
        <Field label="Duration of Employment" value={user.educationAndEmployment.durationOfEmployment} />
        <Field label="Office Email" value={user.educationAndEmployment.officeEmail} />
        <Field label="Monthly Income" value={incomeRange} />
        <Field
          label="Loan Repayment"
          value={integerFormatter.format(user.educationAndEmployment.loanRepayment)}
        />
      </Section>

      <Section title="Socials">
        <Field label="Twitter" value={user.socials.twitter} />
        <Field label="Facebook" value={user.socials.facebook} />
        <Field label="Instagram" value={user.socials.instagram} />
      </Section>

      <Section title={user.guarantors.length > 1 ? 'Guarantors' : 'Guarantor'}>
        {user.guarantors.map((guarantor, idx) => (
          <Fragment key={idx}>
            {idx > 0 ? <hr className={styles.guarantorDivider} /> : null}
            <Field label="Full Name" value={guarantor.fullName} />
            <Field label="Phone Number" value={guarantor.phoneNumber} />
            <Field label="Email Address" value={guarantor.emailAddress} />
            <Field label="Relationship" value={guarantor.relationship} />
          </Fragment>
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <p className={styles.fieldLabel}>{label}</p>
      <p className={styles.fieldValue}>{value}</p>
    </div>
  );
}
