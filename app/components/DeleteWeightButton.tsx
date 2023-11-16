"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  id: number;
}

export default function DeleteWeightButton({ id }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const deleteWeight = async () => {
    setIsFetching(true);

    const res = await fetch(`/api/weight?targetId=${id}`, { method: "DELETE" });

    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  return <button onClick={deleteWeight}>Delete {id}</button>;
}
