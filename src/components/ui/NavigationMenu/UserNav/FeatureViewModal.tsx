'use client';
import { OnboardingModal } from './OnboardingModal';

const onboardingFeatures = [
  {
    title: 'Propose, Prioritize, Contribute, Validate',
    description: (
      <p>
        The core four elements of the Incented Protocol.
      </p>
    ),
    image: '/assets/login-asset-dashboard.png',
  },
  {
    title: 'Propose, Prioritize, Contribute, Validate',
    description: (
      <p>
        The core four elements of the Incented Protocol.
      </p>
    ),
    image: '/assets/login-asset-dashboard.png',
  },
  {
    title: 'Propose, Prioritize, Contribute, Validate',
    description: (
      <p>
        The core four elements of the Incented Protocol.
      </p>
    ),
    image: '/assets/login-asset-dashboard.png',
  },
  {
    title: 'Propose, Prioritize, Contribute, Validate',
    description: (
      <p>
        The core four elements of the Incented Protocol.
      </p>
    ),
    image: '/assets/login-asset-dashboard.png',
  },
  {
    title: 'Propose, Prioritize, Contribute, Validate',
    description: (
      <p>
        The core four elements of the Incented Protocol.
      </p>
    ),
    image: '/assets/login-asset-dashboard.png',
  },
];

export function FeatureViewModal(): JSX.Element {
  return <OnboardingModal featureList={onboardingFeatures} />;
}
