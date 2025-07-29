export async function getTariffScheduleApi() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tariff-schedule/get-tariff-schedule`
  );
  if (!res.ok) throw new Error("Error obteniendo la programación de tarifas");
  return await res.json();
}