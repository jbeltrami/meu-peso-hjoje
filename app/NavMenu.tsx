import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import AuthCheck from "./components/AuthCheck";
import { SignInButton, SignOutButton } from "./components/buttons";
import { authOptions } from "@/utils/authOptions";

export default async function NavMenu() {
  const session = await getServerSession(authOptions);

  const sessionUserImage = session?.user?.image || null;

  return (
    <nav className="flex flex-row py-8">
      <Link className="text-teal-300 mr-auto" href={"/"}>
        <Image
          src={sessionUserImage ? sessionUserImage : "/logo.svg"}
          width={40}
          height={30}
          alt="Meu peso hoje"
        />
      </Link>
      <ul className="flex flex-row items-center space-x-8">
        {/* <li>
          <Link
            className="text-teal-300 p-2 hover:bg-teal-900"
            href="/quem-somos"
          >
            Quem somos
          </Link>
        </li> */}
        <li>
          <AuthCheck>
            <Link
              className="text-teal-300 p-2 hover:bg-teal-900"
              href="/meu-peso-hoje"
            >
              Meu Peso Hoje
            </Link>
          </AuthCheck>
        </li>
        <AuthCheck>
          <SignInButton />
        </AuthCheck>
        <AuthCheck>
          <SignOutButton />
        </AuthCheck>
      </ul>
    </nav>
  );
}
