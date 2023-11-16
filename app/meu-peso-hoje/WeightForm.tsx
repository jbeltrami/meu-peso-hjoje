"use client";

import { useRouter } from "next/navigation";

export default function WeightForm() {
  const router = useRouter();

  const addWeight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      peso: formData.get("peso"),
      treino: formData.get("treino"),
    };

    try {
      const res = await fetch("/api/weight", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to add weight: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("API response:", data); // Log the response for debugging

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding weight: ", error.message);
      }
    }
  };

  return (
    <>
      <h2>Registre seu peso do dia:</h2>
      <form onSubmit={addWeight}>
        <label htmlFor="peso">Peso:</label>
        <input type="number" name="peso" defaultValue={0} />
        <p>Praticou atividade fisica ontem?</p>
        <label htmlFor="treino-sim">Sim:</label>
        <input type="radio" name="treino" id="treino-sim" value="sim" />
        <label htmlFor="treino-nao">Nao:</label>
        <input type="radio" name="treino" id="treino-nao" value="nao" />

        <button type="submit">Salvar</button>
      </form>
    </>
  );
}
