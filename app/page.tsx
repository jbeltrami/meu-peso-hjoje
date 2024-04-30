import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteWeightButton from "./components/DeleteWeightButton";
import dateFormatter from "./helper/dateFormatter";
import styles from "./page.module.css";

// // Opt out of caching for all data requests in the route segment
// export const dynamic = "force-dynamic";

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
      <h1 className="text-6xl font-bold text-teal-600 text-center mb-4">
        Bem vindo {session?.user?.name}
      </h1>
      <p className="text-2xl font-bold text-teal-400 text-center mb-8">
        Veja seu historico abaixo:
      </p>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-teal-800">Data</th>
            <th className="text-teal-800">Peso</th>
            <th className="text-teal-800">Editar</th>
            <th className="text-teal-800">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {formattedWeightList.map((e, i) => {
            return (
              <tr key={`weight-${i}`}>
                <td className="text-teal-600 text-center">{e.date}</td>
                <td className="text-teal-600 text-center">{e.value} kg</td>
                <td className="text-teal-600 text-center">
                  <Link
                    href={`/meu-peso-hoje/editar/${e.id}`}
                    className="border-2 rounded-sm border-black p-1 text-teal-600 hover:bg-teal-900"
                  >
                    Editar
                  </Link>
                </td>
                <td className="text-teal-600 text-center">
                  <DeleteWeightButton id={e.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
