import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UpdateWeightForm from "./UpdateWeightForm";

interface Props {
  params: { id: string };
}

export default async function EditWeight({ params }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email!;
  const currentUserId = await prisma.user.findUnique({
    where: { email: user },
  });

  const { id } = params;
  const weight = await prisma.weight.findUnique({
    where: { id: parseInt(id), userId: currentUserId?.id },
  });

  return (
    <>
      <h1>{id}</h1>

      {weight ? (
        <UpdateWeightForm value={weight?.value} id={id} />
      ) : (
        redirect("/")
      )}
    </>
  );
}
