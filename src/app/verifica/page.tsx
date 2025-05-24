"use client";

import { useEffect, useState } from "react";
import type { Alert } from "@/types/alert";

export default function CheckAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);

  const fetchAlerts = async () => {
    const res = await fetch("/api/alerts");
    const data = await res.json();
    setAlerts(data);
  };

  const deleteAlert = async (id: string) => {
    await fetch(`/api/alerts/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const checkAlerts = async () => {
    setChecking(true);
    const res = await fetch("/api/check-alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alerts }),
    });
    const data = await res.json();
    setResults(data);
    setChecking(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md border border-green-100">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Alertele tale meteo
      </h2>

      {alerts.length === 0 ? (
        <p className="text-gray-500 text-center">Nu ai alerte salvate.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="border bg-white rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{alert.city}</p>
                <p className="text-sm text-gray-600">
                  Prag: <strong>{alert.threshold}°C</strong>
                </p>
              </div>
              <button
                onClick={() => deleteAlert(alert.id)}
                className="text-red-600 font-medium hover:underline"
              >
                Șterge
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={checkAlerts}
        disabled={checking}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        {checking ? "Se verifică..." : "Verifică temperaturile"}
      </button>

      {results.length > 0 && (
        <ul className="mt-6 list-disc pl-6 text-gray-700 space-y-2">
          {results.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
