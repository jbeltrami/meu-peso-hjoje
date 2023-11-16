import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import styles from "./page.module.css";

export default function Home() {
  const session = getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <main className={styles.main}></main>;
}
