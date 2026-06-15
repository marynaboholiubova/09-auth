// app/(public routes)/sign-up/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setError('');

      const user = await register({
        email,
        password,
      });

      setUser(user);
      router.push('/profile');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <main>
      <h1>Sign up</h1>

      <form action={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Register</button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
