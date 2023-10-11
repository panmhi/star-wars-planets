import { redirect } from 'next/navigation';

export default async function Home() {
  // Hoem page not used, redirect to planets page
  redirect('/planets');
}
