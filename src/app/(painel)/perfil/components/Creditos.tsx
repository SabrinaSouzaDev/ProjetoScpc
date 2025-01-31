'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Função utilitária para gerar dados mockados
const generateMockData = () => {
  // Aqui você pode gerar dados aleatórios ou estáticos para simular a resposta da API
  return {
    dias: 5, // Exemplo de número de dias
    outroDado: 'Valor mockado',
    // Adicione mais campos conforme necessário para simular sua resposta real
  }
}

export default function Creditos() {
  const [dadosSimulados, setDadosSimulados] = useState(generateMockData())

  useEffect(() => {
    // Simulação de chamada à API (pode ser substituído pela chamada real)
    const fetchDados = async () => {
      // Simulação de API: setDadosSimulados(dadosDaApi);
      setDadosSimulados(generateMockData())
    }

    fetchDados()
  }, [])

  const { dias } = dadosSimulados

  const isNegative = dias < 0
  const isLessThanOneDay = dias > 0 && dias < 1
  const classeCor =
    isNegative || isLessThanOneDay ? 'text-red-500' : 'text-green-500'
  const unidade = isNegative || isLessThanOneDay ? 'horas' : 'dias'
  return (
    <div className="m-y-auto flex w-full flex-col items-center justify-center pt-10">
      <div className="mb-[2dvw] flex items-center justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
          Total de Créditos
        </h1>
      </div>

      <div className="my-[3dvw] flex items-center justify-center">
        <h1
          className={`text-4xl font-extrabold tracking-tight lg:text-5xl ${classeCor}`}
        >
          {`${dias} ${unidade}`}
        </h1>
      </div>

      <div className="flex w-full items-center justify-center gap-4 ">
        {/* <Button className="" disabled={dias < 30}>
          <Link href="/login">Pecunha</Link>
        </Button> */}
        <Button disabled={dias < 1}>
          <Link href="/Area-do-usuario/solicitacao" target="_self">
            Folga
          </Link>
        </Button>
      </div>
    </div>
  )
}
