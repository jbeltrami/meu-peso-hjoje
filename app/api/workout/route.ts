import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET ALL
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;
  const weightList = prisma.workout.findMany({ select: { id: true } });

  return NextResponse.json(weightList);
}

// POST
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const { treino, ontem } = await req.json();

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  try {
    const weight = await prisma.workout.create({
      data: { userId: currentUserId, value: treino, date: ontem },
    });

    console.log("Created Weight:", weight);

    return NextResponse.json(weight);
  } catch (error) {
    console.error("Error creating weight: ", error);
    return NextResponse.error();
  }
}
