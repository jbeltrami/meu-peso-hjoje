import Image from "next/image";
import Link from "next/link";
import AuthCheck from "./components/AuthCheck";
import { SignInButton, SignOutButton } from "./components/buttons";

export default async function NavMenu() {
  return (
    <nav>
      <Link href={"/"}>
        <Image src="/logo.svg" width={216} height={30} alt="Meu peso hoje" />
      </Link>
      <ul>
        <li>
          <Link href="/quem-somos">Quem somos</Link>
        </li>
        <li>
          <SignInButton />
        </li>
        <li>
          <AuthCheck>
            <Link href="/meu-peso-hoje">Meu Peso Hoje</Link>
          </AuthCheck>
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
