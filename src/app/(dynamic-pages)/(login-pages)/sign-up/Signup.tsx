'use client';
import { RenderProviders } from '@/components/presentational/tailwind/Auth/RenderProviders';
import { Email } from '@/components/presentational/tailwind/Auth/Email';
import { EmailAndPassword } from '@/components/presentational/tailwind/Auth/EmailAndPassword';
import { useState } from 'react';
import { useToastMutation } from '@/hooks/useToastMutation';
import {
  signInWithMagicLink,
  signInWithProvider,
  signUp,
} from '@/data/auth/auth';
import { AuthProvider } from '@/types';
import { useRouter } from 'next/navigation';

export function SignUp({
  next,
  nextActionType,
}: {
  next?: string;
  nextActionType?: string;
}) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  function redirectToDashboard() {
    router.refresh();
    if (next) {
      router.push(`/auth/callback?next=${next}`);
    } else {
      router.push('/auth/callback');
    }
  }
  const magicLinkMutation = useToastMutation(
    async (email: string) => {
      // since we can't use the onSuccess callback here to redirect from here
      // we pass on the `next` to the signInWithMagicLink function
      // the user gets redirected from their email message
      return await signInWithMagicLink(email, next);
    },
    {
      loadingMessage: 'Sending magic link...',
      errorMessage: 'Failed to send magic link',
      successMessage: 'Magic link sent!',
      onSuccess: () => {
        setSuccessMessage('A magic link has been sent to your email!');
      },
      onMutate: () => {
        setSuccessMessage(null);
      },
    },
  );
  const passwordMutation = useToastMutation(
    async ({ email, password }: { email: string; password: string }) => {
      return await signUp(email, password);
    },
    {
      onSuccess: redirectToDashboard,
      loadingMessage: 'Creating account...',
      errorMessage: 'Failed to create account',
      successMessage: 'Account created!',
    },
  );
  const providerMutation = useToastMutation(
    async (provider: AuthProvider) => {
      // since we can't use the onSuccess callback here to redirect from here
      // we pass on the `next` to the signInWithProvider function
      // the user gets redirected from the provider redirect callback
      return signInWithProvider(provider, next);
    },
    {
      loadingMessage: 'Requesting login...',
      successMessage: 'Redirecting...',
      errorMessage: 'Failed to login',
    },
  );
  return (
    <div className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
      {successMessage ? (
        <p className="text-blue-500 text-sm">{successMessage}</p>
      ) : (
        <div className="space-y-8 ">
          {/* <Auth providers={['twitter']} supabaseClient={supabase} /> */}
          <div className="flex flex-col items-start gap-0 w-[320px]">
            <p className="text-2xl font-[700]">Create an account</p>
            <p className="text-sm text-left font-[400] text-gray-500">
              Enter your email below to create your account
            </p>
          </div>

          <EmailAndPassword
            isLoading={passwordMutation.isLoading}
            onSubmit={(data) => {
              passwordMutation.mutate(data);
            }}
            view="sign-up"
          />
          {/* <div className="flex items-center">
            <div className="h-[1px] w-[90px] bg-gray-500" />
            <span className="text-gray-500 text-xs mx-2">OR CONTINUE WITH</span>
            <div className="h-[1px] w-[90px] bg-gray-500" />
          </div> */}

          {/* <RenderProviders
            providers={['github']}
            isLoading={providerMutation.isLoading}
            onProviderLoginRequested={providerMutation.mutate}
          /> */}
        </div>
      )}
    </div>
  );
}
