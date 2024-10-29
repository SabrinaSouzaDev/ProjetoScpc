'use client'

export default function ErrorCallback({
  error,
  reset,
}: {
  readonly error: Error
  readonly reset: () => void
}) {
  return (
    <main className="m-auto mt-10 max-w-screen-xl">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">{'OOPS!!'}</h1>

        <h2 className="text-2xl">{`Ocorreu um erro`}</h2>
        <div className="rounded-md bg-red-500 p-4 text-white">
          <h3 className="font-bold">Erro</h3>
          <h2 className="text-xl">{`"${error.message}"`}</h2>
        </div>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            reset()
          }}
        >
          Tentar Novamente
        </button>
      </div>
    </main>
  )
}
