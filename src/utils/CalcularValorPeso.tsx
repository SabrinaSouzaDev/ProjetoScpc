export function calcularValorPeso(
  pesoMeio: boolean | undefined,
  pesoDois: boolean | undefined,
): unknown {
  if (pesoMeio) {
    return 0.5
  }
  if (pesoDois) {
    return 2
  }
  if (!pesoMeio && !pesoDois) {
    return 1
  }
}
