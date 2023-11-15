import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import styles from "./page.module.css";

export default function Home() {
  const session = getServerSession(authOptions);
  return <main className={styles.main}></main>;
}
