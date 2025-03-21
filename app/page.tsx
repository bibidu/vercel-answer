"use client"

import Dashboard from './dashboard/page';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Dashboard />
    </main>
  )
}

