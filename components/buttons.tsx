"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/`}>
        <Image
          src={session.user?.image ?? "/profile.png"}
          width={32}
          height={32}
          alt="User"
        />
      </Link>
    );
  }

  return (
    <Button variant="success" type="button" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button variant="warning" type="button" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
