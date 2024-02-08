'use client'

import isAuth from "@/components/isAuth";
import Link from "next/link";

function Home() {

  return (
    <main>
      accessToken: {localStorage.getItem('accessToken')}
      <br />
      <Link href="/auth/signin">Sign in</Link>
      <Link href="/auth/signup">Sign up</Link>
    </main>
  );
}

export default isAuth(Home);
