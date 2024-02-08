import AppBotton from "@/components/AppButton";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/auth/signin">Sign in</Link>
      <Link href="/auth/signup">Sign up</Link>
    </main>
  );
}
