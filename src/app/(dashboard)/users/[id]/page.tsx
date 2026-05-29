import type { Metadata } from 'next';
import { UserDetailsView } from './UserDetailsView';

export const metadata: Metadata = {
  title: 'User Details',
};

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UserDetailsView userId={id} />;
}
