import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Section from '@/components/ui/Section';
import AuthForm from '@/components/account/AuthForm';
import { getCustomerId } from '@/lib/customerAuth';

export default function RegisterPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  if (getCustomerId()) {
    redirect(params.locale === 'en' ? '/en/account' : '/account');
  }
  return (
    <Section tone="ivory" className="pt-32">
      <AuthForm mode="register" />
    </Section>
  );
}
