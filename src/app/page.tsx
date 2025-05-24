"use client";

import { useState } from "react";

export default function AddAlertPage() {
  const [city, setCity] = useState("");
  const [threshold, setThreshold] = useState("");

  const saveAlert = async () => {
    if (!city || !threshold) return;
    await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city.trim(), threshold: Number(threshold) }),
    });
    alert("Alertă salvată!");
    setCity("");
    setThreshold("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-white shadow-md rounded-xl border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
        Creează o alertă meteo
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Alerta va fi activată <strong>dacă temperatura scade sub</strong> pragul
        setat.
      </p>

      <input
        type="text"
        placeholder="Oraș"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-3 border border-blue-200 rounded mb-3"
      />
      <input
        type="number"
        placeholder="Prag temperatură (°C)"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        className="w-full p-3 border border-blue-200 rounded mb-4"
      />
      <button
        onClick={saveAlert}
        className="bg-blue-700 text-white py-2 w-full rounded hover:bg-blue-800"
      >
        Salvează alerta
      </button>
    </div>
  );
}
