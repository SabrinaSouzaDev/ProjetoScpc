import { UpEscalaListFunction } from '@/app/services/client/EscalaPlantaoPut'
import { useToast } from '@/components/ui/use-toast'
import { StatusSolicitacao } from '@/types/Status'
import { ErrorMapping } from '@/utils/errorMapping'
export type PutEscalaParams = {
  id: number
  status: StatusSolicitacao
  observacao?: string
}

export default function EscalaListFunction() {
  const { toast } = useToast()

  async function handleUpdateEscalaStatus(
    id: number,
    status: StatusSolicitacao,
    observacao?: string,
  ): Promise<boolean> {
    const params = { id, status, observacao }
    let errorTreatment = 'Erro ao realizar solicitação'
    try {
      const response = await UpEscalaListFunction(params)
      if (response !== 'SUCCESS_UPDATE') {
        // valor da resposta diretamente
        errorTreatment = ErrorMapping(response.technicalMessage || '')
        throw new Error(`Response status: ${response}`)
      }
      toast({
        title: 'Solicitação atualizada com sucesso',
        duration: 3000,
      })
      return true
    } catch (err) {
      console.error('Erro ao realizar solicitação:', err)
      toast({
        variant: 'destructive',
        title: errorTreatment || 'Erro ao realizar solicitação',
        duration: 4000,
      })
      return false
    }
  }

  return {
    handleUpdateEscalaStatus,
  }
}
