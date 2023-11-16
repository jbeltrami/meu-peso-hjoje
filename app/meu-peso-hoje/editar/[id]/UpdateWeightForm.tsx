"use client";

import { useRouter } from "next/navigation";

interface Props {
  value: number | undefined;
  id: string;
}

export default function UpdateWeightForm({ value, id }: Props) {
  const router = useRouter();

  const updateWeight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      id,
      value: formData.get("peso"),
    };

    try {
      const res = await fetch("/api/weight", {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to update weight: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("API response:", data); // Log the response for debugging

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating weight: ", error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={updateWeight}>
        <label htmlFor="peso">Peso:</label>
        <input type="number" name="peso" defaultValue={value} />

        <input type="submit" value="Save" />
      </form>
    </>
  );
}
