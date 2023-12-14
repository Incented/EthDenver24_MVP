'use client';
import { RenderProviders } from '@/components/presentational/tailwind/Auth/RenderProviders';
import { Email } from '@/components/presentational/tailwind/Auth/Email';
import { EmailAndPassword } from '@/components/presentational/tailwind/Auth/EmailAndPassword';
import { useState } from 'react';
import { useToastMutation } from '@/hooks/useToastMutation';
import {
  signInWithMagicLink,
  signInWithProvider,
  signInWithPassword,
} from '@/data/auth/auth';
import { AuthProvider } from '@/types';
import { useRouter } from 'next/navigation';
import { Anchor } from '@/components/Anchor';

export function Login({
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
      return await signInWithPassword(email, password);
    },
    {
      onSuccess: redirectToDashboard,
      loadingMessage: 'Logging in...',
      errorMessage: 'Failed to login',
      successMessage: 'Logged in!',
    },
  );
  const providerMutation = useToastMutation(
    async (provider: AuthProvider) => {
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
          <div className="flex flex-col items-start gap-0 w-[320px]">
            <p className=" text-2xl font-[700]">Welcome Back!</p>
            <p className="text-base font-[400] text-gray-500">
              Please login below
            </p>
          </div>

          {/* <hr /> */}
          <Email
            onSubmit={magicLinkMutation.mutate}
            isLoading={magicLinkMutation.isLoading}
            view="sign-in"
          />
          <EmailAndPassword
            isLoading={passwordMutation.isLoading}
            onSubmit={(data) => {
              passwordMutation.mutate(data);
            }}
            view="sign-in"
          />
          {/* <div className="flex items-center">
            <div className="h-[1px] w-[90px] bg-gray-500" />
            <span className="text-gray-500 text-xs mx-2">OR CONTINUE WITH</span>
            <div className="h-[1px] w-[90px] bg-gray-500" />
          </div>

          <RenderProviders
            providers={['github']}
            isLoading={providerMutation.isLoading}
            onProviderLoginRequested={providerMutation.mutate}
          /> */}
          <div className="text-xs text-center text-gray-400">
            <p>By clicking continue, you agree to our</p>
            <Anchor href="#" className="underline">
              <span>Terms of Service</span>
            </Anchor>
            <span className="mx-1">and</span>
            <Anchor href="#" className="underline">
              <span>Privacy Policy</span>
            </Anchor>
          </div>
        </div>
      )}
    </div>
  );
}
