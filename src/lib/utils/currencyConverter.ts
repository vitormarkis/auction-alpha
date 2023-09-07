interface Config {
  trailZero?: boolean
}

export function currency(
  value: number,
  preferences: Config = {
    trailZero: false,
  }
): string {
  const { trailZero } = preferences
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
  if (!trailZero) return formattedValue
  const [leftPrice, rightPrice] = formattedValue.split(",")
  return rightPrice === "00" ? leftPrice : formattedValue
}
