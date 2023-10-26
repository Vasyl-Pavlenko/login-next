import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckAuth() {
  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isUserLoggedIn) {
      router.push('/table');
    }
  }, []);

  return null;
}
