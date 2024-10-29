export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function defaultReloadPage() {
  await sleep(3000)
  window.location.reload()
}
