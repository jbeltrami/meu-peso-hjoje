import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WeightForm from "./WeightForm";
import { authOptions } from "@/utils/authOptions";

export default async function MeuPesoHoje() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <WeightForm />
    </>
  );
}
