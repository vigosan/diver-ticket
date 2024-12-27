"use client";
import { useState } from "react";
import { usePrinter } from "@/context";

export default function Home() {
  const [message, setMessage] = useState("Hola Mundo!");
  const [error, setError] = useState<string | null>(null);
  const { printerIp, printerPort, setPrinterIp, setPrinterPort } = usePrinter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!printerIp || !printerPort) {
      setError("Printer IP and port must be configured.");
      return;
    }
    setError(null);
    console.log("Printer IP configured:", printerIp);
  };

  const handlePrint = async () => {
    if (!printerIp || !printerPort) {
      setError("Printer IP and port must be configured.");
      return;
    }

    try {
      const response = await fetch("/api/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: printerIp, port: printerPort, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to print the message");
      }

      setError(null);
      console.log("Message sent to the printer");
    } catch (error) {
      setError("Error: " + (error as Error).message);
    }
  };

  return (
    <main className="flex flex-col gap-12 bg-white p-4 dark:bg-slate-800">
      <div>
        <h1 className="mb-4 text-2xl text-gray-950 dark:text-white">
          Printer Configuration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="ip"
              className="block text-sm/6 font-medium text-gray-950 dark:text-slate-400"
            >
              IP Address
            </label>
            <input
              type="text"
              id="ip"
              value={printerIp}
              onChange={(e) => setPrinterIp(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-950 sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="port"
              className="block text-sm/6 font-medium text-gray-950 dark:text-slate-400"
            >
              Port
            </label>
            <input
              type="number"
              id="port"
              value={printerPort}
              onChange={(e) => setPrinterPort(Number(e.target.value))}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-950 sm:text-sm/6"
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="w-full rounded-md bg-gray-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-950/80 dark:bg-blue-800 dark:hover:bg-blue-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div>
        <h1 className="mb-4 text-2xl text-gray-950 dark:text-white">
          Send Message
        </h1>
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-950 sm:text-sm/6"
          />

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={handlePrint}
              className="w-full rounded-md bg-gray-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-950/80 dark:bg-blue-800 dark:hover:bg-blue-900"
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}
    </main>
  );
}
