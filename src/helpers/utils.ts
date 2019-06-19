export function convertFromKelvin(amount: number, unit: string) {
  if (unit == "celsius") {
    return amount - 273.15;
  } else if (unit == "fahrenheit") {
    return (amount - 273.15) * 1.8 + 32;
  } else {
    return amount;
  }
}