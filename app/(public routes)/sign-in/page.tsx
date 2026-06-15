'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setError('');

      const user = await login({
        email,
        password,
      });

      setUser(user);
      router.push('/profile');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <main>
      <form action={handleSubmit}>
        <h1>Sign in</h1>

        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Log in</button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
