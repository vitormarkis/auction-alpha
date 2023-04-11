export function currency(value: number): string {
  const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  return formattedValue
}