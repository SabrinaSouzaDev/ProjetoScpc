import { ComponenteMeusDadosProps, Dado } from './types/types'

export function ComponenteMeusDados({ dados }: ComponenteMeusDadosProps) {
  return (
    <div className="grow border p-2  shadow-lg md:col-span-2">
      <p className="text-2xl font-bold">Meus dados</p>
      <div className="p-2">
        <div>
          {dados.map((item: Dado) => (
            <div className="flex items-center" key={item.id}>
              <h4 className="lg:text-md mr-2 text-sm font-bold">
                {item.label}:
              </h4>
              <h4 className="text-sm lg:text-lg">{item.content}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
