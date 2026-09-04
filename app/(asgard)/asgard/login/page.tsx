import type { Metadata } from 'next';
import { LoginContainer } from '@/containers/asgard/LoginContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('login');

export default function AsgardLoginPage() {
  return <LoginContainer />;
}
