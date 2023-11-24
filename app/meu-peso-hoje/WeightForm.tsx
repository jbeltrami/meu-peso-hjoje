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
      <div>
        <h2 className="text-6xl font-bold text-teal-600 text-center mb-16">
          Registre seu peso do dia:
        </h2>
        <div className="w-full max-w-lg mx-auto">
          <form
            className="bg-teal-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={addWeight}
          >
            <div className="mb-4">
              <label
                className="block text-teal-400 text-sm font-bold mb-2"
                htmlFor="peso"
              >
                Peso:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="peso"
                step="0.1"
                defaultValue={0}
              />
            </div>
            {/* <div className="mb-2">
              <p className="text-teal-400 font-bold mb-2">
                Praticou atividade fisica ontem?
              </p>
              <div className="flex space-x-4">
                <label
                  className="block text-teal-400 text-sm font-bold mb-2"
                  htmlFor="treino-sim"
                >
                  Sim:
                </label>
                <input
                  className="rounded py-2 text-teal-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="radio"
                  name="treino"
                  id="treino-sim"
                  value="sim"
                />
                <label
                  className="block text-teal-400 text-sm font-bold mb-2"
                  htmlFor="treino-nao"
                >
                  Nao:
                </label>
                <input
                  className="rounded py-2 text-teal-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="radio"
                  name="treino"
                  id="treino-nao"
                  value="nao"
                />
              </div>
            </div> */}
            <button
              className="bg-teal-700 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
