import { Earth } from 'lucide-react'
import { Badge } from './ui/badge'
import { ReactNode } from 'react'

type RequestTableType = {
  title: string
  solicitationDate: string
  applicant: string
  sector: string
  process: string
  typeOfPaymente: string
  situation: string
  transportType: string
  children?: ReactNode
}

export default function RequestTable({
  title,
  solicitationDate,
  applicant,
  sector,
  process,
  typeOfPaymente,
  situation,
  transportType,
  children,
}: RequestTableType) {
  return (
    <div className="flex flex-col flex-wrap gap-5">
      <div className="flex items-center justify-between border-b-[1.5px] p-2">
        <div className="flex flex-row items-center ">
          <Earth className="mr-1" />

          <p className="text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem]">
            {title} <strong> #23123</strong>{' '}
          </p>
        </div>

        <p className="hidden text-[0.9rem] sm:block sm:text-[1.1rem]">
          Data: {solicitationDate}
        </p>
      </div>

      <div className="flex flex-wrap gap-11 sm:gap-20 md:gap-32">
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem]">
                Solicitante: <strong>{applicant}</strong>
              </h3>

              <p className="text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem]">
                Setor: {sector}
              </p>
              <h3 className="text-[0.9rem] sm:text-[1.1rem] md:text-[1.3rem]">
                Processo:{' '}
                <Badge className="bg-red-600  text-white">{process}</Badge>
              </h3>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <p className="text-[0.9rem] sm:text-[1.1rem]">
              Informações da diária
            </p>
            <p className="text-[0.9rem] sm:text-[1.1rem]">
              Tipo de Diária: <strong>{typeOfPaymente}</strong>
            </p>
            <p className="text-[0.9rem] sm:text-[1.1rem]">
              Data da Solicitação: <strong>{solicitationDate}</strong>
            </p>
            <p className="text-[0.9rem] sm:text-[1.1rem]">
              Situação: <strong>{situation}</strong>
            </p>
            <p className="text-[0.9rem] sm:text-[1.1rem]">
              Processo: <strong> {process}</strong>
            </p>
            <h3 className="text-[0.9rem] sm:text-[1.1rem]">
              Meio de Transporte:{' '}
              <Badge className="bg-red-600 text-white">{transportType}</Badge>
            </h3>
            <p className="text-[0.9rem] sm:text-[1.1rem]">
              Tipo de Diária: <strong>{typeOfPaymente}</strong>
            </p>
          </div>
        </div>
      </div>

      {children || null}
    </div>
  )
}
