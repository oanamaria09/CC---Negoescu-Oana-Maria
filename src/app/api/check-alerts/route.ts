import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { alerts } = await request.json();
  const matches: string[] = [];

  for (const alert of alerts) {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${alert.city}`
    );
    const data = await res.json();
    const temp = data.current.temp_c;

    if (temp <= alert.threshold) {
      matches.push(
        `🔔 ${alert.city}: ${temp}°C este sub pragul de ${alert.threshold}°C`
      );
    }
  }

  return NextResponse.json(
    matches.length ? matches : ["✅ Nicio alertă activă."]
  );
}
