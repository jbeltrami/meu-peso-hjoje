import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import WeightForm from "./WeightForm";

export default async function MeuPesoHoje() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <h1>Meu Peso Hoje:</h1>
      <WeightForm />
    </>
  );
}
