import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DeleteWeightButton from "./components/DeleteWeightButton";
import dateFormatter from "./helper/dateFormatter";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const weightList = await prisma.weight.findMany({
    where: { user: session?.user },
  });

  const formattedWeightList = weightList.map((e) => {
    return dateFormatter(e);
  });

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className={styles.main}>
      <h1>Bem vindo {session?.user?.name}</h1>
      <p>Veja seu historico abaixo:</p>
      <ul>
        {formattedWeightList.map((e, i) => {
          return (
            <li key={`weight-${i}`}>
              {e.date} | {e.value} kg |{" "}
              <Link href={`/meu-peso-hoje/editar/${e.id}`}>Editar</Link> |{" "}
              <DeleteWeightButton id={e.id} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
