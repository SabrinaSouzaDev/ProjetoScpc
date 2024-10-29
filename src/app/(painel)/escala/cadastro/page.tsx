'use client'
import { TitlePage } from '@/components/TitlePage'
import Form from './components/Form'
import { consultaDiretorias } from '@/app/services/server/ScpcServiceServer'
import { Diretoria } from '@/types/UnidadesAdministrativas'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getHolidays } from '@/app/services/dateService'
import { Holidays } from '@/types/Date'

export default function Page() {
  const [listDiretorias, setListDiretorias] = useState<Diretoria[] | []>([])
  const [holidaysList, setHolidaysList] = useState<Holidays[] | []>([])
  const { toast } = useToast()

  const getDirectoryBoard = async () => {
    try {
      const response = await consultaDiretorias()
      setListDiretorias(response)
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro ao solicitar os dados da diretoria',
        duration: 3000,
      })
    }
  }

  const getHolidaysList = async () => {
    try {
      const response = await getHolidays()
      setHolidaysList(response)
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Ocorreu um erro ao solicitar as datas',
        duration: 3000,
      })
    }
  }

  useEffect(() => {
    getDirectoryBoard()
    getHolidaysList()
  }, [])

  return (
    <div className="mt-4 flex flex-col gap-10 p-6">
      <TitlePage title="Cadastrar Escala de plantão" />

      <Form holidaysList={holidaysList} listDiretorias={listDiretorias} />
    </div>
  )
}
