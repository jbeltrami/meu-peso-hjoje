import Image from "next/image";
import Link from "next/link";
import AuthCheck from "./components/AuthCheck";
import { SignInButton, SignOutButton } from "./components/buttons";

export default async function NavMenu() {
  return (
    <nav className="flex flex-row">
      <Link href={"/"}>
        <Image src="/logo.svg" width={216} height={30} alt="Meu peso hoje" />
      </Link>
      <ul className="flex flex-row space-x-8">
        <li>
          <Link href="/quem-somos">Quem somos</Link>
        </li>
        <li>
          <AuthCheck>
            <Link href="/meu-peso-hoje">Meu Peso Hoje</Link>
          </AuthCheck>
        </li>
        <li className="ml-auto">
          <SignInButton />
        </li>
        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  );
}
