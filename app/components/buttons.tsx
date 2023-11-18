"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status !== "authenticated") {
    return (
      <li>
        <button
          className="text-teal-300 hover:bg-teal-900 p-2"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </li>
    );
  }
}

export function SignOutButton() {
  return (
    <li>
      <button
        className="text-teal-300 hover:bg-teal-900 p-2"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </li>
  );
}
