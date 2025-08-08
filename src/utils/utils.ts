export const moneyFormat = (value: number) => {
  if (!value) return "0 COP";
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "COP",
  });
};