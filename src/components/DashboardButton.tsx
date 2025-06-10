'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/Button';
import { KeyIcon } from '@heroicons/react/24/outline';

export const DashboardButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboards');
  };

  return (
    <Button
      onClick={handleClick}
      variant="default"
      className="inline-flex items-center gap-2"
    >
      <KeyIcon className="h-5 w-5" />
      Manage API Keys
    </Button>
  );
}; 