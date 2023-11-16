import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// POST
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const { peso } = await req.json();

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  try {
    const weight = await prisma.weight.create({
      data: { userId: currentUserId, value: parseFloat(peso) },
    });

    console.log("Created Weight:", weight);

    return NextResponse.json(weight);
  } catch (error) {
    console.error("Error creating weight: ", error);
    return NextResponse.error();
  }
}

// GET ALL
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;
  const weightList = prisma.weight.findMany({ select: { id: true } });

  return NextResponse.json(weightList);
}

// Update
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const currentUserId = await prisma.user
    ?.findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const data = await req.json();

  const updateWeight = await prisma.weight.update({
    where: { id: parseInt(data.id), userId: currentUserId },
    data: {
      value: Number(data.value),
    },
  });

  return NextResponse.json(updateWeight);
}

// DELETE
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const targetId = req.nextUrl.searchParams.get("targetId")!;
  const currentUserEmail = session?.user?.email!;
  const currentUserId = await prisma.user
    ?.findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const deleteWeight = await prisma.weight.delete({
    where: {
      id: parseInt(targetId),
      userId: currentUserId,
    },
  });

  return NextResponse.json(deleteWeight);
}
